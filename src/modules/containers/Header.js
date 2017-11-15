import { compose } from 'redux'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { checkIfMobile } from '@helpers/checkIfMobile'
import HeaderPage from '@modules/components/Header/HeaderPage'

const mapDispatchToProps = dispatch => ({
  onMenuClick(route) {
    dispatch(push(route))
  },
})

const mapStateToProps = state => ({
  isMobile: checkIfMobile(),
  profileData: state.auth.get('profileData'),
  path: state.routing.location.pathname,
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(HeaderPage)
