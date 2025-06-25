import { useState } from 'react'
import '../css/uploadReport.css'
export default function UploadReport({patient}) {
    const [ file, setFile ] = useState("");
    const [ option, setOption ] = useState('radiology')
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        let date = formatDate(new Date());
        formData.append('file', file);
        formData.append('date', date);
        formData.append('patient', JSON.stringify(patient));
        let fetchUrl = '';
        if(option === "radiology") {
            fetchUrl = 'http://localhost:5000/uploadFile/radiologyReports';
        } else {
            fetchUrl = 'http://localhost:5000/uploadFile/laboratoryReports';
        }
        const response = await fetch(fetchUrl, {
            method: 'POST',
            body: formData
        });

        const uploadResponse = await response.json();
        alert(uploadResponse.message);
        event.target.reset();
    }

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleOptionChange(event) {
        setOption(event.target.value);
        console.log(option)
    }

    function formatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    return(
        <div className="uploadReport">
            <form onSubmit={handleSubmit}>
                <label className="fileInput" htmlFor="testFile">Select a File:</label>
                <input onChange={handleChange} type="file" accept="application/pdf" 
                id="testFile" name="testFile" required></input>
                <p>Select file type:</p>
                <label className="reportType">
                    <input type="radio" name="reportType" value="radiology"  
                    checked={option === 'radiology'} onChange={handleOptionChange}/>
                    Radiology
                </label>
                <label className="reportType">
                    <input type="radio" name="reportType" value="laboratory" 
                    checked={option === 'laboratory'} onChange={handleOptionChange} />
                    Laboratory
                </label>
                <button>Upload File</button>
            </form>
        </div>
    )
}