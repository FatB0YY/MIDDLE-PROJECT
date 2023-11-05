import { createSlice } from '@reduxjs/toolkit'
import { CounterSchema } from '../types/counterSchema'

const initialState: CounterSchema = { value: 0 }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
})

export const { actions: counterActions, reducer: counterReducer } = counterSlice
