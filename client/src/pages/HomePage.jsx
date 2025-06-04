import '../css/homePage.css'
import { useState } from 'react'
export default function HomePage() {
    const [ searchBoxValue, setSearchBoxValue ] = useState("")

    function handleChange(event) {
        setSearchBoxValue(String(event.target.value))
    }

    async function search() {
        console.log(searchBoxValue)
        let query = {"name" : searchBoxValue}
        console.log(query)
        query = encodeURIComponent(JSON.stringify(query))
        const response = await fetch(`http://localhost:5000/getPatientData/patients/${query}`);
        let patientSearched = await response.json();
        console.log(patientSearched);
    }

    return(
        <>
            <header>
                <span>View Appointments</span>
                <button>Sign Out</button>
            </header>
            <div className='patientSearch'>
                <div>
                    <span>Welcome to your SmartCare Application</span>
                    <img src='images/logo.png' alt='SmartCare logo'/> 
                </div>
                <input type='text' onChange={handleChange}></input>
                <button onClick={search}>Search</button>
            </div>
            <div className="searchResults">

            </div>
        </>
    )
}