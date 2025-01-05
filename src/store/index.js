import { configureStore } from '@reduxjs/toolkit'
import collapsedReducer from './collapsed'
export default configureStore({
  reducer: { collapsed: collapsedReducer },
})
