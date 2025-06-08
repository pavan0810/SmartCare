import { useState, useEffect } from 'react';
import PatientMedicalData from './PatientMedicalData';

export default function PatientHistory({patient}) {
    const [ patientData, setPatientData ] = useState([]);
    useEffect(function() {
        // code to fetch patient medical history from mongoDB
        async function fetchData() {
            let query = {"patientID" : patient.patientID};
            query = encodeURIComponent(JSON.stringify(query));
            const response = await fetch(`http://localhost:5000/getPatientData/patientHistory/${query}`);
            let result = await response.json();
            setPatientData(result);
        }
        fetchData();
    }, [patient])

    let patientHistoryElements = patientData.map((data) => {
        return <PatientMedicalData date={data.date} notes={data.note}/>
    });

    return(
        // display mongodb history here
        <div>
            <p>Patient History</p>
            <div>{patientHistoryElements}</div>
        </div>
    )
}