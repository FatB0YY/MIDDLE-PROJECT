import React, { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { getUserAuthData, initAuthData } from '@/essence/user'
import { useAppDispatch } from '@/shared/lib/store'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { ToggleFeatures } from '@/shared/lib/features'
import { MainLayout } from '@/shared/layouts/MainLayout'

import { AppRouter } from './providers/router'

function App() {
  const { theme } = useTheme()
  const { _initiated, isLoading } = useSelector(getUserAuthData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initAuthData())
  }, [dispatch])

  if (isLoading || !_initiated) {
    return 'Loading...'
  }

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''>
        <MainLayout
          content={<AppRouter />}
          header={<Navbar />}
          sidebar={<Sidebar />}
          toolbar={<div>toolbar</div>}
        />
      </Suspense>
    </div>
  )
}

export default App
