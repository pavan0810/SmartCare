import '../css/medicalHistoryPage.css'
import { useState } from 'react'
import UpdatePatientHistory from '../components/UpdatePatientHistory'
export default function MedicalHistoryPage(props) {
    const [ navbarOption, setNavbarOption ] = useState('patientHistory')
    return(
        <>
            <header>
                <button>Back</button>
                <p>SmartCare</p>
                <button>Sign out</button>
            </header>
            <div className="medicalHistory">
                <div className="medicalHistoryNav">
                    <nav>
                        <button onClick={() => setNavbarOption('patientHistory')}>Patient History</button>
                        <button onClick={() => setNavbarOption('medicationHistory')}>Medication History</button>
                        <button onClick={() => setNavbarOption('radiologyHistory')}>Radiology Report</button>
                        <button onClick={() => setNavbarOption('laboratoryHistory')}>Laboratory Report</button>
                        <button onClick={() => setNavbarOption('updatePatientHistory')}>Update patient record</button>
                    </nav>
                </div>
                <div className="patientDetails">
                    <div className="patientPersonalDetails">
                        <p>Name: {props.patient.name}</p>
                        <p>Age: {props.patient.age}</p>
                        <p>Gender: {props.patient.gender}</p>
                    </div>
                    <div className="records">
                        {navbarOption === 'patientHistory' && <p>Patient History</p>}
                        {navbarOption === 'medicationHistory' && <p>Medication History</p>}
                        {navbarOption === 'radiologyHistory' && <p>Radiology History</p>}
                        {navbarOption === 'laboratoryHistory' && <p>Laboratory History</p>}
                        {navbarOption === 'updatePatientHistory' && <UpdatePatientHistory />}
                    </div> 
                </div>
            </div>
        </>
    )
}