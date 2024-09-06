import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordPrompt from "./PasswordPrompt"; // Import the PasswordPrompt component

const Header = () => {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const handleCurrentJoClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    setShowPasswordPrompt(true); // Show the password prompt
  };

  return (
    <header className="bg-blue-950 text-white p-5 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">Job Order Management</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/filejo"
                className="text-lg font-medium transition duration-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md"
              >
                File Job Order
              </Link>
            </li>
            <li>
              <a
                href="/currentjo"
                // onClick={handleCurrentJoClick} // Use the click handler instead of a direct link
                className="text-lg font-medium transition duration-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md cursor-pointer"
              >
                Current Job Orders
              </a>
            </li>
            <li>
              <Link
                to="/monitorjo"
                className="text-lg font-medium transition duration-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md"
              >
                Completed Job Orders
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {showPasswordPrompt && (
        <PasswordPrompt onClose={() => setShowPasswordPrompt(false)} />
      )}
    </header>
  );
};

export default Header;
