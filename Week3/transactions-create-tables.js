const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const dropDatabase = `DROP DATABASE IF EXISTS meetup`;
  const createDatabase = `CREATE DATABASE meetup`;
  const useDatabase = `USE meetup`;
  const createAccount = `
    CREATE TABLE account(
        account_number INT PRIMARY KEY,
        balance DECIMAL(11,2)
    );`;
  const creatChangesTable = `
        CREATE TABLE account_changes(
            change_num INT NOT NULL AUTO_INCREMENT,
            amount DECIMAL(11,2),
            change_date DATE,
            remark VARCHAR(50),
            PRIMARY KEY (change_num),
            FOREIGN KEY (account_number) REFERENCES account(account_number)
        );
    `;
  connection.connect();
  try {
    await execQuery(dropDatabase);
    await execQuery(createDatabase);
    await execQuery(useDatabase);
    await execQuery(createAccount);
    await execQuery(creatChangesTable);
  } catch (err) {
    console.error(err);
    connection.end();
  }
  connection.end();
}

seedDatabase();
