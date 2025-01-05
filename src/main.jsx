// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import router from './router'
import { RouterProvider } from 'react-router-dom'

import store from './store/index'
import { Provider } from 'react-redux'

import './api/mock'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>

  // </StrictMode>
)
