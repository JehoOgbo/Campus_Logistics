import { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Settings() {
  const { user, token } = useContext(UserContext);
  const [pass, setPass] = useState(false);
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState();
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPwd, setNewPwd] = useState();
  const [oldPwd, setOldPwd] = useState();
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const API_BASE_URL = `http://localhost:5050/api/v1/senders/${user.id}`;

  function handlepass() {
    setPass(!pass);
  }
  function handleChange(e) {
    const uploadedImage = e.target.files;
    console.log(uploadedImage);
    if (uploadedImage) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setFile(uploadedImage);
    }
  }

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file);
    };
  }, [file]);

  const handleAuthUpdate = async (e) => {
    e.preventDefault();
    if (newPwd != password) setMessage('The passwords don"t match');

    if (oldPwd != user.password) {
      console.log(oldPwd);
      console.log(message);
      setMessage("Old Password is incorrect");
    }
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone_number", phone);
    formData.append("password", password);
    if (file) formData.append("image_path", file);
    try {
      const response = await axios.put(
        API_BASE_URL,
        formData,

        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "multipart/form-data",
        }
      );
      if (response) navigate("/dashboard/settings");
    } catch (error) {
      if (error.response) setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 animate-fade-in-up duration-300 flex-col w-150">
      <div className="px-6">
        {" "}
        <form
          className="flex flex-col border-t-1 border-opacity-50 space-y-5  text-gray-700 "
          onSubmit={handleAuthUpdate}
        >
          {/* Profile Picture */}
          <div
            className={` rounded-full ml-10  font-semibold  w-45 h-45 flex items-center bg-cover justify-center  mt-2 border-r-4 shadow-xl/30 bg-primary  `}
            style={file ? { backgroundImage: `url(${preview})` } : {}}
          >
            <h1 className="p-2 text-5xl ">
              {!file &&
                user.name
                  .split(" ")
                  .map((word) => word[0])
                  .join(".")
                  .toUpperCase()}
            </h1>
          </div>
          <label className="text-gray-700 font-medium text-md ">
            Edit your photo{" "}
          </label>
          <input
            type="file"
            onChange={handleChange}
            className="text-gray-700 border-gray-500 border-2 p-2 w-auto"
            placeholder="Upload from device"
          />
          {/* Name */}
          <div className="flex flex-row pt-3">
            <label className="w-65 text-gray-700 font-medium text-md">
              Your FullName:{" "}
            </label>
            <input
              type="text"
              name="User Name"
              placeholder={user.name}
              className="ml-1 px-2  border-0.5 rounded-md bg-gray-300 w-40  text-sm font-medium focus:outline-none"
            />
          </div>
          {/* Your Phone Number */}
          <div className="flex flex-row ">
            {" "}
            <label className="text-md w-65 text-gray-700 font-medium  ">
              Your Phone Number:{" "}
            </label>
            <input
              type="tel"
              className="ml-1 px-2 border-0.5 rounded-md font-medium text-sm bg-gray-300 w-40 focus:outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* Email */}
          <div className="flex flex-row ">
            <label className="w-65 text-gray-700 font-medium text-md">
              Your Email:{" "}
            </label>
            <input
              type="email"
              name="email"
              placeholder={user.email}
              className="ml-1 px-2   border-0.5 rounded-md bg-gray-300 w-40  text-sm font-medium focus:outline-none"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          {/* Change Password */}
          <div>
            <div className="flex justify-between">
              {" "}
              <button
                type="button"
                disabled={pass}
                className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-700"
                onClick={handlepass}
              >
                Change Password
              </button>
              {pass ? (
                <button
                  type="button"
                  className="px-4 py-2  text-gray-700 rounded-md hover:bg-red-500  hover:text-gray-100  hover:shadow-xl"
                  onClick={handlepass}
                >
                  Cancel
                </button>
              ) : (
                ""
              )}
            </div>

            {pass && (
              <div className=" pb-3 flex flex-col  space-y-5  text-gray-700 w-150">
                <div className="flex flex-row pt-3 ">
                  <label className="w-65 text-gray-700 font-medium text-md">
                    Your Old Password:{" "}
                  </label>
                  <input
                    type="password"
                    name="old password"
                    className="ml-1 px-2  border-0.5 rounded-md bg-gray-300 w-40  text-sm font-medium focus:outline-none"
                    value={oldPwd}
                    onChange={(e) => setOldPwd(e.target.value)}
                  />
                </div>
                <div className="flex flex-row ">
                  <label className="w-65 text-gray-700 font-medium text-md">
                    Your New Password:{" "}
                  </label>
                  <input
                    type="password"
                    name="new password"
                    className="ml-1 px-2  border-0.5 rounded-md bg-gray-300 w-40  text-sm font-medium focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-row ">
                  <label className="w-65 text-gray-700 font-medium text-md">
                    Confirm New Password:{" "}
                  </label>
                  <input
                    type="password"
                    name="new password"
                    className="ml-1 px-2  border-0.5 rounded-md bg-gray-300 w-40  text-sm font-medium focus:outline-none"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
          {/* CTA */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Cancel
            </button>
            <button className="px-4 py-2  text-gray-700 rounded-md hover:bg-primary hover:text-gray-100  hover:shadow-xl">
              Save Settings
            </button>
          </div>
        </form>
        <p className="text-xl font-semibold text-gray-700">{message}</p>
      </div>
    </div>
  );
}
