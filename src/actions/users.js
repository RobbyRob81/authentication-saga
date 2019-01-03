import {
  CREATE_USER_REQUEST,
  CREATE_USER_FAILURE,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS
} from '../types';

export const createUserRequest = user => ({
  type: CREATE_USER_REQUEST,
  user
});

export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  error
});

export const fetchCurrentUserRequest = () => ({
  type: FETCH_CURRENT_USER_REQUEST
});

export const fetchCurrentUserSuccess = user => ({
  type: FETCH_CURRENT_USER_SUCCESS,
  user
})