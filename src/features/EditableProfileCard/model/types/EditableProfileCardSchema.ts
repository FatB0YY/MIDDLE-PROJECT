import { IProfile, ValidateProfileError } from '@/essence/profile'

export interface ProfileSchema {
  data: IProfile | null
  form: IProfile | null
  isLoading: boolean
  error: string | null
  readonly: boolean
  validateError?: ValidateProfileError[]
}
