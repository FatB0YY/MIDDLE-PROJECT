import { IUser } from 'essence/user'

export interface IComment {
  id: string
  user: IUser
  text: string
}
