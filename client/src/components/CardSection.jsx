import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "black",
      fontSize: "20px",
      fontFamily: "sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#B4B4B3",
      },
    },
    invalid: {
      color: "#CFD7DF",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

function CardSection() {
  return (
    <label>
      {/* Card details */}
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  );
}

export default CardSection;
