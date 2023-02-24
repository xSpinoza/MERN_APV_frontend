import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axiosClient from '../config/axios';
import Alert from '../components/Alert'
import emptyFn from '../helpers/emptyFn';
import useAuth from '../hooks/useAuth';
import '../../public/styles/spinner.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [alert, setAlert] = useState({}),
        [activate, setActivate] = useState(false);

  const {setAuth} = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    
    if(emptyFn([email])){
      setAlert({msg: 'All fields are required', error: true});
      return;
    }
    if(password.length < 6){
      setAlert({msg: 'Password to short', error: true});
      return;
    }
    try {      
      await axiosClient.post('/vets/login', {
        email: email.trim(),
        password
      })
        .then(r => {
          localStorage.setItem('token', r.data.token);
          setAlert({msg: r.data.msg});
          
          setActivate(true);
          setAuth(r.data);

          setTimeout(() => {
            navigate('/admin');
          }, 2000);
        });
    } catch (error) {
      setAlert({msg: error.response.data.msg, error: true});
    }
  }

  const {msg} = alert;
  return (
    <>
      <div>
        <h1 
          className={`${activate && 'loading'} text-indigo-600 font-black text-6xl cursor-default`}
          >Login and Manages your <span className="text-white">Patients</span></h1>
      </div>

      <div className={`${activate && 'loading'} mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl`}>
        {msg && <Alert
            alert={alert}
        />}

        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <div className="my-5">
            <label 
              htmlFor="email"
              className="uppercase text-gray-200 block text-xl font-bold"
              >
                Email
            </label>
            <input 
              type="email"
              placeholder="vet@email.com"
              id="email"
              className="border w-full p-3 mt-3 bg-slate-100 text-black rounded-xl"
              onChange={e => setEmail(e.target.value)}
              required
              disabled={activate}
            />
          </div>

          <div className="my-5">
            <label 
              htmlFor="password"
              className="uppercase text-gray-200 block text-xl font-bold"
              >
                Password
            </label>
            <input 
              type="password"
              id="password"
              className="border w-full p-3 mt-3 bg-slate-100 text-black rounded-xl"
              onChange={e => setPassword(e.target.value)}
              required
              disabled={activate}
            />
          </div>

          <input 
            type="submit" 
            value="Login"
            className={`${!activate && 'cursor-pointer hover:bg-indigo-800'} bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold md:w-auto`}
            disabled={activate}
           />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link 
          to="/register" 
          className={`${activate ? 'cursor-default' : 'hover:underline'} block text-center my-5 text-gray-300`}
          >You don't have an account? Register</Link>

          <Link 
          to="/forgot-password" 
          className={`${activate ? 'cursor-default' : 'hover:underline'} block text-center my-5 text-gray-300`}
          >Forgot password</Link>
        </nav>
      </div>
      {activate &&
        <div className='rollerDiv'>
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      }
    </>
  )
}

export default Login