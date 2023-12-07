import { StateSchema } from 'shared/lib/store/index'

import { getProfileState } from '../model/selectors/getProfileState'
import { getProfileValidateError } from '../model/selectors/getProfileValidateErrors'
import { ValidateProfileError } from '../model/types/profile'

describe('Selectors Profile', () => {
  const mockedState: DeepPartial<StateSchema> = {
    profile: {
      data: null,
      form: null,
      error: null,
      isLoading: false,
      readonly: true,
      validateError: undefined
    }
  }

  const mockedStateWithErrors: DeepPartial<StateSchema> = {
    profile: {
      validateError: [
        ValidateProfileError.INCORRECT_AGE,
        ValidateProfileError.INCORRECT_CURRENCY
      ]
    }
  }

  test('Проверяем правильную работу getProfileState', () => {
    expect(getProfileState(mockedState as StateSchema)).toEqual({
      data: null,
      form: null,
      error: null,
      isLoading: false,
      readonly: true,
      validateError: undefined
    })
  })

  test('Проверяем правильную работу getProfileState с state null', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getProfileState(null)).toEqual({
      data: null,
      form: null,
      error: null,
      isLoading: false,
      readonly: true,
      validateError: undefined
    })
  })

  test('Проверяем правильную работу getProfileValidateError', () => {
    expect(
      getProfileValidateError(mockedStateWithErrors as StateSchema)
    ).toEqual([
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_CURRENCY
    ])
  })
})
