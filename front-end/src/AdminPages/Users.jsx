import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [user, setUser] = useState(null);
  // useEffect(()=>{
  //     const userList = async ()=>{
  //         try{
  //             const userResponse =await axios.get("http://localhost:5050/api/v1/senders",{
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //         }catch{}
  //     }
  // },[])
  return (
    <div className="flex flex-col  animate-fade-in-up duration-300 ">
      <div className="flex justify-between p-6 w-full">
        <h1 className="px-4 py-2 uppercase">Users</h1>
        <button className="px-4 py-2  text-gray-700 rounded-md hover:bg-primary hover:text-gray-100  hover:shadow-xl">
          Add New User
        </button>
      </div>
      {/* Table */}
      <div class="overflow-x-auto relative">
        <table class="min-w-full text-sm text-left text-gray-700">
          <thead class="text-xs text-gray-700 uppercase ">
            <tr>
              <th scope="col" class="px-6 py-3">
                User
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" class="px-6 py-3">
                Role
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class=" border-b border-gray-100">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Alice Johnson
              </th>
              <td class="px-6 py-4">alice.j@example.com</td>
              <td class="px-6 py-4">Admin</td>
              <td class="px-6 py-4">Telephone</td>
              <td class="px-6 py-4">
                <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  Active
                </span>
              </td>
            </tr>
            <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-100">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Bob Williams
              </th>
              <td class="px-6 py-4">bob.w@example.com</td>
              <td class="px-6 py-4">Developer</td>
              <td class="px-6 py-4">
                <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  Active
                </span>
              </td>
            </tr>
            <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-100">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Charlie Brown
              </th>
              <td class="px-6 py-4">charlie.b@example.com</td>
              <td class="px-6 py-4">Designer</td>
              <td class="px-6 py-4">
                <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  Pending
                </span>
              </td>
            </tr>
            <tr class="odd:bg-white even:bg-gray-50">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Diana Davis
              </th>
              <td class="px-6 py-4">diana.d@example.com</td>
              <td class="px-6 py-4">Support</td>
              <td class="px-6 py-4">
                <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  Inactive
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
