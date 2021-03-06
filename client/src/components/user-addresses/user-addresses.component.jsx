import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  addNewAddressStart,
  removeAddressStart,
  updateDefaultAddressStart
} from "../../redux/user/user.action";
import {
  selectCurrentUserAddreses,
  selectCurrentUser
} from "../../redux/user/user.selectors";

import {
  UserAddressesContainer,
  SavedAddressesContainer,
  NewDAddressContainer,
  AddressContainer,
  AddressTitle,
  AddressContent,
  RemoveButtonContainer,
  DefaultAddressLabel,
  MakeDefaultAddressButton
} from "./user-addresses.styles";

const UserAddresses = ({
  addNewAddressStart,
  currentUserAddresses,
  removeAddressStart,
  updateDefaultAddressStart,
  currentUser
}) => {
  const [newAddress, setNewAddress] = useState({
    addressName: "",
    street: "",
    postcode: "",
    city: "",
    country: ""
  });

  const { addressName, street, postcode, city, country } = newAddress;

  const handleChange = event => {
    const { name, value } = event.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    addNewAddressStart(newAddress);
    setNewAddress({
      addressName: "",
      street: "",
      postcode: "",
      city: "",
      country: ""
    });
  };

  return (
    <UserAddressesContainer>
      <h2>User addresses</h2>
      <NewDAddressContainer>
        <h3>Add new address</h3>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="addressName"
            value={addressName}
            onChange={handleChange}
            label="Address name"
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
      <SavedAddressesContainer>
        <h3>Saved addresses</h3>
        {currentUser.addresses.length > 0 // we have needed to use currentUser since the memoization from currentUserAddress was not being able to see the change on the value and this way we force the rerender to get the new address list
          ? currentUserAddresses.map((address, addressIndex) => (
              <AddressContainer key={addressIndex}>
                <AddressTitle>
                  {address.addressName}
                  <RemoveButtonContainer
                    onClick={() => removeAddressStart(address)}
                  >
                    &#10005;
                  </RemoveButtonContainer>
                </AddressTitle>
                {addressIndex === 0 ? (
                  <DefaultAddressLabel>default</DefaultAddressLabel>
                ) : (
                  <MakeDefaultAddressButton
                    inverted
                    onClick={() => updateDefaultAddressStart(addressIndex)}
                  >
                    make default
                  </MakeDefaultAddressButton>
                )}
                <AddressContent>
                  {address.street} - {address.postcode}
                </AddressContent>
                <AddressContent>
                  {address.city} - {address.country}
                </AddressContent>
              </AddressContainer>
            ))
          : "No saved addresses"}
      </SavedAddressesContainer>
    </UserAddressesContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserAddresses: selectCurrentUserAddreses, // change to addresses: selectCurrentUserAddresses after adding withSpinner HOC
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  addNewAddressStart: address => dispatch(addNewAddressStart(address)),
  removeAddressStart: address => dispatch(removeAddressStart(address)),
  updateDefaultAddressStart: addressIndex =>
    dispatch(updateDefaultAddressStart(addressIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAddresses);
