import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { renderWithTranslation } from 'shared/config/tests/renderWithTranslation'
import { renderWithRouter } from 'shared/config/tests/renderWithRouter'
import { StoreProvider } from 'shared/lib/store/StateProvider'

import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  test('Проверка рендера', () => {
    render(
      renderWithRouter(
        renderWithTranslation(
          <StoreProvider>
            <Sidebar />
          </StoreProvider>
        )
      )
    )

    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  test('Нажатие тоггл', () => {
    render(
      renderWithRouter(
        renderWithTranslation(
          <StoreProvider>
            <Sidebar />
          </StoreProvider>
        )
      )
    )

    const toggleBtn = screen.getByTestId('sidebar-toggle')
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()

    fireEvent.click(toggleBtn)

    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
  })
})
