
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Loader from "../Components/Loader"

 export const UserContext = createContext()
 export function UserProvider({children}){
     const [user , setUser] = useState(null)
    const [isLoading,setIsLoading]=useState(true)
      const API_BASE_URL = "http://localhost:5050/api/v1/dashboard";
   const location = useLocation()
    const [current, setCurrent]=useState(false)
    const [token ,setToken] =useState(()=>  localStorage.getItem("token") || null)

   useEffect(()=>{
    setCurrent(location.pathname)
   },[location])

    useEffect(()=>{
        const authCheck=async()=>{
            try{
          
          if (!token) {
  setUser(null);
  setIsLoading(false);
  return;
}
            const response = await axios.get(API_BASE_URL,{headers:{Authorization: `Bearer ${token}`}})
            setUser(response.data.name)
        }catch(err){
            setUser(null)
        }finally{
            setIsLoading(false)
        }
    }
       authCheck() 
    },[token])

    if (isLoading) return <Loader/>;
 
  
    return(
        <UserContext.Provider value={{user, current,setToken}}>
            {children}
        </UserContext.Provider>
    )
 }