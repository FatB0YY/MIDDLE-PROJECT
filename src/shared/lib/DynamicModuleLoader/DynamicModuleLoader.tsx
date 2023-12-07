import React, { ReactNode, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'

import { Reducer } from '@reduxjs/toolkit'

/* eslint-disable */
import {
  StateSchemaKey,
  ReduxStoreWithManager,
  StateSchema
} from 'shared/lib/store/index'
/* eslint-enable */

export type ReducersList = {
  /**
   * Мы не передаем просто тип Reducer с какой то any Схемой
   * конкретно указываем: забираем поле из СтейтСхемы
   * в зависимости от того, какое название редьюсера разработчик указал
   * @param params
   */
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>
}

interface DynamicModuleLoaderProps {
  reducers: ReducersList
  removeAfterUnmount?: boolean
  children: ReactNode
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const { children, reducers, removeAfterUnmount } = props

  const store = useStore() as ReduxStoreWithManager
  const dispatch = useDispatch()

  useEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap()

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey]

      // добавляем новый редьюсер только если его нет
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer)
        dispatch({ type: `@INIT ${name} reducer` })
      }
    })

    return () => {
      if (removeAfterUnmount) {
        /* eslint-disable */
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey)
          dispatch({ type: `@DESTROY ${name} reducer` })
        })
        /* eslint-enable */
      }
    }
  }, [dispatch, reducers, removeAfterUnmount, store.reducerManager])

  return <>{children}</>
}
