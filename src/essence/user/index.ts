import { userReducer } from './model/slice/userSlice'
import { IUser, UserSchema } from './model/types/user'
import { getUserAuthData } from './model/selectors/getUserAuthData'
import { User } from './ui/User'

export { userReducer, IUser, UserSchema, getUserAuthData, User }

export { userActions } from './model/slice/userSlice'
