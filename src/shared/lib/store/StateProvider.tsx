import React, { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { StateSchema } from './types'
import { configureStore, DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import { counterReducer } from '../../../entities/Counter/index'
import { userReducer } from '../../../entities/User/index'
import { loginReducer } from '../../../features/AuthByUsername/model/slice/loginSlice'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: DeepPartial<StateSchema>
}

// подумал и решил не делать асинк редьюсеры для тестов

// пока что заглушка для тестов!!! ----------------------------------------------
export function createReduxStore(initialState?: DeepPartial<StateSchema>) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer,
  }

  return configureStore<DeepPartial<StateSchema>>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  })
}
// пока что заглушка для тестов!!! ----------------------------------------------

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState }) => {
  const store = createReduxStore(initialState)

  return <Provider store={store}>{children}</Provider>
}
