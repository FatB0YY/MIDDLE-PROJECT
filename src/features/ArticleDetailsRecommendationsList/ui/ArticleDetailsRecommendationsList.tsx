import React, { FC, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsRecommendationsList.module.scss'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import {
  articleDetailsPageRecommendationsReducer,
  getArticleRecommendations,
} from '../model/slice/ArticleDetailsRecommendationsListSlice'
import { useSelector } from 'react-redux'
import {
  getArticleRecommendationsListError,
  getArticleRecommendationsListIsLoading,
} from '../model/selectors/ArticleDetailsRecommendationsListSelectors'
import { Text, TextSize } from 'shared/ui/Text'
import { ArticleList } from 'essence/article'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { fetchArticleDetailsRecommendationsListThunk } from '../model/services/fetchArticleDetailsRecommendationsList'

interface ArticleDetailsRecommendationsListProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailaRecommendations: articleDetailsPageRecommendationsReducer,
}

const allActions = {
  fetchRecommend: fetchArticleDetailsRecommendationsListThunk,
}

export const ArticleDetailsRecommendationsList: FC<ArticleDetailsRecommendationsListProps> = ({ className }) => {
  const recommendations = useSelector(getArticleRecommendations.selectAll)
  const error = useSelector(getArticleRecommendationsListError)
  const isLoading = useSelector(getArticleRecommendationsListIsLoading)
  const actions = useActionCreatorsTyped(allActions)

  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      actions.fetchRecommend()
    }
  }, [actions.fetchRecommend])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames(cls.ArticleDetailsRecommendationsList, {}, [className])}>
        <Text size={TextSize.L} className={cls.commentListTitle} title={'Рекомендуем (перевод!)'} />
        <ArticleList target={'_blank'} className={cls.recommendList} isLoading={isLoading} articles={recommendations} />
      </div>
    </DynamicModuleLoader>
  )
}
