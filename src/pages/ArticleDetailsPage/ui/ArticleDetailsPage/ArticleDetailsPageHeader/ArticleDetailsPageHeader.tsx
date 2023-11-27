import React, { FC, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPageHeader.module.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'app/providers/router/config/routeConfig'
import { Button, ThemeButton } from 'shared/ui/Button'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'essence/user'
import { getArticleDetailsData, getCanEditArticle } from 'essence/article'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = ({ className }) => {
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
    <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
      <Button onClick={onBackToTheList}>{t('pages.articledetailspage.backtothelist')}</Button>

      {canEdit && (
        <Button onClick={onEditArticle} theme={ThemeButton.OUTLINE} className={cls.edit}>
          {t('pages.articledetailspage.edit')}
        </Button>
      )}
    </div>
  )
}
