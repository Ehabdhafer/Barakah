import React from "react";
import axios from "axios";
import {
  ElementsConsumer,
  CardElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useCookies } from "react-cookie";
import CardSection from "./CardSection";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51OH1jjKdeTW7uN6XdWLz1HMGbggmRxrOvqkogqMDrVukyXfSBUvE4OzWTVYbnxVIR6vpzY8XFL5P7S1goyLFxxbf00KawmfaSB"
);

const CheckoutForm = (props) => {
  const [cookies] = useCookies(["token"]);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
      const token = cookies.token;

      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(
          "http://localhost:5000/subscribtion",
          {
            token: result.token.id,
          }
        );
        const sessionId = response.data.id;

        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        console.log("Response from backend:", response.data);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <div className="flex  mt-20 justify-center ">
      <div className="w-[100rem ]">
        <h1 className="text-center font-bold text-blue md:text-2xl mb-14">
          Subscribe with us now
        </h1>
        <div className="border-2 border-blue shadow-lg rounded-lg mb-40 p-5 px-10 h-180 w-[50rem] ">
          <h2 className="text-center font-semibold text-blue md:text-lg mb-4">
            Turn Your Surplus Food into Opportunities!
          </h2>
          <p className="text-center text-blue mb-4 font-medium">
            Join our community to sell your surplus food by posting a priced
            post on our website. <br />
            For just 25 JOD a month, you can subscribe now and ensure no food
            goes to waste.
          </p>
          <form onSubmit={handleSubmit}>
            <CardSection />
            <div className="flex justify-center mt-7">
              <button disabled={!props.stripe} className="btn-pay">
                Subscribe Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
};

export default InjectedCheckoutForm;
