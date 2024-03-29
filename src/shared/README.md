### api

- `api.ts` -> базовая конфигураци для axios запросов на сервер

- `rtkApi.ts` -> базовая конфигураци для запросов rtk query

### assets

- `icons` -> svg иконки, используемые в проекте
- `favicon.ico` -> фап иконка

### config

- `i18n` -> конфигурация для i18next библиотеки интернационализации
- `storybook` -> все необходимые декораторы для сторибука

### consts

- `localeStorage.ts` -> константы для сохранения данных в localstorage
- `themes.ts` -> перечисление тем, используемых в проекте

### lib

#### classNames

Функция для удобной работы со стилями. Передаваемые параметры разворачиваются в одну общую строку с названиями классов, которая из этой функции и возвращается.

Передаваемые параметры:

- `mainClass: string` - основной класс
- `otherClasses: Array<string | undefined> = []` - массив вспомогательных классов
- `mods: Mode = {}` - классы, попадание в общую строку классов которых зависит от их значения (true или false)

#### components

Вспомогательные компоненты - обертки.

- `DynamicReducerLoader` -> асинхронная загрузка редьюсеров(активно пользующаяся [reducer splitting](../app/providers/StoreProvider/config/reducerManager.ts)) с возможностью регулировать удаление редьюсеров после размантирования его использующего компонента
- `GestureSpringProvider` -> асинхронная загрузка библиотек [`@use-gesture/react`](https://use-gesture.netlify.app/) и [`@react-spring/web`](https://www.react-spring.dev/)

#### context

- `ThemesContext` -> контекст для корректной работы отображения тем приложения

#### hooks

- `useAppDispatch` -> типизируемый `useDispatch`
- `useDebounce` -> выполнение передаваемой функции `callback` с заданной задержкой `delay`
- `useInfiniteScroll` -> подгрузка новых данных при достижении нижней точки скролла с помощью `IntersectionObserver`
- `useOverlay` -> хук инициирующий нажатие на overlay, закрытие и анимацию закрытия модальных окон
- `useThemes` -> хук для получения текущей темы приложения и функции ее изменяющую
- `useTrottle` -> выполнение функции `callback` с перерывом в заданное время `delay`
