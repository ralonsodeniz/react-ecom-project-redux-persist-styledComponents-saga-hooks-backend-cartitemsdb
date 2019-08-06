import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isChecking: true
};

// we make changes into the reducer to addapt it to the new actions for the new sign up code
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        // if the action type matches with one of the switch case we want to return a new object, with all the properties of the initial one spreaded and the property of interest for this case updated with the action.payload
        ...state,
        currentUser: action.payload,
        error: null
      }; // this is the same as Object.assign({}, state, {currentUser: action.payload})
    // since the effect over the reducer for the SIGN_IN_FAILURE and SIGN_OUT_FAILURE should be the same we can stack the two cases and either one or the other will trigger the return
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload
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
    default:
      return state; // if none of the actions type match the ones in the state we want to return the same state we had
  }
};

export default userReducer;
