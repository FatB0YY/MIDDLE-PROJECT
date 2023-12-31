## Сущность: Comment

`Comment` представляет собой тип данных, описывающий отдельный комментарий к чему-либо. Эта сущность содержит ключевую информацию о комментарии и используется для управления комментариями в контексте конкретной статьи.

### Подсущности:

#### CommentList

`CommentList` - компонент, предназначенный для отображения списка комментариев. Этот компонент обеспечивает пользовательский интерфейс для просмотра и взаимодействия с несколькими комментариями, связанными с определенной статьей.

### Тип данных:

```typescript
interface IComment {
  id: string // Уникальный идентификатор комментария
  user: IUser // Информация о пользователе, оставившем комментарий
  text: string // Текст комментария
}
```
