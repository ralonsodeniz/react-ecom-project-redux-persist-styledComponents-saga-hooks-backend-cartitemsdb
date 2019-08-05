import { combineReducers } from "redux"; // this method allows us to merge different reducers into the root reducer
import { persistReducer } from "redux-persist"; // we import persistReducer to make our reducer also persistant
import storage from "redux-persist/lib/storage"; // here we import the type of storage we want, this one is the localStorage
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

// now we have to set the configuration for redux persist
const persistConfig = {
  key: "root", // this means at what point inside of our reducer object do we want to start storage everything
  storage, // the storage key goes to whatever the storage object from redux persist we are trying to use this
  whitelist: ["cart"] // whitelist property is an array containing the string names of any of the reducer that we want to store.
  // we dont need to persist the user since it is already being handled by firebase
};

// we need to actually create a rootReducer variable to create the combined reducer because we need to wrap it after inside our new persistReducer
const rootReducer = combineReducers({
  user: userReducer, // we give the userReducer a key inside the object we pass to the combine reducer so we can access its states inside the store using the user key
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

// what we export now is the persist reducer with the persistConfig and the rootReducer
export default persistReducer(persistConfig, rootReducer); // this is just a modified version of our root reducer but with the persistant capabilities we have set in the config
