import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [mErr, setMErr] = useState(""); //mErr stands for mailError
  const [pErr, setPErr] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = "http://localhost:5050/api/v1/senders";

  useEffect(() => {
    // This code only runs AFTER 'lastName' or 'firstName' has been updated
    // and the component has re-rendered.
    const newName = `${firstName} ${lastName}`;
    setName(newName);
  }, [firstName, lastName]);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setMErr("Oops, that doesn’t look like an email.");
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      console.log("weak");
      setPErr(
        "Your password should be strong: minimum 8 characters, with uppercase, numbers, and special characters."
      );
      return;
    }
    setMErr("");

    try {
      const response = await axios.post(API_BASE_URL, {
        name,
        email,
        password,
      });
      if (response) navigate("/login");
    } catch (err) {
      const error = err.response?.status;
      switch (error) {
        case 409:
          setMessage("Email already exits");
          break;
        case 500:
          setMessage("Oops, that’s on us. Please try again later");
          break;
        default:
          setMessage("My bad, Something went wrong, try again");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] md:min-h-screen sm:min-h-screen md:py-7 h-screen flex justify-center items-center  ">
      <div className="flex flex-row rounded-2xl items-center  mx-auto md:container justify-between bg-secondary md:w-200 sm:180 md:h-155 shadow-xl/30 w-100 ">
        <div className="bg-[url(/pic1.jpg)] bg-cover md:bg-left bg-center items-end  md:w-full md:h-full h-168  rounded-2xl"></div>
        <div className=" w-full md:min-h-full md:pl-2 flex flex-col">
          <div className="flex min-h-full flex-col justify-center px-6 py-10 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="h-15 w-auto  mx-auto"
                src="/trace.svg"
                alt="Campus Logistics"
              />
              <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-white">
                Create an Account
              </h2>
            </div>
            {/* Name */}
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm/6 tracking-wider  font-medium md:text-gray-100 text-slate-300"
                  >
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <UserIcon className="h-5 w-5 left-2 text-gray-600 absolute -translate-y-1/2 top-1/2" />
                    <input
                      id="firstname"
                      type="text"
                      name="firstname"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      placeholder="Ahmed"
                      required
                      className="block w-full pl-10 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm/6 tracking-wider font-medium md:text-gray-100 text-slate-300"
                  >
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <UserIcon className="h-5 w-5 left-2 text-gray-600 absolute -translate-y-1/2 top-1/2" />
                    <input
                      id="lastname"
                      type="text"
                      name="lastname"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      placeholder="Sani"
                      required
                      className="block w-full pl-10 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 tracking-wider font-medium md:text-gray-100 text-slate-300"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <EnvelopeIcon className="absolute h-5 w-5 left-2 text-gray-600 absolute -translate-y-1/2 top-1/2" />
                    <input
                      value={email}
                      type="text"
                      name="email"
                      required
                      placeholder="youremail@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
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
                      className="block text-sm/6 tracking-wider font-medium md:text-gray-100 text-slate-300"
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
                      value={password}
                      placeholder="••••••••"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className={`block pl-10 w-full placeholder-slate-600 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1  placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6 ${
                        mErr
                          ? "focus:outline-red-500 outline-red-500"
                          : "focus:outline-primary outline-white/10"
                      }`}
                    />
                  </div>
                  <span
                    className="text-red-400 left-2 text-xs transition ease-in-out duration-300
 "
                  >
                    {pErr}
                  </span>
                </div>

                <div>
                  <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    Register
                  </button>
                </div>
              </form>

              <div className="mt-5 text-center text-sm/6 text-gray-400">
                {message && (
                  <p className="pb-2 text-sm text-red-500">{message}</p>
                )}
                Already have an account?
                <NavLink
                  to="/login"
                  className="font-semibold text-primary hover:text-indigo-300"
                >
                  Sign In
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
