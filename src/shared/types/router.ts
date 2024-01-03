import { RouteProps } from 'react-router-dom'

import { UserRole } from '@/essence/user'

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}
