// ArticleListComponent.jsx
import React, { FC, memo } from 'react'
import { ArticleBlock, EArticleBlockType, IArticle } from 'essence/article/model/types/article'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import cls from './ArticleDetails.module.scss'

interface ArticleListComponentProps {
  blocks: ArticleBlock[]
}

const ArticleListComponent: FC<ArticleListComponentProps> = ({ blocks }) => (
  <>{blocks.length ? blocks.map(renderBlock) : null}</>
)

const renderBlock = (block: ArticleBlock) => {
  switch (block.type) {
    case EArticleBlockType.CODE:
      return <ArticleCodeBlockComponent key={block.id} block={block} className={cls.block} />
    case EArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent key={block.id} block={block} className={cls.block} />
    case EArticleBlockType.TEXT:
      return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />
    default:
      return null
  }
}

export default memo(ArticleListComponent)
