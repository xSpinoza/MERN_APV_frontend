import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axiosClient from '../config/axios';
import emptyFn from '../helpers/emptyFn';
import Alert from '../components/Alert';

const Register = () => {

  const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [rPassword, setRpassword] = useState('');

  const [alert, setAlert] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if(emptyFn([name, email, password, rPassword])){
      setAlert({msg: 'All fields are required', error: true});
      return;
    }
    if(password !== rPassword){
      setAlert({msg: `The passwords doesn't match`, error: true});
      return;
    }
    if(password.length < 8){
      setAlert({msg: `The password is too short`, error: true});
      return;
    }
    let user = {
      name: name.trim(),
      email: email.trim(),
      password,
    }
    
    try {
      await axiosClient.post('/vets', user);
      user = '';
      setAlert({msg: 'Account created, check your email'});

      //* Redirects the user
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error) {
      setAlert({msg: error.response.data.msg, error: true});
    }
  }

  const {msg} = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl cursor-default">Create your Account and Manage your <span className="text-white">Patients</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl'>

        {msg && <Alert
          alert={alert}
        />}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1">
          <div className="my-5">
            <label 
              htmlFor="name"
              className="uppercase text-gray-200 block text-xl font-bold"
              >
                Name
            </label>
            <input 
              type="text"
              placeholder="Mr. Vet"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border w-full p-3 mt-3 bg-slate-100 text-black rounded-xl"
            />
          </div>

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
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border w-full p-3 mt-3 bg-slate-100 text-black rounded-xl"
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border w-full p-3 mt-3 bg-slate-100 text-black rounded-xl"
            />
          </div>

          <div className="my-5">
            <label 
              htmlFor="r-password"
              className="uppercase text-gray-200 block text-xl font-bold"
              >
                Repeat Password
            </label>
            <input 
              type="password"
              id="r-password"
              value={rPassword}
              onChange={e => setRpassword(e.target.value)}
              className="border w-full p-3 mt-3 bg-slate-100 text-black rounded-xl"
            />
          </div>

          <input 
            type="submit" 
            value="Register"
            className="bg-indigo-700 cursor-pointer w-full py-3 rounded-xl text-white uppercase font-bold hover:bg-indigo-800 md:w-auto"
           />
        </form>
        <nav className='mt-9 flex justify-center'>
          <Link 
          to="/" 
          className='block text-center my-5 text-gray-300 hover:underline'
          >Already have an account? Login</Link>
        </nav>
      </div>
    </>
  )
}

export default Register;