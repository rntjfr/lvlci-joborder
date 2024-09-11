import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    connection.query("SELECT * FROM completed_job_orders", (err, results) => {
      if (err) {
        console.error("Error fetching completed job orders:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
