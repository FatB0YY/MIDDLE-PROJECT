import { FC, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { StateSchemaKey, ReduxStoreWithManager, StateSchema } from 'shared/lib/store/index'
import { Reducer } from '@reduxjs/toolkit'

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
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
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
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey)
          dispatch({ type: `@DESTROY ${name} reducer` })
        })
      }
    }
  }, [])

  return <>{children}</>
}
