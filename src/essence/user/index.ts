import { userReducer } from './model/slice/userSlice'

import { getUserAuthData } from './model/selectors/getUserAuthData'

import type { IUser, UserSchema } from './model/types/user'

export { userReducer, getUserAuthData }
export type { IUser, UserSchema }
export { userActions } from './model/slice/userSlice'
export {
  isUserAdmin,
  isUserManager,
  isUserUser,
  getUserRoles
} from './model/selectors/roleSelectors'
