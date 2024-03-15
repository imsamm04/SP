import { useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'

function App() {
  const routeElement = useRouteElements()
  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
