import pick from 'lodash/pick'
import Joi from '@config/joiOutsmart'
import language from '@config/joi'
import { deserializeFormErrors } from './form_errors';


export default (values, schema) => {
  const interestingValues = schema._inner.children.map(child => child.key)
  const result = Joi.validate(
    pick(values, interestingValues), schema, { abortEarly: false, language });
  return deserializeFormErrors(result)
}
