import { auth, storeCartItems } from "../../firebase/firebase.utils";
// Utility functions allow us to keep our files clean and organize functions that we may need in multiple files in one location
export const addItemToCart = (cartItems, cartItemToAdd) => {
  // we are gonna look into the cartItems we have if the item we want to add already exists. If so, we will increase the item count instead of adding a new item object to the array
  let newCartItems = [];
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  ); // .find() will return the first item found in our array based in the condition we pass inside find. If it is not found it returns undefined
  if (existingCartItem) {
    // if the item to add already exists in the cartItems array we proceed to find it and to update the quantity
    newCartItems = cartItems.map(
      // map returns a new array, we need to return a new array in the reducer in order to trigger the DOM update
      cartItem =>
        cartItem.id === cartItemToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // if the item of this iteration already exists we add to the array a new object with all the properties of the cartItem and the quantity property incremented by one
          : cartItem // if the item of this iteration does not exists we add the item itself to the array
    );
  } else {
    newCartItems = [...cartItems, { ...cartItemToAdd, quantity: 1 }]; // if the item to add is not found inside the cartItems array by .find() then we return a new array where we spread all the cartItems we already had and we add the new item with the initial quantity of 1, here is where we attach quantity property to the cartItem state object
  }
  // <- Comment if not wanted to update firestore on each item modified from cart ->
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    storeCartItems(newCartItems, userId);
  }
  // <- end of firestore realtime update ->
  return newCartItems;
};

// remember, with redux everytime we modify the state with our reducers we have to pass a new item to the store (object, array, string, whatever we want to update in the state) we cannot just modify the properties of an existing object because how React works, in order to rerender what is needed in the DOM it has to detect a new entry in the store

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = cartItems.filter(
    cartItem => cartItem.id !== cartItemToClear.id
  );
  // <- Comment if not wanted to update firestore on each item modified from cart ->
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    storeCartItems(newCartItems, userId);
  }
  // <- end of firestore realtime update ->
  return newCartItems;
};

export const clearAllItemsFromcart = () => {
  const newCartItems = [];
  // <- Comment if not wanted to update firestore on each item modified from cart ->
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    storeCartItems(newCartItems, userId);
  }
  // <- end of firestore realtime update ->
  return newCartItems;
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = cartItems.reduce((accumulator, cartItem) => {
    let tempArray = accumulator;
    if (cartItem.id === cartItemToRemove.id) {
      if (cartItem.quantity > 1) {
        tempArray.push({ ...cartItem, quantity: cartItem.quantity - 1 });
        return tempArray;
      }
      return tempArray;
    }
    tempArray.push(cartItem);
    return tempArray;
  }, []);
  // <- Comment if not wanted to update firestore on each item modified from cart ->
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    storeCartItems(newCartItems, userId);
  }
  // <- end of firestore realtime update ->
  return newCartItems;
};

// this is the same as above
// export const removeItemFromCart = (cartItems, cartItemToRemove) => {
//   const existingCartItem = cartItems.find(
//     cartItem => cartItem.id === cartItemToRemove.id
//   );
//   if (existingCartItem.quantity > 1) {
//     return cartItems.map(cartItem =>
//       cartItem.id === cartItemToRemove.id
//         ? { ...cartItem, quantity: cartItem.quantity - 1 }
//         : cartItem
//     );
//   }
//   return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
// };

export const mergeCarts = (cartItems, currentCartItems) => {
  const mergedCart = currentCartItems.reduce(
    (accumulator, currentCartItem) => {
      let tempArray = accumulator;
      const existingCartItem = tempArray.find(
        cartItem => cartItem.id === currentCartItem.id
      );
      if (existingCartItem) {
        return tempArray.map(cartItem =>
          cartItem.id === currentCartItem.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + currentCartItem.quantity
              }
            : cartItem
        );
      }
      return [...tempArray, currentCartItem];
    },
    [...cartItems]
  );
  // <- Comment if not wanted to update firestore on each item modified from cart ->
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    storeCartItems(mergedCart, userId);
  }
  // <- end of firestore realtime update ->
  return mergedCart;
};
