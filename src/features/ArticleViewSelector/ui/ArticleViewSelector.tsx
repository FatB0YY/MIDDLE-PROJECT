import React from 'react'

import { classNames } from 'shared/lib/classNames/classNames'

import { EArticleView } from 'essence/article'

import { Button, ThemeButton } from 'shared/ui/Button'

import { Icon } from 'shared/ui/Icon/Icon'

import ListIcon from 'shared/assets/icons/list-24-24.svg'
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg'

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
          theme={ThemeButton.CLEAR}
          onClick={onClick(viewType.view)}
          className={classNames(
            '',
            { [cls.notSelected]: viewType.view !== view },
            []
          )}
          key={viewType.view}
        >
          <Icon Svg={viewType.icon} />
        </Button>
      ))}
    </div>
  )
}
