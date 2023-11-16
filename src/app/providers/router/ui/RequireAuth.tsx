import { useSelector } from 'react-redux'
import { getUserAuthData } from 'essence/user'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePath } from '../config/routeConfig'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { authData } = useSelector(getUserAuthData)
  const location = useLocation()

  if (!authData) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />
  }

  return children
}
