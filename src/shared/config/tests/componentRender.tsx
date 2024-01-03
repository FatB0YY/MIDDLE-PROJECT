import React, { ReactNode } from 'react'
import { ReducersMapObject } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { render } from '@testing-library/react'

import { StoreProvider } from '../../lib/store/StateProvider'
import { StateSchema } from '../../lib/store/index'
import i18nForTests from '../i18n/i18nForTests'

export interface componentRenderOptions {
  route?: string
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export function componentRender(
  component: ReactNode,
  options: componentRenderOptions = {}
) {
  const { route = '/', initialState, asyncReducers } = options

  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider
        asyncReducers={asyncReducers}
        initialState={initialState}
      >
        <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}
