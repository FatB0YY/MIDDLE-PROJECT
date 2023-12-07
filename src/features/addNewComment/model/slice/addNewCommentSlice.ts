import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { addNewCommentSchema } from '../types/addNewComment'

const initialState: addNewCommentSchema = {
  error: undefined,
  isLoading: false,
  text: undefined
}

const addNewCommentSlice = createSlice({
  name: 'addNewCommentSlice',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    }
  }
})

export const { actions: addNewCommentActions, reducer: addNewCommentReducer } =
  addNewCommentSlice
