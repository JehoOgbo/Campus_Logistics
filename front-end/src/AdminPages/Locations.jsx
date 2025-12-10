import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../Components/Loader";

export default function Location() {
  const token = localStorage.getItem("admintoken");
  const [newLocation, setNewLocation] = useState();
  const [states, setStates] = useState("");
  const [stateID, setStateID] = useState("");
  const [cityName, setCityName] = useState("");
  const [city, setCity] = useState("");
  const [admin, setAdmin] = useState();
  const [location, setLocation] = useState("");
  const [statesOb, setStatesOb] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE_URL = "http://localhost:5050/api/v1/dashboard";

  useEffect(() => {
    const stateList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/v1/states",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response) {
          setStatesOb(response.data);
          console.log(response.data);
        }
      } catch (err) {
        const error = err.response?.status;
        console.log(error);
      }
    };
    stateList();
  }, []);

  useEffect(() => {
    Object.entries(statesOb).forEach(([key, value]) => {
      console.log(key, value);
      //   const cityList = async () => {
      //     try {
      //       const response = await axios.get(
      //         `http://localhost:5050/api/v1/states/${state.id}/cities`,
      //         {
      //           headers: { Authorization: `Bearer ${token}` },
      //         }
      //       );
      //       if (response) {
      //         city(response.data);
      //       }
      //     } catch (err) {
      //       const error = err.response?.status;
      //       console.log(error);
      //     }
      //   };
      //   cityList();
    });
  }, [statesOb]);

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
        const error = err.response?.status;
        console.log(error);
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
      if (stateResponse) setStateID(stateResponse.data.id);

      const cityResponse = await axios.post(
        `http://localhost:5050/api/v1/states/${stateID}/cities`,
        { name: cityName, user_type: admin.user_type },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (cityResponse) setCity(cityResponse.data);

      const locationResponse = await axios.post(
        `http://localhost:5050/api/v1/cities/${city.id}/locations`,
        {
          name: location,
          sender_id: admin.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (locationResponse) console.log("yesssss!");
    } catch (err) {
      console.log(err.locationResponse);
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
      {/* Table */}
      <div className="overflow-x-auto relative">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
            </tr>
          </thead>
          <tbody>
            {statesOb.map((statesOb) => (
              <tr className=" border-b border-gray-100">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {statesOb.name}
                </th>

                <td class="px-6 py-4">{statesOb.id}</td>
                <td class="px-6 py-4">{statesOb.created_at}</td>
                {/* {city.map((city) => (
                  <td class="px-6 py-4">{city.name}</td>
                ))} */}

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
                  required
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
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
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
