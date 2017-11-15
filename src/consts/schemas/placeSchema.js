import Joi from '@config/joiOutsmart'

export default Joi.object({
  address: Joi.string().required().label('Endereço'),
  price: Joi.string().required().label('Preço'),
})
