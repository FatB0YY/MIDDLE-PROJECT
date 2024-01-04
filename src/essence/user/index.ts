export { userReducer } from './model/slice/userSlice'
export {
  getUserAuthData,
  useUserAuthData
} from './model/selectors/getUserAuthData'

export type { IUser, UserSchema } from './model/types/user'

export { UserRole } from './model/const/const'

export { userActions } from './model/slice/userSlice'
export {
  isUserAdmin,
  isUserManager,
  isUserUser,
  getUserRoles
} from './model/selectors/roleSelectors'
