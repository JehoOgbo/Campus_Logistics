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

  const [newStateName, setNewStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [locationName, setLocationName] = useState("");

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
              <h2 className="text-lg font-semibold text-orange-600">
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
                  Select State before creating City or Location
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
    </>
  );
}
