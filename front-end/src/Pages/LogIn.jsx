import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";
import validator from "validator";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const API_BASE_URL = "http://localhost:5050/api/v1/login";
  const [message, setMessage] = useState("");
  const [mErr, setMErr] = useState(""); //mErr stands for mailError
  const { setToken } = useContext(UserContext);
  async function handleAuth(e) {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setMErr("Oops, that doesn’t look like an email.");
      return;
    }
    setMErr("");
    try {
      const response = await axios.post(API_BASE_URL, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.access_token); // save token
      setToken(response.data.access_token);
      navigate("/dashboard/delivery");
    } catch (err) {
      const error = err.response?.status;
      switch (error) {
        case 401:
          setMessage("Invalid Email or password");
          break;
        case 500:
          setMessage("Oops, that’s on us. Please try again later");
          break;
        default:
          setMessage("My bad, Something went wrong, try again");
      }
    }
  }
  return (
    <div className="bg-linear-to-r from-[#1e3c72] to-[#2a5298] min-h-screen py-7">
      <div className="flex flex-row rounded-2xl items-center mx-auto container justify-between bg-secondary w-200 shadow-xl/30 ">
        <div className="bg-[url(/pic5.jpg)] bg-cover bg-center items-end w-full h-155  rounded-2xl"></div>
        <div className=" w-full min-h-full pl-2 flex flex-col">
          <div className="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="h-15 w-auto  mx-auto"
                src="/trace.svg"
                alt="Campus Logistics"
              />
              <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-white">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleAuth} className="space-y-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className={`block  w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6 ${
                        mErr
                          ? "focus:outline-red-500 outline-red-500"
                          : "focus:outline-primary outline-white/10"
                      }`}
                    />
                    <span
                      className="text-red-400 relative left-2 text-xs transition ease-in-out duration-300
 "
                    >
                      {mErr}
                    </span>
                  </div>
                </div>
                {/* Password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-100"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-1">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    Login
                  </button>
                </div>
              </form>

              <div className="mt-5 text-center text-sm/6 text-gray-400">
                {message && (
                  <p className="pb-2 text-sm text-red-500">{message}</p>
                )}
                Don't have an account?
                <NavLink
                  to="/register"
                  className="font-semibold text-primary hover:text-indigo-300"
                >
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
