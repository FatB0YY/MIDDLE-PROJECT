import { StateSchema } from 'shared/lib/store'

import { ProfileSchema } from '../types/EditableProfileCardSchema'

// заглушка
const mock: ProfileSchema = {
  data: null,
  form: null,
  error: null,
  isLoading: false,
  readonly: true
}

export const getProfileState = (state: StateSchema) => state?.profile || mock
