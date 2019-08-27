import { AccountActionTypes } from "./account.types";

export const toggleAccountHidden = () => ({
  type: AccountActionTypes.TOGGLE_ACCOUNT_HIDDEN
});

export const openModal = text => ({
  type: AccountActionTypes.OPPEN_MODAL,
  payload: text
});

export const closeModal = () => ({
  type: AccountActionTypes.CLOSE_MODAL
});
