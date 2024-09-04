import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./frontend/component/Header";
import FileJOPage from "./frontend/pages/FileJOPage";
import CurrentJOPage from "./frontend/pages/CurrentJOPage";
import MonitorJOPage from "./frontend/pages/MonitorJOPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="p-6 space-y-8">
        <Routes>
          <Route path="/filejo" element={<FileJOPage />} />
          <Route path="/currentjo" element={<CurrentJOPage />} />
          <Route path="/monitorjo" element={<MonitorJOPage />} />
          <Route path="/" element={<FileJOPage />} /> {/* Default route */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
