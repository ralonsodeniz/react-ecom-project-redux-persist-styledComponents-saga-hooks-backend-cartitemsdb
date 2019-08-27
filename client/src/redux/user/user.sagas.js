import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
  storeCartItems,
  updateCartOnSignIn,
  updateAvatarInDB,
  addNewAddressInDB,
  removeAddressInDB,
  updateUserDataInDB,
  storeOrderInDB,
  updateDefaultAddressInDB,
  updatePasswordInDB,
  deleteUserInDB,
  sendNewVerificationEmail,
  resetPassword,
  actionCodeSettings
} from "../../firebase/firebase.utils"; // we need this from firebase utils for our generator function
import {
  signInSuccess,
  signInFailure,
  //  signOutStart,
  signOutSuccess,
  signOutFailure,
  // signUpSuccess,
  signUpFailure,
  checkUserSessionEnd,
  updateAvatar,
  addNewAddress,
  removeAddress,
  updateUserData,
  storeOrder,
  updateDefaultAddress
} from "./user.action"; // we need this actions for our sagas to trigger user reducer updates
import { updateCart } from "../cart/cart.actions";
import { openModal } from "../account/account.actions";

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
    const {
      createdAt,
      displayName,
      email,
      avatarUrl,
      addresses,
      orders,
      emailAndPassSignUp
    } = userSnapshot.data();
    yield put(
      // we dispatch the action with the payload we need to update our reducer
      signInSuccess({
        id: userSnapshot.id,
        createdAt,
        displayName,
        email,
        avatarUrl,
        addresses,
        orders,
        emailAndPassSignUp
      })
    );
    yield put(openModal(`Wellcome back ${displayName}`));
  } catch (error) {
    yield put(signInFailure(error));
    yield put(openModal(error.message));
  }
}

// generator function to update cart on sign in
export function* CartOnSignIn(userAuth, currentCartItems) {
  const cartItems = yield call(updateCartOnSignIn, userAuth, currentCartItems);
  try {
    yield put(updateCart(cartItems));
  } catch (error) {
    console.log(error, "failure updating user cart");
    yield put(openModal(error.message));
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
    yield put(openModal(error.message));
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
    // we check if the email is verified, if not we throw an error to alert the user to verify it
    if (
      !user.emailVerified &&
      // we check if the user was created with email and password
      user.providerData
        .map(provider => provider.providerId)
        .includes("password")
    ) {
      yield auth.signOut();
      throw Error(
        "Please look in your inbox to verify the email before signing in"
      );
    }
    yield call(getSnapshotFromUserAuth, user);
    yield call(CartOnSignIn, user, cartItems);
    yield put(openModal(`Wellcome back ${user.displayName}`));
  } catch (error) {
    yield put(signInFailure(error));
    yield put(openModal(error.message));
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
    // if the user is null (no user) we return, we dont want to do anything
    if (!userAuth) {
      yield put(checkUserSessionEnd());
      return; // if there is a value we proceed to identify the user in our db
    }
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailure(error)); // if there is an error on our check user firebase utility we return the error using the signInFailure since it is an error related to this
    yield put(openModal(error.message));
  }
  yield put(checkUserSessionEnd());
}

export function* onCheckUserSession() {
  yield takeLatest(
    UserActionTypes.CHECK_USER_SESSION_START,
    isUserAuthenticated
  );
}

