import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import Login from "./Pages/LogIn";
import { UserDashboard } from "./Pages/ProfilePage";
import Delivery from "./Pages/Delivery";
import Payments from "./Pages/Payments";
import Settings from "./Pages/Settings";
import History from "./Pages/History";
import { UserProvider } from "./Contexts/UserContext";
import AuthRoute from "./Components/AuthRoute";
import Admin from "./AdminPages/Landing";
import Users from "./AdminPages/Users";
export default function App() {
  const host = window.location.hostname;
  if (host.startsWith("admin")) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin />}>
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<AuthRoute type="public" />}>
            <Route index element={<Homepage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<AuthRoute type="protected" />}>
            <Route path="/dashboard" element={<UserDashboard />}>
              <Route path="delivery" element={<Delivery />} />
              <Route path="payments" element={<Payments />} />
              <Route path="settings" element={<Settings />} />
              <Route path="history" element={<History />} />
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
