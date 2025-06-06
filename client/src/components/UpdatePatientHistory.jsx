import { useState } from 'react'
export default function UpdatePatientHistory() {
    const [ file, setFile ] = useState("")

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
    }

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="testFile">Select a File:</label>
                <input onChange={handleChange} type="file" accept="application/pdf" id="testFile" name="testFile"></input>
                <button>Upload File</button>
            </form>
        </>
    )
}