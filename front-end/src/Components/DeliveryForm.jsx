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
  const [stateob, setStateOb] = useState([]);
  const lastFieldRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function getLocation() {
      const res = await axios.get("http://localhost:5050/api/v1/locations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res) console.log(res.data);
    }
    getLocation();
  }, []);

  useEffect(() => {
    async function handleStates() {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/v1/states",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLocals(response.data);
      } catch (err) {
        console.error("Failed to fetch states:", err);
      }
    }
    handleStates();
  }, []);
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
            <div className="relative">
              {" "}
              <input
                type="number"
                min={1}
                required
                className=" pl-8 rounded-md border-2 border-gray-300 bg-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none "
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
              <div className="absolute inset-y-0  flex items-center ps-3 pointer-events-none">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 0 1 .75.75v.756a49.106 49.106 0 0 1 9.152 1 .75.75 0 0 1-.152 1.485h-1.918l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 18.75 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 0 1-.262 1.453h-8.37a.75.75 0 0 1-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 0 1-.375.84A6.723 6.723 0 0 1 5.25 18a6.723 6.723 0 0 1-3.181-.795.75.75 0 0 1-.375-.84L4.168 6.241H2.25a.75.75 0 0 1-.152-1.485 49.105 49.105 0 0 1 9.152-1V3a.75.75 0 0 1 .75-.75Zm4.878 13.543 1.872-7.662 1.872 7.662h-3.744Zm-9.756 0L5.25 8.131l-1.872 7.662h3.744Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* From */}
          <div className="flex flex-row ">
            <label htmlFor="from" className="block w-65">
              From:
            </label>

            <div className="relative ">
              <div className="absolute inset-y-0  flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="px-3 py-2.5 bg-gray-300 rounded  rounded-base ps-9 text-heading text-sm focus:ring-brand focus:border-brand block w-auto placeholder:text-body"
                placeholder="Search Campus name..."
                required
              />
            </div>
          </div>
          {/* To */}
          <div className="flex flex-row ">
            <label htmlFor="from" className="w-65">
              To:{" "}
            </label>
            <div className="relative ">
              <div className="absolute inset-y-0  flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="px-3 py-2.5 bg-gray-300 rounded  rounded-base ps-9 text-heading text-sm focus:ring-brand focus:border-brand block w-auto placeholder:text-body"
                placeholder="Search Campus name..."
                required
              />
            </div>
          </div>
          {/* Your Phone Number */}
          <div className="flex flex-row ">
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
            <div className="relative">
              <input
                type="tel"
                className="col-span-7 pl-8  rounded-md border-2 border-gray-300 bg-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                value={recNum}
                onChange={(e) => setRecNum(e.target.value)}
                placeholder="Recipient's Phone Number"
              />
              <div className="absolute inset-y-0  flex items-center ps-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
              </div>
            </div>

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
