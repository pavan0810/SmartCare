import { useState } from 'react'
import '../css/uploadPatientHistory.css'
export default function UploadPatientHistory({patient, updateAppointmentList}) {
    const [ notes, setNotes ] = useState("");
    function formatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let date = formatDate(new Date());
        let patientData = {"patientID" : patient.patientID, "date" : date, "note": notes};
        const response = await fetch('http://localhost:5000/uploadNotes/patientHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        });
        const result = await response.json();
        alert(result.message);
    }

    function handleNoteChange(event) {
        setNotes(event.target.value);
    }

    async function bookAppointment() {
        // get patient symptoms
        const response = await fetch("http://localhost:5000/getPatientSeverity", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"notes": notes})
        });
        let patientSeverity = await response.json();
        console.log(patientSeverity);
        let appointment = {patient: patient, severity: patientSeverity.severity}
        updateAppointmentList(appointment);
    }

    return(
        <div className="uploadHistory">
            <form onSubmit={handleSubmit}>
                <label htmlFor="notes">Notes</label>
                <textarea onChange={handleNoteChange} type="text" id="notes" name="notes" required></textarea>
                {notes === "" ? <button disabled>Upload</button> : <button>Upload</button>}
            </form>
            {notes === "" ? <button disabled>Book appointment</button>: <button onClick={bookAppointment}>Book appointment</button>}
        </div>
    )
}