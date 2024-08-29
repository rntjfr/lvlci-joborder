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

const CurrentJO = () => {
  const [currentJobs, setCurrentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurrentJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/currentjo");
        setCurrentJobs(response.data);
      } catch (err) {
        setError("Failed to fetch job orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold">Current Job Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Department</th>
              <th className="py-2 px-4 border-b text-left">Location</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Issue</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <tr key={job.id}>
                  <td className="py-2 px-4 border-b">{job.requestor_name}</td>
                  <td className="py-2 px-4 border-b">{job.department}</td>
                  <td className="py-2 px-4 border-b">{job.location}</td>
                  <td className="py-2 px-4 border-b">{formatDate(job.date)}</td>
                  <td className="py-2 px-4 border-b">
                    {job.issue_description}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center">
                  No job orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CurrentJO;
