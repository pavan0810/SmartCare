import '../css/homePage.css'
export default function HomePage() {
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
                <input type='text'></input>
            </div>
        </>
    )
}