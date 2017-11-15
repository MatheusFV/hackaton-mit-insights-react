import { compose } from 'redux'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { checkIfMobile } from '@helpers/checkIfMobile'
import {
  firebaseConnect,
  dataToJS,
} from 'react-redux-firebase'
import GroupPage from '@modules/components/Group/GroupPage'

const urlMapping = () => ({
  users: 'users',
})

const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = state => ({
  isMobile: checkIfMobile(),
  // team: dataToJS(state.firebase, `teamRelations/teamsForPatient/${uid}/${teamId}`),
})

export default compose(
  firebaseConnect(urlMapping),
  connect(mapStateToProps, mapDispatchToProps),
)(GroupPage)
