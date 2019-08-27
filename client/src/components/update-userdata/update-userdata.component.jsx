import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import {
  selectCurrentUserDisplayName,
  selectCurrentUserEmail,
  selectCurrentUserSignUpEmailAndPass,
  selectCurrentUser
} from "../../redux/user/user.selectors";
import { selectCartItems } from "../../redux/cart/cart.selectors.js";
import {
  updateUserDataStarts,
  updatePassword,
  deleteUser
} from "../../redux/user/user.action";

import { openModal } from "../../redux/account/account.actions";

import {
  UpdateUserDataContainer,
  UpdateUserDataTitleContainer,
  UpdateUsernameAndPasswordContainer,
  DeleteUserContainer
} from "./update-userdata.styles";

const UpdateUserdata = ({
  updateUserDataStarts,
  currentUserDisplayName,
  currentUserEmail,
  currentUserSignUpEmailAndPAss,
  updatePassword,
  deleteUser,
  currentUser,
  cartItems,
  openModal
}) => {
  const [userCredentials, setuserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: ""
  });

  const {
    displayName,
    email,
    password,
    newPassword,
    confirmPassword
  } = userCredentials;

  const handleSubmitData = event => {
    event.preventDefault();
    if (displayName === "" && email === "")
      return openModal("You are trying to update nothing");
    updateUserDataStarts({
      displayName,
      email,
      password,
      currentUser,
      cartItems
    });
    setuserCredentials({
      ...userCredentials,
      displayName: "",
      email: "",
      password: ""
    });
  };

  const handleDeleteUser = event => {
    event.preventDefault();
    deleteUser({ password, currentUserSignUpEmailAndPAss });
  };

  const handleSubmitPassword = event => {
    event.preventDefault();
    if (newPassword === confirmPassword) {
      updatePassword({ newPassword, password });
      setuserCredentials({
        ...userCredentials,
        password: "",
        newPassword: "",
        confirmPassword: ""
      });
    } else {
      openModal("Passwords do not match");
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setuserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <UpdateUserDataContainer>
      <UpdateUserDataTitleContainer>
        User information
      </UpdateUserDataTitleContainer>
      <DeleteUserContainer>
        <h3>Delete user</h3>
        <form onSubmit={handleDeleteUser}>
          {currentUserSignUpEmailAndPAss ? (
            <FormInput
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              label="Current Password"
              required
              disabled={!currentUserSignUpEmailAndPAss}
            />
          ) : null}
          <CustomButton type="submit">delete user</CustomButton>
        </form>
      </DeleteUserContainer>
      {currentUserSignUpEmailAndPAss ? (
        <UpdateUsernameAndPasswordContainer>
          <h3>Update user information</h3>
          <form onSubmit={handleSubmitData}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              onChange={handleChange}
              label="Display Name"
              placeholder={currentUserDisplayName}
              disabled={!currentUserSignUpEmailAndPAss}
            />
            <FormInput
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              label="Email"
              placeholder={currentUserEmail}
              disabled={!currentUserSignUpEmailAndPAss}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              label="Current Password"
              required
              disabled={!currentUserSignUpEmailAndPAss}
            />
            <CustomButton
              type="submit"
              disabled={!currentUserSignUpEmailAndPAss}
            >
              Update data{" "}
            </CustomButton>
          </form>
          <form onSubmit={handleSubmitPassword}>
            <FormInput
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              label="New Password"
              required
              disabled={!currentUserSignUpEmailAndPAss}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              label="Confirm Password"
              required
              disabled={!currentUserSignUpEmailAndPAss}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              label="Current Password"
              required
              disabled={!currentUserSignUpEmailAndPAss}
            />
            <CustomButton
              type="submit"
              disabled={!currentUserSignUpEmailAndPAss}
            >
              Update password
            </CustomButton>
          </form>
        </UpdateUsernameAndPasswordContainer>
      ) : null}
    </UpdateUserDataContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserDisplayName: selectCurrentUserDisplayName,
  currentUserEmail: selectCurrentUserEmail,
  currentUserSignUpEmailAndPAss: selectCurrentUserSignUpEmailAndPass,
  currentUser: selectCurrentUser,
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  updateUserDataStarts: userCredentials =>
    dispatch(updateUserDataStarts(userCredentials)),
  updatePassword: passwordCredentials =>
    dispatch(updatePassword(passwordCredentials)),
  deleteUser: deleteCredentials => dispatch(deleteUser(deleteCredentials)),
  openModal: text => dispatch(openModal(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserdata);
