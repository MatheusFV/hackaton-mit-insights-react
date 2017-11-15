import { push } from 'react-router-redux'
import { newAlert } from '@actions/global/actions'
import * as t from './actionTypes.js'

const signInStart = () => ({
  type: t.SIGN_IN_START,
})

const signInFinish = () => ({
  type: t.SIGN_IN_FINISH,
})

export const setActivePlace = key => ({
  type: t.SET_ACTIVE_PLACE,
  payload: {
    key,
  },
})

export const login = formValues => async (dispatch, getState, getFirebase) => {
  dispatch(signInStart())

  const firebase = getFirebase()
  firebase.login({
    email: formValues.username,
    password: formValues.password,
  }).then(() => {
    dispatch(signInFinish())
    dispatch(push('/my-places'))
  }).catch((err) => {
    console.log(err)
  })
}

export const signup = formValues => (dispatch, getState, getFirebase) => {
  dispatch(signInStart())
  const { email, password } = formValues

  const firebase = getFirebase()
  firebase.createUser({
    email,
    password,
  }).then(() => {
    dispatch(signInFinish())
    dispatch(push('/my-places'))
  }).catch((err) => {
    console.log(err)
  })
}

export const createPlace = (formValues, tags, image) => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase()
}
