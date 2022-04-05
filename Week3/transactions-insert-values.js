const { exec } = require("child_process");
const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const insertAccount = `
    INSERT INTO 
        account(account_number, balance)
    VALUES
        (101,1000.00),
        (102,2000.00),
        (103,3000.00);
    `;
  const insertAccountChanges = `
    INSERT INTO 
        account_changes(account_number, amount, changed_date, remark)
    VALUES
        (101, 500.10, '2022-03-27','sent'),
        (102, 390.30, '2022-03-28', 'Market'),
        (103, 5000.00, '2022-03-29', 'received');
    `;
  connection.connect();
  try {
    await execQuery(insertAccount);
    await execQuery(insertAccountChanges);
  } catch (err) {
    console.error(err);
    connection.end();
  }
  connection.end();
}

seedDatabase();
