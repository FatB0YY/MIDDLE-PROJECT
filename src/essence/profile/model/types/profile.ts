import { Country } from 'shared/const/other'
import { ECurrency } from 'essence/currency'

export interface IProfile {
  first?: string
  lastname?: string
  age?: number
  currency?: ECurrency
  country?: Country
  city?: string
  username?: string
  avatar?: string
}

export interface ProfileSchema {
  data: IProfile | null
  form: IProfile | null
  isLoading: boolean
  error: string | null
  readonly: boolean
}
