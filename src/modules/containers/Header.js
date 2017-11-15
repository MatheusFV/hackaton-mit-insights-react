import { compose } from 'redux'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { checkIfMobile } from '@helpers/checkIfMobile'
import { logout } from '@actions/auth/actions'
import {
  firebaseConnect,
  dataToJS,
} from 'react-redux-firebase'
import HeaderPage from '@modules/components/Header/HeaderPage'

const mapDispatchToProps = dispatch => ({
  onMenuClick(route) {
    if (route === '/config') {
      dispatch(logout())
    } else {
      dispatch(push(route))
    }
  },
})

const mapStateToProps = state => ({
  isMobile: checkIfMobile(),
  headerPlace: state.auth && state.auth.get('activePlace') && dataToJS(state.firebase, `/places/${state.auth.get('activePlace')}`),
  path: state.routing.location.pathname,
})

export default compose(
  firebaseConnect(['/places']),
  connect(mapStateToProps, mapDispatchToProps),
)(HeaderPage)
