var mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const CREATE_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS authors(
        author_no INT PRIMARY KEY,
        author_name VARCHAR(50),
        university VARCHAR(50),
        date_of_birth DATE,
        h_index INT,
        gender ENUM('m','f')
    );`;

  const ADD_MENTOR_COL = `ALTER TABLE authors ADD mentor INT;`;

  const ADD_FK_TO_MENTOR_COL = `
        ALTER TABLE authors
        ADD FOREIGN KEY(mentor)
        REFERENCES authors(author_no);
    `;

  connection.connect();

  try {
    await execQuery(CREATE_AUTHORS_TABLE);
    await execQuery(ADD_MENTOR_COL);
    await execQuery(ADD_FK_TO_MENTOR_COL);
  } catch (err) {
    console.log(err);
    connection.end();
  }
  connection.end();
};

seedDatabase();
