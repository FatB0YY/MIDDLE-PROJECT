import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from 'shared/lib/store'

export const getSaveScroll = (state: StateSchema) => state.saveScroll.scroll

// получаем конкретный участок скролла по пути
export const getSaveScrollByPath = createSelector(
  // получаем весь объект
  getSaveScroll,
  // передаем путь (articles / main / about)
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0
)
