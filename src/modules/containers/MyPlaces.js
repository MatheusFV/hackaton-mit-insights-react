import { compose } from 'redux'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { setActivePlace } from '@actions/auth/actions'
import { checkIfMobile } from '@helpers/checkIfMobile'
import { objectToArray2 } from '@helpers/objectToArray'
import {
  firebaseConnect,
  dataToJS,
} from 'react-redux-firebase'
import MyPlacesPage from '@modules/components/MyPlaces/MyPlacesPage'

const mapDispatchToProps = dispatch => ({
  goToNewPlace() {
    dispatch(push('/new-place'))
  },
  setPlace(key) {
    dispatch(setActivePlace(key))
    dispatch(push('/perfil'))
  },
})

const mapStateToProps = state => ({
  isMobile: checkIfMobile(),
  uid: (state.firebase && state.firebase.get('auth') && state.firebase.get('auth').uid) || '',
  // places: dataToJS(state.firebase, `owners/${state.firebase.get('auth').uid}`),
  owners: objectToArray2(dataToJS(state.firebase, '/owners')),
})

export default compose(
  firebaseConnect(['/owners']),
  connect(mapStateToProps, mapDispatchToProps),
)(MyPlacesPage)
