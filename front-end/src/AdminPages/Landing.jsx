import { Outlet, useNavigate } from "react-router-dom";

import AdminSidebar from "../Components/AdminSidebar";
import { useEffect } from "react";

export default function Admin() {
  const token = localStorage.getItem("admintoken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/sorry");
  }, []);
  return (
    <div className="bg-gray-300 min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-6 ">
        <Outlet /> {/* This renders nested routes like /dashboard/delivery */}
      </main>
    </div>
  );
}
