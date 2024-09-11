import mysql from "mysql2";
import { NextResponse } from "next/server";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect();

export default async function handler(req, res) {
  if (req.method === "POST") {
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
          return res.status(500).json({ error: "Failed to submit job order" });
        }
        res.status(200).json({ message: "Job order submitted successfully!" });
      }
    );
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
