import {
  LOGIN_SUCCESS,
  FORGOT_PASSWORD,
  LOGIN,
  RESET_PASSWORD
} from "../actions/types";

import {
 loginSuccess,
 loginFailure
} from "./../actions/login";


import { call, put, select, takeLatest } from "redux-saga/effects";

import httpService from "./../services/http.service";


function login(emailAddress, password) {
  return new httpService().sendPost("user/login", {
    emailAddress: emailAddress,
    password: password
  });
}


function* loginAsync(action) {
  try {
    const emailAddress = action.payload.emailAddress;
    const password = action.payload.password;
    const response = yield call(login, emailAddress, password);

    if (response.data === undefined) {
      throw new Error("Invalid email address/password combination");
    } else {
      yield put(loginSuccess(response.data));
    }
  } catch (error) {
    yield put(loginFailure());
  }
}

