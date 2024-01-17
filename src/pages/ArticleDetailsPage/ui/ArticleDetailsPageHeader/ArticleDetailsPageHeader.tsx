import React, { useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { HStack } from '@/shared/ui/Stack'

import { Button } from '@/shared/ui/Button'

import { classNames } from '@/shared/lib/classNames/classNames'
import { getArticleDetailsData, getCanEditArticle } from '@/essence/article'
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = ({
  className
}: ArticleDetailsPageHeaderProps) => {
  const { t } = useTranslation('article')
  const navigate = useNavigate()
  const article = useSelector(getArticleDetailsData)

  const canEdit = useSelector(getCanEditArticle)

  const onBackToTheList = useCallback(() => {
    navigate(getRouteArticles())
  }, [navigate])

  const onEditArticle = useCallback(() => {
    navigate(getRouteArticleEdit(article!.id))
  }, [navigate, article?.id])

  return (
    <HStack
      max
      justify='between'
      className={classNames('', {}, [className])}
    >
      <Button onClick={onBackToTheList}>
        {t('pages.articledetailspage.backtothelist')}
      </Button>

      {canEdit && (
        <Button
          onClick={onEditArticle}
          theme='outline'
        >
          {t('pages.articledetailspage.edit')}
        </Button>
      )}
    </HStack>
  )
}
