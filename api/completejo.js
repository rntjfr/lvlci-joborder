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
  if (req.method === "POST") {
    const jobId = req.query.id;
    const { processedBy, actionTaken } = req.body;

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
            new Date(),
          ],
          (err) => {
            if (err) {
              console.error("Error inserting completed job order:", err);
              return res
                .status(500)
                .json({ error: "Failed to complete job order" });
            }

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
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
