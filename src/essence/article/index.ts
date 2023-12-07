export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
export { IArticle, EArticleView } from './model/types/article'
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
export {
  articleDetailsActions,
  articleDetailsReducer
} from './model/slice/articleDetailsSlice'
export { getArticleDetailsData } from './model/selectors/articleDetailsSelectors'
export { ArticleList } from './ui/ArticleList/ArticleList'

export { getCanEditArticle } from './model/selectors/article'
