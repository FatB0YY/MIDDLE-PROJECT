import { StateSchema } from '@/shared/lib/store'

export const getAddNewCommentText = (state: StateSchema) =>
  state.addNewComment?.text ?? ''
export const getAddNewCommentIsLoading = (state: StateSchema) =>
  state.addNewComment?.isLoading
export const getAddNewCommentError = (state: StateSchema) =>
  state.addNewComment?.error
