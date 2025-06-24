import '../css/medicalHistoryPage.css'
import { useState } from 'react'
import UpdatePatientHistory from '../components/UpdatePatientHistory'
import PatientHistory from '../components/PatientHistory'
import MedicationHistory from '../components/MedicationHistory'
import RadiologyHistory from '../components/RadiologyHistory'
import LaboratoryHistory from '../components/LaboratoryHistory'

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
                        {navbarOption === 'patientHistory' && <PatientHistory patient={props.patient}/>}
                        {navbarOption === 'medicationHistory' && <MedicationHistory patient={props.patient}/>}
                        {navbarOption === 'radiologyHistory' && <RadiologyHistory patient={props.patient}/>}
                        {navbarOption === 'laboratoryHistory' && <LaboratoryHistory patient={props.patient}/>}
                        {navbarOption === 'updatePatientHistory' && <UpdatePatientHistory patient={props.patient} updateAppointmentList={props.updateAppointmentList}/>}
                    </div> 
                </div>
            </div>
        </>
    )
}