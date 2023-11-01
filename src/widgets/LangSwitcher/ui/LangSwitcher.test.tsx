import React from 'react'
import { render } from '@testing-library/react'
import { LangSwitcher } from './LangSwitcher'

describe('LangSwitcher', () => {
  test('Рендер компонента', () => {
    const { container } = render(<LangSwitcher />)
    expect(container).toBeInTheDocument()
  })

  test('Отображение переключателя языков с опциями', () => {
    const { getByText } = render(<LangSwitcher />)
    expect(getByText('widgets.langswitcher.optionen')).toBeInTheDocument()
    expect(getByText('widgets.langswitcher.optionru')).toBeInTheDocument()
  })

  it.todo('!ПРОВЕРКА ЧТО changeLanguage ВЫЗЫВАЕТСЯ С НУЖНЫМИ ПАРАМЕТРАМИ!')

  test('Применяет параметр className prop', () => {
    const { container } = render(<LangSwitcher className='custom-class' />)
    expect(container.querySelector('.custom-class')).toBeInTheDocument()
  })
})
