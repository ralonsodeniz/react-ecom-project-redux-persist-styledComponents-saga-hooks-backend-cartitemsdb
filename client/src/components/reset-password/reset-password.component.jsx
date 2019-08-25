import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { resetUserPassword } from "../../redux/user/user.action";

import {
  ResetPasswordContainer,
  TitleContainer
} from "./reset-password.styles";

const ResetPassword = ({ resetUserPassword }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async event => {
    event.preventDefault(); // this prevents the default submit action from firing because we want full control over exactly what this submit is going to do
    resetUserPassword(email);
  };

  const handleChange = event => {
    setEmail(event.target.value);
  };

  return (
    <ResetPasswordContainer>
      <TitleContainer>I need to reset my password</TitleContainer>
      <span>Enter your account's email</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          id="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <CustomButton type="submit">reset password</CustomButton>
      </form>
    </ResetPasswordContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  resetUserPassword: email => dispatch(resetUserPassword(email))
});

export default connect(
  null,
  mapDispatchToProps
)(ResetPassword);
