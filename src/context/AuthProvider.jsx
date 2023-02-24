import {useState, useEffect, createContext} from 'react';
import axiosClient from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true),
        [auth, setAuth] = useState({}),
        [alertInfo, setAlertInfo] = useState({});

    useEffect(() => {
      const authUser = async () => {
        const token = localStorage.getItem('token');

        if(!token) return setLoading(false);
        
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        try {
          const {data} = await axiosClient('/vets/profile', config);
          setAuth(data);

        } catch (error) {
          setAuth({});
          console.log(error.response.data.msg);
          localStorage.removeItem('token');
        }
        setLoading(false);
      }
      authUser();
    }, []);
    
    const updateProfile = async user => {
      const token = localStorage.getItem('token');

      if(!token) return setLoading(false);
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const url = `/vets/profile/${user._id}`;

        const {data} = await axiosClient.put(url, user, config);
        setAuth(data.vet);
        setAlertInfo({msg: data.msg, error: false});
        
      } catch (error) {
        setAlertInfo({msg: error.response.data.msg, error: true});
      }
    }

    const changePass = async passObj => {
      const token = localStorage.getItem('token');
      if(!token) return setLoading(false);
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const url = `/vets/profile/change-password/${passObj.id}`;

        const {data} = await axiosClient.put(url, passObj, config);
        setAlertInfo({msg: data.msg, error: false});

        return true;
      } catch (error) {
        setAlertInfo({msg: error.response.data.msg, error: true});
      }

    }
  return (
    <AuthContext.Provider 
      value={{auth, setAuth, loading, updateProfile, alertInfo, changePass}}>

        {children}
    </AuthContext.Provider>
  )
}

export{
    AuthProvider,
}

export default AuthContext;