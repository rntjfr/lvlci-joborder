const mysql = require("mysql2");
const bodyParser = require("body-parser");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to Aiven MySQL database.");
});

module.exports = async (req, res) => {
  const { requestorName, department, location, date, issueDescription } =
    req.body;
  const query = `
    INSERT INTO job_orders (requestor_name, department, location, date, issue_description)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [requestorName, department, location, date, issueDescription],
    (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ error: "Failed to submit job order" });
      } else {
        res.status(200).json({ message: "Job order submitted successfully!" });
      }
    }
  );
};
