# MIDDLE-PROJECT

## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev или npm run start:vite + npm run start:server - запуск сервера + frontend проекта в dev режиме
```

---

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run start:vite` - Запуск frontend проекта на vite
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `npm run start:server` - Запуск backend сервера
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run typecheck` - Запуск tsc --skipLibCheck
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run test:unit` - Хапуск unit тестов с jest
- `npm run test:ui` - Хапуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение новых скриншотов
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов
- `npm run test:ui:html` - Генерация HTML отчета для скриншотных тестов
- `npm run sb` - Запуск Storybook
- `npm run sb:build` - Сборка storybook билда
- `npm run prepare` - Прекоммит хуки
- `npm run generate:slice` - Скрипт для генерации FSD слайсов

---

## Взаимодействие со стейтом, работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

Также для правильной типизированной работы с async actions и dispatch, используется useActionCreatorsTyped:

```typescript jsx
export const useActionCreatorsTyped = <
  Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject
>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch()

  const memoizedActions = useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  )

  return memoizedActions
}
```

Пример использования:

```typescript jsx
const actionsUser = useActionCreatorsTyped(userActions)
useEffect(() => {
  actionsUser.initAuthData()
}, [actionsUser.initAuthData])
```

Подробнее о хуке - [useActionCreatorsTyped](/src/shared/lib/store/hook.ts)

---

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

## Тесты

В проекте используются 3 вида тестов:

1. Обычные unit тесты на jest - `npm run test:unit`
2. Тесты на компоненты с React testing library -`npm run test:unit`
3. Скриншотное тестирование с loki `npm run test:ui`

Подробнее о тестах - [документация тестирование](/docs/tests.md)

---

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint-plugin-fatboyy-plugin1,
который содержит 3 правила

1. path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2. layer-imports - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и essence)
3. public-api-imports - разрешает импорт из других модулей только из public api.

##### Запуск линтеров

- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:

- `npm run sb`

Подробнее о [Storybook](/docs/storybook.md)

Пример:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'SHARED/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
```

---

## Конфигурация проекта

Для разработки проект содержит 2 конфига:

1. Webpack - ./config/build
2. vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в /config

- /config/babel - babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

---

## Работа с feature-flags

Разрешено использование feature flags только с помощью хелпера toggleFeatures

В него передается объект с опциями:

{
name: название фича-флага,
on: ф-ция, которая отрабатывает после включения флага,
off: ф-ция, которая отрабатывает после выключения флага
}
Для автоматического удаления фичи использовать скрипт remove-feature.ts,
который принимает два аргумента:

1. Название удаляемого фича-флага
2. Состояние (on/off)

---

## CI pipeline и pre commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

В прекоммит хуках проверяем проект линтерами, конфиг в /.husky

---

## Сущности (essence)

- [Article](/src/essence/article)
- [Comment](/src/essence/comment)
- [Country](/src/essence/country)
- [Currency](/src/essence/currency)
- [Notification](/src/essence/notification)
- [Profile](/src/essence/profile)
- [Rating](/src/essence/rating)
- [User](/src/essence/user)

## Фичи (features)

- [addNewComment](/src/features/addNewComment)
- [ArticleRating](/src/features/ArticleRating)
- [ArticleDetailsRecommendationsList](/src/features/ArticleDetailsRecommendationsList)
- [ArticleSort](/src/features/ArticleSort)
- [ArticleDetailsCommenst](/src/features/ArticleDetailsCommenst)
- [AuthByUsername](/src/features/AuthByUsername)
- [AvatarDropdown](/src/features/AvatarDropdown)
- [EditableProfileCard](/src/features/EditableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [NotificationButton](/src/features/NotificationButton)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [ScrollSave](/src/features/ScrollSave)
- [LangSwitcher](/src/features/LangSwitcher)

## Виджеты (widgets)

- [Navbar](/src/widgets/Navbar)
- [Page](/src/widgets/Page)
- [PageError](/src/widgets/PageError)
- [Sidebar](/src/widgets/Sidebar)
- [Navbar](/src/widgets/Navbar)
- [Navbar](/src/widgets/Navbar)
