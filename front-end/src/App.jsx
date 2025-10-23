import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import Login from "./Pages/LogIn";
import {UserDashboard} from "./Pages/ProfilePage";
import Delivery from "./Pages/Delivery"
import Payments from "./Pages/Payments"
import Settings from "./Pages/Settings"
import History from "./Pages/History";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard/>} >
        <Route path="delivery" element={<Delivery/>}/>
        <Route path="payments" element={<Payments/>}/>
        <Route path="settings" element={<Settings/>}/>
        <Route path="history" element={<History/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
