import { Routes, Route } from "react-router-dom";



function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2]">
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </div>
  );
}

export default App;
