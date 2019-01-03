import {combineReducers} from 'redux';
import {LOGIN_SUCCESS, LOGOUT} from './actions.js';

/*
Whenever a loginSuccess is dispatched,
we will store the user and set the logged user id
*/

const users = (state = {}, action) => {
  if(!action) return state;

  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    default:
      return state
  }
}

const auth = (state = null, action) => {
  if(!action) return state;

  switch(action.type) {
    case LOGIN_SUCCESS:
      return action.payload.id;

    case LOGOUT:
      return null;
      
    default:
      return state;
  }
}

// const userAuth = combineReducers({ users, auth });
export default combineReducers({ users, auth });
