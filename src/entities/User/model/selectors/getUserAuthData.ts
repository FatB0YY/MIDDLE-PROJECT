import { StateSchema } from 'shared/lib/store/types'

export const getUserAuthData = (state: StateSchema) => state.user.authData
