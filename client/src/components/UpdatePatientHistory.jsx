import { useState } from 'react'
import UploadPatientHistory from './UploadPatientHistory';
import UploadPrescription from './UploadPrescription';
import UploadReport from './UploadReport';
import '../css/updatePatientHistory.css'

export default function UpdatePatientHistory(props) {
    const [ navbarOption, setNavbarOption ] = useState('uploadPatientHistory');
    return(
        <div className="updateHistory">
            <nav className="updateHistoryNav">
                <button onClick={() => setNavbarOption('uploadPatientHistory')}>Upload New History</button>
                <button onClick={() => setNavbarOption('uploadPrescriptions')}>Upload Prescriptions</button>
                <button onClick={() => setNavbarOption('uploadReport')}>Upload Report</button>
            </nav>
            <div className="updateHistoryDisplay">
                {navbarOption === 'uploadPatientHistory' && <UploadPatientHistory patient={props.patient} updateAppointmentList={props.updateAppointmentList}/>}
                {navbarOption === 'uploadPrescriptions' && <UploadPrescription patient={props.patient}/>}
                {navbarOption === 'uploadReport' && <UploadReport patient={props.patient}/>}
            </div>
        </div>
    )
}