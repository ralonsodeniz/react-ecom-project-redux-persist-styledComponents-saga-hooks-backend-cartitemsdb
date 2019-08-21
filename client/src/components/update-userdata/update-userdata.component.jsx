import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import {
  selectCurrentUserDisplayName,
  selectCurrentUserEmail
} from "../../redux/user/user.selectors";
import { updateUserDataStarts } from "../../redux/user/user.action";

import {
  UpdateUserDataContainer,
  UpdateUserDataTitleContainer,
  UpdateUsernameAndPasswordContainer
} from "./update-userdata.styles";

const UpdateUserdata = ({
  updateUserDataStarts,
  currentUserDisplayName,
  currentUserEmail
}) => {
  const [userCredentials, setuserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmitData = event => {
    event.preventDefault();
    updateUserDataStarts({ displayName, email });
    setuserCredentials({
      ...userCredentials,
      displayName: "",
      email: ""
    });
  };

  const handleSubmitPassword = event => {
    event.preventDefault();
    if (password === confirmPassword) {
      setuserCredentials({
        ...userCredentials,
        password: "",
        confirmPassword: ""
      });
      alert("yet to be implemented");
    } else {
      alert("passwords do not match");
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
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder={currentUserEmail}
            required
          />
          <CustomButton type="submit">Update data</CustomButton>
        </form>
      </UpdateUsernameAndPasswordContainer>
      <form onSubmit={handleSubmitPassword}>
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">Update password</CustomButton>
      </form>
    </UpdateUserDataContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserDisplayName: selectCurrentUserDisplayName,
  currentUserEmail: selectCurrentUserEmail
});

const mapDispatchToProps = dispatch => ({
  updateUserDataStarts: userCredentials =>
    dispatch(updateUserDataStarts(userCredentials))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserdata);
