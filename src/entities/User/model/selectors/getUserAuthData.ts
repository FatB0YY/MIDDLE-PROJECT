import { StateSchema } from 'shared/lib/store/index'

export const getUserAuthData = (state: StateSchema) => state.user.authData
