import * as t from '@actions/global/actionTypes.js'
import { push } from 'react-router-redux'

export const newAlert = code => ({
  type: t.NEW_ALERT,
  payload: {
    code,
  },
})

export const clearAlert = () => ({
  type: t.CLEAR_ALERT,
})

export const clearAndRedirect = path => async (dispatch) => {
  dispatch(clearAlert())
  dispatch(push(path))
}
