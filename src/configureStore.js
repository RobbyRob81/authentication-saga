/**
 create the store and apply middleware
*/
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {
  fetchCurrentUserSuccess,
  fetchCurrentUserRequest
} from "./actions/users";
import rootSaga from "./sagas";
import rootReducer from './reducers/reducers'

import setAuthorizationHeader from "./utils/setAuthorizationHeader";

// localization
import { addLocaleData } from "react-intl";
import { localeSet } from "./actions/locale"
import en from "react-intl/locale-data/en";
import ru from "react-intl/locale-data/ru";

addLocaleData(en);
addLocaleData(ru);

// const configureStore = () => {
//   const middleware = [thunk];
// }

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk))
);
sagaMiddleware.run(rootSaga);

// check for token in local storage
if (localStorage.bookwormJWT) {
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(fetchCurrentUserRequest());
} else {
  store.dispatch(fetchCurrentUserSuccess({}));
}

if (localStorage.alhubLang) {
  store.dispatch(localeSet(localStorage.alhubLang));
}

export default store;

