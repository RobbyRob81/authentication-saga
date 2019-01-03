import {
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
  SESSION_FAILURE
} from "../actions/types";

const initialState = {
  user: {
    isLoggedIn: false
  }
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;