const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Update with your MySQL username
  password: "", // Update with your MySQL password
  database: "job_order_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

app.use(cors());
app.use(bodyParser.json());

// Endpoint to submit job order
app.post("/api/submit", (req, res) => {
  const { requestorName, department, location, date, issueDescription } =
    req.body;
  const query = `INSERT INTO job_orders (requestor_name, department, location, date, issue_description) VALUES (?, ?, ?, ?, ?)`;

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
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
