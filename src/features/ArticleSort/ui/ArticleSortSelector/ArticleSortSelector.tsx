import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { SelectOption } from '@/shared/ui/Select'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { SortOrder } from '@/shared/types/sort'
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Listbox } from '@/shared/ui/Popups'

import { EArticleSortField } from '../../model/const/const'
import { articleSortReducer } from '../../model/slice/articleSortSlice'

import cls from './ArticleSortSelector.module.scss'

interface ArticleSortSelectorProps {
  className?: string
  sort: EArticleSortField
  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: EArticleSortField) => void
}

const reducers: ReducersList = {
  articleSort: articleSortReducer
}

export const ArticleSortSelector = ({
  className,
  onChangeSort,
  onChangeOrder,
  order,
  sort
}: ArticleSortSelectorProps) => {
  const { t } = useTranslation('article')

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      { value: 'asc', content: t('features.articlesortselector.ascending') },
      { value: 'desc', content: t('features.articlesortselector.descending') }
    ],
    [t]
  )

  const sortFieldOptions = useMemo<SelectOption<EArticleSortField>[]>(
    () => [
      {
        value: EArticleSortField.VIEWS,
        content: t('features.articlesortselector.views')
      },
      {
        value: EArticleSortField.CREATED,
        content: t('features.articlesortselector.created')
      },
      {
        value: EArticleSortField.TITLE,
        content: t('features.articlesortselector.title')
      }
    ],
    [t]
  )
  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount={false}
    >
      <HStack
        gap='16'
        max
        className={classNames(cls.ArticleSortSelector, {}, [className])}
      >
        <Listbox
          onChange={onChangeSort}
          className={cls.sortField}
          items={sortFieldOptions}
          value={sort}
        />
        <Listbox
          onChange={onChangeOrder}
          className={cls.order}
          items={orderOptions}
          value={order}
        />
      </HStack>
    </DynamicModuleLoader>
  )
}
