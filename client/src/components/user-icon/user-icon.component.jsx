import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleAccountHidden } from "../../redux/account/account.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

import { UserIconContainer, UserLogoContainer } from "./user-icon.styles";

const UserIcon = ({ toggleAccountHidden, hidden, toggleCartHidden }) => (
  <UserIconContainer
    onClick={() => {
      toggleAccountHidden();
      if (!hidden) {
        toggleCartHidden();
      }
    }}
  >
    <UserLogoContainer />
  </UserIconContainer>
);

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  toggleAccountHidden: () => dispatch(toggleAccountHidden()),
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIcon);
