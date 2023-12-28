import { Country } from '@/shared/const/other'
import { ECurrency } from '@/essence/currency'

export interface IProfile {
  first?: string
  lastname?: string
  age?: number
  currency?: ECurrency
  country?: Country
  city?: string
  username?: string
  avatar?: string
  id?: string
}

export enum ValidateProfileError {
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_AGE = 'INCORRECT_AGE',
  INCORRECT_CURRENCY = 'INCORRECT_CURRENCY',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR'
}
