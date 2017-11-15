import { compose } from 'redux'
import { connect } from 'react-redux'

import { clearAlert, clearAndRedirect } from '@actions/global/actions'
import AlertPage from '@globalComponents/AlertDialog'

const mapDispatchToProps = dispatch => ({
  clearError(path) {
    if (path) {
      dispatch(clearAndRedirect(path))
    } else {
      dispatch(clearAlert())
    }
  },
})

const mapStateToProps = state => ({
  alertCode: state.global.get('alertCode'),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(AlertPage)
