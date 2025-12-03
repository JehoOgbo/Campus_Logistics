import { useContext, useEffect, useState } from "react";
import DashboardSidebar from "../Components/DashboardSidebar";
import Footer from "../Components/Footer";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import PayButton from "../Components/PayButton";

export default function Delivery() {
  const navigate = useNavigate();
  const { token, user } = useContext(UserContext);
  const [locals, setLocals] = useState();
  const [selected, setSelected] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const [feature, setFeature] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    async function handleLocation() {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/v1/states",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLocals(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Failed to fetch states:", err);
      }
    }
    handleLocation();
  }, [token]);
  useEffect(() => {
    let wPrice;
    if (weight === 1 && weight != 0) {
      wPrice = 500;
    } else if (weight <= 5 && weight > 1) {
      wPrice = 2500;
    } else if (weight > 5) {
      wPrice = (weight - 5) * 900 + 2500;
    }
    if (weight === 0) {
      wPrice = 0;
      setPrice(wPrice);
    }
    if (feature === "fragile" && weight != 0) {
      wPrice += 200 * (weight > 1 ? weight : 1);
    }
    setPrice(wPrice);
  }, [weight, feature]);

  const handleFormOpen = () => {
    setFormOpen(!formOpen);
    setFeature("");
    setWeight(0);
    setPrice(0);
    window.scrollTo({ top: 0, behaviour: "smooth" });
  };
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_BASE_URL, {
        weight,
      });
      if (response) navigate("/login");
    } catch (error) {
      if (error.response) setMessage(error.response.data.message);
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100 animate-fade-in-up duration-300 flex-col">
      <div className=" p-6 text-gray-800">
        <p className="text-3xl">Welcome, {user.name}</p>
        <h1 className="text-3xl font-bold">Make a new delivery</h1>
        <button
          disabled={formOpen}
          className={`rounded-2xl text-gray-200 bg-primary p-2 shadow-xl mt-2   ${
            formOpen
              ? "opacity-30"
              : "hover:scale-105 transition-transform duration-300 ease-in-out"
          }`}
          onClick={handleFormOpen}
        >
          New Delivery +
        </button>
      </div>
      {formOpen && (
        <div className="px-6  rounded border-gray-800 text-xl w-150 font-bold animate-fade-in-up duration-100">
          <h2 className="text-gray-500 py-2">Delivery Details</h2>
          <form
            onSubmit={handleForm}
            className="flex flex-col border-t-1 border-opacity-50 space-y-5  text-gray-700"
          >
            {/* Product Name */}
            <div className="flex flex-row pt-3">
              <label className="w-65">Delivery name: </label>
              <input
                type="text"
                name="description"
                placeholder="Name of package"
                className="ml-1 px-2  border-0.5 rounded-md bg-gray-300 w-40  text-sm font-medium focus:outline-none"
              />
            </div>
            {/* Features */}
            <div className="flex flex-row   ">
              <label className="w-64">Features: </label>
              <label
                htmlFor="fragile"
                className={`block border-1  rounded-md text-sm font-medium px-3 py-1 hover:bg-primary hover:rounded-lg hover:opacity-100 hover:shadow-lg hover:text-gray-100 ml-2 ${
                  selected === "fragile"
                    ? "bg-primary text-gray-100 shadow-lg"
                    : ""
                }`}
              >
                Fragile{" "}
                <input
                  type="radio"
                  className="hidden"
                  id="fragile"
                  name="feature"
                  value="fragile"
                  onChange={() => {
                    setSelected("fragile");
                    setFeature("fragile");
                  }}
                />
              </label>

              <label
                htmlFor="notfragile"
                className={`block border-1 rounded-md text-sm font-medium px-3 py-1 hover:bg-primary hover:rounded-lg hover:opacity-100 hover:shadow-lg hover:text-gray-100 ml-2 ${
                  selected === "notFragile"
                    ? "bg-primary text-gray-100 shadow-lg"
                    : ""
                }`}
              >
                Not Fragile{" "}
                <input
                  type="radio"
                  className="hidden"
                  name="feature"
                  id="notfragile"
                  value="notFragile"
                  onChange={() => {
                    setSelected("notFragile");
                    setFeature("notFragile");
                  }}
                />
              </label>
            </div>
            {/* Weight */}
            <div className="flex flex-row ">
              <label className="w-65">Weight(in kg): </label>
              <input
                type="number"
                min={1}
                className="ml-1 px-2 border-0.5 rounded-md bg-gray-300 w-15 focus:outline-none focus:border-transparent "
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
            {/* From */}
            <div className="flex flex-row ">
              <label htmlFor="from" className="w-65">
                From:{" "}
              </label>
              <select className="ml-1 shadow-xl p-1 text-sm font-semibold focus:border-transparent focus:outline-none bg-primary text-gray-100 rounded-md">
                <option className="">Samaru Campus</option>
                <option>Kongo Campus</option>
              </select>
            </div>
            {/* To */}
            <div className="flex flex-row ">
              <label htmlFor="from" className="w-65">
                To:{" "}
              </label>
              <select className="ml-1 shadow-xl p-1 text-sm font-semibold focus:border-transparent focus:outline-none bg-primary text-gray-100 rounded-md">
                <option className="">Samaru Campus</option>
                <option>Kongo Campus</option>
              </select>
            </div>
            {/* Your Phone Number */}
            <div className="flex flex-row ">
              {" "}
              <label className="text-md w-65 ">Your Phone Number: </label>
              <input
                type="tel"
                className="ml-1 px-2 border-0.5 rounded-md font-medium text-sm bg-gray-300 w-36 focus:outline-none"
              />
            </div>
            {/* Recipient's Phone Number */}
            <div className="flex flex-row ">
              {" "}
              <label className="text-md w-65 ">
                Recipient's Phone Number:{" "}
              </label>
              <input
                type="tel"
                className="ml-1 px-2 border-0.5 font-medium text-sm rounded-md bg-gray-300 w-36 focus:outline-none"
              />
            </div>
            {/* Description */}
            <div className="flex flex-row ">
              <label className="w-65">Description: </label>
              <input
                type="text"
                name="description"
                placeholder="Write a short of description of the package"
                className="ml-1 px-2 border-0.5 rounded-md bg-gray-300 w-75 pb-20 text-sm font-medium focus:outline-none"
              />
            </div>
            {/* Price */}
            <div className="flex justify-end mt-4">
              <div className="text-right text-xl p-2 rounded-md bg-primary text-gray-100 font-semibold">
                Total Price: ₦{price}
              </div>
            </div>
            {/* CTA */}
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleFormOpen}
              >
                Cancel
              </button>
              {/* <button className="px-4 py-2  text-gray-700 rounded-md hover:bg-primary hover:text-gray-100  hover:shadow-xl">
                Proceed
              </button> */}
              <PayButton />
              <button
                onClick={() => setConfirm(true)}
                className="px-4 py-2  text-gray-700 rounded-md hover:bg-primary hover:text-gray-100  hover:shadow-xl"
              >
                Confirm Delivery
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
