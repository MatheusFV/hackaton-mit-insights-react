import Joi from '@config/joiOutsmart'

export default Joi.object({
  email: Joi.string().email().required().label('E-mail'),
  password: Joi.string().min(6).required().label('Senha'),
})
