import React, { useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { HStack } from 'shared/ui/Stack'
import { classNames } from 'shared/lib/classNames/classNames'
import { RoutePath } from 'app/providers/router/config/routeConfig'
import { Button, ThemeButton } from 'shared/ui/Button'
import { getArticleDetailsData, getCanEditArticle } from 'essence/article'

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
    navigate(RoutePath.articles)
  }, [navigate])

  const onEditArticle = useCallback(() => {
    // далее улучшу
    navigate(`${RoutePath.articles_details}${article?.id}edit`)
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
          theme={ThemeButton.OUTLINE}
        >
          {t('pages.articledetailspage.edit')}
        </Button>
      )}
    </HStack>
  )
}
