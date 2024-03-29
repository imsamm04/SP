import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import Profile from './pages/profile'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import path from './constans/path'

export default function useRouteElements() {
  const { isAuthenticated } = useContext(AppContext)
  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
  }

  function RejectedRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }

  const routeElement = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },

    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ])
  return routeElement
}
