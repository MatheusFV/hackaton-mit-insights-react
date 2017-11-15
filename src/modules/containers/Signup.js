import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { signup } from '@actions/auth/actions'

import schema from '@consts/schemas/signupSchema'
import validator from '@helpers/validator'
import { checkIfMobile } from '@helpers/checkIfMobile'

import SignUpPage from '@components/SignUp/SignUpPage'

// Inserir validador em todos os containeirs de forms
const validate = values => validator(values, schema)

// Mapea as funções que o componente principal terá acesso
const mapDispatchToProps = dispatch => ({
  signup(formValues) {
    // Dispara uma ação
    dispatch(signup(formValues))
  },
})

// Mapea as propriedades do estado que o componente principal terá acesso
const mapStateToProps = state => ({
  authLoading: state.auth.get('authLoading'),
  isMobile: checkIfMobile(),
})

export default compose(
    // Linka o componente com o redux
    connect(mapStateToProps, mapDispatchToProps),
    // Inclui o redux-form no componente principal(InitialScreenPage)
    reduxForm({
      form: 'SignInForm',
      validate,
    }),
)(SignUpPage)
