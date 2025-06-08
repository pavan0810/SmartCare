import { useEffect, useState } from 'react'
import Reports from './Reports';
export default function RadiologyHistory({patient}) {
    const [ patientData, setPatientData ] = useState([]);

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

    let radiologyResultElements = patientData.map((data) => {
        return <Reports date={data.date} filePath={data.file}/>
    });

    return(
        <div>
            <p>Radiology History Page</p>
            <div>
                {radiologyResultElements}
            </div>
        </div>
    )
}