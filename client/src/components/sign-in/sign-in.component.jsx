import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  googleSignInStart,
  emailSignInStart
} from "../../redux/user/user.action"; // we need the new googleSignInStart and emailSignInStart actions to trigger the sagas
import { selectCartItems } from "../../redux/cart/cart.selectors";

import {
  SignInContainer,
  TitleContainer,
  ButtonsContainer
} from "./sign-in.styles";
// import "./sign-in.styles.scss";

// <- WE ADDING HOOKS TO REMOVE CLASS COMPONENTS ->
const SignIn = ({ emailSignInStart, googleSignInStart, cartItems }) => {
  const [userCredentials, setuserCredentials] = useState({
    email: "",
    password: ""
  }); // we need to create a userCredential object with email and password inside because we want to keep our indirect assign of value to the properties we do in handleChange()

  const { email, password } = userCredentials; // we destructure email and password from the userCredentials to pass them to emailSignInStart action and to use it inside the return

  const handleSubmit = async event => {
    // remember that in classes when we declare a method we dont need to use const but in functions we do
    event.preventDefault(); // this prevents the default submit action from firing because we want full control over exactly what this submit is going to do

    emailSignInStart(email, password, cartItems);

    // <- WE ARE REMOVING THIS CODE IN ORDER TO HANDLE THE SIGN IN WITH EMAIL AND PASSWORD WITH SAGAS
    // try {
    //   await auth.signInWithEmailAndPassword(email, password); // this auth method verifies if the email and password are in the auth system in firebase
    //   this.setState({ email: "", password: "" }); // if the auth succeed we clear the state for the next user to sign in
    // } catch (error) {
    //   console.log(error);
    // }
    // <- END OF OLD CODE ->
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setuserCredentials({ ...userCredentials, [name]: value }); // when we use the function we get from useState to change the value of a property of an object we do like we do in the reducer, we spread the object and then give the property we want to change the new value
    // remember that to select an Object property using the value of a variable we need to wrap the variable in brackets []
  };

  return (
    <SignInContainer>
      <TitleContainer>I already have an account</TitleContainer>
      <span>Sign in with your email and password</span>
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
        <ButtonsContainer>
          <CustomButton type="submit">sign in</CustomButton>
          {/* we create a new button to sign in using google auth */}
          <CustomButton
            // we need to specify the type of the custom button because if we do not do it, since it is inside a form it will submit the form for the email and password sign in even if we dont say it is type submit
            type="button"
            onClick={() => googleSignInStart(cartItems)}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  googleSignInStart: cartItems => dispatch(googleSignInStart(cartItems)),
  emailSignInStart: (email, password, cartItems) =>
    dispatch(emailSignInStart({ email, password }, cartItems)) // remember that the action takes an email and password that we dispatch as an object to the payload
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
