import {
  LOGIN_SUBMIT,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT
} from './types.js';

// trigger when submit is dispatched
export const loginSubmit = data => ({
  type: LOGIN_SUBMIT,
  payload: data
})

// trigger when login is dispatched
export const loginRequest = data => ({
  type: LOGIN_REQUEST,
  payload: data
})

// login has succeded
export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data
})

// login has failed
export const loginError = errors => ({
  type: LOGIN_ERROR,
  error: true,
  payload: errors
})

// logout user
export const logout = () => ({
  type: LOGOUT
})
