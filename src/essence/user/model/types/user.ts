import { UserRole } from '../const/const'

export interface IUser {
  id: string
  username: string
  avatar?: string
  roles?: UserRole[]
}

export interface UserSchema {
  authData: IUser | null
  _initiated: boolean
}
