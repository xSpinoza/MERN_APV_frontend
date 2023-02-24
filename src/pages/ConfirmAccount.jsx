import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axiosClient from '../config/axios';
import Alert from '../components/Alert';

const ConfirmAccount = () => {
  const [confirmAccount, setConfirmAccount] = useState(false),
        [loading, setLoading] = useState(true),
        [alert, setAlert] = useState('');

  const params = useParams(),
        {id} = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/vets/confirm/${id}`,
              {data} = await axiosClient(url);
        setConfirmAccount(true);
        setAlert({msg: data.msg});
      } catch (error) {
          setAlert({
            msg: error.response.data.msg,
            error: true
          });
      }
      setLoading(false);
    }
    confirmAccount();
  }, []);
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl cursor-default">Confirm your Account and Manage your <span className="text-white">Patients</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl'>
        {!loading && 
          <Alert
            alert={alert}
          />}

        {confirmAccount && 
          <Link 
            to="/" 
            className='block text-center my-5 text-gray-300 hover:underline'
            >Login
          </Link>
        }
      </div>
    </>
  )
}

export default ConfirmAccount;