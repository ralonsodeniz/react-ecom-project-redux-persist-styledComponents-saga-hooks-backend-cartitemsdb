import React from "react";
import axios from "axios"; // axios is a library to make fetchs in a more potent way

import StripeCheckout from "react-stripe-checkout";
const StripeCheckoutButton = ({ price }) => {
  // stripe need the value of the articles in cents
  const priceForStripe = price * 100;
  // this is the public key we get from stripe dev dashboard
  const publishableKey = process.env.REACT_APP_PUBLISHABLE_KEY;
  // axios is a function that receive an object that has all of the actual properties that we want to pass in order for axios to know what kind of request we're trying to make and what it will give us back as a promise
  const onToken = token => {
    axios({
      url: "payment", // axios will use whatever url we are at and append /payment at the end and make the request to it
      method: "post",
      data: {
        // the body we want to pass to the backend that corresponds to what we get from body in the backend in the /payment endpoint
        amount: priceForStripe,
        token: token
      }
    })
      .then(response => {
        alert("succesful payment");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert(
          "There was an issue with your payment! Please make sure you use the provided credit card."
        );
      });
  };
  return (
    <StripeCheckout
      currency="EUR"
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}€`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
export default StripeCheckoutButton;

// token is the onsuccess callback that triggers when we submit
// submission is triggered by this component and the token is the confirmation
// we add this further in the course since this needs the backend part of stripe
