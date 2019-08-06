import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import {
  selectCurrentUser,
  selectIsCheckingUser
} from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.action";

import {
  OptionDivContainer,
  OptionLinkContainer,
  SpinnerContainer
} from "./signin-out-header.styles";

const SignInOrOutHeader = ({
  currentUser,
  isChecking,
  signOutStart,
  cartItems
}) =>
  isChecking ? (
    <SpinnerContainer />
  ) : currentUser ? (
    <OptionDivContainer
      as="div"
      onClick={() => signOutStart(cartItems, currentUser)}
    >
      SIGN OUT
    </OptionDivContainer>
  ) : (
    <OptionLinkContainer to="/signin">SIGN IN</OptionLinkContainer>
  );

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isChecking: selectIsCheckingUser,
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  signOutStart: (cartItems, currentUser) =>
    dispatch(signOutStart(cartItems, currentUser))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInOrOutHeader);
