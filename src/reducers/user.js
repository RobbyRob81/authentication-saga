
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  FETCH_CURRENT_USER_SUCCESS
} from "../types";

export default function user(state = { loaded: false }, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...action.user, loaded: true };
    case FETCH_CURRENT_USER_SUCCESS:
      return { ...state, ...action.user, loaded: true };
    case USER_LOGGED_OUT:
      return { loaded: true };
    default:
      return state;
  }
}

// import {
//   USER_LOGGED_IN,
//   USER_LOGGED_OUT,
//   FETCH_CURRENT_USER_SUCCESS
// } from "../types";
// import api from '../api';
// import { userLoggedIn } from './auth';

// export const userFetched = user => ({
//   type: USER_FETCHED,
//   user
// })

// export const createUserRequest = user => ({
//   type: CREATE_USER_REQUEST,
//   user
// });

// export const createUserFailure = error => ({
//   type: CREATE_USER_FAILURE,
//   error
// });

// export const signup = data => dispatch =>
//   api.user.signup(data).then(user => {
//     localStorage.bookwormJWT = user.token;
//     dispatch(userLoggedIn(user))
//   })

// export const fetchCurrentUser = () => dispatch => 
//   api.user.fetchCurrentUser().then(user => dispatch(userFetched(user)))
  