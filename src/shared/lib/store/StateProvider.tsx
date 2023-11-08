import React, { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { StateSchema } from './types'
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import { createReduxStore } from 'shared/lib/store/index'
import { useNavigate } from 'react-router-dom'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject>
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState, asyncReducers }) => {
  const navigate = useNavigate()

  const store = createReduxStore({
    initialState: initialState as StateSchema,
    asyncReducers: asyncReducers as ReducersMapObject,
    navigate,
  })

  return <Provider store={store}>{children}</Provider>
}
