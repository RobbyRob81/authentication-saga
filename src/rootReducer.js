import { combineReducers } from 'redux';

import user from './reducers/user';
import locale from './reducers/locale';
import formErrors from './reducers/formErrors';

export default combineReducers({
  user,
  locale,
  formErrors
});
