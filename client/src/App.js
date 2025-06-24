import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom' 
import HomePage from './pages/HomePage'
import MedicalHistoryPage from './pages/MedicalHistoryPage';
import LoginPage from './pages/LoginPage';
import { useState } from 'react'
import Calendar from './pages/Calendar';

function App() {
  const [ currentPatient, setCurrentPatient ] = useState({})
  const [ currentUser, setCurrentUser] = useState({})
  const [ appointmentList, setAppointmentList ] = useState([])

  function setPatient(patient) {
    setCurrentPatient(patient);
  }

  function setUser(user) {
    setCurrentUser(user);
  }

  function updateAppointmentList(appointment) {
    if(appointment === ""){
      setAppointmentList([]);
    } else {
      setAppointmentList((prevList) => {
        return [...prevList, appointment];
      });
    }
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage setUser={setUser}/>}/>
        <Route path='/homePage' element={<HomePage setPatient={setPatient}/>}/>
        <Route path='/medicalHistory' element={<MedicalHistoryPage patient={currentPatient} user={currentUser} 
        updateAppointmentList={updateAppointmentList}/>}/>
        <Route path='/appointment' element={<Calendar user={currentUser} appointmentList={appointmentList}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
