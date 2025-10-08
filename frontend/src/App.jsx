import { Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";


function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2]">
      <Routes>
        <Route path="/" element={<Intro />} />
        
      </Routes>
    </div>
  );
}

export default App;
