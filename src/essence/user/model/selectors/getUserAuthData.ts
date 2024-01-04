import { buildSelector } from '@/shared/lib/store'

export const [useUserAuthData, getUserAuthData] = buildSelector(
  (state) => state.user
)
