import React, { FC, useEffect } from 'react'
import { ReduxStoreWithManager, useAppDispatch } from 'shared/lib/store'
import { useStore } from 'react-redux'
import { StateSchemaKey } from 'shared/lib/store/types'
import { Reducer } from '@reduxjs/toolkit'

// типизируем что у нас лист редьюсеров
export type ReducersList = {
  [name in StateSchemaKey]?: Reducer
}

// типизируем кортеж
type ReducersListEntry = [StateSchemaKey, Reducer]

interface DynamicModuleLoaderProps {
  reducers: ReducersList
  removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({
  children,
  reducers,
  removeAfterUnmount = false,
}) => {
  // store
  const store = useStore() as ReduxStoreWithManager
  // dispatch
  const dispatch = useAppDispatch()

  // в момент монтирования добавляем редьюсер
  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
      store.reducerManager.add(name, reducer)
      dispatch({ type: `@INIT ${name} reducer` })
    })

    // также удаляем его после демонтации
    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, _]: ReducersListEntry) => {
          store.reducerManager.remove(name)
          dispatch({ type: `@DESTROY ${name} reducer` })
        })
      }
    }
  }, [])

  return <>{children}</>
}
