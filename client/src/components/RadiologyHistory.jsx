import { useEffect, useState } from 'react'
import Reports from './Reports';
import '../css/radiologyHistory.css'
import PDFViewer from './PDFViewer'
export default function RadiologyHistory({patient}) {
    const [ patientData, setPatientData ] = useState([]);
    const [ viewReport, setViewReport ] = useState(false);
    const [ currentFilePath, setCurrentFilePath ] = useState("");

    useEffect(function() {
        // code to fetch patient medical history from mongoDB
        // code to fetch patient medical history from mongoDB
        async function fetchData() {
            let query = {"patientID" : patient.patientID};
            query = encodeURIComponent(JSON.stringify(query));
            const response = await fetch(`http://localhost:5000/getPatientData/radiologyReports/${query}`);
            let result = await response.json();
            setPatientData(result);
        }
        fetchData();
    }, [patient])

    function setFilePath(filePath) {
        setCurrentFilePath(filePath);
        setViewReport(true);
    }

    function handleBackClick() {
        setViewReport((prevViewReport) => {
            return !prevViewReport;
        });
    }

    let radiologyResultElements = patientData.map((data) => {
        return <Reports date={data.date} filePath={data.file} setFilePath={setFilePath}/>
    });

    return(viewReport ?
        <div>
            <button onClick={handleBackClick}>Back</button>
            <PDFViewer filePath={currentFilePath}/>
        </div> :
        <div className="radiologyHistory">
            <p>Radiology History Page</p>
            <div>
                {radiologyResultElements}
            </div>
        </div>
    )
}