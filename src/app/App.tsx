import React, { Suspense, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { useTheme } from './providers/ThemeProvider'
import { getUserAuthData, userActions } from 'essence/user'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { useSelector } from 'react-redux'

function App() {
  const { theme } = useTheme()
  const { _inited } = useSelector(getUserAuthData)
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
          {_inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  )
}

export default App
