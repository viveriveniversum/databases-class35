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
  const sendMoney = `
    UPDATE account SET balance = balance - 100.00 WHERE account_number = 101;
    `;
  const getMoney = `
    UPDATE account SET balance = balance + 100.00 WHERE account_number = 102;
    `;
  const logCondition = `
    INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES
        (101, 100, NOW(), "Sent 100.00 to 102"),
        (102, 100, NOW(), "Got 100.00 from 101")`;

  try {
    await execQuery("START TRANSACTION");
    await execQuery(sendMoney);
    await execQuery(getMoney);
    await execQuery(logCondition);
    await execQuery("COMMIT");
  } catch (err) {
    console.error(err);
    await execQuery("ROLLBACK");
    connection.end();
  }
  connection.end();
}

seedDatabase();
