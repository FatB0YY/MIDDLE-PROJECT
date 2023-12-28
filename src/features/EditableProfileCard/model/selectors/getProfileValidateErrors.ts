import { StateSchema } from '@/shared/lib/store'

export const getProfileValidateError = (state: StateSchema) =>
  state.profile?.validateError
