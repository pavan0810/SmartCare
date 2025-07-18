import { useNavigate } from "react-router-dom"
import '../css/patientSearched.css'
export default function PatientSearched(props) {
    const navigate  = useNavigate();
    function viewRecord() {
        props.setPatient(props.patient)
        navigate('/medicalHistory')
    }

    return(
        <div className='recordsSearched'>
            <p>Name: {props.patient.name}</p>
            <p>Gender: {props.patient.gender}</p>
            <p>Date of Birth: {props.patient.dateOfBirth}</p>
            <button onClick={viewRecord}>View Record</button>
        </div>
    )
}