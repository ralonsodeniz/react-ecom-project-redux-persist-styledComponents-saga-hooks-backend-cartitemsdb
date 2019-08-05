// import SHOP_DATA from "./shop.data"; we don't need the SHOP_DATA unless we modify the collections in the file and we want to export them to firestore using the util function we created in firebase.utils
import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  collections: null, // since collections is an object that contains another object for each collection the initial value has to be null
  isFetching: false, // we add a state that will tell the app is the fetch is pending to resolve | this will replace the loading state in shop component
  errorMessage: undefined // we could also set it to an empty string ""
};
// we update the shop reducer to process the new action types
const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true
      };
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload
      };
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default shopReducer;
