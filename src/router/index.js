import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Index from '../pages'
import Home from '../pages/home'
import Mall from '../pages/mall'
import User from '../pages/user'
import PageOne from '../pages/other/pageOne'
import PageTwo from '../pages/other/pageTwo'
const routes = [
  {
    path: '/',
    name: 'index',
    element: <Index />,
    children: [
      {
        path: '/',
        element: <Navigate to='home' replace />,
      },

      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'mall',
        element: <Mall />,
      },
      {
        path: 'user',
        element: <User />,
      },

      {
        path: 'other',
        children: [
          {
            path: 'pageOne',
            element: <PageOne />,
          },
          {
            path: 'pageTwo',
            element: <PageTwo />,
          },
        ],
      },
    ],
  },
]

const router = createBrowserRouter(routes)
export default router
