import { all, call, takeLatest, put } from "redux-saga/effects";

import UserActionTypes from "../user/user.types"; // we need user types to listen for the signOut to clear the cart
import { clearCart } from "./cart.actions";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
