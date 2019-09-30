import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import balance from './balance';
import auth from './auth';
import users from './users';

export default combineReducers({
  auth,
  balance,
  form,
  users
});
