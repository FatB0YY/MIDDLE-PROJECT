import React, { FC, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleTabsType.module.scss'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'
import { EArticleType } from 'essence/article/model/types/article'

interface ArticleTabsTypeProps {
  className?: string
  onChangeType: (tab: TabItem) => void
  value: string
}

export const ArticleTabsType: FC<ArticleTabsTypeProps> = ({ className, onChangeType, value }) => {
  // добавить: переводы и лучше цикл
  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: EArticleType.ALL,
        content: 'ALL',
      },
      {
        value: EArticleType.IT,
        content: 'IT',
      },
      {
        value: EArticleType.ECO,
        content: 'ECO',
      },
      {
        value: EArticleType.SCIENCE,
        content: 'SCIENCE',
      },
    ],
    []
  )

  return (
    <div className={classNames(cls.ArticleTabsType, {}, [className])}>
      <Tabs onTabClick={onChangeType} tabs={typeTabs} value={value} />
    </div>
  )
}
