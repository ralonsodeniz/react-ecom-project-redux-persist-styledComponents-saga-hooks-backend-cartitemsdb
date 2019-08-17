import { createSelector } from "reselect";

const selectAccount = state => state.account;

export const selectAccountHidden = createSelector(
  [selectAccount],
  account => account.accountHidden
);
