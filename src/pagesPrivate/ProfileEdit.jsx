import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import emptyFn from "../helpers/emptyFn";
import Alert from "../components/Alert";

const colorBg = {backgroundColor: '#1e293b'}

const ProfileEdit = () => {
  const {auth, updateProfile, alertInfo} = useAuth(),
        [profile, setProfile] = useState({}),
        [alert, setAlert] = useState('');

  useEffect(() => {
    setProfile(auth);
  }, [auth]);

  useEffect(() => {
    if(Object.keys(alertInfo).length < 1) return;
    const {msg, error} = alertInfo;

    setAlert({msg, error});

    alertInfo.msg = '';
    alertInfo.error = '';

    setTimeout(() => {
      setAlert({});
    }, 3000);
  }, [alertInfo])
  
  
  const handleSubmit = e => {
    e.preventDefault();
    const {name, email} = profile;

    if(emptyFn([name, email])){
      setAlert({msg: 'All fields are required', error: true});
      return;
    }
    name.trim();
    email.trim();
    updateProfile(profile);
  }
  const {msg} = alert;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Edit your Profile</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modify your <span className="text-indigo-600 font-bold">Information here</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 shadow-md rounded-lg p-5" style={colorBg}>
          {msg && <Alert
            alert={alert}
          />}
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="my-3">
                    <label htmlFor="name" className="uppercase font-bold text-gray-50">Name</label>
                    <input type="text" name="name" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg text-black" id="name"
                    value={profile.name || ''} onChange={e => setProfile({
                      ...profile,
                      [e.target.name] : e.target.value
                    })}
                    /> 
                </div>
                <div className="my-3">
                    <label htmlFor="email" className="uppercase font-bold text-gray-50">Email</label>
                    <input type="email" name="email" className="border bg-gray-50 w-full p-2 mt-5 rounded-lg text-black" id="email"
                    value={profile.email || ''} onChange={e => setProfile({
                      ...profile,
                      [e.target.name] : e.target.value
                    })}
                    />
                </div>
                <input type="submit" value="Save" className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 cursor-pointer"/>
            </form>
        </div>
      </div>
    </>
  )
}

export default ProfileEdit;