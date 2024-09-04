const mysql = require("mysql2");

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
  connection.query("SELECT * FROM completed_job_orders", (err, results) => {
    if (err) {
      console.error("Error fetching completed job orders:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};
