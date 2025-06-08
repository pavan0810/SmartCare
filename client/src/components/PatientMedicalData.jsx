export default function PatientMedicalData(props) {
    return(
        <div>
            <p>Date: {props.date}</p>
            <p>Doctor Notes: {props.notes}</p>
        </div>
    )
}