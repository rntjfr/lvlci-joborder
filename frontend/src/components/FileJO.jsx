import React, { useState } from "react";
import axios from "axios";

const FileJO = () => {
  const [requestorName, setRequestorName] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [issueDescription, setIssueDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/submit", {
        requestorName,
        department,
        location,
        date,
        issueDescription,
      });
      alert("Job order submitted successfully!");

      // Clear the form fields
      setRequestorName("");
      setDepartment("");
      setLocation("");
      setDate(new Date().toISOString().split("T")[0]); // Reset to today's date
      setIssueDescription("");
    } catch (error) {
      alert("Failed to submit job order. Please try again.");
    }
  };

  return (
    <section className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">File Job Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="requestorName" className="block text-gray-700">
            Name (Requestor):
          </label>
          <input
            id="requestorName"
            type="text"
            value={requestorName}
            onChange={(e) => setRequestorName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-gray-700">
            Department:
          </label>
          <input
            id="department"
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-700">
            Location:
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-700">
            Date:
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="issueDescription" className="block text-gray-700">
            Issue/Problem:
          </label>
          <textarea
            id="issueDescription"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            rows="6"
            placeholder="Describe the issue or problem..."
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default FileJO;
// just checking
