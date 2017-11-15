import { push } from 'react-router-redux'
import { newAlert } from '@actions/global/actions'
import * as t from './actionTypes.js'
import { key } from 'firebase-key';

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
  dispatch(signInStart())

  const firebase = getFirebase()
  const state = getState()
  const uid = state.firebase.get('auth').uid

  const storageRef = firebase.storage().ref(`placesPhoto/${key()}`)
  const task = storageRef.put(image);

  task.on('state_changed', () => {},
    (err) => { console.log(err) },
    () => {
      const downloadURL = task.snapshot.downloadURL;
      const smallData = {
        ...formValues,
        imageUrl: downloadURL,
      }
      const firebaseData = {
        ...formValues,
        tags,
        imageUrl: downloadURL,
      }
      firebase.push(`owners/${uid}`, smallData).then((res) => {
        firebase.set(`places/${res.path.o[2]}`, firebaseData)
        dispatch(signInFinish())
        dispatch(push('/my-places'))
      })
    },
  )
}

export const switchStatus = (status, userId, placeId) => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase()
  const state = getState()
  if (status === 'pending') {
    firebase.update(`placeRelations/${placeId}/${userId}`, { status: 'interested' })
    firebase.update(`usersGroup/${userId}/${placeId}`, { status: 'interested' })
  } else if (status === 'interested') {
    firebase.update(`placeRelations/${placeId}/${userId}`, { status: 'confirmed' })
    firebase.update(`usersGroup/${userId}/${placeId}`, { status: 'confirmed' })
  } else if (status === 'confirmed') {
    firebase.remove(`placeRelations/${placeId}/${userId}`)
    firebase.remove(`usersGroup/${userId}/${placeId}`)
  }
}
