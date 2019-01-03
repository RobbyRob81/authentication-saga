import {
  LOGIN_SUBMIT,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT
} from './types.js';

/** ACTION CREATORS *//

// onClick login
// data: {email: string, pw: string}
export loginSubmit = data => ({
  type: loginSubmit,
  payload: data
})

// data: {email: string, pw: string}
export loginRequest = data => ({
  type: LOGIN_REQUEST,
  payload: data
})


// login req dispatched
export const loginSuccess = data => ({
  type: loginSuccess,
  payload: data
})

// login failed
const loginError = errors => ({
  type: LOGIN_ERROR,
  error: true,
  payload: errors
})

// logout user
export const logout = () => ({
  type: LOGOUT
})
