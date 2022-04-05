const prompt = require("prompt");
const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
  multipleStatements: true,
});

const input = util.promisify(prompt.get.bind(this));

function cb(error, result) {
  if (error) {
    console.log(error.message);
    return;
  }
  console.log(result);
}

function getPopulation(Country, name, code, cb) {
  connection.query(
    `SELECT Population FROM ${Country}
       WHERE Name = '${name}'
       and code = '${code}'
      `,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}

function getPopulation2(Country, name, code, cb) {
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name =` +
      connection.escape(name) +
      " and code =" +
      connection.escape(code),
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result);
    }
  );
}

async function queryDatabase() {
  let tableName = "";
  let countryName = "";
  let countryCode = "";

  prompt.start();
  try {
    const firstValue = await input(["Table Name"]);
    tableName = firstValue["Table Name"];

    const secondValue = await input(["Country Name"]);
    countryName = secondValue["Country Name"];

    const thirdValue = await input(["Country Code"]);
    countryCode = thirdValue["Country Code"];

    connection.connect();
    getPopulation2(tableName, countryName, countryCode, cb);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();
