import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { ReducersMapObject } from '@reduxjs/toolkit'

import { StateSchema } from './types'

import { createReduxStore } from './index'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject>
}

export const StoreProvider = ({
  children,
  initialState,
  asyncReducers
}: StoreProviderProps) => {
  const store = createReduxStore({
    initialState: initialState as StateSchema,
    asyncReducers: asyncReducers as ReducersMapObject<StateSchema>
  })

  return <Provider store={store}>{children}</Provider>
}
