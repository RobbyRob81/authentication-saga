import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from "./types";

export const login = (emailAddress, password) => ({
  type: LOGIN,
  payload: {
    emailAddress,
    password
  }
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = () => ({ type: LOGIN_FAILURE });
