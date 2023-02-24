import {Navigate, Outlet, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivateRoute = () => {
  const {auth, loading} = useAuth();

  return (
    <>
      {loading ? 
          <div className='rollerDiv'>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        :
          <>
            <Header/>

            {auth?._id ? (
              <main className='container mx-auto mt=20'>
                <Outlet/>
              </main>

            ): <Navigate to='/'/>}

            <Footer/>
          </>     
      }
    </>
  )
}

export default PrivateRoute;