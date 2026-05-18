import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import TestSelection from "./components/TestSelection";
import Questionnaire from "./components/Questionnaire";
import Result from "./components/Result";
import Sources from "./components/Sources";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-space relative overflow-hidden">
        <div className="bg-noise"></div>
        <div className="glow-blob glow-blob-1"></div>
        <div className="glow-blob glow-blob-2"></div>
        <div className="glow-blob glow-blob-3"></div>

        <Navbar />

        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/tests" element={<TestSelection />} />
            <Route path="/test/:id" element={<Questionnaire />} />
            <Route path="/result" element={<Result />} />
            <Route path="/sources" element={<Sources />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
