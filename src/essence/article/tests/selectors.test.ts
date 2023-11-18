import { EArticleBlockType, EArticleType } from '../model/types/article'
import {
  getArticleDetailsState,
  getArticleDetailsData,
  getArticleDetailsisLoading,
  getArticleDetailsError,
} from '../model/selectors/articleDetailsSelectors'
import { StateSchema } from 'shared/lib/store'

describe('articleDetailsSelectors', () => {
  const mockState: DeepPartial<StateSchema> = {
    articleDetails: {
      isLoading: false,
      error: null,
      data: {
        createdAt: '24.23.23',
        id: '1',
        img: 'r',
        subtitle: 'rfr',
        title: 'rfrf',
        type: [EArticleType.IT],
        views: 334,
        blocks: [{ type: EArticleBlockType.CODE, code: 'rr', id: '1' }],
      },
    },
  }

  test('Правильная рабата getArticleDetailsState', () => {
    const result = getArticleDetailsState(mockState as StateSchema)
    expect(result).toEqual(mockState.articleDetails)
  })

  test('Правильная рабата articleDetails data', () => {
    const result = getArticleDetailsData(mockState as StateSchema)
    expect(result).toEqual(mockState.articleDetails!.data)
  })

  test('Правильная рабата articleDetails isLoading', () => {
    const result = getArticleDetailsisLoading(mockState as StateSchema)
    expect(result).toEqual(mockState.articleDetails!.isLoading)
  })

  test('Правильная рабата articleDetails error', () => {
    const result = getArticleDetailsError(mockState as StateSchema)
    expect(result).toEqual(mockState.articleDetails!.error)
  })
})
