import { useState } from 'react'
import '../css/uploadPrescription.css'
export default function UploadPrescription({patient}) {
    const [ prescription, setPrescription ] = useState([]);
    const [ name, setName ] = useState('');
    const [ dosage, setDosage ] = useState('');
    const [ duration, setDuration ] = useState('');

    let prescriptionElements = prescription.map((item) => {
        return(
            <tr>
                <td>{item.name}</td>
                <td>{item.dosage}</td>
                <td>{item.duration}</td>
            </tr>
        )
    });

    function handleSubmit(event) {
        event.preventDefault();
        setPrescription((prevPrescription) => {
            return [...prevPrescription, {name: name, dosage: dosage, duration: duration}];
        })
    }

    function handleNameChange(event) {   
        setName(event.target.value);
    }

    function handleDosageChange(event) {
        setDosage(event.target.value);
    }

    function handleDurationChange(event) {
        setDuration(event.target.value);
    }

    function formatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    async function uploadPrescription() {
        let date = formatDate(new Date());
        let patientData = {"patientID" : patient.patientID, "date" : date, "medications": prescription};
        const response = await fetch('http://localhost:5000/uploadPrescription/medicationHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        });
        console.log(await response.json())
    }

    return(
        <div className="uploadPrescription">
            <div className="prescription">
                <table>
                    <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Dosage</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescriptionElements}
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" id="name" name="name" onChange={handleNameChange} required/>
                <label>Dosage:</label>
                <input type="text" id="dosage" name="dosage" onChange={handleDosageChange} required/>
                <label>Duration:</label>
                <input type="text" id="duration" name="duration" onChange={handleDurationChange} required/>
                <button>Add</button>
            </form>
            <button onClick={uploadPrescription}>Upload Prescription</button>
        </div>
    )
}