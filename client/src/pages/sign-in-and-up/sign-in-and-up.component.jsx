import React, { useState } from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import EmailVerification from "../../components/email-verification/email-verification.component";
import ResetPassword from "../../components/reset-password/reset-password.component";

import {
  SignInAndUpContainer,
  SigInContainer,
  OptionTextContainer,
  OptionText
} from "./sign-in-and-up.styles";
// import "./sign-in-and-up.styles.scss";

const SignInAndUpPage = () => {
  const [functionality, setFunctionality] = useState("signin");

  const handleClick = option => {
    setFunctionality(option);
  };

  return (
    <SignInAndUpContainer>
      {(() => {
        switch (functionality) {
          case "signin":
            return (
              <SigInContainer>
                <SignIn />
                <OptionTextContainer>
                  <OptionText onClick={() => handleClick("verification")}>
                    New verification email
                  </OptionText>
                  <OptionText onClick={() => handleClick("password")}>
                    Reset password
                  </OptionText>
                </OptionTextContainer>
              </SigInContainer>
            );
          case "verification":
            return (
              <SigInContainer>
                <EmailVerification />
                <OptionTextContainer>
                  <OptionText onClick={() => handleClick("signin")}>
                    Sign in
                  </OptionText>
                </OptionTextContainer>
              </SigInContainer>
            );
          case "password":
            return (
              <SigInContainer>
                <ResetPassword />
                <OptionTextContainer>
                  <OptionText onClick={() => handleClick("signin")}>
                    Sign in
                  </OptionText>
                </OptionTextContainer>
              </SigInContainer>
            );
          default:
            return null;
        }
      })()}
      <SignUp />
    </SignInAndUpContainer>
  );
};

export default SignInAndUpPage;
