import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleAccountHidden } from "../../redux/account/account.actions";

import SignInSignOut from "../signin-out-header/signin-out-header.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  AccountDropdownContainer,
  AccountDropdownButtonsContainer
} from "./account-dropdown.styles";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const AccountDropdown = ({ history, toggleAccountHidden, currentUser }) => {
  return (
    <AccountDropdownContainer>
      <AccountDropdownButtonsContainer>
        <CustomButton
          onClick={() => {
            if (currentUser) {
              history.push("/account");
            } else {
              history.push("/signin");
            }
            toggleAccountHidden();
          }}
        >
          ACCOUNT
        </CustomButton>
        <SignInSignOut />
      </AccountDropdownButtonsContainer>
    </AccountDropdownContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  toggleAccountHidden: () => dispatch(toggleAccountHidden())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountDropdown)
);
