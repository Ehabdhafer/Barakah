import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
// import "../style.css";
// import "./styles.css";
// import CheckoutForm from "./CheckoutForm";

function Subscription() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);
  const stripePromise = loadStripe(
    "pk_test_51OH1jjKdeTW7uN6XdWLz1HMGbggmRxrOvqkogqMDrVukyXfSBUvE4OzWTVYbnxVIR6vpzY8XFL5P7S1goyLFxxbf00KawmfaSB"
  );

  return (
    <div className="">
      <div className="product ">
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
