import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux"; // connect is a HOC (higher order component) that lets us moddify our component to have access to things related with redux, included the store
// HOC are functions that takes components as arguments and then returns you a new modified component
import { createStructuredSelector } from "reselect";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {
  selectCartHidden,
  selectCartItems
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.action";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionDivContainer,
  OptionLinkContainer
} from "./header.styles";
// import "./header.styles.scss";
// this is a special syntax in React for importing SVG.
// The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG
const Header = ({ currentUser, hidden, signOutStart, cartItems }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLinkContainer to="/shop">SHOP</OptionLinkContainer>
      <OptionLinkContainer to="/contact">CONTACT</OptionLinkContainer>
      {currentUser ? (
        //Instead of creating a second styled component with the same style properties than the OptionLinkContainer we could reuse it if the only difference is the element to return using the as= property | as="when it is an html element" as={when it is a component}
        //<OptionLinkContainer as="div" onClick={() => auth.signOut()}>
        //  SIGN OUT
        //</OptionLinkContainer>
        <OptionDivContainer
          as="div"
          onClick={() => signOutStart(cartItems, currentUser)}
        >
          {/* auth.signOut uses the communication channel opened between the app and firebase and sends a null user to the app when the user signs out */}
          SIGN OUT
        </OptionDivContainer>
      ) : (
        <OptionLinkContainer to="/signin">SIGN IN</OptionLinkContainer>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
// this is a way to deconstruct nested values, from state we deconstruct user and cart and from user we want currentUser and from cart we want hidden
// the state is the store (the root reducer) then we have the key of the reducer where the property we want its in, and then the property we want to get the value
//   currentUser,
//   hidden
// });
// we use user selectors here create with reselect instead the default selectors

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
  cartItems: selectCartItems
});

// this is the same as
// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state)
// });
// createStructuredSelector() will automaticaly pass the top level state we get from mapStateToProps to the selectors

const mapDispatchToProps = dispatch => ({
  signOutStart: (cartItems, currentUser) =>
    dispatch(signOutStart(cartItems, currentUser))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header); // this is currying, we pass two function,
// the first argument of the first function is going to be the function that allows us to access the state, the root reducer, then the second parameter is
// the second one is the one that give us access to the actions we want to use to trigger updates on the store
// the second function we pass is the component we want to be modified in order to have access to the store and actions that are passed as arguments of the first function
