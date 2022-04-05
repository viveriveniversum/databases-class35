const { Console } = require("console");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://hyfuser:hyfpassword@cluster0.zg5li.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function seedDatabase() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  const database = client.db("hyf");
  const city = database.collection("city");
  try {
    await client.connect();
    //INSERT
    const homeTown = {
      Name: "Amsterdam",
      CountryCode: "NLD",
      District: "Noord-Holland",
      Population: "1000000",
    };
    const insertResult = await city.insertOne(homeTown);
    console.log(`${insertResult.insertedId} was inserted`);
    //UPDATE
    const filter = { Name: "Amsterdam" };
    const updateHomeTown = {
      $set: {
        Population: 700000,
      },
    };
    const result = await city.updateOne(filter, updateHomeTown);
    console.log(result);
    //RETRIEVE
    const getByNameQuery = { Name: "New Home Town" };
    const homeTownByName = await city.findOne(getByNameQuery);
    console.log(homeTownByName);

    const getByCountryCodeQuery = { CountryCode: "NLD" };
    const homeTownByCountryCode = await city.findOne(getByCountryCodeQuery);
    console.log(homeTownByCountryCode);
    //DELETE
    const deleteQuery = { Name: "New Home Town" };
    const deleteResult = await city.deleteOne(deleteQuery);
    if (deleteResult.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
seedDatabase();
