import React, { useEffect, useState } from "react";
import axios from "axios";

// Function to format date to DD/MM/YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const MonitorJO = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/completedjo"
        );
        setJobs(response.data);
      } catch (err) {
        setError("Failed to fetch completed job orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold text-center p-5">
        Completed Job Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Department</th>
              <th className="py-2 px-4 border-b text-left">Location</th>
              <th className="py-2 px-4 border-b text-left">Date Requested</th>
              <th className="py-2 px-4 border-b text-left">Issue</th>
              <th className="py-2 px-4 border-b text-left">Actions Taken</th>
              <th className="py-2 px-4 border-b text-left">Conducted By</th>
              <th className="py-2 px-4 border-b text-left">
                Date Processed / Completed
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job.id}>
                  <td className="py-2 px-4 border-b">{job.requestor_name}</td>
                  <td className="py-2 px-4 border-b">{job.department}</td>
                  <td className="py-2 px-4 border-b">{job.location}</td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(job.date_requested)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {job.issue_description}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {job.action_taken || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {job.conducted_by || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {job.date_processed
                      ? formatDate(job.date_processed)
                      : "Not Processed"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-2 px-4 text-center">
                  No completed job orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MonitorJO;
