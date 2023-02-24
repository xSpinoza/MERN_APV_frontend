import {createContext, useState, useEffect} from 'react';
import axiosClient from '../config/axios';
// import useAuth from '../hooks/useAuth';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import '../../public/styles/styles.css';

const PatientsContext = createContext();

export const PatientsProvider = ({children}) => {
    const [patients, setPatients] = useState([]),
          [patient, setPatient] = useState({}),
          [test, setTest] = useState(false),
          [edited, setEdited] = useState(false);

    // const {auth} = useAuth();

    //* Edit mode
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
      const getPatients = async () => {
        try {
          const token = localStorage.getItem('token'),
                config = {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                  }
                }
          if(!token) return;
          const {data} = await axiosClient('/patients', config);
          setPatients(data);
        } catch (error) {
          console.log('Invalid Vet');
        }
      }
      getPatients();
    }, []);
    

    const savePatient = async patient => {
      if(patient.id){
        try {
          const token = localStorage.getItem('token'),
                config = {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                  }
                }
          const {data} = await axiosClient.put(`/patients/${patient.id}`, patient, config);
          
          const patientsUpdate = patients.map(patientState => patientState._id === data._id ? data : patientState);
          setPatients(patientsUpdate);

          //* Clear inputs
          setEdited(true);

        } catch (error) {
          console.log(error);
        }
      } else{
        try {
          const token = localStorage.getItem('token'),
                config = {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                  }
                }
          const {data} = await axiosClient.post('/patients', patient, config);
          const {createdAt, updatedAt, __v, ...patientSaved} = data;
          
  
          setPatients([patientSaved, ...patients]);
        } catch (error) {
          console.log(error);
        }
      }
    }
    const setEdit = patient => {
      if(editMode){
        setTest(true);
      } else{
        setTest(false);
      }
      setPatient(patient);
      setEditMode(!editMode);
    }
    const deletePatient = async id => {
      try {
        const confirmed = await new Promise(resolve => {
          Confirm.show(
            'Are you sure?',
            'Patient will be permanently deleted',
            'Yes',
            'No',
            () => resolve(true),
            () => resolve(false),
            {
              className: 'notification',
              backgroundColor: '#1e293b',
              titleColor: '#c2bff5',
              messageColor: '#fff',
              okButtonBackground: '#4f46e5',
              width: '400px',
            }
          );
        });
    
        if (confirmed) {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
          const {data} = await axiosClient.delete(`/patients/${id}`, config);

          const updatePatients = patients.filter(patientsState => patientsState._id !== id);

          setPatients(updatePatients);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
  return (
    <PatientsContext.Provider
      value={{
        // auth,
        patients,
        savePatient,
        setEdit,
        patient,
        editMode,
        test,
        editMode,
        setEditMode,
        edited,
        deletePatient,
      }}
    >
        {children}
    </PatientsContext.Provider>
  )
}

export default PatientsContext;