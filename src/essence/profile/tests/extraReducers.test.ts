import { Country } from '@/shared/const/other'

import { ECurrency } from '@/essence/currency'

import { fetchProfileDataThunk } from '@/features/EditableProfileCard/model/services/fetchProfileDataThunk'
import { profileReducer } from '@/features/EditableProfileCard/model/slice/profileSlice'
import { ProfileSchema } from '@/features/EditableProfileCard'
import { updateProfileDataThunk } from '@/features/EditableProfileCard/model/services/updateProfileDataThunk'

import { ValidateProfileError } from '../model/types/profile'
import { IProfile } from '../model/types/profile'

describe('profileSlice extra', () => {
  const initialStateProfile: ProfileSchema = {
    data: null,
    error: null,
    form: null,
    isLoading: false,
    readonly: true,
    validateError: undefined
  }

  test('Проверка fetchProfileDataThunk.pending', () => {
    const state = profileReducer(
      initialStateProfile,
      fetchProfileDataThunk.pending
    )

    expect(state.isLoading).toBe(true)
    expect(state.error).toBeNull()
  })

  test('Проверка fetchProfileDataThunk.rejected', () => {
    const action = {
      type: fetchProfileDataThunk.rejected.type,
      payload: 'Cant fetch'
    }

    const state = profileReducer(initialStateProfile, action)

    expect(state).toEqual({
      data: null,
      error: 'Cant fetch',
      form: null,
      isLoading: false,
      readonly: true,
      validateError: undefined
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
      username: 'xxx'
    }

    const state = profileReducer(
      initialStateProfile,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fetchProfileDataThunk.fulfilled(mockProfile)
    )

    expect(state).toEqual({
      data: mockProfile,
      error: null,
      form: mockProfile,
      isLoading: false,
      readonly: true,
      validateError: undefined
    })
  })

  test('Проверка updateProfileDataThunk.pending', () => {
    const state = profileReducer(
      initialStateProfile,
      updateProfileDataThunk.pending
    )

    expect(state.isLoading).toBe(true)
    expect(state.validateError).toBeUndefined()
  })

  test('Проверка updateProfileDataThunk.rejected', () => {
    const action = {
      type: updateProfileDataThunk.rejected.type,
      payload: [ValidateProfileError.INCORRECT_CURRENCY]
    }

    const state = profileReducer(initialStateProfile, action)

    expect(state).toEqual({
      data: null,
      error: null,
      form: null,
      isLoading: false,
      readonly: true,
      validateError: [ValidateProfileError.INCORRECT_CURRENCY]
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
      username: 'xxx'
    }

    const state = profileReducer(
      initialStateProfile,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      updateProfileDataThunk.fulfilled(mockProfileUpdate)
    )

    expect(state).toEqual({
      data: mockProfileUpdate,
      error: null,
      form: mockProfileUpdate,
      isLoading: false,
      readonly: true,
      validateError: undefined
    })
  })
})
