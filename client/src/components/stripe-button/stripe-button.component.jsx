import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; // axios is a library to make fetchs in a more potent way
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCurrentUserEmail,
  selectCurrentUser,
  selectCurrentUserAddreses
} from "../../redux/user/user.selectors";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { storeOrderStart } from "../../redux/user/user.action";
import { clearCart } from "../../redux/cart/cart.actions";
import { openModal } from "../../redux/account/account.actions.js";
import { AnonDataContext } from "../../providers/anon-data/anon-data.provider";
import StripeCheckout from "react-stripe-checkout";

import { StripeButtonContainer, OptionText } from "./stripe-button.styles";

const StripeCheckoutButton = ({
  price,
  currentUser,
  currentUserEmail,
  cartItems,
  storeOrderStart,
  clearCart,
  currentUserAddresses,
  openModal
}) => {
  const [selectBilling, setSelectBilling] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    addressName: "",
    city: "",
    country: "",
    postcode: "",
    street: ""
  });
  const { anonData, clearAnonData } = useContext(AnonDataContext);

  useEffect(() => {
    if (billingAddress.addressName !== "") {
      storeOrderStart(cartItems, price, billingAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingAddress]);

  // stripe need the value of the articles in cents
  const priceForStripe = price * 100;
  // this is the public key we get from stripe dev dashboard
  const publishableKey = process.env.REACT_APP_PUBLISHABLE_KEY;

  const handleBilling = () => {
    //a good rule of thumb may be: Always use a function in useState's update function if your state update depends on your previous state.
    setSelectBilling(state => !state);
  };

  // axios is a function that receive an object that has all of the actual properties that we want to pass in order for axios to know what kind of request we're trying to make and what it will give us back as a promise
  const onToken = (token, addresses) => {
    axios({
      url: "payment", // axios will use whatever url we are at and append /payment at the end and make the request to it
      method: "post",
      data: {
        // the body we want to pass to the backend that corresponds to what we get from body in the backend in the /payment endpoint
        amount: priceForStripe,
        token: token,
        product: cartItems,
        stripeEmail: token.email,
        stripeToken: token.id,
        stripeTokenType: token.type,
        stripeBillingName:
          addresses.billing_name || currentUser
            ? currentUserAddresses[0].addressName
            : anonData.name,
        stripeBillingAddressLine1:
          addresses.billing_address_line1 || currentUser
            ? currentUserAddresses[0].street
            : anonData.street,
        stripeBillingAddressZip:
          addresses.billing_address_zip || currentUser
            ? currentUserAddresses[0].postcode
            : anonData.postcode,
        stripeBillingAddressState: addresses.billing_address_state || "",
        stripeBillingAddressCity:
          addresses.billing_address_city || currentUser
            ? currentUserAddresses[0].city
            : anonData.city,
        stripeBillingAddressCountry:
          addresses.billing_address_country || currentUser
            ? currentUserAddresses[0].country
            : anonData.country,
        stripeBillingAddressCountryCode:
          addresses.billing_address_country_code || "",
        stripeShippingName:
          addresses.shipping_name || currentUser
            ? currentUserAddresses[0].addressName
            : anonData.name,
        stripeShippingAddressLine1:
          addresses.shipping_address_line1 || currentUser
            ? currentUserAddresses[0].street
            : anonData.street,
        stripeShippingAddressZip:
          addresses.shipping_address_zip || currentUser
            ? currentUserAddresses[0].postcode
            : anonData.postcode,
        stripeShippingAddressState: addresses.shipping_address_state || "",
        stripeShippingAddressCity:
          addresses.shipping_address_city || currentUser
            ? currentUserAddresses[0].city
            : anonData.city,
        stripeShippingAddressCountry:
          addresses.shipping_address_country || currentUser
            ? currentUserAddresses[0].country
            : anonData.country,
        stripeShippingAddressCountryCode:
          addresses.shipping_address_country_code || ""
      }
    })
      .then(response => {
        if (currentUser) {
          if (selectBilling) {
            setBillingAddress({
              addressName: addresses.billing_name,
              city: addresses.billing_address_city,
              country: addresses.billing_address_country,
              postcode: addresses.billing_address_zip,
              street: addresses.billing_address_line1
            });
          } else {
            setBillingAddress({ ...currentUserAddresses[0] });
          }
        } else {
          clearAnonData();
        }
        clearCart();
        setBillingAddress({
          addressName: "",
          city: "",
          country: "",
          postcode: "",
          street: ""
        });
        openModal("Payment successful, your order has been placed");
      })
      .catch(error => {
        // REMOVE THIS FOR PRODUCTION
        if (process.env.NODE_ENV === "development") {
          if (currentUser) {
            if (selectBilling) {
              setBillingAddress({
                addressName: addresses.billing_name,
                city: addresses.billing_address_city,
                country: addresses.billing_address_country,
                postcode: addresses.billing_address_zip,
                street: addresses.billing_address_line1
              });
            } else {
              setBillingAddress({ ...currentUserAddresses[0] });
            }
          } else {
            clearAnonData();
          }
          clearCart();
          setBillingAddress({
            addressName: "",
            city: "",
            country: "",
            postcode: "",
            street: ""
          });
        }
        console.log("Payment Error: ", error);
        openModal(
          "There was an issue with your payment! order has not been placed"
        );
      });
  };

  return (
    console.log(anonData),
    (
      <StripeButtonContainer>
        <OptionText onClick={handleBilling}>
          Different billing address{" "}
          {selectBilling ? <span>&#9745;</span> : <span>&#9744;</span>}
        </OptionText>
        <StripeCheckout
          currency="EUR"
          label="Pay with 💳"
          name="CRWN Clothing Ltd."
          image="https://svgshare.com/i/CUz.svg"
          description={`Your total is ${price}€`}
          amount={priceForStripe}
          panelLabel="Pay Now"
          token={onToken}
          stripeKey={publishableKey}
          email={
            currentUser
              ? currentUserEmail
              : anonData.email !== ""
              ? anonData.email
              : undefined
          }
          disabled={
            cartItems.length < 1 ||
            (anonData.name === "" && currentUserAddresses.length === 0)
          }
          billingAddress={selectBilling}
        />
      </StripeButtonContainer>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentUserEmail: selectCurrentUserEmail,
  currentUserAddresses: selectCurrentUserAddreses,
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  storeOrderStart: (cartItems, price, billingAddress) =>
    dispatch(storeOrderStart(cartItems, price, billingAddress)),
  clearCart: () => dispatch(clearCart()),
  openModal: text => dispatch(openModal(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StripeCheckoutButton);

// token is the onsuccess callback that triggers when we submit
// submission is triggered by this component and the token is the confirmation
// we add this further in the course since this needs the backend part of stripe
