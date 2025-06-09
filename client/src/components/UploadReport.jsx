import { useState } from 'react'
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
        console.log(uploadResponse);
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
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="testFile">Select a File:</label>
                <input onChange={handleChange} type="file" accept="application/pdf" 
                id="testFile" name="testFile" required></input>
                <label>
                    <input type="radio" name="reportType" value="radiology"  
                    checked={option === 'radiology'} onChange={handleOptionChange}/>
                    Radiology
                </label>
                <label>
                    <input type="radio" name="reportType" value="laboratory" 
                    checked={option === 'laboratory'} onChange={handleOptionChange} />
                    Laboratory
                </label>
                <button>Upload File</button>
            </form>
        </>
    )
}