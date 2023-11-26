import React, { FC, useCallback, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleSortSelector.module.scss'
import { useTranslation } from 'react-i18next'
import { Select } from 'shared/ui/Select'
import { SelectOption } from 'shared/ui/Select/ui/Select'
import { EArticleSortField } from '../../model/types/articlesort'
import { SortOrder } from 'shared/types/sort'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { articleSortReducer } from '../../model/slice/articleSortSlice'

interface ArticleSortSelectorProps {
  className?: string
  sort: EArticleSortField
  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: EArticleSortField) => void
}

const reducers: ReducersList = {
  articleSort: articleSortReducer,
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = ({
  className,
  onChangeSort,
  onChangeOrder,
  order,
  sort,
}) => {
  const { t } = useTranslation('article')

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      { value: 'asc', content: t('features.articlesortselector.ascending') },
      { value: 'desc', content: t('features.articlesortselector.descending') },
    ],
    [t]
  )

  const sortFieldOptions = useMemo<SelectOption<EArticleSortField>[]>(
    () => [
      { value: EArticleSortField.VIEWS, content: t('features.articlesortselector.views') },
      { value: EArticleSortField.CREATED, content: t('features.articlesortselector.created') },
      { value: EArticleSortField.TITLE, content: t('features.articlesortselector.title') },
    ],
    [t]
  )
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select<EArticleSortField>
          onChange={onChangeSort}
          className={cls.sortField}
          options={sortFieldOptions}
          label={t('features.articlesortselector.select')}
          value={sort}
        />
        <Select<SortOrder>
          onChange={onChangeOrder}
          className={cls.order}
          options={orderOptions}
          label={t('features.articlesortselector.by')}
          value={order}
        />
      </div>
    </DynamicModuleLoader>
  )
}
