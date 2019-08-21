import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleAccountHidden } from "../../redux/account/account.actions";
// import { toggleCartHidden } from "../../redux/cart/cart.actions";
// import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectAccountHidden } from "../../redux/account/account.selectors";
import AccountDropdown from "../account-dropdown/account-dropdown.component";

import { UserIconContainer, UserLogoContainer } from "./user-icon.styles";

const UserIcon = ({
  toggleAccountHidden,
  // hidden,
  // toggleCartHidden,
  accountHidden
}) => (
  <UserIconContainer
    // onClick={() => {
    //   toggleAccountHidden();
    //   if (!hidden) {
    //     toggleCartHidden();
    //   }
    // }}
    onMouseEnter={toggleAccountHidden}
    onMouseLeave={toggleAccountHidden}
  >
    <UserLogoContainer />
    {accountHidden ? null : <AccountDropdown />}
  </UserIconContainer>
);

const mapStateToProps = createStructuredSelector({
  accountHidden: selectAccountHidden
  // hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  toggleAccountHidden: () => dispatch(toggleAccountHidden())
  // toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserIcon);
