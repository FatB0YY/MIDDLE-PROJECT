import { IUser } from '@/essence/user'

import { EArticleBlockType, EArticleType } from '../const/const'

export interface ArticleBlockMain {
  id: string
  type: EArticleBlockType
}

export interface ArticleCodeBlock extends ArticleBlockMain {
  type: EArticleBlockType.CODE
  code: string
}

export interface ArticleImageBlock extends ArticleBlockMain {
  type: EArticleBlockType.IMAGE
  src: string
  title: string
}

export interface ArticleTextBlock extends ArticleBlockMain {
  type: EArticleBlockType.TEXT
  title?: string
  paragraphs: string[]
}

export type ArticleBlock =
  | ArticleCodeBlock
  | ArticleImageBlock
  | ArticleTextBlock

export interface IArticle {
  id: string
  title: string
  subtitle: string
  img: string
  views: number
  createdAt: string
  type: EArticleType[]
  blocks: ArticleBlock[]
  user: IUser
}
