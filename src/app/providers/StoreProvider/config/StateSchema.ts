import { CounterSchema } from 'entities/Counter/index'
import { UserSchema } from 'entities/User/index'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
}
