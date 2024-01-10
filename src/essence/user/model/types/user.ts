import { FeatureFlags } from '@/shared/types/featureFlags'

import { UserRole } from '../const/const'

import { JsonSettings } from './jsonSettings'

export interface IUser {
  id: string
  username: string
  avatar?: string
  roles?: UserRole[]
  features?: FeatureFlags
  jsonSettings?: JsonSettings
}

export interface UserSchema {
  authData: IUser | null
  isLoading?: boolean
  _initiated: boolean
}
