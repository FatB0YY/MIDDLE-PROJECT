import { classNames } from 'shared/lib/classNames/classNames'

describe('classNames', () => {
  test('Только с первым параметром', () => {
    expect(classNames('someClass', {}, [])).toBe('someClass')
  })

  test('С доп параметрами в массиве (3-ий аргумент)', () => {
    const expected = 'someClass class1 class2'
    expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(expected)
  })

  test('С доп Модами (2-ой аргумент)', () => {
    const expected = 'someClass class1 class2 hovered'
    expect(classNames('someClass', { hovered: true }, ['class1', 'class2'])).toBe(expected)
  })

  test('С доп Модами, есть false(2-ой аргумент)', () => {
    const expected = 'someClass class1 class2 hovered'
    expect(classNames('someClass', { hovered: true, scrollable: false }, ['class1', 'class2'])).toBe(expected)
  })

  test('С доп Модами, есть undefined(2-ой аргумент)', () => {
    const expected = 'someClass class1 class2 hovered'
    expect(classNames('someClass', { hovered: true, scrollable: undefined }, ['class1', 'class2'])).toBe(expected)
  })
})
