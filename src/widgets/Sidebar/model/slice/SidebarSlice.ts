import { createSlice } from '@reduxjs/toolkit'

import { SidebarSchema } from '../types/sidebar'

const initialState: SidebarSchema = {
  collapsed: false
}

const SidebarSlice = createSlice({
  name: 'SidebarSlice',
  initialState,
  reducers: {
    setCollapsed: (state) => {
      state.collapsed = !state.collapsed
    }
  }
})

export const { actions: SidebarActions, reducer: SidebarReducer } = SidebarSlice
