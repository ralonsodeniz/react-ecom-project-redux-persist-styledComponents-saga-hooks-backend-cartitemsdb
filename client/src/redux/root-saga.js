// same as root-reducer we want to create a root saga that joins all the sagas we are going to use as middleware
// if we dont do this we would have to use, in the store.js, as much calls to sagaMiddleware.run(saga) as sagas we want to run
// all creates an Effect description that instructs the middleware to run multiple Effects in parallel and wait for all of them to complete. It's quite the corresponding API to standard Promise.all.
import { all, call } from "redux-saga/effects";

import { shopSaga } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas"; // this is the users root saga that contains all sagas from user sagas that we want to act as middlewares
import { cartSagas } from "./cart/cart.sagas";

// all gets an array of generators that we invoke
export default function* rootSaga() {
  // if we wanted to store the object generator returned we would use the syntax const [someVar, anotherVar] = yield all([call(someSaga), call(anotherSaga)])
  yield all([call(shopSaga), call(userSagas), call(cartSagas)]);
}
