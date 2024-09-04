import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordPrompt = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Replace with your actual password check
    if (password === "lvledesma") {
      navigate("/currentjo");
      onClose(); // Close the prompt
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-black">
          RESTRICTED! - Enter Password
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
            required
          />
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordPrompt;
