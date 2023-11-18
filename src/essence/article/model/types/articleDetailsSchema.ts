import { IArticle } from './article'

export interface ArticleDetailsSchema {
  isLoading: boolean
  error: string | null | undefined
  data: IArticle | null
}
