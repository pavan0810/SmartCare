import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom' 
import HomePage from './pages/HomePage'
import MedicalHistoryPage from './pages/MedicalHistoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/medicalHistory' element={<MedicalHistoryPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
