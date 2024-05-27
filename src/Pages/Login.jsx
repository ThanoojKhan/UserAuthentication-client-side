import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import axiosInstance from '../api/axios';
import { toast } from 'react-hot-toast'
import { userLogin } from '../store/slice/user';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  async function handleLogin() {
    if (email.trim().length == 0 || password.trim().length == 0) {
      toast.error('Fill all the fields')
    } else {
      axiosInstance.post('/login', { email, password })
        .then((res) => {
          if (res.data.errmsg) {
            toast.error(res.data.errmsg);
          } else {
            toast.success(res.data.message)
            const { name, token, userId } = res.data;
            dispatch(userLogin({ name, token, userId }))
            navigate('/')
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            toast.error("Incorrect email or password. Please try again.");
          } else {
            toast.error("An unexpected error occurred. Please try again later.");
            console.error(err);
          }
        });

    }
  }
  return (
    <div className="flex min-h-full h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button onClick={handleLogin} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:animate-none animate-pulse">
              Sign in
            </button>
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?
          <Link to={'/register'}
            className="ms-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-900 "
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login