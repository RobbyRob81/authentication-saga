/*
  Purpose:
  1. combine into one main saga (rootSaga)
  2. Perform non-blocking operation on the functions passed using fork

*/

import {
  watchAuth
} from './auth.js'

import {fork} from "redux-saga/effects";

export default function* rootSaga() {
  yield fork(watchAuth);
}