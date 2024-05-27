import Register from "./Pages/Register"
import Login from './Pages/Login'
import Dashboard from "./Pages/Dashboard"
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function App() {
  const token = useSelector(state => state.User.token)
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path='/' element={token !== null ? <Dashboard /> : <Login />} />
          <Route path='/register' element={token !== null ? <Navigate to='/' /> : <Register />} />
          <Route path='/login' element={token !== null ? <Navigate to='/' /> : <Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
