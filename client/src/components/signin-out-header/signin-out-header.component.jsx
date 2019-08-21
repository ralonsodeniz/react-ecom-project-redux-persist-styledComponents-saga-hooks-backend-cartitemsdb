import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import {
  selectCurrentUser,
  selectIsCheckingUser
} from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.action";
import { toggleAccountHidden } from "../../redux/account/account.actions";

import { SpinnerContainer } from "./signin-out-header.styles";

const SignInOrOutHeader = ({
  currentUser,
  isChecking,
  signOutStart,
  cartItems,
  history,
  toggleAccountHidden
}) =>
  isChecking ? (
    <CustomButton>
      <SpinnerContainer />
    </CustomButton>
  ) : currentUser ? (
    <CustomButton
      onClick={() => {
        signOutStart(cartItems, currentUser);
        toggleAccountHidden();
      }}
    >
      SIGN OUT
    </CustomButton>
  ) : (
    <CustomButton
      onClick={() => {
        history.push("/signin");
        toggleAccountHidden();
      }}
    >
      SIGN IN
    </CustomButton>
  );

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isChecking: selectIsCheckingUser,
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  signOutStart: (cartItems, currentUser) =>
    dispatch(signOutStart(cartItems, currentUser)),
  toggleAccountHidden: () => dispatch(toggleAccountHidden())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignInOrOutHeader)
);
