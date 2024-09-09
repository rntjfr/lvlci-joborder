import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap"; // Import Bootstrap components

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
  const [notification, setNotification] = useState(""); // For notifications
  const [selectedJob, setSelectedJob] = useState(null); // Track the job being processed
  const [processedBy, setProcessedBy] = useState(""); // Track the selected value from dropdown
  const [actionTaken, setActionTaken] = useState("");

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

  useEffect(() => {
    if (selectedJob) {
      // Update form fields when a new job is selected
      setProcessedBy("");
      setActionTaken("");
    }
  }, [selectedJob]);

  const handleProcessClick = (job) => {
    setSelectedJob(job);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send data to the backend for processing the job order
      await axios.post(
        `http://localhost:5000/api/completejo/${selectedJob.id}`,
        {
          processedBy,
          actionTaken,
        }
      );

      // Remove the job from the state after successful processing
      setCurrentJobs(currentJobs.filter((job) => job.id !== selectedJob.id));
      setSelectedJob(null); // Clear the selected job
      setNotification("Job order completed successfully!");
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      setError("Failed to update job order.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="flex p-4">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-center p-5">
          Current Job Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Department</th>
                <th className="py-2 px-4 border-b text-left">Location</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Issue</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="py-2 px-4 border-b">{job.requestor_name}</td>
                    <td className="py-2 px-4 border-b">{job.department}</td>
                    <td className="py-2 px-4 border-b">{job.location}</td>
                    <td className="py-2 px-4 border-b">
                      {formatDate(job.date)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {job.issue_description}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <Button
                        onClick={() => handleProcessClick(job)}
                        className="bg-blue-950 text-white border border-blue-950 rounded px-4 py-2 hover:bg-blue-600 transition duration-300"
                      >
                        Process
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-2 px-4 text-center">
                    No job orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Processing form */}
      <div className="flex-1 ml-8">
        <h3 className="text-2xl font-semibold text-center p-5">
          {selectedJob ? "Process Job Order" : "Select a Job to Process"}
        </h3>
        {notification && (
          <Alert
            variant="success"
            onClose={() => setNotification("")}
            dismissible
          >
            {notification}
          </Alert>
        )}
        {selectedJob ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="requestorName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="requestorName"
                value={selectedJob.requestor_name}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </Form.Group>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={selectedJob.department}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={selectedJob.location}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={formatDate(selectedJob.date)}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </Form.Group>
            <Form.Group controlId="issue">
              <Form.Label>Issue</Form.Label>
              <Form.Control
                type="text"
                name="issue"
                value={selectedJob.issue_description}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </Form.Group>
            <Form.Group controlId="processedBy">
              <Form.Label>Processed By</Form.Label>
              <Form.Control
                as="select"
                name="processedBy"
                value={processedBy}
                onChange={(e) => setProcessedBy(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select</option>
                <option value="Leonard Torremocha">Leonard Torremocha</option>
                <option value="Rexdan Tautho">Rexdan Tautho</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="actionTaken">
              <Form.Label>Action Taken</Form.Label>
              <Form.Control
                as="textarea"
                name="actionTaken"
                rows={3}
                value={actionTaken}
                onChange={(e) => setActionTaken(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="m-2 bg-blue-950 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Submit
            </Button>
          </Form>
        ) : (
          <p>Select a job to process.</p>
        )}
      </div>
    </section>
  );
};

export default CurrentJO;
