import type { store } from './root'
import { CounterSchema } from 'entities/Counter/index'
import { UserSchema } from 'entities/User/index'
import { LoginSchema } from 'features/AuthByUsername/index'

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  loginForm: LoginSchema
}
