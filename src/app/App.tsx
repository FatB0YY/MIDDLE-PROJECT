import React, { Suspense, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { useTheme } from './providers/ThemeProvider'
import { useActionCreators } from 'shared/lib/store'
import { userActions } from 'essence/user'

function App() {
  const { theme } = useTheme()

  // dispatch
  const actionsUser = useActionCreators(userActions)

  useEffect(() => {
    actionsUser.initAuthData()
  }, [actionsUser])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''>
        <Navbar />
        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  )
}

export default App
