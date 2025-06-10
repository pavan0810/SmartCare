import { useState } from 'react'
export default function UploadPatientHistory({patient}) {
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
        console.log(await response.json())
    }

    function handleNoteChange(event) {
        setNotes(event.target.value);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="notes">Notes:</label>
                <textarea onChange={handleNoteChange} type="text" id="notes" name="notes" required></textarea>
                <button>Upload</button>
            </form>
        </div>
    )
}