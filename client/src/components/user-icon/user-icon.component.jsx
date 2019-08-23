import React, { useContext } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleAccountHidden } from "../../redux/account/account.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectAccountHidden } from "../../redux/account/account.selectors";
import AccountDropdown from "../account-dropdown/account-dropdown.component";
import OnClickOutside from "../onclick-outside/onclick-outside.component";
import { DeviceTypeContext } from "../../providers/device-type/device-type.provider";

import { UserIconContainer, UserLogoContainer } from "./user-icon.styles";

const UserIcon = ({
  toggleAccountHidden,
  hidden,
  toggleCartHidden,
  accountHidden
}) => {
  const { isMobile } = useContext(DeviceTypeContext);

  const toggleAccountHiddenDesktop = () => {
    if (isMobile) return undefined;
    toggleAccountHidden();
  };

  const toggleAccountHiddenMobile = () => {
    if (!isMobile) return undefined;
    toggleAccountHidden();
  };

  return (
    <OnClickOutside
      action={!accountHidden ? toggleAccountHidden : undefined}
      enabled={isMobile}
    >
      <UserIconContainer
        onClick={toggleAccountHiddenMobile}
        onMouseEnter={toggleAccountHiddenDesktop}
        onMouseLeave={toggleAccountHiddenDesktop}
      >
        <UserLogoContainer />
        {accountHidden ? null : <AccountDropdown />}
      </UserIconContainer>
    </OnClickOutside>
  );
};

const mapStateToProps = createStructuredSelector({
  accountHidden: selectAccountHidden,
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
