import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../Components/Loader";

export default function Location() {
  const token = localStorage.getItem("admintoken");
  const [newLocation, setNewLocation] = useState();
  const [states, setStates] = useState("");
  const [admin, setAdmin] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE_URL = "http://localhost:5050/api/v1/dashboard";

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (!token) {
          setAdmin(null);
          setIsLoading(false);
          return;
        }
        const response = await axios.get(API_BASE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(response.data.all);
        console.log(response.data.all);
      } catch (err) {
        setAdmin(null);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    authCheck();
  }, [token]);

  const handleLocation = async (e) => {
    e.preventDefault();
    try {
      console.log(states);

      const stateResponse = await axios.post(
        "http://localhost:5050/api/v1/states",
        { name: states, user_type: admin.user_type },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (stateResponse) console.log("good");
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) return <Loader />;
  return (
    <>
      <button
        onClick={() => setNewLocation(true)}
        className="px-4 py-2  text-gray-700 rounded-md hover:bg-primary hover:text-gray-100  hover:shadow-xl"
      >
        Create new location
      </button>

      {newLocation ? (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/40 z-50">
          <div className="bg-gray-100 animate-slide-up rounded-xl shadow-lg p-6 w-full max-w-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Location
              </h2>
              <button
                onClick={() => setNewLocation(false)}
                className="text-gray-500 hover:text-gray-700 animate-slide-up transition hover:text-xl"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLocation} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={states}
                  required
                  onChange={(e) => setStates(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-gray-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className="w-full rounded-md border border-gray-300 p-2 focus:ring focus:ring-gray-400 focus:outline-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full rounded-md p-2 text-white font-semibold 
                       bg-orange-600 hover:bg-orange-700 
                       transition-colors duration-200 ease-out"
              >
                Save
              </button>
              {/* Alternative gray style:
          <button
            type="submit"
            className="w-full rounded-md p-2 text-white font-semibold 
                       bg-gray-700 hover:bg-gray-800 
                       transition-colors duration-200 ease-out"
          >
            Save
          </button>
          */}
            </form>
          </div>
        </div>
      ) : (
        "as"
      )}
    </>
  );
}
