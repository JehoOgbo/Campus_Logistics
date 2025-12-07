import { useNavigate, NavLink, Navigate } from "react-router-dom";
import { useContext } from "react";

export default function AdminSidebar() {
  const side = ["users", "deliveries", "locations", "settings"];
  const navigate = useNavigate();
  //   const { user, current, setToken } = useContext(UserContext);
  function handleSignOut() {
    localStorage.removeItem("admintoken");
    navigate("/sorry");
  }

  return (
    <>
      <nav className="sticky top-0 flex flex-col w-60 bg-secondary text-gray-200   shadow-xl/70 h-screen">
        <div>
          {
            <h1 className="p-2 text-5xl ">
              {side[0]
                .split(" ")
                .map((word) => word[0])
                .join(".")
                .toUpperCase()}
            </h1>
          }
        </div>
        <div className="px-6 font-light pt-2 text-xl">
          <p>{side[0]}</p>
          <button
            onClick={handleSignOut}
            className="text-sm font-semibold hover:opacity-50 rounded-2xl"
          >
            Sign Out
          </button>
        </div>

        <div>
          <ul className="flex flex-col p-3">
            {side.map((s) => (
              <NavLink
                key={s}
                className={({ isActive }) =>
                  `navlink relative group ${
                    isActive
                      ? "text-gray-100 text-xl      rounded-2xl p-2  my-3"
                      : " px-2 py-2 text-xl  hover:opacity-50 rounded-2xl"
                  }`
                }
                to={`${s}`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="mt-auto text-center border-t border-gray-500 pt-8 ">
          <p className="text-sm text-gray-200">
            © {new Date().getFullYear()} A&U. All rights reserved.
          </p>
        </div>
      </nav>
    </>
  );
}
