import {
  IProfile,
  ValidateProfileError
} from '@/essence/profile/model/types/profile'

export interface ProfileSchema {
  data: IProfile | null
  form: IProfile | null
  isLoading: boolean
  error: string | null
  readonly: boolean
  validateError?: ValidateProfileError[]
}
