import { AccountActionTypes } from "./account.types";
import UserActionTypes from "../user/user.types";

const INITIAL_STATE = {
  accountHidden: true,
  avatarLoading: false,
  modalHidden: true,
  modalText: ""
};

const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AccountActionTypes.TOGGLE_ACCOUNT_HIDDEN:
      return {
        ...state,
        accountHidden: !state.accountHidden
      };
    case UserActionTypes.UPDATE_AVATAR_START:
      return {
        ...state,
        avatarLoading: true
      };
    case UserActionTypes.UPDATE_AVATAR:
      return {
        ...state,
        avatarLoading: false
      };
    case AccountActionTypes.OPPEN_MODAL:
      return {
        ...state,
        modalHidden: false,
        modalText: action.payload
      };
    case AccountActionTypes.CLOSE_MODAL:
      return {
        ...state,
        modalHidden: true,
        modalText: ""
      };
    default:
      return state;
  }
};

export default accountReducer;
