import { ECurrency } from 'essence/currency'
import { IProfile, ValidateProfileError } from '../types/profile'

// Функция для проверки, что значение принадлежит к ECurrency
function isECurrency(value: any): value is ECurrency {
  return Object.values(ECurrency).includes(value)
}

export const validateProfile = (profile: IProfile | null) => {
  const errors: ValidateProfileError[] = []

  if (!profile) {
    errors.push(ValidateProfileError.NO_DATA)
    return errors
  }

  const { first, lastname, age, currency } = profile

  if (!first || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA)
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE)
  }

  if (!currency || !isECurrency(currency)) {
    errors.push(ValidateProfileError.INCORRECT_CURRENCY)
  }

  return errors
}
