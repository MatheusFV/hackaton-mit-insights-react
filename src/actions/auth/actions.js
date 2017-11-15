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

export const login = formValues => async (dispatch, getState) => {
  // Set the loading property on state
  dispatch(signInStart())

  // Do some thing with form values
  console.log(formValues)

  // Do some sort of request
  // try {
  //   const response = await fetchData()
  // } catch (err) {
  //   dispatch(newAlert('standardError'))
  // }

  // Set the loading to false, and set some profileData on state
  dispatch(signInFinish(formValues))

  // Redirect to home already happens,
  // use this if you want to redict to a different page
  // dispatch(push('/other-page'))
}
