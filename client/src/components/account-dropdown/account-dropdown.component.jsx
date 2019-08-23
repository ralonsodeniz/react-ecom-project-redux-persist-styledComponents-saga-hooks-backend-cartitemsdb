import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleAccountHidden } from "../../redux/account/account.actions";

import SignInSignOut from "../signin-out-header/signin-out-header.component";
import CustomButton from "../custom-button/custom-button.component";
import { ReactComponent as UserIcon } from "../../assets/user.svg";

import {
  AccountDropdownContainer,
  AccountDropdownButtonsContainer,
  ImageContainer,
  ImageContainerBorder,
  AvatarContainer,
  TitleContainer
} from "./account-dropdown.styles";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const AccountDropdown = ({
  history,
  toggleAccountHidden,
  currentUser,
  alt
}) => {
  const handleAccountClick = useCallback(() => {
    if (currentUser) {
      history.push("/account");
    } else {
      history.push("/signin");
    }
    // toggleAccountHidden();
  }, [currentUser, history]);

  return (
    <AccountDropdownContainer>
      {currentUser ? (
        currentUser.avatarUrl ? (
          <ImageContainerBorder>
            <ImageContainer src={currentUser.avatarUrl} alt={alt} />
          </ImageContainerBorder>
        ) : (
          <AvatarContainer>
            <UserIcon />
          </AvatarContainer>
        )
      ) : (
        <AvatarContainer>
          <UserIcon />
        </AvatarContainer>
      )}
      {currentUser ? (
        <TitleContainer>{currentUser.displayName}</TitleContainer>
      ) : (
        <TitleContainer>Please Sign In</TitleContainer>
      )}
      <AccountDropdownButtonsContainer>
        <CustomButton onClick={handleAccountClick}>ACCOUNT</CustomButton>
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
  )(React.memo(AccountDropdown))
);
