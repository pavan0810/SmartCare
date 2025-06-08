import { useEffect } from 'react'
export default function RadiologyHistory({patient}) {

    useEffect(function() {
        // code to fetch patient medical history from mongoDB
        console.log(patient.name)
    }, [patient])

    return(
        // display mongodb history here
        <p>Radiology History Page</p>
    )
}