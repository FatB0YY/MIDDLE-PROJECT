import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { IArticle } from '@/essence/article'

import { ArticleDetailsRecommendationsList } from './ArticleDetailsRecommendationsList'

export default {
  title: 'FEATURES/ArticleDetailsRecommendationsList',
  component: ArticleDetailsRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleDetailsRecommendationsList>

const Template: ComponentStory<typeof ArticleDetailsRecommendationsList> = (
  args
) => <ArticleDetailsRecommendationsList {...args} />

const article: IArticle = {
  id: '1',
  img: '',
  createdAt: '',
  views: 123,
  user: { id: '1', username: '123' },
  blocks: [],
  type: [],
  title: '123',
  subtitle: 'asfsa'
}

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
Normal.parameters = {
  mockData: [
    {
      url: `${__API_URL__}/articles?_limit=3`,
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' },
        { ...article, id: '3' }
      ]
    }
  ]
}
