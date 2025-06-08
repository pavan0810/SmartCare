import { useEffect } from 'react'
export default function LaboratoryHistory({patient}) {

    useEffect(function() {
        // code to fetch patient medical history from mongoDB
        console.log(patient.name)
    }, [patient])

    return(
        // display mongodb history here
        <p>Labaoratory History Page</p>
    )
}