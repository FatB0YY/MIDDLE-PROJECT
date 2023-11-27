import React, { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleEditPage.module.scss'
import { Page } from 'widgets/Page/Page'
import { useParams } from 'react-router-dom'

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage: FC<ArticleEditPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  return <Page className={classNames(cls.ArticleEditPage, {}, [className])}>{isEdit ? 'edit' : 'create'}</Page>
}

export default memo(ArticleEditPage)
