import { createSelector } from "reselect";

const selectAccount = state => state.account;

export const selectAccountHidden = createSelector(
  [selectAccount],
  account => account.accountHidden
);

export const selectAvatarLoading = createSelector(
  [selectAccount],
  account => account.avatarLoading
);

export const selectModalText = createSelector(
  [selectAccount],
  account => account.modalText
);

export const selectModalHidden = createSelector(
  [selectAccount],
  account => account.modalHidden
);
