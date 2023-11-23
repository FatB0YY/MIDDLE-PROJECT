import React, { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { StateSchema } from './types'
import { ReducersMapObject } from '@reduxjs/toolkit'
import { createReduxStore } from 'shared/lib/store/index'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject>
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState, asyncReducers }) => {
  const store = createReduxStore({
    initialState: initialState as StateSchema,
    asyncReducers: asyncReducers as ReducersMapObject<StateSchema>,
  })

  return <Provider store={store}>{children}</Provider>
}
