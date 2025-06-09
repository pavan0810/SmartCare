import { useState } from 'react'
import UploadPatientHistory from './UploadPatientHistory';
import UploadPrescription from './UploadPrescription';
import UploadReport from './UploadReport';

export default function UpdatePatientHistory(props) {
    const [ navbarOption, setNavbarOption ] = useState('uploadPatientHistory');
    return(
        <>
            <nav>
                <button onClick={() => setNavbarOption('uploadPatientHistory')}>Upload New History</button>
                <button onClick={() => setNavbarOption('uploadPrescriptions')}>Upload Prescriptions</button>
                <button onClick={() => setNavbarOption('uploadReport')}>Upload Report</button>
            </nav>
            <div className="records">
                {navbarOption === 'uploadPatientHistory' && <UploadPatientHistory patient={props.patient}/>}
                {navbarOption === 'uploadPrescriptions' && <UploadPrescription patient={props.patient}/>}
                {navbarOption === 'uploadReport' && <UploadReport patient={props.patient}/>}
            </div>
        </>
    )
}