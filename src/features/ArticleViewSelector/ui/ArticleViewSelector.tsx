import React, { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleViewSelector.module.scss'
import { EArticleView } from 'essence/article'
import ListIcon from 'shared/assets/icons/list-24-24.svg'
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg'
import { Button, ThemeButton } from 'shared/ui/Button'
import { Icon } from 'shared/ui/Icon/Icon'

interface ArticleViewSelectorProps {
  className?: string
  view: EArticleView
  onViewClick?: (view: EArticleView) => void
}

const viewTypes = [
  { view: EArticleView.BIG, icon: ListIcon },
  { view: EArticleView.SMALL, icon: TiledIcon },
]

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = ({ className, onViewClick, view }) => {
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
          className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
          key={viewType.view}
        >
          <Icon Svg={viewType.icon} />
        </Button>
      ))}
    </div>
  )
}
