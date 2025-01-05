import { createSlice } from '@reduxjs/toolkit'

export const collapsedReducer = createSlice({
  name: 'collapsed',
  initialState: {
    value: false,
  },
  reducers: {
    toggleCollapsed: state => {
      state.value = !state.value
    },
  },
})

export const { toggleCollapsed } = collapsedReducer.actions

export default collapsedReducer.reducer
