import { fireEvent, render, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import { renderWithTranslation } from 'shared/config/tests/renderWithTranslation'
import { renderWirhRouter } from 'shared/config/tests/renderWithRouter'
import { StoreProvider } from 'shared/lib/store/StateProvider'

describe('Sidebar', () => {
  test('Проверка рендера', () => {
    render(
      renderWirhRouter(
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
      renderWirhRouter(
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
