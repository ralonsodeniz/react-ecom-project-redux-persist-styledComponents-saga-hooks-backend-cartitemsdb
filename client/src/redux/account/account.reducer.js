import { AccountActionTypes } from "./account.types";

const INITIAL_STATE = {
  accountHidden: true
};

const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AccountActionTypes.TOGGLE_ACCOUNT_HIDDEN:
      return {
        ...state,
        accountHidden: !state.accountHidden
      };
    default:
      return state;
  }
};

export default accountReducer;
