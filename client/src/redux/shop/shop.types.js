// we update our types for redux-thunk and using fetch to get our collection
const ShopActionTypes = {
  FETCH_COLLECTIONS_START: "FETCH_COLLECTIONS_START", // we start to fetch the data (while pending)
  FETCH_COLLECTIONS_SUCCESS: "FETCH_COLLECTIONS_SUCCESS", // the promise is resolved
  FETCH_COLLECTIONS_FAILURE: "FETCH_COLLECTIONS_FAILURE" // the promise is rejected
};

export default ShopActionTypes;
