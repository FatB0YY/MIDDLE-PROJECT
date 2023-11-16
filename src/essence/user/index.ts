import { userReducer } from './model/slice/userSlice'
import type { IUser, UserSchema } from './model/types/user'
import { getUserAuthData } from './model/selectors/getUserAuthData'

export { userReducer, getUserAuthData }
export type { IUser, UserSchema }
export { userActions } from './model/slice/userSlice'
