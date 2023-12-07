import React from 'react'

import { useSelector } from 'react-redux'

import { Navigate, useLocation } from 'react-router-dom'

import { getUserAuthData } from 'essence/user'

import { RoutePath } from '../config/routeConfig'

export function RequireAuth({ children }: Readonly<{ children: JSX.Element }>) {
  const { authData } = useSelector(getUserAuthData)
  const location = useLocation()

  if (!authData) {
    return (
      <Navigate
        to={RoutePath.main}
        state={{ from: location }}
        replace
      />
    )
  }

  return children
}
