import { useState, useEffect } from "react";
import PatientsContext from "../context/PatientsProvider";
import usePatients from "../hooks/usePatients";
import Patient from "./Patient";
import '../../public/styles/spinner.css';

const PatientsList = () => {
  const {patients} = usePatients();
  const [loading, setLoading] = useState(false);
  const nul = null;

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  
  }, []);
  return (
    <>
      {loading ? (
        patients.length ? (
          <>
            <h2 className="font-black text-3xl text-center mt-10">Patients List</h2>

            <p className="text-xl mt-5 mb-10 text-center">
              Manage your <span className="text-indigo-400 font-bold">patients</span> and  appointments
            </p>

            {patients.map(patient => (
              <Patient
                key={patient._id}
                patient={patient}
              />
            ))}
          </>
        ) : (
          <>
            <h2 className="font-black text-3xl text-center mt-10">There's no Patients</h2>

            <p className="text-xl mt-5 mb-10 text-center">
              Start adding <span className="text-indigo-400 font-bold">patients</span> to your list
            </p>
          </>
        )
      ) : (
        <div className='rollerDiv spinnerMini'>
          <div className="lds-roller roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      )}
    </>
  )
}

export default PatientsList;