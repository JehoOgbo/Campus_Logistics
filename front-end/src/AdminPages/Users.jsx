import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Users() {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("admintoken");
  const [newUser, setNewUser] = useState(false);
  //   const navigate = useNavigate();

  useEffect(() => {
    const userList = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:5050/api/v1/senders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (userResponse) {
          setUser(userResponse.data);
          console.log(userResponse.data);
        }
      } catch (err) {
        const error = err.response?.status;
        console.log(error);
      }
    };
    userList();
  }, []);
  return (
    <div className="flex flex-col  animate-fade-in-up duration-300 ">
      <div className="flex justify-between p-6 w-full">
        <h1 className="px-4 py-2 uppercase">Users</h1>
        <button
          onClick={() => setNewUser(true)}
          className="px-4 py-2  text-gray-700 rounded-md hover:bg-primary hover:text-gray-100  hover:shadow-xl"
        >
          Add New User
        </button>
       
      </div>
      {/* Table */}
      <div className="overflow-x-auto relative">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr className=" border-b border-gray-100">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user.name}
                </th>
                <td class="px-6 py-4">{user.email}</td>
                <td class="px-6 py-4">{user.phone_number}</td>
                <td class="px-6 py-4">{user.user_type}</td>
                <td class="px-6 py-4">
                  <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
