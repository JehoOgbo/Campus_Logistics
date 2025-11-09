import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
// Protected ROutes are only accessible by Guest Users
// Logged in Users will be redirected when they try to access public routes
export default function AuthRoute({type ='protected'}){
    const {user} = useContext(UserContext)
if (type === 'protected'){
    if (!user){ return <Navigate to="/login" />};
    return <Outlet/>
}
if (type === 'public'){
    if (user){ return <Navigate to="/dashboard/delivery" />};
    return <Outlet/>
}
return <Outlet/>
}