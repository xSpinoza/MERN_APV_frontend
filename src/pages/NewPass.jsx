import { useState, useEffect } from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../config/axios';
import '../../public/styles/spinner.css';

const NewPass = () => {
  // Valid or not
  const [valid, setValid] = useState(0);

  // Params
  const params = useParams();
  const {token} = params;

  // Navegation
  const navigate = useNavigate();

  // DOM Content Loaded
  useEffect(() => {
    const checkToken = async () => {
      const url = `/vets/forgot-password/${token}`;
      try {
        await axiosClient(url);
        setValid(1);
      } catch (error){
        setAlert({msg: 'There was a error', error: true});
        setValid(2);
      }
    }
    checkToken();
  }, []);

  const [password, setPassword] = useState(''),
        [rPassword, setRpassword] = useState(''),
        [alert, setAlert] = useState({}),
        [loading, setLoading] = useState(false),

        handleSubmit = async e => {
          e.preventDefault();

          if(password !== rPassword){
            return setAlert({msg: `The passwords doesn't match`, error: true});
          }
          if(password.length < 8){
            return setAlert({msg: `The password is too short`, error: true});;
          }

          try {
            const {data} = await axiosClient.post(`vets/forgot-password/${token}`, {password})
              .catch(error => {
                setAlert({
                  msg: `${error.message} | Try again later`, 
                  error: true
                });
              });

            setAlert({msg: data.msg}); // Send alert
            setLoading(true); // set Loading

            setTimeout(() => {
              navigate('/');
            }, 2500);
          } catch (error){

            setAlert({
              msg: error.response.data.msg, 
              error: true
            });
          }
        };

  const {msg} = alert;
  return (
    <>
      {valid === 1 ? 
        <>
          <div className={loading && 'loading'}>
            <h1 className='text-indigo-600 font-black text-6xl cursor-default'>Change your Account <span className="text-white">Password</span></h1>
          </div>

          <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl'>

            {msg && <Alert
              alert={alert}
            />}
            <form
              onSubmit={handleSubmit}
              className={loading ? "flex flex-col gap-1 loading" : "flex flex-col gap-1"}>

              <div className="my-5">
                <label 
                  htmlFor="password"
                  className="uppercase text-gray-200 block text-xl font-bold"
                  >
                    New Password
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
                    Repeat New Password
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
                value="Change Password"
                className={loading ? "bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold md:w-auto" : "bg-indigo-700 cursor-pointer w-full py-3 rounded-xl text-white uppercase font-bold hover:bg-indigo-800 md:w-auto"}
                disabled={loading}
              />
            </form>
            <nav className={loading ? 'mt-10 flex justify-center loading' : 'mt-10 flex justify-center'}>
              <Link 
              to="/" 
              className={loading ? 'inline-block text-center my-5 text-gray-300 cursor-default' : 'inline-block text-center my-5 text-gray-300 hover:underline'}
              >Cancel</Link>
            </nav>
          </div>
          {loading && (
            <div className='rollerDiv'>
              <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          )}
        </>
      
        : valid === 2 ? 
          <>
            <div className='mt-40'>
              <h1 className="text-red-400 font-black text-5xl cursor-default text-center">Invalid or Expired Link</h1>
            </div>
            <div className='mt-40 max-w-sm'>
              <h3 className='font-bold'>Try to request a new link to be able to change your password.</h3>

              <nav className='mt-9 flex justify-center'>
                <Link 
                to="/forgot-password" 
                className='inline-block text-center my-5 text-gray-300 hover:underline'
                >Try again</Link>
              </nav>
            </div>
          </>

        :
          <>
            <div className='rollerDiv'>
              <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
          </>
      }
    </>
  )
}
export default NewPass;