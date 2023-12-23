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
    // <div className="grid grid-cols-2 mx-4 md:mx-20 gap-5 md:gap-40 mt-20 ">
    //   {/* <div className="product-info">
    //     <h3 className="product-title">Apple MacBook Pro</h3>
    //     <h4 className="product-price">$999</h4>
    //   </div> */}
    //   <form onSubmit={handleSubmit}>
    //     {/* <PaymentElement /> */}
    //     <CardSection />
    //     <button disabled={!props.stripe} className="btn-pay">
    //       Subscribe
    //     </button>
    //   </form>
    // </div>

    <div className="flex  mt-20 justify-center">
      <div className="w-[100rem ]">
        <h1 className="text-center font-bold   text-gray-600 md:text-2xl mb-2">
          Checkout
        </h1>
        <div className="border-2 border-gray-300 shadow-md shadow-gray-300 rounded-lg mb-80 p-5 px-10 h-80 w-[50rem] ">
          {/* <div className="mt-4 p-4">
            <div className="">
              <div className="my-3">
                <input
                  type="text"
                  className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                  placeholder="Card holder"
                  maxLength={22}
                  x-model="cardholder"
                />
              </div>
            </div>
          </div> */}

          <form onSubmit={handleSubmit}>
            <CardSection />
            <div className="flex justify-center mt-7">
              <button disabled={!props.stripe} className="btn-pay">
                Subscribe
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
