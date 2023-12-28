import { ECurrency } from '@/essence/currency'

import { Country } from '@/shared/const/other'

import { profileActions } from '@/features/EditableProfileCard/model/slice/profileSlice'
import { profileReducer } from '@/features/EditableProfileCard/model/slice/profileSlice'
import { ProfileSchema } from '@/features/EditableProfileCard'

describe('profileSlice reducers', () => {
  const mockedState: ProfileSchema = {
    data: null,
    error: null,
    form: null,
    isLoading: false,
    readonly: true,
    validateError: undefined
  }

  const mockedState2: ProfileSchema = {
    data: { currency: ECurrency.USD },
    error: null,
    form: null,
    isLoading: false,
    readonly: true,
    validateError: undefined
  }

  const mockedState3: ProfileSchema = {
    data: null,
    error: null,
    form: { country: Country.ARMENIA },
    isLoading: false,
    readonly: true,
    validateError: undefined
  }

  test('Проверяем, что возвращается дефолтный стейт', () => {
    const result = profileReducer(undefined, { type: '' })

    expect(result).toEqual(mockedState)
  })

  test('Проверяем правильную работу canselEdit', () => {
    const action = { type: profileActions.cancelEdit.type }

    const result = profileReducer(mockedState2, action)

    expect(result.form).toEqual(mockedState2.data)
  })

  test('Проверяем правильную работу setReadonly', () => {
    const action = { type: profileActions.setReadonly.type, payload: false }

    const result = profileReducer(mockedState, action)

    expect(result.readonly).toBe(false)
  })

  test('Проверяем правильную работу updateProfile', () => {
    const action = {
      type: profileActions.updateProfile.type,
      payload: { country: Country.RUSSIA }
    }

    const result = profileReducer(mockedState3, action)

    expect(result.form?.country).toBe(Country.RUSSIA)
  })
})
