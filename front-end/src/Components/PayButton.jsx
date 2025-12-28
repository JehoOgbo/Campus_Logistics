import React from "react";
import PaystackPop from "@paystack/inline-js";

function PayButton({ customerEmail, amount,to, from, weight,recName,recNum,recEmail,feature  }) {
   const API_BASE_URL = "http://localhost:5050/api/v1/locations";
   const handleForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_BASE_URL, {
        weight,
        sender_id: user.id,
        t_location_id:to ,
        f_location_id:from,
        receiver_name:recName,
        receiver_phone:recNum,
        receiver_email:recEmail,
        item_type:feature,
        price:amount
        
      });
      if (response) navigate("/login");
    } catch (error) {
      if (error.response) setMessage(error.response.data.message);
    }
  };
  const payWithPaystack = () => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_f4ee31a6f56c0bc9980d2478cddf8ac076c25acf", // your test public key
      email: customerEmail,
      amount: amount * 100, // amount in kobo (₦5000)
      currency: "NGN",
      onSuccess: (transaction) => {
        console.log("Payment successful:", transaction);
      },
      onCancel: () => {
        console.log("Payment cancelled");
      },
    });
  };

  return <button onClick={payWithPaystack}>Pay Now</button>;
}

export default PayButton;
