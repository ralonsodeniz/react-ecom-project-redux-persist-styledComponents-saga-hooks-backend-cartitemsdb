import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
  storeCartItems,
  updateCartOnSignIn
} from "../../firebase/firebase.utils"; // we need this from firebase utils for our generator function
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from "./user.action"; // we need this actions for our sagas to trigger user reducer updates
import { updateCart } from "../cart/cart.actions";

// we are creating a generator function that does the redundant code of both signIn generator functions
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    // with the user object inside userAuth we get the userRef to create the snapshot at the same time we register the user in the firestore if it does not exist using createUserProfileDocument
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    ); // remember calls first parameter is the function we want to run and the other parameters are the arguments of the function
    const userSnapshot = yield userRef.get();
    const { createdAt, displayName, email } = userSnapshot.data();
    yield put(
      // we dispatch the action with the payload we need to update our reducer
      signInSuccess({
        id: userSnapshot.id,
        createdAt,
        displayName,
        email
      })
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// generator function to update cart on sign in
export function* CartOnSignIn(userAuth, currentCartItems) {
  const cartItems = yield call(updateCartOnSignIn, userAuth, currentCartItems);
  try {
    yield put(updateCart(cartItems));
  } catch (error) {
    console.log(error, "failure updating user cart");
  }
}

// Google Sign In
export function* signInWithGoogle({ payload }) {
  try {
    // we want to have the userAuth object inside our saga thats why we do not use signInWithGoogle from firebase.utils
    // what auth returns is a signIn object that inside of it it has the property user which is the userAuth object we want
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield call(getSnapshotFromUserAuth, user);
    yield call(CartOnSignIn, user, payload);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// Email & password Sign In
export function* signInWithEmail({ payload: { emailAndPassword, cartItems } }) {
  // since we get the full action object we only want the email and password from the payload
  const { email, password } = emailAndPassword;
  try {
    // as we did in sightInWithGoogle we use the corresponding firebase method to get the signIn object and deconstruct the userAuth object from the user property inside of it
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield call(getSnapshotFromUserAuth, user);
    yield call(CartOnSignIn, user, cartItems);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail); // when we do this, the generator function we pass as second argument gets the full action object that triggers it, including the payload
}

// Sagas to check user session
// we need a firebase util to actually check if a user is signed in that return us a Promise oriented solution that sagas can yield for
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser(); // we dont use call here because this is a Promise | we get the userAuth if there is a user logged in
    if (!userAuth) return; // if the user is null (no user) we return, we dont want to do anything
    // if there is a value we proceed to identify the user in our db
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailure(error)); // if there is an error on our check user firebase utility we return the error using the signInFailure since it is an error related to this
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

// Sagas to sign out
export function* signOut({ payload }) {
  try {
    const { cartItems, userId } = payload;
    yield call(storeCartItems, cartItems, userId);
    // we sign out the user from firebase auth using the .singOut() method from auth library
    yield auth.signOut();
    // and then we update our store to clear the user
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure());
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

// sagas to sign up a new user with email and password
export function* signUp({ payload: { email, password, displayName } }) {
  // remember that when we use takeLatest, takeEvery or takeLeading we pass to the saga that is the second parameter of the method the complete action object
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } })); // displayName we have to pass it as an object since inside createUserProfileDocument is spreaded and if we pass it like the string it is it will create an array for each letter instead of creating the displayname item
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield call(getSnapshotFromUserAuth, user, additionalData);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// this generator function is the root saga creator for users
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}
