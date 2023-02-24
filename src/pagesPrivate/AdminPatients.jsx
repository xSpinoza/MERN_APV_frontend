import {useState} from 'react'
import Form from "../components/Form";
import PatientsList from "../components/PatientsList";

const AdminPatients = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col md:flex-row mt-5 gap-8">
      <button
        className='bg-indigo-600 font-bold uppercase mx-10 p-3 rounded-md hover:bg-indigo-800 md:hidden'
        onClick={() => setShowForm(!showForm)}
      >{showForm ? 'Hide Form' : 'Show Form'}</button>
      <div className={`${showForm ? 'block' : 'hidden' } md:w-1/2 lg:w-2/5 md:block`}>
        <Form/>
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <PatientsList/>
      </div>
    </div>
  )
}

export default AdminPatients;