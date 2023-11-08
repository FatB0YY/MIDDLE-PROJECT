import { fireEvent, render, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import { renderWithTranslation } from 'shared/config/tests/renderWithTranslation'
import { renderWirhRouter } from 'shared/config/tests/renderWithRouter'

describe('Sidebar', () => {
  test('Проверка рендера', () => {
    render(renderWirhRouter(renderWithTranslation(<Sidebar />)))

    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  test('Нажатие тоггл', () => {
    render(renderWirhRouter(renderWithTranslation(<Sidebar />)))

    const toggleBtn = screen.getByTestId('sidebar-toggle')
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()

    fireEvent.click(toggleBtn)

    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
  })
})
