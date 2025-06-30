import '../css/homePage.css'
import { useState } from 'react'
import PatientSearched from '../components/PatientSearched'
import { useNavigate } from "react-router-dom"

export default function HomePage(props) {
    const navigate  = useNavigate();
    const [ searchBoxValue, setSearchBoxValue ] = useState("")
    const [ allPatientSearched, setAllPatientSearched ] = useState([])
    let patientElements = allPatientSearched.map((patient) => {
        return <PatientSearched 
                    patient={patient}
                    key={patient.patientID}
                    setPatient={props.setPatient}
                />
    })

    function handleChange(event) {
        setSearchBoxValue(event.target.value)
    }

    async function search() {
        let query = {"name" : searchBoxValue}
        query = encodeURIComponent(JSON.stringify(query))
        const response = await fetch(`http://localhost:5000/getPatientData/patients/${query}`);
        let patientSearched = await response.json();
        setAllPatientSearched(patientSearched);
    }

    function handleViewAppointmentClick() {
        navigate('/appointment')
    }

    function handleSignOut() {
        navigate('/')
    }

    return(
        <>
            <header className="homePageHeader">
                <button onClick={handleViewAppointmentClick}>View Appointments</button>
                <button onClick={handleSignOut}>Sign Out</button>
            </header>
            <div className='patientSearch'>
                <div>
                    <span>Welcome to your SmartCare Application</span>
                    <img src='images/logo.png' alt='SmartCare logo'/> 
                </div>
                <input type='text' onChange={handleChange}></input>
                {searchBoxValue === "" ? <button disabled>Search</button> : 
                <button onClick={search}>Search</button>}
            </div>

            {patientElements.length > 0 ?
            <div className="searchResults">
                {patientElements}
            </div> : <div>No records</div>}
        </>
    )
}