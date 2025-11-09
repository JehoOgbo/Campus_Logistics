import { useContext, useEffect } from "react"
import { UserContext } from "../Contexts/UserContext"
import { useState } from "react";
export default function Settings(){
    const {user} = useContext(UserContext)
    const [newPass, setNewPass] =useState(false)
       const [file, setFile] = useState(null);
 function handleNewPass(){
    setNewPass(!newPass)
 }
    function handleChange(e) {
        const uploadedImage = (e.target.files);
       if (uploadedImage) setFile(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(() => {
  return () => {
    if (file) URL.revokeObjectURL(file);
  };
}, [file]);

    return <>
    <div className="flex min-h-screen bg-gray-100 animate-fade-in-up duration-300 flex-col">
        <form className="flex flex-col border-t-1 border-opacity-50 space-y-5  text-gray-700 w-150">
            {/* Profile Picture */}
              <div className= {` rounded-full ml-10  font-semibold  w-45 h-45 flex items-center bg-cover justify-center  mt-2 border-r-4 shadow-xl/30 bg-primary  `}
         style={file ? { backgroundImage: `url(${file})` } : {}}>
            <h1 className="p-2 text-5xl ">{!file &&user.split(" ").map(word=>word[0]).join(".").toUpperCase()}</h1>
        </div>
        <label className="text-gray-700 font-medium text-md ">Edit your photo </label>
         <input type="file" onChange={handleChange} className="text-gray-700 border-gray-500 border-2 p-2 w-auto" placeholder="Upload from device"  />
         {/* Name */}
     <div className="flex flex-row pt-3">
  <label className="w-65 text-gray-700 font-medium text-md">Your FullName: </label>
  <input type="text" name="User Name" placeholder={user}
   className="ml-1 px-2  border-0.5 rounded-md bg-gray-300 w-40  text-sm font-medium focus:outline-none" />
</div>
 {/* Your Phone Number */}
<div className="flex flex-row "> <label className="text-md w-65 text-gray-700 font-medium  ">Your Phone Number: </label>
  <input type='tel' className="ml-1 px-2 border-0.5 rounded-md font-medium text-sm bg-gray-300 w-40 focus:outline-none"/>
</div>
{/* Email */}
<div className="flex flex-row ">
  <label className="w-65 text-gray-700 font-medium text-md">Your Email: </label>
  <input type="email" name="email" placeholder={user}
   className="ml-1 px-2   border-0.5 rounded-md bg-gray-300 w-40  text-sm font-medium focus:outline-none" />
</div>
{/* Change Password */}
<div>
    <div className="flex justify-between"> <button type="button" disabled={newPass} className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-700" onClick={handleNewPass} >Change Password</button>
    {newPass ? <button type="button" className="px-4 py-2  text-gray-700 rounded-md hover:bg-red-500  hover:text-gray-100  hover:shadow-xl" onClick={handleNewPass}>Cancel</button>: ''}</div>
   

    {newPass && <div className=" pb-3 flex flex-col  space-y-5  text-gray-700 w-150">
        <div className="flex flex-row pt-3 ">
  <label className="w-65 text-gray-700 font-medium text-md">Your Old Password: </label>
  <input type="password" name="old password" 
   className="ml-1 px-2  border-0.5 rounded-md bg-gray-300 w-40  text-sm font-medium focus:outline-none" />
</div>
        <div className="flex flex-row ">
  <label className="w-65 text-gray-700 font-medium text-md">Your New Password: </label>
  <input type="password" name="new password" 
   className="ml-1 px-2  border-0.5 rounded-md bg-gray-300 w-40  text-sm font-medium focus:outline-none" />
</div>
        <div className="flex flex-row ">
  <label className="w-65 text-gray-700 font-medium text-md">Confirm New Password: </label>
  <input type="password" name="new password" 
   className="ml-1 px-2  border-0.5 rounded-md bg-gray-300 w-40  text-sm font-medium focus:outline-none" />
</div> 
    
    </div>}
    
</div>
{/* CTA */}
<div className="flex justify-between">
<button type="button" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" >Cancel</button>
<button className="px-4 py-2  text-gray-700 rounded-md hover:bg-primary hover:text-gray-100  hover:shadow-xl">Save Settings</button>
</div>
        </form>

       
           
    </div>
    </>
}