import { StateSchema } from '@/shared/lib/store'

import { JsonSettings } from '../types/jsonSettings'

const defaultJsonSetting: JsonSettings = {}

export const getUserJsonSettings = (state: StateSchema) =>
  state.user?.authData?.jsonSettings ?? defaultJsonSetting
