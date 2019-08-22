import UserActionTypes from "./user.types";

import {
  addNewAddress,
  removeAddress,
  addNewOrder,
  setDefaultAddress
} from "./user.utils";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isChecking: true
};

// we make changes into the reducer to addapt it to the new actions for the new sign up code
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GOOGLE_SIGN_IN_START:
    case UserActionTypes.EMAIL_SIGN_IN_START:
      return {
        ...state,
        isChecking: true
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        // if the action type matches with one of the switch case we want to return a new object, with all the properties of the initial one spreaded and the property of interest for this case updated with the action.payload
        ...state,
        currentUser: action.payload,
        error: null,
        isChecking: false
      }; // this is the same as Object.assign({}, state, {currentUser: action.payload})
    // since the effect over the reducer for the SIGN_IN_FAILURE and SIGN_OUT_FAILURE should be the same we can stack the two cases and either one or the other will trigger the return
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        isChecking: false
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      };
    case UserActionTypes.CHECK_USER_SESSION_START:
      return {
        ...state,
        isChecking: true
      };
    case UserActionTypes.CHECK_USER_SESSION_END:
      return {
        ...state,
        isChecking: false
      };
    case UserActionTypes.UPDATE_AVATAR:
      return {
        ...state,
        currentUser: { ...state.currentUser, avatarUrl: action.payload }
      };
    case UserActionTypes.ADD_ADDRESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          addresses: addNewAddress(state.currentUser, action.payload)
        }
      };
    case UserActionTypes.REMOVE_ADDRESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          addresses: removeAddress(state.currentUser, action.payload)
        }
      };
    case UserActionTypes.UPDATE_USERDATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          displayName: action.payload.displayName,
          email: action.payload.email
        }
      };
    case UserActionTypes.STORE_ORDER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          orders: addNewOrder(state.currentUser, action.payload)
        }
      };
    case UserActionTypes.SELECT_DEFAULT_ADDRESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          addresses: setDefaultAddress(state.currentUser, action.payload)
        }
      };
    default:
      return state; // if none of the actions type match the ones in the state we want to return the same state we had
  }
};

export default userReducer;
