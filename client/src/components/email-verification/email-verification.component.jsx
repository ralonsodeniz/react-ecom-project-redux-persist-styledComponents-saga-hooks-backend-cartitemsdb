import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { sendVerificationEmail } from "../../redux/user/user.action";

import {
  EmailVerificationContainer,
  TitleContainer
} from "./email-verification.styles";

const EmailVerification = ({ sendVerificationEmail }) => {
  const [userCredentials, setuserCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault(); // this prevents the default submit action from firing because we want full control over exactly what this submit is going to do
    sendVerificationEmail(userCredentials);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setuserCredentials({ ...userCredentials, [name]: value }); // when we use the function we get from useState to change the value of a property of an object we do like we do in the reducer, we spread the object and then give the property we want to change the new value
    // remember that to select an Object property using the value of a variable we need to wrap the variable in brackets []
  };

  return (
    <EmailVerificationContainer>
      <TitleContainer>I need a new verification email</TitleContainer>
      <span>Enter your email and password</span>
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
        <FormInput
          type="password"
          id="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <CustomButton type="submit">send new email verification</CustomButton>
      </form>
    </EmailVerificationContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  sendVerificationEmail: userCredentials =>
    dispatch(sendVerificationEmail(userCredentials))
});

export default connect(
  null,
  mapDispatchToProps
)(EmailVerification);
