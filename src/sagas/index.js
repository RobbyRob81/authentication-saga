import {
  watchAuth
} from './auth.js'

import {fork} from "redux-saga/effects";

export default function* rootSaga() {
  yield fork(watchAuth);
}