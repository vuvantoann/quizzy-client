import LayoutDefault from '../client/layout/LayoutDefault'
import PrivateRoutes from '../client/components/PrivateRoutes'
import Home from '../client/pages/Home'

import Error404 from '../client/pages/Error404'

import Login from '../client/pages/Login'
import Register from '../client/pages/Register'
import Topic from '../client/pages/Topic'
import PracticeHistory from '../client/pages/PracticeHistory'
import Result from '../client/pages/Result'
import Logout from '../client/pages/Logout'
import Exam from '../client/pages/Exam'

export const routes = [
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
      {
        path: '',
        element: <PrivateRoutes />,
        children: [
          {
            path: 'topic',
            element: <Topic />,
          },
          {
            path: 'exam/:id',
            element: <Exam />,
          },
          {
            path: 'practice-history',
            element: <PracticeHistory />,
          },
          {
            path: 'Result',
            element: <Result />,
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <Error404 />,
  },
]
