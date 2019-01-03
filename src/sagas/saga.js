// utils
import {login} from './api'; //make

import {
  call,
  fork,
  put,
  race,
  take
} from 'redux-saga/effects';

// types
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUBMIT,
  LOGIN_SUCCESS
} from './types';

// actions
import {
  loginRequest,
  loginError,
  loginSuccess
} from './actions';

import {
  startSubmit,
  stopSubmit
} from './actions/form';

import {clearState} from './actions/router'

function* handleLoginSubmit(){
  while(true){ //replace with takeEvery()
    // wait for login request
    const {payload} = yield take(LOGIN_SUBMIT);

    // start submitting form
    yield put(startSubmit("authLogin"));

    // put a login request
    yield put(loginRequest(payload));

    const {error, success} = yield race({
      success: take(LOGIN_SUCCESS),
      error: take(LOGIN_ERROR)
    });

    if(!error){
      yield put(stopSubmit("authLogin"));
      yield put(clearState());
    } else {
      yield put(stopSubmit("authLogin", error.payload))
    }
  }
}

function* handleLoginRequest(){
  while(true){ //replace with takeEvery()
    try {
      const { payload } = yield take(LOGIN_REQUEST);
      const user = yield call(login, payload);
      yield put(loginSuccess(user));

    } catch {
      yield put(loginError())
    }
  }
}

export default function* watchAuth(getState) {
  yield takeEvery(
    handleLoginRequest,
    handleLoginSubmit
    );
}
