import ShopActionTypes from "./shop.types";

// regular sync actions returns an action object that gets dispatched to the reducers
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});
export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});
export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// <- SINCE WE ARE USING SAGAS NOW WE DO NOT USE THUNK ASYNC ACTIONS ->
// // the asyc actions we create wiith thunk instead of returning an js object they return a function that gets dispatched so whenever this dispatch is called it will fire multiple actions
// // we are using a currying function that its first parameter is empty
// export const fetchCollectionsStartAsync = () => dispatch => {
//   // in here we place the code we used to have in the shop component to fetch the data from the firestore
//   // we create the collection reference object of the collections collection
//   const collectionRef = firestore.collection("collections");
//   // we start the fetching process by dispatching the action type that says to the reducer this process has started
//   dispatch(fetchCollectionsStart());
//   // we could also not have created this action and just use dispatch({type:ShopActionTypes.FETCH_COLLECTIONS_START}) with same results
//   // we get the snapshot object from the reference using the .get() method
//   // here the async requests starts
//   collectionRef
//     .get()
//     // after we get the snapshot we transform it to the structure we need, included a map object to be returned instead of an array
//     .then(
//       snapshot => convertCollectionsSnapshotToMap(snapshot)
//       // once we have the collectionsMap object created we return it as payload of the action type fetch success
//     )
//     .then(
//       collectionsMap => dispatch(fetchCollectionsSuccess(collectionsMap))
//       // we could also not have created this action and just use dispatch({type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS, payload: collectionsMap}) with same results
//     )
//     // if anything fails we catch the error and returns the action type fetch failure with the payload of the error message
//     .catch(
//       error => dispatch(fetchCollectionsFailure(error.message))
//       // we could also not have created this action and just use dispatch({type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE, payload: error.message}) with same results
//     );
// };
// // how this work is that in the moment we call fetchCollectionsStartAsync, thanks to thunk, redux starts executing a function, instead of returning an action object
// // it now starts executing the code, which is async at some points, and dispatching different actions while it is executed
// // this is possible because of thunk and because we are passing through dipsatch as an argument to the curried function
// // when redux-thunk middleware is enabled, anyy time we attempt to dispatch a function instead of an object, the middleware will catch that funcion and call it with dispatch method as the first argument (the function curried)
