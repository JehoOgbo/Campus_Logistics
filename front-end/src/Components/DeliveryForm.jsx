import axios from "axios";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useRef, useState } from "react";
import DeliveryDetailsModal from "./DeliveryDetailModal";

export default function DeliveryForm() {
  const navigate = useNavigate();
  const { token, user } = useContext(UserContext);
  const [selected, setSelected] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const [feature, setFeature] = useState("");
  const [weight, setWeight] = useState(0);
  const [recName, setRecName] = useState("");
  const [recNum, setRecNum] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const lastFieldRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const deliveryDetails = {
    recipientName: "John Doe",
    recipientPhone: "08012345678",
    weight: 5,
    feature: "fragile",
    from: "Samaru Campus",
    to: "Kongo Campus",
    yourPhone: "08123456789",
  };

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
    <>
      <div className="px-6  rounded border-gray-800 text-xl w-150 font-bold animate-fade-in-up duration-100">
        <h2 className="text-gray-500 py-2">Delivery Details</h2>
        <form
          onSubmit={handleForm}
          className="flex flex-col border-t-1 border-opacity-50 space-y-5  text-gray-700"
        >
          {/* Recipient Name */}
          <div className="flex flex-row pt-3">
            <label className="w-65">Recipient's name: </label>
            <input
              type="text"
              name="description"
              required
              placeholder="Name of recipient"
              value={recName}
              onChange={(e) => setRecName(e.target.value)}
              className="col-span-7 rounded-md border-2 bg-gray-300 border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
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
              required
              className="col-span-7 rounded-md border-2 border-gray-300 bg-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none "
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>
          {/* From */}
          <div className="flex flex-row ">
            <label htmlFor="from" className="w-65">
              From:{" "}
            </label>
            <select className="col-span-3 rounded-md  text-gray-100 bg-primary px-3 py-2 text-sm focus:border-transparent focus:outline-none shadow-md">
              <option className="">Samaru Campus</option>
              <option>Kongo Campus</option>
            </select>
          </div>
          {/* To */}
          <div className="flex flex-row ">
            <label htmlFor="from" className="w-65">
              To:{" "}
            </label>
            <select className="col-span-3 rounded-md  text-gray-100 bg-primary px-3 py-2 text-sm focus:border-transparent focus:outline-none shadow-md">
              <option className="bg-secondary">Samaru Campus</option>
              <option>Kongo Campus</option>
            </select>
          </div>
          {/* Your Phone Number */}
          <div className="flex flex-row ">
            {" "}
            <label className="text-md w-65 ">Your Phone Number: </label>
            <input
              type="tel"
              className="col-span-7 rounded-md border-2 border-gray-300 bg-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
              value={user.phone_number}
            />
          </div>
          {/* Recipient's Phone Number */}
          <div className="flex flex-row relative ">
            <label className="text-md w-65 ">Recipient's Phone Number: </label>
            <input
              type="tel"
              className="col-span-7  rounded-md border-2 border-gray-300 bg-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
              value={recNum}
              onChange={(e) => setRecNum(e.target.value)}
            />
            <p class="absolute top-9 right-19 py-2 text-xs  text-green-400">
              Great! Your phone number is valid.
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-row ">
            <label className="w-65">Description: </label>
            <input
              type="text"
              name="description"
              placeholder="Write a short of description of the package"
              className="col-span-7 rounded-md border-2 border-gray-300 bg-gray-300 px-3 py-2 w-60 pb-10 text-sm focus:border-orange-500 focus:outline-none"
            />
          </div>
          {/* Price */}
          <div className="flex mt-4 justify-end">
            <div className="inline-block px-6 py-4 rounded-lg bg-primary text-gray-100 shadow-md">
              <span className="block text-sm uppercase tracking-wide opacity-80">
                Total Price
              </span>
              <span className="block text-2xl font-bold">
                ₦{price.toLocaleString()}
              </span>
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
            <button
              ref={lastFieldRef}
              onClick={() => setModalOpen(true)}
              className="px-4 py-2  text-gray-700 rounded-md hover:bg-primary hover:text-gray-100  hover:shadow-xl"
            >
              Confirm Delivery
            </button>
            <DeliveryDetailsModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              details={deliveryDetails}
              recName={recName}
              recNum={recNum}
              weight={weight}
              phone={user.phone_number}
              price={price}
            />
          </div>
        </form>
        {/* Error Message Box */}
        <div className="mt-4 rounded-lg bg-gray-700 backdrop-blur-xl p-4 flex items-start gap-3 shadow-md">
          <div className="flex-shrink-0 text-red-400 text-xl">⚠️</div>
          <div>
            <p className="text-sm font-semibold text-gray-100">Error</p>
            <p className="text-sm text-gray-200">
              Something went wrong. Please check your input and try again.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
