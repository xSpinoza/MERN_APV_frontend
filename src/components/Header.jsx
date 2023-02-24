import {Link} from 'react-router-dom';

const Header = () => {
  function logout(){
    if(localStorage.getItem('token')){
      localStorage.removeItem('token');
      location.reload();
    }
  }
  return (
    <>
      <header className="py-10 bg-indigo-600">
        <div className="flex flex-col lg:flex-row container mx-auto justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-200">APV</h1>

          <nav className='flex flex-col lg:flex-row gap-6 items-center mt-5 lg:mt-0'>
            <Link to='/admin' className='text-white text-sm uppercase font-bold hover:underline'>Patients</Link>
            <Link to='/admin/profile' className='text-white text-sm uppercase font-bold hover:underline'>Profile</Link>

            <button
              type='button'
              onClick={logout}
              className='text-lg uppercase font-bold hover:underline text-red-400'
            >Log Out</button>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header;