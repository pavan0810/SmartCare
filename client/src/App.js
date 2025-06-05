import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom' 
import HomePage from './pages/HomePage'
import MedicalHistoryPage from './pages/MedicalHistoryPage';
import { useState } from 'react'

function App() {
  const [ currentPatient, setCurrentPatient ] = useState({})

  function setPatient(patient) {
    setCurrentPatient(patient)
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage setPatient={setPatient}/>}/>
        <Route path='/medicalHistory' element={<MedicalHistoryPage patient={currentPatient}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
