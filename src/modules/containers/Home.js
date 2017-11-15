import { compose } from 'redux'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { checkIfMobile } from '@helpers/checkIfMobile'
import HomePage from '@modules/components/Home/HomePage'

const mapDispatchToProps = dispatch => ({
  setMyNewState(newState) {
    // dispatch(setMyState(newState))
  },
})

const mapStateToProps = state => ({
  isMobile: checkIfMobile(),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage)
