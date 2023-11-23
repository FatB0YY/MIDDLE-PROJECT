import { IUser } from 'essence/user'

export enum EArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
}

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

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock

export enum EArticleType {
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECO = 'ECO',
}

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

export enum EArticleView {
  BIG = 'BIG',
  SMALL = 'SMALL',
}
