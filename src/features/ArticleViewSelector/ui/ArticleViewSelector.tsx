import React from 'react'

import { Button } from '@/shared/ui/Button'

import { Icon } from '@/shared/ui/Icon'

import { classNames } from '@/shared/lib/classNames/classNames'

import { EArticleView } from '@/essence/article'

import ListIcon from '@/shared/assets/icons/list-24-24.svg'
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg'

import cls from './ArticleViewSelector.module.scss'

interface ArticleViewSelectorProps {
  className?: string
  view: EArticleView
  onViewClick?: (view: EArticleView) => void
}

const viewTypes = [
  { view: EArticleView.BIG, icon: ListIcon },
  { view: EArticleView.SMALL, icon: TiledIcon }
]

export const ArticleViewSelector = ({
  className,
  onViewClick,
  view
}: ArticleViewSelectorProps) => {
  const onClick = (newView: EArticleView) => {
    return () => {
      onViewClick?.(newView)
    }
  }

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          theme='icon_outline'
          onClick={onClick(viewType.view)}
          className={classNames(
            cls.viewTab,
            { [cls.notSelected]: viewType.view !== view },
            []
          )}
          key={viewType.view}
        >
          <Icon
            // width={'24px'}
            // height={'24px'}
            Svg={viewType.icon}
          />
        </Button>
      ))}
    </div>
  )
}
