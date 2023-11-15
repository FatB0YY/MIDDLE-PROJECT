import { Country } from 'shared/const/other'
import { fetchProfileDataThunk } from '../model/services/fetchProfileDataThunk'
import { profileReducer } from '../model/slice/profileSlice'
import { IProfile, ProfileSchema, ValidateProfileError } from '../model/types/profile'
import { ECurrency } from 'essence/currency'
import { updateProfileDataThunk } from '../model/services/updateProfileDataThunk'

describe('profileSlice extra', () => {
  const initialStateProfile: ProfileSchema = {
    data: null,
    error: null,
    form: null,
    isLoading: false,
    readonly: true,
    validateError: undefined,
  }

  test('Проверка fetchProfileDataThunk.pending', () => {
    // @ts-ignore
    const state = profileReducer(initialStateProfile, fetchProfileDataThunk.pending())

    expect(state.isLoading).toBe(true)
    expect(state.error).toBeNull()
  })

  test('Проверка fetchProfileDataThunk.rejected', () => {
    const action = {
      type: fetchProfileDataThunk.rejected.type,
      payload: 'Cant fetch',
    }

    const state = profileReducer(initialStateProfile, action)

    expect(state).toEqual({
      data: null,
      error: 'Cant fetch',
      form: null,
      isLoading: false,
      readonly: true,
      validateError: undefined,
    })
  })

  test('Проверка fetchProfileDataThunk.fulfilled', () => {
    const mockProfile: IProfile = {
      age: 11,
      avatar: 'e33',
      city: 'De',
      country: Country.ARMENIA,
      currency: ECurrency.RUB,
      first: 'Nick',
      lastname: 'Smit',
      username: 'xxx',
    }

    // @ts-ignore
    const state = profileReducer(initialStateProfile, fetchProfileDataThunk.fulfilled(mockProfile))

    expect(state).toEqual({
      data: mockProfile,
      error: null,
      form: mockProfile,
      isLoading: false,
      readonly: true,
      validateError: undefined,
    })
  })

  test('Проверка updateProfileDataThunk.pending', () => {
    // @ts-ignore
    const state = profileReducer(initialStateProfile, updateProfileDataThunk.pending())

    expect(state.isLoading).toBe(true)
    expect(state.validateError).toBeUndefined()
  })

  test('Проверка updateProfileDataThunk.rejected', () => {
    const action = {
      type: updateProfileDataThunk.rejected.type,
      payload: [ValidateProfileError.INCORRECT_CURRENCY],
    }

    const state = profileReducer(initialStateProfile, action)

    expect(state).toEqual({
      data: null,
      error: null,
      form: null,
      isLoading: false,
      readonly: true,
      validateError: [ValidateProfileError.INCORRECT_CURRENCY],
    })
  })

  test('Проверка updateProfileDataThunk.fulfilled', () => {
    const mockProfileUpdate: IProfile = {
      age: 12,
      avatar: 'e34',
      city: 'De',
      country: Country.ARMENIA,
      currency: ECurrency.RUB,
      first: 'Nick',
      lastname: 'Smit',
      username: 'xxx',
    }

    // @ts-ignore
    const state = profileReducer(initialStateProfile, updateProfileDataThunk.fulfilled(mockProfileUpdate))

    expect(state).toEqual({
      data: mockProfileUpdate,
      error: null,
      form: mockProfileUpdate,
      isLoading: false,
      readonly: true,
      validateError: undefined,
    })
  })
})