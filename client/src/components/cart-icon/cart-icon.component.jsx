import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { toggleAccountHidden } from "../../redux/account/account.actions";
import {
  selectCartItemsCount,
  selectCartHidden
} from "../../redux/cart/cart.selectors"; // we import our selector
import { selectAccountHidden } from "../../redux/account/account.selectors";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { DeviceTypeContext } from "../../providers/device-type/device-type.provider";
import OnClickOutside from "../onclick-outside/onclick-outside.component";

import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCountContainer
} from "./cart-icon.styles";
// import "./cart-icon.styles.scss";

const CartIcon = (
  { toggleCartHidden, itemCount, toggleAccountHidden, accountHidden, hidden } // doing => () is the same than doing => {return()}
) => {
  const { isMobile } = useContext(DeviceTypeContext);

  // we need this because with the redux-persist we don't want to persist hidden value when we reload so we have filtered hidden from cart redux to be persisted
  // as a side effect of it when the persistor is load hidden is not set so we use the ueEffect to initialize the hidden value when the component is mounted
  // if we remove redux-persist we have to remove this useEffect
  useEffect(() => {
    toggleCartHidden();
  }, [toggleCartHidden]);

  // we create toggle functions for either desktop and mobile view, in mobile view we do not use the hover we use the click
  const toggleCartHiddenDesktop = () => {
    if (isMobile) return undefined;
    toggleCartHidden();
  };

  const toggleCartHiddenMobile = () => {
    if (!isMobile) return undefined;
    toggleCartHidden();
  };

  return (
    <OnClickOutside
      action={!hidden ? toggleCartHidden : undefined}
      enabled={isMobile}
    >
      <CartIconContainer
        onClick={toggleCartHiddenMobile}
        onMouseEnter={toggleCartHiddenDesktop}
        onMouseLeave={toggleCartHiddenDesktop}
      >
        <ShoppingIconContainer />
        <ItemCountContainer>{itemCount}</ItemCountContainer>
        {hidden || hidden === undefined ? null : <CartDropdown />}
      </CartIconContainer>
    </OnClickOutside>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  toggleAccountHidden: () => dispatch(toggleAccountHidden())
});

// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   itemCount: cartItems.reduce(
//     (accumulator, cartItem) => accumulator + cartItem.quantity,
//     0
//   )
// });
// we use the value of the state in the store to compute a value we need in the component
// this we have written here is called a selector because what we are doing here is writting some kind of code that gets a state as in the whole state object and then pulls out just a small portion or a slice of that state
// we are getting the cartItems from the cart reducer and then reducing it to compute a new value
// the thing is that everytime any reducer updates we return a new object, redux recompose the entire state object and mapStateToProps is called every single time
// because mapStateToProps is always being called everytime the store is update, even when the update does not concern to the properties we have selected, the reduce method is being computed everytime because reduce doesn't know that the cart items coming in might be the exact same
// this is a performance problem because if the code we are executing inside the reduce is very demanding when are consuming a lot of time and resources everytime the store is updated
// this derivates into another problem, re-rendering components when it is not needed
// because of the way that connect() works, connect itself will actually do a shallow comparison of incoming state to see if anything changed. If we triger sign in, which is a change on the user reducer, our cart reducer actually doesn't change based on that shallow comparison. When we'll be able to see it is actually when we have multiple properties on the same reducer, and we start changing the props on that same reducer object
// other components relying on those non-changing props don't need to re-render because they aren't changing, but since the reducer returns a whole new Object, the shallow comparison cannot detect that and every component that uses the the cart reducer will re-render, causing another performance issue
// to avoid this we use a library called reselect that allows us to memoize the returning values for the same inputs
// reselec allows us to write the selectors in such a way so that it knows if that the property that is pulling from the state and using are the same in the sense that the value has no change and the output of the selector has not change it want pass the new object to the component, it will pass the old value and the component wont be rerendered without need
// because we might want to reuse our selectors we will change the folder structure and add a new file in the cart folder inside redux and add a file for the selectors
// instead of the old code we are now going to use the memoized selectors to pass the map the state to props only when the state that affect us changes

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  accountHidden: selectAccountHidden,
  hidden: selectCartHidden
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
// the first argument of the first function of connect() mapStateToProps is required, in case we are not going to use it but we need to use connect to use mapDispatchToProps so we can access some actions we have to set to null the first parameter
