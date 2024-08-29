const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

// MySQL connection
const connection = mysql.createConnection({
  host: "192.168.86.222", // Set to 0.0.0.0 or your server's IP
  user: "root",
  password: "",
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

// Route to fetch current job orders
app.get("/api/currentjo", (req, res) => {
  connection.query("SELECT * FROM job_orders", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
