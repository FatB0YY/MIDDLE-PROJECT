import { StateSchema } from '@/shared/lib/store/index'

import { LoginSchema } from '../types/loginSchema'

// заглушка
const mock: LoginSchema = {
  error: null,
  isLoading: false,
  password: '',
  username: ''
}

export const getLoginState = (state: StateSchema) => state?.loginForm || mock