// Sagas to sign out
export function* signOut({ payload }) {
  try {
    const { cartItems, userId } = payload;
    yield call(storeCartItems, cartItems, userId);
    // we sign out the user from firebase auth using the .singOut() method from auth library
    yield auth.signOut();
    yield put(openModal("Successfully signed out"));
    // and then we update our store to clear the user
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
    yield put(openModal(error.message));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

// sagas to sign up a new user with email and password
export function* signUp({
  payload: { email, password, displayName, emailAndPassSignUp }
}) {
  // remember that when we use takeLatest, takeEvery or takeLeading we pass to the saga that is the second parameter of the method the complete action object
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    // we creat the settings for the redirect after activating the account
    // we send the verification email
    yield auth.currentUser.sendEmailVerification(actionCodeSettings);
    // we don't want the user to be singed in until the email is verified so we want signin after sing up success
    // yield put(
    //   signUpSuccess({
    //     user,
    //     additionalData: { displayName, emailAndPassSignUp }
    //   })
    // ); // displayName and emailAndPassSignUp we have to pass it as an object since inside createUserProfileDocument is spreaded and if we pass it like the string it is it will create an array for each letter instead of creating the displayname item
    // instead we create the user in the db and alert the user to verify its email
    yield call(createUserProfileDocument, user, {
      displayName,
      emailAndPassSignUp
    });
    yield user.updateProfile({ displayName });
    yield put(
      openModal(
        "Please look in your inbox to verify the email before signing in"
      )
    );
    // we log out since we logged in when we created the user in the auth
    yield auth.signOut();
  } catch (error) {
    yield put(signUpFailure(error));
    yield put(openModal(error.message));
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

export function* storeAvatarDB({ payload }) {
  try {
    yield call(updateAvatarInDB, payload);
    yield put(updateAvatar(payload));
  } catch (error) {
    console.log("error adding avatar", error);
    yield put(openModal(error.message));
  }
}

export function* updateAvatarDB() {
  yield takeLatest(UserActionTypes.UPDATE_AVATAR_START, storeAvatarDB);
}

export function* storeNewAddressDB({ payload }) {
  try {
    yield addNewAddressInDB(payload);
    yield put(addNewAddress(payload));
  } catch (error) {
    console.log("error adding address", error);
    yield put(openModal(error.message));
  }
}

export function* addNewAddressDB() {
  yield takeLatest(UserActionTypes.ADD_ADDRESS_START, storeNewAddressDB);
}

export function* removeStoredAddressDB({ payload }) {
  try {
    yield removeAddressInDB(payload);
    yield put(removeAddress(payload));
  } catch (error) {
    console.log("error removing addres", error);
    yield put(openModal(error.message));
  }
}

export function* removeAddressDB() {
  yield takeLatest(UserActionTypes.REMOVE_ADDRESS_START, removeStoredAddressDB);
}

export function* updateStoredUserDataDB({ payload }) {
  try {
    // const { cartItems, currentUser } = payload;
    const {
      displayName,
      email,
      newDisplayName,
      newEmail
    } = yield updateUserDataInDB(payload);
    yield put(updateUserData({ displayName, email }));
    if (newEmail) {
      // we would need to trigger signOutStart if we change how we store the cartItems in the db from realtime to at the signout
      // yield put(signOutStart(cartItems, currentUser));
      // since we are storing cartItems in real time we signout using auth.signout directly and we trigger the singoutsuccess action
      yield auth.signOut();
      yield put(signOutSuccess());
      yield put(
        openModal(
          "Please look in your inbox to verify the new email address before signing in"
        )
      );
    }
    if (!newEmail && newDisplayName)
      yield put(openModal("Your display name has been changed"));
  } catch (error) {
    console.log("error udpating user data", error);
    yield put(openModal(error.message));
  }
}

export function* updateUserDataDB() {
  yield takeLatest(
    UserActionTypes.UPDATE_USERDATA_STARTS,
    updateStoredUserDataDB
  );
}

export function* updateStoredOrdersDB({ payload }) {
  try {
    const newOrders = yield storeOrderInDB(payload);
    yield put(storeOrder(newOrders));
  } catch (error) {
    console.log("error updating orders", error);
    yield put(openModal(error.message));
  }
}

export function* updateOrdersDB() {
  yield takeLatest(UserActionTypes.STORE_ORDER_STARTS, updateStoredOrdersDB);
}

export function* updateStoredDefaultAddressDB({ payload }) {
  try {
    yield updateDefaultAddressInDB(payload);
    yield put(updateDefaultAddress(payload));
  } catch (error) {
    console.log("error updating default address", error);
    yield put(openModal(error.message));
  }
}

export function* updateDefaultAddressDB() {
  yield takeLatest(
    UserActionTypes.SELECT_DEFAULT_ADDRESS_STARTS,
    updateStoredDefaultAddressDB
  );
}

export function* updateStoredPasswordDB({ payload }) {
  try {
    yield updatePasswordInDB(payload);
    yield put(openModal("Your password has been updated"));
  } catch (error) {
    console.log("error updating password", error);
    yield put(openModal(error.message));
  }
}

export function* updatePasswordDB() {
  yield takeLatest(UserActionTypes.UPDATE_PASSWORD, updateStoredPasswordDB);
}

export function* deleteStoredUserDB({ payload }) {
  try {
    yield deleteUserInDB(payload);
    yield put(signOutSuccess());
    yield put(openModal("Your user has been deleted"));
  } catch (error) {
    yield put(signOutFailure(error));
    yield put(openModal(error.message));
  }
}

export function* deleteUserDB() {
  yield takeLatest(UserActionTypes.DELETE_USER, deleteStoredUserDB);
}

export function* sendVerificationEmail({ payload }) {
  try {
    const alreadyVerified = yield sendNewVerificationEmail(payload);
    if (alreadyVerified) {
      yield put(openModal("Your email is already verified"));
    } else {
      yield put(openModal("Verification email resent"));
    }
  } catch (error) {
    console.log("error sending new verification email", error);
    yield put(openModal(error.message));
  }
}

export function* newVerificationEmail() {
  yield takeLatest(
    UserActionTypes.RESEND_VERIFICATION_EMAIL,
    sendVerificationEmail
  );
}

export function* sendNewPassword({ payload }) {
  try {
    yield resetPassword(payload);
    yield put(
      openModal("An email with a password reset link has been sent to you")
    );
  } catch (error) {
    console.log("error reseting password", error);
    yield put(openModal(error.message));
  }
}

export function* resetUserPassword() {
  yield takeLatest(UserActionTypes.RESET_PASSWORD, sendNewPassword);
}

// this generator function is the root saga creator for users
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(updateAvatarDB),
    call(addNewAddressDB),
    call(removeAddressDB),
    call(updateUserDataDB),
    call(updateOrdersDB),
    call(updateDefaultAddressDB),
    call(updatePasswordDB),
    call(deleteUserDB),
    call(newVerificationEmail),
    call(resetUserPassword)
  ]);
}
