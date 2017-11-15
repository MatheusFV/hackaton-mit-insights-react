import { Map } from 'immutable';
import * as t from './actionTypes.js'

export const initialState = Map({
  authLoading: false,
  logged: false,
  profileData: {},
});

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case t.SIGN_IN_START:
      return state
        .set('authLoading', true)
    case t.SIGN_IN_FINISH:
      return state
        .set('authLoading', false)
        .set('profileData', payload.data)
        .set('logged', true)
    default:
      return state
  }
}
