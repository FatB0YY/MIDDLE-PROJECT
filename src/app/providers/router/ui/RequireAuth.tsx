import React, { useMemo } from 'react'

import { useSelector } from 'react-redux'

import { Navigate, useLocation } from 'react-router-dom'

import { UserRole } from 'essence/user'
import { getUserAuthData, getUserRoles } from 'essence/user'

import { RoutePath } from '../config/routeConfig'

interface RequireAuthProps {
  children: JSX.Element
  roles?: UserRole[]
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const { authData } = useSelector(getUserAuthData)
  const location = useLocation()
  const userRoles = useSelector(getUserRoles)

  const hasRequireRoles = useMemo(() => {
    if (!roles) {
      return true
    }

    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole)
      return hasRole
    })
  }, [roles, userRoles])

  if (!authData) {
    return (
      <Navigate
        to={RoutePath.main}
        state={{ from: location }}
        replace
      />
    )
  }

  if (!hasRequireRoles) {
    return (
      <Navigate
        to={RoutePath.forbidden}
        state={{ from: location }}
        replace
      />
    )
  }

  return children
}
