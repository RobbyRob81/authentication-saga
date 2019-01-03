import {LOCAL_SET} from '../types';

export default function locale(state = {lang: 'eng'}, action = {}) {
  switch (action.type) {
    case LOCAL_SET:
      return {lang: action.lang};
    
    default:
      return state;
  }
}