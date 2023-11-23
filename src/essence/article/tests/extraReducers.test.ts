import { Country } from 'shared/const/other'
import { fetchArticleByIdThunk } from '../model/services/fetchArticleByIdThunk'
import { articleDetailsReducer } from '../model/slice/articleDetailsSlice'
import { EArticleType, IArticle } from '../model/types/article'
import { ECurrency } from 'essence/currency'
import { ArticleDetailsSchema } from '../model/types/articleDetailsSchema'

describe('articleDetailsSlice extra', () => {
  const initialState: ArticleDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: null,
  }

  test('Проверка fetchArticleByIdThunk.pending', () => {
    // @ts-ignore
    const state = articleDetailsReducer(initialState, fetchArticleByIdThunk.pending())

    expect(state.isLoading).toBe(true)
    expect(state.error).toBeNull()
  })

  test('Проверка fetchArticleByIdThunk.rejected', () => {
    const action = {
      type: fetchArticleByIdThunk.rejected.type,
      payload: 'Cant fetch',
    }

    const state = articleDetailsReducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      error: 'Cant fetch',
    })
  })

  test('Проверка fetchArticleByIdThunk.fulfilled', () => {
    const mockArticle: IArticle = {
      views: 0,
      type: [],
      title: '',
      subtitle: '',
      img: '',
      id: '0',
      createdAt: '',
      blocks: [],
      user: {
        id: '0',
        username: '',
      },
    }

    // @ts-ignore
    const state = articleDetailsReducer(initialState, fetchArticleByIdThunk.fulfilled(mockArticle))

    expect(state).toEqual({
      data: mockArticle,
      error: null,
      isLoading: false,
    })
  })
})
