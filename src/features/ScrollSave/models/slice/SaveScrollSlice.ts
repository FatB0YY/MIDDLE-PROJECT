import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SaveScrollSchema } from '../types/SaveScrollSchema'

const initialState: SaveScrollSchema = {
  scroll: {},
}

const SaveScrollSlice = createSlice({
  name: 'SaveScrollSlice',
  initialState,
  reducers: {
    setScrollPosition: (state, action: PayloadAction<{ path: string; position: number }>) => {
      state.scroll[action.payload.path] = action.payload.position
    },
  },
})

export const { actions: saveScrollActions, reducer: saveScrollReducer } = SaveScrollSlice
