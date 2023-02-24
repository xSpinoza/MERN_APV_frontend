import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import emptyFn from "../helpers/emptyFn";
import Alert from "../components/Alert";

const colorBg = {backgroundColor: '#1e293b'}

const ChangePassword = () => {
  const {auth, changePass, alertInfo} = useAuth();

  const [pass, setPass] = useState(''),
        [newPass, setNewPass] = useState(''),
        [reNewPass, setReNewPass] = useState(''),
        [id, setId] = useState(auth._id),
        [alert, setAlert] = useState('');

  useEffect(() => {
    if(Object.keys(alertInfo).length < 1) return;
    const {msg, error} = alertInfo;

    setAlert({msg, error});

    alertInfo.msg = '';
    alertInfo.error = '';

  }, [alertInfo]);

  const handleSubmit = async e => {
    e.preventDefault();

    if(emptyFn([pass, newPass, reNewPass])){
      setAlert({msg: 'All fields are required', error: true});
      return;
    }
    if(newPass !== reNewPass){
      setAlert({msg: `The new passwords doesn't match`, error: true});
      return;
    }
    if(newPass.length < 8){
      setAlert({msg: `The new password is too short`, error: true});
      return;
    }
    if(pass === newPass) return setAlert({msg: `The new password cannot be the same as the old one`, error: true});

    try {
      const updatePass = await changePass({pass, newPass, reNewPass, id});

      if(!updatePass) return;

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  const {msg} = alert;
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Change Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Edit your <span className="text-indigo-600 font-bold">Password here</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 shadow-md rounded-lg p-5" style={colorBg}>
          {msg && <Alert
            alert={alert}
          />}
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="my-3">
                    <label htmlFor="password" className="uppercase font-bold text-gray-50">Actual Password</label>
                    <input type="password" name="password" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg text-black" id="password"
                    onChange={e => setPass(e.target.value)}
                    /> 
                </div>
                <div className="my-3">
                    <label htmlFor="NewPassword" className="uppercase font-bold text-gray-50">New Password</label>
                    <input type="password" name="NewPassword" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg text-black" id="NewPassword"
                    onChange={e => setNewPass(e.target.value)}                    
                    />
                </div>
                <div className="my-3">
                    <label htmlFor="ReNewPassword" className="uppercase font-bold text-gray-50">Re-Enter New Password</label>
                    <input type="password" name="ReNewPassword" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg text-black" id="ReNewPassword"
                    onChange={e => setReNewPass(e.target.value)}
                    />
                </div>
                <input type="submit" value="Save" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"/>
            </form>
        </div>
      </div>
    </>
  )
}

export default ChangePassword;