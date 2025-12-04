import { Outlet } from "react-router-dom";

import AdminSidebar from "../Components/AdminSidebar";

export default function Admin() {
  return (
    <div className="bg-gray-300 min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-6 ">
        <Outlet /> {/* This renders nested routes like /dashboard/delivery */}
      </main>
    </div>
  );
}
