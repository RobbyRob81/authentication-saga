import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT
} from "../actions/types";

const initialState = {
  user: {
    auth: 1,
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
