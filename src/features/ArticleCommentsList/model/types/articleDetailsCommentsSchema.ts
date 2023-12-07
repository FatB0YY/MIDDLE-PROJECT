import { EntityState } from '@reduxjs/toolkit'

import { IComment } from 'essence/comment'

// автоматически добавляем ids и entities
export interface articleDetailsCommentsSchema extends EntityState<IComment> {
  isLoading?: boolean
  error?: string
}
