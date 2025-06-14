import '../css/medicationData.css'
export default function MedicationData(props) {
    let medicationElements = props.medication.map((medication) => {
        return(
            <div className="medicineDetails">
                <p>Name: {medication.name}</p>
                <p>Dosage: {medication.dosage}</p>
                <p>Duration: {medication.duration}</p>
            </div>
        )
    })

    return(
        <div className="medicationHistoryElement">
            <p>Date: {props.date}</p>
            <p>Medicines:</p>
            <div>{medicationElements}</div>
        </div>
    )
}
