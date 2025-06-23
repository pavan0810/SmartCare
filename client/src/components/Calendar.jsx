import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function Calendar() {
    // get appointments from db of currently logged in doctor
    let appointments = {}
    
    let allAppointments = [
        { title: 'event 1', date: '2025-04-01' },
        { title: 'event 2', date: '2025-04-02' }
    ]

    // function to format dates
    function formatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    let startDate = new Date(2025,4,29)
    let endDate = new Date(2025, 11, 31)
    for(let date = new Date(startDate); date <= endDate;date.setDate(date.getDate() + 1)) {
        appointments[formatDate(date)] = new Array(5);
    }
    console.log(appointments)
    let date = new Date(2025, 0, 20)
    console.log(formatDate(date))

    
    return(
        <Fullcalendar 
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        events={allAppointments}/>        
    )
}