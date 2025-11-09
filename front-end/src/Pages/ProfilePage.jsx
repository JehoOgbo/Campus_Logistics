
import { Outlet, useLocation } from "react-router-dom"
import { Navigate } from "react-router-dom"
import DashboardSidebar from "../Components/DashboardSidebar"
import Footer from "../Components/Footer"
 
// export const LocationContext = createContext()
export  function UserDashboard(){
    
//     const [user , setUser] = useState(null)
//     const [isLoading,setIsLoading]=useState(true)
//       const API_BASE_URL = "http://localhost:5050/api/v1/dashboard";
//    const location = useLocation()
//     const [current, setCurrent]=useState(false)

//    useEffect(()=>{
//     setCurrent(location.pathname)
//    },[location])

//     useEffect(()=>{
//         const authCheck=async()=>{
//             try{
//           const token=  localStorage.getItem("token")
//             const response = await axios.get(API_BASE_URL,{headers:{Authorization: `Bearer ${token}`}})
//             setUser(response.data.name)
//         }catch(err){
//             setUser(null)
//         }finally{
//             setIsLoading(false)
//         }
//     }
//        authCheck() 
//     },[])

//     if (isLoading) return <p>Loading...</p>;
//   if (!user) return <Navigate to="/login" />;
    return<>
   
     <div className="flex  min-h-screen text-white">
      <DashboardSidebar  />
      <main className="flex-1 p-6 ">
        <Outlet /> {/* This renders nested routes like /dashboard/delivery */}
      </main>
     
    </div> 
    </>
}
