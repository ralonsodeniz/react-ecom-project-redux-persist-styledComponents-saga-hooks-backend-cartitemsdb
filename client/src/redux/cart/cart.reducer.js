import { CartActionTypes } from "./cart.types";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
  clearAllItemsFromcart
} from "./cart.utils";

const INITIAL_STATE = {
  hidden: false, // we set to false as default since we need to make a toggleCartHidden to initialize cartHidden in the redux because of redux persist, if we remove the persist we have to set this to false
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden // this will return the opposite of hiddens current state
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload) // we use the function declared in cart.utils.js to update the cartItem store property with the new item or the new quantity of the alredy existing item
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: clearItemFromCart(state.cartItems, action.payload)
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: clearAllItemsFromcart()
      };
    case CartActionTypes.UPDATE_CART:
      return {
        ...state,
        cartItems: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
