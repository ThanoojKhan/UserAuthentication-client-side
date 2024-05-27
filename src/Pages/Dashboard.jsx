import { userLogout } from '../store/slice/user'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  function logout() {
    dispatch(userLogout())
    navigate('/login')
  }
  const dispatch = useDispatch()
  const userName = useSelector(state => state.User.name)

  return (
    <section className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white flex flex-col items-center justify-center h-screen">
      <div className="text-center mx-auto max-w-3xl">
        <h1 className="text-5xl font-extrabold sm:text-7xl">
          Hello, <span className="text-red-800 animate-pulse">{userName}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-xl/relaxed animate-bounce sm:text-2xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button onClick={logout} className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">
            Logout
          </button>
        </div>
      </div>
    </section>
  )
}

export default Dashboard