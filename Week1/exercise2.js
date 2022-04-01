var mysql = require("mysql");

//Created a database called 'meetup' with hyfuser credentials
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

//To handle errors create a function to show errors or results
const queryHandler = (error, result) => {
  if (error) {
    console.log(error);
  }
  console.log(result);
};

//1
connection.query(
  `SELECT Name FROM country WHERE Population > 8000000;`,
  queryHandler
);
//2
connection.query(
  `SELECT Name FROM country WHERE Name LIKE '%land%';`,
  queryHandler
);
//3
connection.query(
  `SELECT Name FROM country WHERE Population BETWEEN 500000 AND 1000000;`,
  queryHandler
);
//4
connection.query(
  `SELECT Name FROM country WHERE Continent = 'Europe';`,
  queryHandler
);
//5
connection.query(
  `SELECT Name FROM country ORDER BY SurfaceArea DESC;`,
  queryHandler
);
//6
connection.query(
  `SELECT Name FROM city WHERE CountryCode = 'NLD';`,
  queryHandler
);
//7
connection.query(
  `SELECT Population FROM city WHERE Name = 'Rotterdam';`,
  queryHandler
);
//8
connection.query(
  `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10;`,
  queryHandler
);
//9
connection.query(
  `SELECT Name FROM city ORDER BY Population DESC LIMIT 10;`,
  queryHandler
);
//10
connection.query(`SELECT SUM(Population) FROM country;`, queryHandler);
connection.end();
