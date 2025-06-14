import { useState, useEffect } from 'react';
import MedicationData from './MedicationData';
import '../css/medicationHistory.css'

export default function MedicationHistory({patient}) {
    const [ patientData, setPatientData ] = useState([]);
    useEffect(function() {
        // code to fetch patient medical history from mongoDB
        async function fetchData() {
            let query = {"patientID" : patient.patientID};
            query = encodeURIComponent(JSON.stringify(query));
            const response = await fetch(`http://localhost:5000/getPatientData/medicationHistory/${query}`);
            let result = await response.json();
            setPatientData(result);
        }
        fetchData();
    }, [patient])

    let medicalHistoryElements = patientData.map((data) => {
            return <MedicationData date={data.date} medication={data.medications}/>
    });

    return(
        // display mongodb history here
        <div className="medicationHistory">
            <p>Medication History Page</p>
            <div>{medicalHistoryElements}</div>
        </div>
    )
}