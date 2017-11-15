import { compose } from 'redux'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { checkIfMobile } from '@helpers/checkIfMobile'
import { addMessage } from '@actions/auth/actions'
import { objectToArray2 } from '@helpers/objectToArray'
import {
  firebaseConnect,
  dataToJS,
} from 'react-redux-firebase'
import GroupPage from '@modules/components/Group/GroupPage'

const mapDispatchToProps = dispatch => ({
  addMessage(message) {
    dispatch(addMessage(message))
  },
  goToMyPlaces() {
    dispatch(push('/my-places'))
  },
})

const mapStateToProps = state => ({
  isMobile: checkIfMobile(),
  activePlace: state.auth && state.auth.get('activePlace'),
  myId: state.firebase && state.firebase.get('auth').uid,
  comments: objectToArray2(dataToJS(state.firebase, `/chats/${state.auth && state.auth.get('activePlace')}`)),
//   comments: [{ key: 'TkutBhe0FkUBNN6Gg7jAJksYpxj1', name: 'meunome', message: 'message', photoUrl: 'https://firebasestorage.googleapis.com/v0/b/baseproject-9b045.appspot.com/o/placesPhoto%2F-KyydYdYJVV-3oPD5PkU?alt=media&token=b002237a-bd74-487c-9e87-01c38fda18f3' },
// { key: 'teste', name: 'meunome', message: 'message', photoUrl: 'https://firebasestorage.googleapis.com/v0/b/baseproject-9b045.appspot.com/o/placesPhoto%2F-KyydYdYJVV-3oPD5PkU?alt=media&token=b002237a-bd74-487c-9e87-01c38fda18f3' }],
})

export default compose(
  firebaseConnect(['/chats']),
  connect(mapStateToProps, mapDispatchToProps),
)(GroupPage)
