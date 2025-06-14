import '../css/patientMedicalData.css'
export default function PatientMedicalData(props) {
    return(
        <div className='patientHistoryRecordElement'>
            <p>Date: {props.date}</p>
            <p>Doctor Notes: {props.notes}</p>
        </div>
    )
}