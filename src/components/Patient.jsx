import '../../public/styles/styles.css';
import usePatients from '../hooks/usePatients';

const Patient = ({patient}) => {
  const {setEdit, editMode, deletePatient} = usePatients();
  const {name, email, date, owner, symptom, _id} = patient;

  return (
    <>
      <div className="mx-5 my-10 bg-slate-800 shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-400 mb-2">Name:
            <span className="font-normal normal-case text-white"> {name}</span>
        </p>
        <p className="font-bold uppercase text-gray-300 mb-2">Owner:
            <span className="font-normal normal-case text-white"> {owner}</span>
        </p>
        <p className="font-bold uppercase text-gray-300 mb-2">Email:
            <span className="font-normal normal-case text-white"> {email}</span>
        </p>
        <p className="font-bold uppercase text-gray-300 mb-2">Date:
            <span className="font-normal normal-case text-white"> {date.substring(0, date.indexOf('T'))}</span>
        </p>
        <p className="font-bold uppercase text-gray-300">Symptom:
            <span className="font-normal normal-case text-white"> {symptom}</span>
        </p>

        <div className="flex justify-between mt-10">
            <button 
            onClick={() => setEdit(patient)}
            className={`${editMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-indigo-600 hover:bg-indigo-700'} "py-2 px-7 uppercase font-bold rounded-lg flex items-center justify-between gap-10"`}>{editMode ? 'Cancel' : 'Edit'}

            {editMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  className="icon icon-tabler icon-tabler-x svgIcon"
                  viewBox="0 0 24 24"
              >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6L18 18"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="icon icon-tabler icon-tabler-pencil svgIcon"
                viewBox="0 0 24 24"
               >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M4 20h4L18.5 9.5a1.5 1.5 0 00-4-4L4 16v4"></path>
                <path d="M13.5 6.5L17.5 10.5"></path>
              </svg>
            )}
                
            </button>
            <button 
            className="px-5 bg-red-500 hover:bg-red-700 uppercase font-bold rounded-lg flex items-center justify-between gap-3"
            onClick={() => deletePatient(_id)}
            >Delete
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="icon icon-tabler icon-tabler-trash svgIcon"
                viewBox="0 0 24 24"
              >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <path d="M4 7L20 7"></path>
              <path d="M10 11L10 17"></path>
              <path d="M14 11L14 17"></path>
              <path d="M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"></path>
            </svg>
            </button>
        </div>
      </div>
    </>
  )
}

export default Patient;