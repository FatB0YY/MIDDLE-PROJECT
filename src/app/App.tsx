import React, { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { getUserAuthData, userActions } from '@/essence/user'
import { useActionCreatorsTyped } from '@/shared/lib/store'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

import { AppRouter } from './providers/router'

function App() {
  const { theme } = useTheme()
  const { _initiated } = useSelector(getUserAuthData)
  const actionsUser = useActionCreatorsTyped(userActions)

  useEffect(() => {
    actionsUser.initAuthData()
  }, [actionsUser.initAuthData])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''>
        <Navbar />
        <div className='content-page'>
          <Sidebar />
          {_initiated && <AppRouter />}
        </div>
      </Suspense>
    </div>
  )
}

export default App
