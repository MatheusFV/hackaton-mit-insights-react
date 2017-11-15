import { compose } from 'redux'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { checkIfMobile } from '@helpers/checkIfMobile'
import { objectToArray2 } from '@helpers/objectToArray'
import { switchStatus } from '@actions/auth/actions'
import {
  firebaseConnect,
  dataToJS,
} from 'react-redux-firebase'
import ProfilePage from '@modules/components/Profile/ProfilePage'

const mapDispatchToProps = dispatch => ({
  returnToPlaces() {
    dispatch(push('/my-places'))
  },
  switchStatus(status, userId, placeId) {
    dispatch(switchStatus(status, userId, placeId))
  },
})

const mapStateToProps = state => ({
  isMobile: checkIfMobile(),
  activePlace: state.auth.get('activePlace'),
  place: state.auth && state.auth.get('activePlace') && dataToJS(state.firebase, `/places/${state.auth.get('activePlace')}`),
  relations: state.auth && state.auth.get('activePlace') &&
    objectToArray2(dataToJS(state.firebase, `/placeRelations/${state.auth.get('activePlace')}`)),
})

export default compose(
  firebaseConnect(['/places', '/placeRelations']),
  connect(mapStateToProps, mapDispatchToProps),
)(ProfilePage)
