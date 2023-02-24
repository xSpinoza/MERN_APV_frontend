import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../config/axios';
import saveTime from '../helpers/saveTime.js';
import '../../public/styles/styles.css';

const ForgotPass = () => {
  const [email, setEmail] = useState(''),
        [alert, setAlert] = useState({}),
        [seconds, setSeconds] = useState(60),
        [valid, setValid] = useState(false),

        handleSubmit = async e => {
          e.preventDefault();

          if(email.trim() === '' || email.length < 6){
            return setAlert({msg: 'You most enter your email', error: true});
          }
          try {
            const {data} = await axiosClient.post('vets/forgot-password', {email})
              .catch(error => {
                const {message} = error;
                setAlert({
                  msg: 
                    message.includes('404') ? error.response.data.msg 
                    : `${message} | Try again later`, 
                  error: true
                });
              });

            // Setting the countdown
            setValid(true);

            setAlert({msg: data.msg});
          } catch (error){
            console.log(`Error: ${error}`);
          }
        };

  const {msg} = alert;
  
  // Timer to resend the email
  useEffect(() => {
    if(sessionStorage.getItem('count')){
      setValid(true);
      setSeconds(sessionStorage.getItem('count'));

      if(Number(seconds) === 0){
        sessionStorage.removeItem('count');
        setValid(false);
        setSeconds(60);
      }
    }
    if(valid){
      const interval = setInterval(() => {
        if(seconds > 0){
          saveTime();
          setSeconds(sessionStorage.getItem('count'));
        }
  
        if(seconds === 0) {
          clearInterval(interval);
        }
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, valid]);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl cursor-default"><span className="text-white">Email</span> of the Account that you Forgot the <span className="text-white">Password</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl'>
        {msg && <Alert
            alert={alert}
        />}
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <div className="my-5">
            <input 
              type="email"
              placeholder="vet@email.com"
              id="email"
              className="border w-full p-3 mt-3 bg-slate-100 text-black rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input 
            type="submit" 
            value={valid ? `Resend in ${seconds}` : 'Send'}
            className={valid ? "bg-indigo-700 cursor-default w-full py-3 rounded-xl text-white uppercase font-bold md:w-auto loading" 
            : "bg-indigo-700 cursor-pointer w-full py-3 rounded-xl text-white uppercase font-bold hover:bg-indigo-800 md:w-auto"}
            disabled={valid}
           />
        </form>
        <nav className='mt-9 flex justify-center'>
          <Link 
          to="/" 
          className='block text-center my-5 text-gray-300 hover:underline'
          >Go Back</Link>
        </nav>
      </div>
    </>
  )
}

export default ForgotPass;