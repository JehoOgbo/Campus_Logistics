import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../Components/Loader";

export default function LocationModal() {
  const token = localStorage.getItem("admintoken");
  const [open, setOpen] = useState(false);

  const [statesOb, setStatesOb] = useState([]);
  const [selectedStateForCity, setSelectedStateForCity] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [expandState, setExpandState] = useState(false);
  const [expandCity, setExpandCity] = useState(false);
  const [newStateName, setNewStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locations, setLocations] = useState([]);
  const [admin, setAdmin] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5050/api/v1/dashboard";

  // Fetch states + admin
  useEffect(() => {
    const load = async () => {
      try {
        const [statesRes, adminRes] = await Promise.all([
          axios.get("http://localhost:5050/api/v1/states", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(API_BASE_URL, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setStatesOb(statesRes.data);
        setAdmin(adminRes.data.all);
      } catch (e) {
        console.log(e.response?.status);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [token]);

  // Fetch cities when state changes
  useEffect(() => {
    if (!selectedStateForCity) {
      setCities([]);
      return;
    }
    const fetchCities = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/api/v1/states/${selectedStateForCity}/cities`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCities(res.data);
      } catch (err) {
        console.error(err.response?.status);
      }
    };
    fetchCities();
  }, [selectedStateForCity, token]);

  // Add State
  const addState = async () => {
    try {
      await axios.post(
        "http://localhost:5050/api/v1/states",
        { name: newStateName, user_type: admin.user_type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const res = await axios.get("http://localhost:5050/api/v1/states", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatesOb(res.data);
      setNewStateName("");
    } catch (e) {
      console.log(e.response?.status);
    }
  };
  const expandCities = async (c) => {
    setExpandCity(c);
    setSelectedCity(c);
    if (!c) return;
    try {
      // refresh locations
      const res = await axios.get(
        `http://localhost:5050/api/v1/cities/${c}/locations`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocations(res.data);
    } catch (e) {
      console.log(e.response?.status);
    }
  };

  // Add City
  const addCity = async () => {
    try {
      await axios.post(
        `http://localhost:5050/api/v1/states/${selectedStateForCity}/cities`,
        { name: cityName, user_type: admin.user_type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // refresh cities
      const res = await axios.get(
        `http://localhost:5050/api/v1/states/${selectedStateForCity}/cities`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCities(res.data);
      setCityName("");
    } catch (e) {
      console.log(e.response?.status);
    }
  };
  const expandStates = async (s) => {
    setExpandState(s);
    setSelectedStateForCity(s);
    try {
      // refresh cities
      const res = await axios.get(
        `http://localhost:5050/api/v1/states/${s}/cities`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCities(res.data);
    } catch (e) {
      console.log(e.response?.status);
    }
  };
  // Add Location
  const addLocation = async () => {
    try {
      await axios.post(
        `http://localhost:5050/api/v1/cities/${selectedCity}/locations`,
        { name: locationName, sender_id: admin.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocationName("");
    } catch (e) {
      console.log(e.response?.status);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <h1 className="text-xl font-semibold text-primary">
        State, City & Location
      </h1>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-gray-700 rounded-md hover:bg-orange-500 hover:text-white hover:shadow-xl transition"
      >
        Create new location
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60">
          <div className="w-full max-w-lg rounded-xl bg-gray-50 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-primary">
                Add State, City & Location
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
              >
                Close
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              {/* State Field */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  value={newStateName}
                  onChange={(e) => setNewStateName(e.target.value)}
                  className="col-span-7 rounded-md border-2 border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="Enter state name"
                />
                <button
                  onClick={addState}
                  className="col-span-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Add
                </button>
              </div>
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  Select State
                </label>
                <select
                  value={selectedStateForCity}
                  onChange={(e) => setSelectedStateForCity(e.target.value)}
                  className="col-span-3 rounded-md border-2 border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Select state</option>
                  {statesOb.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* City Field */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  className="col-span-4 rounded-md border-2 border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="Enter city name"
                />

                <button
                  onClick={addCity}
                  disabled={!selectedStateForCity || !cityName}
                  className="col-span-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50 hover:bg-orange-600"
                >
                  Add
                </button>
              </div>

              {/* Location Field */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="col-span-4 rounded-md border-2 border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="Enter location name"
                />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="col-span-5 rounded-md border-2 border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Select city</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addLocation}
                  disabled={!selectedCity || !locationName}
                  className="col-span-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50 hover:bg-orange-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto relative">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                States
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {statesOb.map((state) => (
              <>
                {/* State row */}
                <tr
                  key={state.id}
                  className="border-b border-gray-100 hover:bg-gray-200 cursor-pointer"
                  onClick={() => expandStates(state.id)}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:text-primary"
                  >
                    {state.name}
                  </th>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                      Active
                    </span>
                  </td>
                </tr>

                {/* Expanded subrow for cities */}
                {expandState === state.id && (
                  <tr>
                    <td colSpan={2} className="px-8 py-3">
                      <div className="space-y-2">
                        {cities.map((city) => (
                          <div
                            key={city.id}
                            className="flex items-center justify-between  pb-2 cursor-pointer hover:text-primary"
                          >
                            <span onClick={() => expandCities(city.id)}>
                              {city.name}
                            </span>
                            <button className="rounded-md bg-orange-500 px-3 py-1 text-sm text-white hover:bg-primary">
                              Edit
                            </button>

                            {/* Nested locations under city */}
                            {expandCity === city.id && (
                              <div className="ml-6 mt-2 space-y-1 text-sm text-gray-700">
                                {locations.map((location) => (
                                  <div className="flex items-center justify-between">
                                    <span>{location.name} </span>
                                    <button className="rounded-md bg-orange-500 px-3 py-1 ml-2 text-xs text-white hover:bg-primary">
                                      Edit
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
