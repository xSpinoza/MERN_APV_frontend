import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AuthLayout from './layout/AuthLayout';
import PrivateRoute from './layout/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmAccount from './pages/ConfirmAccount';
import ForgotPass from './pages/ForgotPass';
import NewPass from './pages/NewPass';

import AdminPatients from './pagesPrivate/AdminPatients';
import ProfileEdit from './pagesPrivate/ProfileEdit';
import ChangePassword from './pagesPrivate/ChangePassword';

import { AuthProvider } from './context/AuthProvider';
import { PatientsProvider } from './context/PatientsProvider';

function App(){
  return (
    <BrowserRouter>
      <PatientsProvider>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login/>}></Route>
              <Route path='register' element={<Register/>}></Route>
              <Route path='forgot-password' element={<ForgotPass/>}></Route>
              <Route path='forgot-password/:token' element={<NewPass/>}></Route>
              <Route path='confirm/:id' element={<ConfirmAccount/>}></Route>
            </Route>

            <Route path='/admin' element={<PrivateRoute/>}>
              <Route index element={<AdminPatients/>}></Route>
              <Route path='profile' element={<ProfileEdit/>}></Route>
              <Route path='change-password' element={<ChangePassword/>}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </PatientsProvider>
    </BrowserRouter>
  )
}

export default App;