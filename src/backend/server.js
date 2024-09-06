import "dotenv/config"; // Load environment variables from .env file

import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;
// const cors = require("cors");

// // app.use(
// //   cors({
// //     origin: "https://lvlci-joborder.vercel.app", // Adjust this to your React app's domain
// //   })
// // );

// MySQL connection
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

app.use(cors());
app.use(bodyParser.json());

// Endpoint to submit a new job order
app.post("/api/submit", (req, res) => {
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
});

// Route to fetch current job orders
app.get("/api/currentjo", (req, res) => {
  connection.query("SELECT * FROM job_orders", (err, results) => {
    if (err) {
      console.error("Error fetching current job orders:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to complete a job order
app.post("/api/completejo/:id", (req, res) => {
  const jobId = req.params.id;
  const { processedBy, actionTaken } = req.body;

  // Fetch the job order from job_orders
  connection.query(
    "SELECT * FROM job_orders WHERE id = ?",
    [jobId],
    (err, results) => {
      if (err) {
        console.error("Error fetching job order:", err);
        return res.status(500).json({ error: "Failed to fetch job order" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Job order not found" });
      }

      const jobOrder = results[0];

      // Insert into completed_job_orders
      const insertQuery = `
      INSERT INTO completed_job_orders (requestor_name, department, location, date_requested, issue_description, action_taken, conducted_by, date_processed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
      connection.query(
        insertQuery,
        [
          jobOrder.requestor_name,
          jobOrder.department,
          jobOrder.location,
          jobOrder.date,
          jobOrder.issue_description,
          actionTaken,
          processedBy,
          new Date(), // Automatically set the date completed to the current date
        ],
        (err) => {
          if (err) {
            console.error("Error inserting completed job order:", err);
            return res
              .status(500)
              .json({ error: "Failed to complete job order" });
          }

          // Delete from job_orders
          connection.query(
            "DELETE FROM job_orders WHERE id = ?",
            [jobId],
            (err) => {
              if (err) {
                console.error("Error deleting job order:", err);
                return res
                  .status(500)
                  .json({ error: "Failed to delete job order" });
              }

              res
                .status(200)
                .json({ message: "Job order completed successfully" });
            }
          );
        }
      );
    }
  );
});

// Route to fetch completed job orders
app.get("/api/completedjo", (req, res) => {
  connection.query("SELECT * FROM completed_job_orders", (err, results) => {
    if (err) {
      console.error("Error fetching completed job orders:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Database Connection Details:
    Host: ${process.env.DB_HOST}
    Port: ${process.env.DB_PORT}
    User: ${process.env.DB_USER}
    Database: ${process.env.DB_NAME}`);
});
