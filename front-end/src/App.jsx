import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
