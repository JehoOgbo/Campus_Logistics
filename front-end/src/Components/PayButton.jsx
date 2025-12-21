import React from "react";
import PaystackPop from "@paystack/inline-js";

function PayButton({ customerEmail, amount }) {
  const payWithPaystack = () => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_live_ae86794af02a7a08d8560b22ace755795fcbb547", // your test public key
      email: "kingsani04@gmail.com",
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
