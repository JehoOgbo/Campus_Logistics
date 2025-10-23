import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import  { LocationContext } from "../Pages/ProfilePage";
export default function DashboardSidebar(){
  const side = ['dashboard','delivery','history','payments', 'settings']
   const {current}= useContext(LocationContext)
    return<>
    
    <nav className="sticky top-0 flex flex-col w-60 bg-gradient-to-b from-[#1e3c72] to-[#2a5298] text-gray-200   shadow-xl/70 h-screen">
        <div className="rounded-full bg-primary font-semibold  w-30 h-30 flex items-center justify-center self-center mt-2 border-r-4 shadow-xl/30">
            <h1 className="p-2 text-5xl ">A</h1>
        </div>
<div>
    <ul className="flex flex-col p-3">
       {
       side.map(s=> <NavLink  className={({ isActive }) =>
    `navlink relative group ${isActive ? 'text-gray-100 text-xl      rounded-2xl p-2  my-3' : ' px-2 py-2 text-xl hover:bg-gray-100 hover:text-blue-500 hover:opacity-50 rounded-2xl'}`
  }  to = {`${s}`}>
        {s.charAt(0).toUpperCase() +s.slice(1)}
        <span className={`absolute bottom-0.5 left-2 h-0.5 bg-gray-100 transition-all duration-1000 ease-in-out ${current===`/dashboard/${s}` ? ' w-47 ': 'w-0'}`}></span>
       
       
   
        </NavLink>)}
       
    </ul>
</div>
    </nav>
    </>
}