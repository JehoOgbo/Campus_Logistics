import React from "react";
import PaystackPop from "@paystack/inline-js";

function PayButton({ customerEmail, amount,to, from, weight,recName,recNum,recEmail,feature  }) {
   
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
