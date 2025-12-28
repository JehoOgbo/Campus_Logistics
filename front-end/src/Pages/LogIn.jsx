import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";
import validator from "validator";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
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
    <div className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] md:min-h-screen sm:min-h-screen md:py-7 h-screen flex justify-center items-center  ">
      <div className="flex flex-row rounded-2xl items-center  mx-auto md:container justify-between bg-secondary md:w-200 sm:180 md:h-155 shadow-xl/30 w-100 ">
        <div className="bg-[url(/pic5.jpg)]  bg-cover md:bg-center  items-end  md:w-full md:h-full h-168  rounded-2xl"></div>
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
                  <div className="mt-1 relative">
                    <EnvelopeIcon className="absolute h-5 w-5 left-2 text-gray-600 absolute -translate-y-1/2 top-1/2" />
                    <input
                      type="text"
                      name="email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="youremail@email.com"
                      className={`block pl-10 w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6 ${
                        mErr
                          ? "focus:outline-red-500 outline-red-500"
                          : "focus:outline-primary outline-white/10"
                      }`}
                    />
                  </div>{" "}
                  <span
                    className="text-red-400  left-2 text-xs transition ease-in-out duration-300
 "
                  >
                    {mErr}
                  </span>
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
                  <div className="mt-1 relative">
                    <LockClosedIcon className=" h-5 w-5 left-2 text-gray-600 absolute -translate-y-1/2 top-1/2" />
                    <input
                      id="password"
                      type="password"
                      name="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="block pl-10 w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
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
               
                Don't have an account?
                <NavLink
                  to="/register"
                  className="font-semibold text-primary hover:text-indigo-300"
                >
                  Sign Up
                </NavLink>
                 {message && (
                   
            <div className="mt-4 rounded-lg bg-indigo-400  backdrop-blur-xl p-2 flex items-start gap-3 shadow-md">
              <div className="flex-shrink-0 text-red-400 text-xl">⚠️</div>
              <div>
                <p className="text-sm font-semibold text-gray-100">Error</p>
                <p className="text-sm text-gray-200">
                  {message}
                </p>
              </div>
            </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
