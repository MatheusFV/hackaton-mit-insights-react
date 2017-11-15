import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { responsiveStateReducer } from 'redux-responsive'
import { firebaseStateReducer } from 'react-redux-firebase'
import auth from '@actions/auth/reducer'
import global from '@actions/global/reducer'

export default combineReducers({
  routing: routerReducer,
  browser: responsiveStateReducer,
  form: formReducer,
  firebase: firebaseStateReducer,
  auth,
  global,
});
