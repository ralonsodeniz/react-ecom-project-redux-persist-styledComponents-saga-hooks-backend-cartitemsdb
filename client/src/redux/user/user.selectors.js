import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectIsCheckingUser = createSelector(
  [selectUser],
  user => user.isChecking
);

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.id
);

export const selectCurrentUserAvatar = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.avatarUrl
);

export const selectCurrentUserAddreses = createSelector(
  [selectCurrentUser],
  currentUser => (currentUser ? currentUser.addresses : [])
);

export const selectCurrentUserDisplayName = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.displayName
);

export const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  currentUser => {
    // if there is not user logged in we return false as email so in the stripe component it asks for an email in the payment form
    if (currentUser) return currentUser.email;
    return undefined;
  }
);

export const selectCurrentUserOrders = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.orders
);

export const selectCurrentUserOrder = orderUrlParam =>
  createSelector(
    [selectCurrentUserOrders],
    orders => (orders ? orders[orderUrlParam] : null)
  );

export const selectCurrentUserSignUpEmailAndPass = createSelector(
  [selectCurrentUser],
  currentUser => (currentUser.emailAndPassSignUp ? true : false)
);
