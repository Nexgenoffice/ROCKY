import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import PfpGenerator from "./pages/PfpGenerator";
import ComingSoon from "./pages/ComingSoon";
import Swap from "./pages/Swap";
import Team from "./pages/Team";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pfp-generator" element={<PfpGenerator />} />
          <Route path="/meme-generator" element={<ComingSoon />} />
          <Route path="/rocky-game" element={<ComingSoon />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
