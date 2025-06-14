import { useEffect, useState } from 'react'
import Reports from './Reports';
import '../css/laboratoryHistory.css'

export default function LaboratoryHistory({patient}) {

    const [ patientData, setPatientData ] = useState([]);
    useEffect(function() {
        // code to fetch patient medical history from mongoDB
        async function fetchData() {
            let query = {"patientID" : patient.patientID};
            query = encodeURIComponent(JSON.stringify(query));
            const response = await fetch(`http://localhost:5000/getPatientData/laboratoryReports/${query}`);
            let result = await response.json();
            setPatientData(result);
        }
        fetchData();
    }, [patient])

    let labResultElements = patientData.map((data) => {
        return <Reports date={data.date} filePath={data.file}/>
    });

    return(       
        <div className="laboratoryHistory">
            <p>Laboratory History Page</p>
            <div>
                {labResultElements}
            </div>
        </div>
    )
}