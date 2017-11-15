import { push } from 'react-router-redux'
import fetchData from '@helpers/fetchData'
import { newAlert } from '@actions/global/actions'
import * as t from './actionTypes.js'

const signInStart = () => ({
  type: t.SIGN_IN_START,
})

const signInFinish = data => ({
  type: t.SIGN_IN_FINISH,
  payload: {
    data,
  },
})

export const login = formValues => async (dispatch, getState, getFirebase) => {
  dispatch(signInStart())

  const firebase = getFirebase()
  firebase.login({
    email: formValues.username,
    password: formValues.password,
  }).then((resp) => {
    const ref = firebase.ref(`/users/${resp.uid}`)
    ref.once('value')
    .then((snapshot) => {
      dispatch(signInFinish(snapshot.val()))
      dispatch(push('/home'))
    })
  }).catch((err) => {
    console.log(err)
  })
}

export const signup = formValues => (dispatch, getState, getFirebase) => {
  dispatch(signInStart())
  const { email, password } = formValues

  const firebaseData = formValues
  delete firebaseData.password
  delete firebaseData.confirmPassword

  const firebase = getFirebase()
  firebase.createUser({
    email,
    password,
  }).then((userData) => {
    firebase.helpers.set(`/users/${userData.uid}`, firebaseData)

    dispatch(signInFinish(firebaseData))
    dispatch(push('/home'))
  }).catch((err) => {
    console.log(err)
  })
}
