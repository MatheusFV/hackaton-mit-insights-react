import VMasker from 'vanilla-masker';

export const phone = value => value && VMasker.toPattern(value, '(99) 9999-9999');
export const cellphone = (value) => {
  if (!value) return '';
  if (value.length > 14) {
    return VMasker.toPattern(value, '(99) 99999-9999');
  }
  return VMasker.toPattern(value, '(99) 9999-9999');
}
export const cpf = value => value && VMasker.toPattern(value, '999.999.999-99');
export const cnpj = value => value && VMasker.toPattern(value, '9999.9999.9999.9999');
