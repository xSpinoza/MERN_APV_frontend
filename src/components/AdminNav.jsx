import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="flex gap-5 mt-10">
        <Link
          to='/admin/profile' 
          className="font-bold uppercase text-gray-400"
        >Profile</Link>
        <Link
          to='/admin/change-password' 
          className="font-bold uppercase text-gray-400"
        >Change Password</Link>
    </nav>
  )
}

export default AdminNav;