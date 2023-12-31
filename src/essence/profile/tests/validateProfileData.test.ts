import { ECurrency } from '@/essence/currency'

import { validateProfile } from '@/features/EditableProfileCard' // замените на путь к вашему модулю

import { ValidateProfileError } from '../model/types/profile'

describe('validateProfile function', () => {
  test('returns NO_DATA error when profile is null', () => {
    const errors = validateProfile(null)
    expect(errors).toContain(ValidateProfileError.NO_DATA)
  })

  test('incorrect all', () => {
    const errors = validateProfile({})
    expect(errors).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_CURRENCY
    ])
  })

  describe('returns INCORRECT_USER_DATA error when', () => {
    test('first is missing', () => {
      const errors = validateProfile({
        lastname: 'Doe',
        age: 25,
        currency: ECurrency.USD
      })
      expect(errors).toContain(ValidateProfileError.INCORRECT_USER_DATA)
    })

    test('lastname is missing', () => {
      const errors = validateProfile({
        first: 'John',
        age: 25,
        currency: ECurrency.USD
      })
      expect(errors).toContain(ValidateProfileError.INCORRECT_USER_DATA)
    })
  })

  describe('returns INCORRECT_AGE error when', () => {
    test('age is missing', () => {
      const errors = validateProfile({
        first: 'John',
        lastname: 'Doe',
        currency: ECurrency.USD
      })
      expect(errors).toContain(ValidateProfileError.INCORRECT_AGE)
    })

    test('age is not an integer', () => {
      const errors = validateProfile({
        first: 'John',
        lastname: 'Doe',
        age: 25.5,
        currency: ECurrency.USD
      })
      expect(errors).toContain(ValidateProfileError.INCORRECT_AGE)
    })
  })

  describe('returns INCORRECT_CURRENCY error when', () => {
    test('currency is missing', () => {
      const errors = validateProfile({
        first: 'John',
        lastname: 'Doe',
        age: 25
      })
      expect(errors).toContain(ValidateProfileError.INCORRECT_CURRENCY)
    })

    test('currency is not a valid ECurrency value', () => {
      const errors = validateProfile({
        first: 'John',
        lastname: 'Doe',
        age: 25,
        currency: undefined
      })
      expect(errors).toContain(ValidateProfileError.INCORRECT_CURRENCY)
    })
  })

  test('returns empty array for a valid profile', () => {
    const validProfile = {
      first: 'John',
      lastname: 'Doe',
      age: 25,
      currency: ECurrency.USD
    }
    const errors = validateProfile(validProfile)
    expect(errors).toHaveLength(0)
  })
})
