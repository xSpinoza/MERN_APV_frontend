import { useState, useRef, useEffect} from "react";
import emptyFn from '../helpers/emptyFn';
import Alert from "./Alert";
import usePatients from '../hooks/usePatients';

const Form = () => {
  //* Date
  const fecha = new Date(),
        year = fecha.getFullYear(),
        monthF = fecha.getMonth() + 1,
        month = monthF < 10 ? `0${monthF}` : monthF,
        dayF = fecha.getDate(),
        day = dayF < 10 ? `0${dayF}` : dayF,
        full = `${year}-${month}-${day}`;

  //* Inputs
  const [name, setName] = useState(''),
        [owner, setOwner] = useState(''),
        [email, setEmail] = useState(''),
        [date, setDate] = useState(full),
        [symptom, setSymptom] = useState(''),
        [id, setId] = useState(null);

  const [alert, setAlert] = useState({});

  const {patients, savePatient, patient, test, editMode, setEditMode, edited} = usePatients();

  useEffect(() => {
    if(test){
      clearInput();
    }
  }, [test]);
  
  useEffect(() => {
    if(Object.keys(patient).length < 1) return;

    const {name, owner, email, date, symptom, _id} = patient;

    setName(name);
    setOwner(owner);
    setEmail(email);
    setDate(date.substring(0, date.indexOf('T')));
    setSymptom(symptom);
    setId(_id);
  }, [patient]);
  
  const handleSubmit = e => {
    e.preventDefault();

    if(emptyFn([name, owner, email, date, symptom])){
      setAlert({msg: 'All fields are required', error: true});
      return;
    }

    if(edited){
      setName('');
      setOwner('');
      setEmail('');
      setDate('');
      setSymptom('');
      setId(null);
    }

    savePatient({name, owner, email, date, symptom, id});
    setAlert({msg: editMode ? 'Patient has been updated' : 'Patient saved successfully'});

    setName('');
    setOwner('');
    setEmail('');
    setDate('');
    setSymptom('');

    setEditMode(false);

    setTimeout(() => {
      setAlert({});
    }, 3000);
  }
  const {msg} = alert;

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  function clearInput() {
    for (let i = 0; i < inputRefs.length; i++) {
      inputRefs[i].current.value = '';
    }
  }

  return (
    <>    
      <p className="text-lg text-center my-10">
        Add your Patients and <span className="font-bold text-indigo-400">Manage them</span>
      </p>
      
      <form
        onSubmit={handleSubmit}
        className="py-10 px-5 mb-10 lg:mb-0 rounded-md shadow-2xl bg-zinc-800"
      >
        <div className="mb-5">
          <label 
            htmlFor="pet" 
            className="text-gray-300 uppercase font-bold"
            >Pet
          </label>
          <input 
            type="text" 
            id="pet"
            placeholder="Pet's Name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-black"
            onChange={e => setName(e.target.value)}
            value={name}
            ref={inputRefs[0]}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="owner" 
            className="text-gray-300 uppercase font-bold"
            >Owner
          </label>
          <input 
            type="text" 
            id="owner"
            placeholder="Pet's Owner Name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-black"
            onChange={e => setOwner(e.target.value)}
            value={owner}
            ref={inputRefs[1]}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="email" 
            className="text-gray-300 uppercase font-bold"
            >Email
          </label>
          <input 
            type="email" 
            id="email"
            placeholder="Owner's Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-black"
            onChange={e => setEmail(e.target.value)}
            value={email}
            ref={inputRefs[2]}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="date" 
            className="text-gray-300 uppercase font-bold"
            >Discharge Date
          </label>
          <input 
            type="date" 
            id="date"
            className="border-2 w-full p-2 mt-2 rounded-md text-black"
            onChange={e => setDate(e.target.value)}
            value={date}
            ref={inputRefs[3]}
          />
        </div>
        <div className="mb-5">
          <label 
            htmlFor="symptoms" 
            className="text-gray-300 uppercase font-bold"
            >Symptoms
          </label>
          <textarea 
            id="symptoms"
            placeholder="Pet's Symptoms"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-black"
            onChange={e => setSymptom(e.target.value)}
            value={symptom}
            ref={inputRefs[4]}
          />
        </div>
        <input 
          type="submit" 
          value={editMode ? 'Save Change' : "Save Patient"}
          className="bg-indigo-600 w-full p-3 uppercase font-bold rounded hover:bg-indigo-800 cursor-pointer"
        />
      </form>
      {msg && <Alert
        alert={alert}
      />}
    </>
  )
}

export default Form;