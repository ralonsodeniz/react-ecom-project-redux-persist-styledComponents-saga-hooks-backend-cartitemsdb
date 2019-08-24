import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { updateDefaultAddressStarts } from "../../redux/user/user.action";
import {
  selectCurrentUserAddreses,
  selectCurrentUser
} from "../../redux/user/user.selectors";
import { AnonDataContext } from "../../providers/anon-data/anon-data.provider";

import {
  UserAddressesContainer,
  SavedAddressesContainer,
  NewDAddressContainer,
  AddressContainer,
  AddressTitle,
  AddressContent,
  DefaultAddressLabel,
  MakeDefaultAddressButton,
  CurrentAddressesContainer,
  RemoveButtonContainer
} from "./user-addresses-checkout.styles";

const UserAddressesCheckout = ({
  currentUserAddresses,
  updateDefaultAddressStarts,
  currentUser
}) => {
  const [newData, setNewData] = useState({
    name: "",
    email: "",
    street: "",
    postcode: "",
    city: "",
    country: ""
  });

  const { name, email, street, postcode, city, country } = newData;

  const { assignNewAnonData, anonData, clearAnonData } = useContext(
    AnonDataContext
  );

  useEffect(() => {
    clearAnonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleChange = event => {
    const { name, value } = event.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    assignNewAnonData(newData);
    setNewData({
      name: "",
      email: "",
      street: "",
      postcode: "",
      city: "",
      country: ""
    });
  };

  return (
    <UserAddressesContainer>
      {currentUserAddresses.length > 0 ? (
        <SavedAddressesContainer>
          <h3>Choose order address</h3>
          <CurrentAddressesContainer>
            {currentUserAddresses.map((address, addressIndex) => (
              <AddressContainer key={addressIndex}>
                <AddressTitle>{address.addressName}</AddressTitle>
                {addressIndex === 0 ? (
                  <DefaultAddressLabel>order address</DefaultAddressLabel>
                ) : (
                  <MakeDefaultAddressButton
                    inverted
                    onClick={() => updateDefaultAddressStarts(addressIndex)}
                  >
                    select address
                  </MakeDefaultAddressButton>
                )}
                <AddressContent>
                  {address.street} - {address.postcode}
                </AddressContent>
                <AddressContent>
                  {address.city} - {address.country}
                </AddressContent>
              </AddressContainer>
            ))}
          </CurrentAddressesContainer>
        </SavedAddressesContainer>
      ) : anonData.name !== "" ? (
        <SavedAddressesContainer>
          <h3>Choose order address</h3>
          <CurrentAddressesContainer>
            <AddressContainer key={anonData.name}>
              <AddressTitle>
                {anonData.name}
                <RemoveButtonContainer onClick={() => clearAnonData()}>
                  &#10005;
                </RemoveButtonContainer>
              </AddressTitle>
              <DefaultAddressLabel>order address</DefaultAddressLabel>
              <AddressContent>
                {anonData.street} - {anonData.postcode}
              </AddressContent>
              <AddressContent>
                {anonData.city} - {anonData.country}
              </AddressContent>
            </AddressContainer>
          </CurrentAddressesContainer>
        </SavedAddressesContainer>
      ) : (
        <NewDAddressContainer>
          <h3>Add order address</h3>
          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              label="Name"
              required
            />
            <FormInput
              type="email"
              name="email"
              value={currentUser ? currentUser.email : email}
              onChange={handleChange}
              label="Email"
              required
            />

            <FormInput
              type="text"
              name="street"
              value={street}
              onChange={handleChange}
              label="Street"
              required
            />
            <FormInput
              type="number"
              name="postcode"
              value={postcode}
              onChange={handleChange}
              label="Postcode"
              required
            />
            <FormInput
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
              label="City"
              required
            />
            <FormInput
              type="text"
              name="country"
              value={country}
              onChange={handleChange}
              label="Country"
              required
            />
            <CustomButton type="submit">Add Address</CustomButton>
          </form>
        </NewDAddressContainer>
      )}
    </UserAddressesContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserAddresses: selectCurrentUserAddreses, // change to addresses: selectCurrentUserAddresses after adding withSpinner HOC
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  updateDefaultAddressStarts: addressIndex =>
    dispatch(updateDefaultAddressStarts(addressIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAddressesCheckout);
