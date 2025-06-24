import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function Calendar({ user }) {
    let allAppointments = user.appointments;
    const events = allAppointments.map((appointment) => {
        return appointment.events;
    });

    const appointments = events.flat();
    console.log(appointments);

    // function to format dates
    function formatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    let startDate = new Date(2025,4,29)
    let endDate = new Date(2025, 11, 31)
    for(let date = new Date(startDate); date <= endDate;date.setDate(date.getDate() + 1)) {
        appointments[formatDate(date)] = new Array(5);
    }

    return(
        <>
            <button>Book all appointments</button>
            <Fullcalendar 
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={'timeGridWeek'}
            events={appointments}/>    
        </>    
    )
}