import { createSelector } from "reselect"; // this is the function from reselect we are going to use to create the selector

// input selector (this one does not use createSelector) This is a function that gets the whole state and returns a slice of it, just one level deep
const selectCart = state => state.cart;
// output selector (this one uses createSelector)
export const selectCartItems = createSelector(
  [selectCart], // first argument is a collection (array) of selectors we want to use
  cart => cart.cartItems // the second would be a function that returns what we want to get out of this selector. As parameters we pass each output of the input selectors in the array in the order of those selectors are in the array
); // because we have used createSelector() to create this selector is now a memoized selector

export const selectCartItemsCount = createSelector(
  [selectCartItems], // the selector doesn't have to be always an input selector
  cartItems =>
    cartItems.reduce(
      (accumulator, cartItem) => accumulator + cartItem.quantity,
      0
    )
); // this returns the total quantity of the cartItems but using memoization

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulator, cartItem) =>
        accumulator + cartItem.price * cartItem.quantity,
      0
    )
);
