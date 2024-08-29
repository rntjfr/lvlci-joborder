import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-5 shadow-lg">
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
              <Link
                to="/currentjo"
                className="text-lg font-medium transition duration-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md"
              >
                Current Job Orders
              </Link>
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
    </header>
  );
};

export default Header;
