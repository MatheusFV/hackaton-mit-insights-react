import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createPlace } from '@actions/auth/actions'
import { checkIfMobile } from '@helpers/checkIfMobile'
import schema from '@consts/schemas/placeSchema'
import validator from '@helpers/validator'
import NewPlacePage from '@modules/components/NewPlace/NewPlacePage'

const validate = values => validator(values, schema)

const mapDispatchToProps = dispatch => ({
  createPlace(formValues, tags, image) {
    dispatch(createPlace(formValues, tags, image))
  },
})

const mapStateToProps = state => ({
  isMobile: checkIfMobile(),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'NewPlaceForm',
    validate,
  }),
)(NewPlacePage)
