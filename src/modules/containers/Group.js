import { compose } from 'redux'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { checkIfMobile } from '@helpers/checkIfMobile'
import {
  firebaseConnect,
  dataToJS,
} from 'react-redux-firebase'
import GroupPage from '@modules/components/Group/GroupPage'

const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = state => ({
  isMobile: checkIfMobile(),
  myId: state.firebase && state.firebase.get('auth').uid,
  comments: [{ key: 'teste', name: 'meunome', message: 'message' }],
  // team: dataToJS(state.firebase, `teamRelations/teamsForPatient/${uid}/${teamId}`),
})

export default compose(
  firebaseConnect(['/chats']),
  connect(mapStateToProps, mapDispatchToProps),
)(GroupPage)
