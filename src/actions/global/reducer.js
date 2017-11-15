import { Map } from 'immutable';
import * as t from '@actions/global/actionTypes.js';

export const initialState = Map({
  alertCode: null,
});

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case t.NEW_ALERT:
      return state
        .set('alertCode', payload.code)
    case t.CLEAR_ALERT:
      return state
        .set('alertCode', null)
    default:
      return state;
  }
}
