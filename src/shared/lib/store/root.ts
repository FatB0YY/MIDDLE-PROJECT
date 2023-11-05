import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { counterReducer } from '../../../entities/Counter/index'
import { userReducer } from '../../../entities/User/index'
import { loginReducer } from '../../../features/AuthByUsername/model/slice/loginSlice'

const rootReducers = combineReducers({
  counter: counterReducer,
  user: userReducer,
  loginForm: loginReducer,
})

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: __IS_DEV__,
})

// export function createReduxStore(initialState?: StateSchema) {
//   const rootReducers: ReducersMapObject<StateSchema> = {
//     counter: counterReducer,
//     user: userReducer,
//     loginForm: loginReducer,
//   }

//   return configureStore<StateSchema>({
//     reducer: rootReducers,
//     devTools: __IS_DEV__,
//     preloadedState: initialState,
//   })
// }
