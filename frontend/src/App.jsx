import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FileJOPage from "./pages/FileJOPage";
import CurrentJOPage from "./pages/CurrentJOPage";
import MonitorJOPage from "./pages/MonitorJOPage";

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
