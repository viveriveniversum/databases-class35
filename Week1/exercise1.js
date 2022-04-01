var mysql = require("mysql");

//Created a database called 'meetup' with hyfuser credentials
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

connection.connect();

//To handle errors create a function to show errors or results
const queryHandler = (error, result) => {
  if (error) {
    console.log(error);
  }
  console.log(result);
};

//Drop,create and use queries
connection.query("DROP DATABASE IF EXISTS meetup", queryHandler);
connection.query("CREATE DATABASE meetup", queryHandler);
connection.query("USE meetup", queryHandler);

//Create tables
connection.query(
  `CREATE TABLE Invitee(
        invitee_no INT, invitee_name TEXT, invited_by VARCHAR(80)
    );`,
  queryHandler
);

connection.query(
  `CREATE TABLE Room(
          room_no INT, room_name TEXT, floor_number INT
      );`,
  queryHandler
);

connection.query(
  `CREATE TABLE Meeting(
          meeting_no INT,
          meeting_title TEXT,
          starting_time DATETIME,
          ending_time DATETIME,
          room_no INT
      );`,
  queryHandler
);

// Insert 5 rows into tables
connection.query(
  `INSERT INTO Invitee
  VALUES
    (1,"Onur","Aykut"),
    (2,"Ali","Ertugrul"),
    (3,"Huseyin","Burak"),
    (4,"Talha","Ensar"),
    (5,"Sina","Fedor");
  `,
  queryHandler
);

connection.query(
  `INSERT INTO Room
    VALUES
      (201,"Amsterdam",2),
      (202,"Breda",2),
      (203,"Culemborg",2),
      (204,"Dordrecht",2),
      (205,"Enkhuizen",2);
    `,
  queryHandler
);

connection.query(
  `INSERT INTO Meeting
    VALUES
      (1,"History","2022-04-18 15:30:00","2022-04-18 17:30:00",101),
      (2,"Literature","2022-04-19 15:30:00","2022-04-19 17:30:00",102),
      (3,"Math","2022-04-20 15:30:00","2022-04-20 17:30:00",103),
      (4,"Physics","2022-04-21 15:30:00","2022-04-21 17:30:00",104),
      (5,"Chemistry","2022-04-22 15:30:00","2022-04-2 17:30:00",105);
    `,
  queryHandler
);

connection.end();
