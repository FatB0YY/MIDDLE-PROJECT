import React, { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import {
  getUserAuthData,
  getUserJsonSettings,
  initAuthData
} from '@/essence/user'
import { useAppDispatch } from '@/shared/lib/store'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout'

import { AppRouter } from './providers/router'
import { useAppToolbar } from './lib/useAppToolbar'
import { ThemeProvider } from './providers/ThemeProvider'

const App = () => {
  const { theme } = useTheme()
  const { _initiated, isLoading } = useSelector(getUserAuthData)
  const dispatch = useAppDispatch()
  const toolbar = useAppToolbar()

  useEffect(() => {
    if (!_initiated) {
      dispatch(initAuthData())
    }
  }, [dispatch, _initiated])

  if (isLoading || !_initiated) {
    return <AppLoaderLayout />
  }

  return (
    <div
      id='app'
      className={classNames('app', {}, [theme])}
    >
      <Suspense fallback=''>
        <MainLayout
          content={<AppRouter />}
          header={<Navbar />}
          sidebar={<Sidebar />}
          toolbar={toolbar}
        />
      </Suspense>
    </div>
  )
}

const withTheme = (Component: React.ComponentType) => {
  const WrappedComponent = () => {
    const { theme: defaultTheme } = useSelector(getUserJsonSettings)
    return (
      <ThemeProvider initialTheme={defaultTheme}>
        <Component />
      </ThemeProvider>
    )
  }

  // Добавляем display name к WrappedComponent
  WrappedComponent.displayName = `withTheme(${
    Component.displayName || Component.name
  })`

  return WrappedComponent
}

export default withTheme(App)
