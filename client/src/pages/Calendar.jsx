import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Calendar({ user, appointmentList }) {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let allAppointments = user.appointments;
        const events = allAppointments.map((appointment) => {
            return appointment.events;
        });
        setAppointments(events.flat());
        // eslint-disable-next-line
    }, [])
    

    function bookAllAppointments(){
        const priorityOrder = { H: 1, M: 2, L: 3 };
        console.log(appointmentList)
        appointmentList.sort((a, b) => priorityOrder[a.severity] - priorityOrder[b.severity]);
        console.log(appointmentList)
        let appointmentCopy = appointments;
        for(let i = 0; i < appointmentList.length;i++) {
            for(let j = 0; j < appointmentCopy.length; j++) {
                if(appointmentCopy[j].title === '') {
                    console.log("entered")
                    appointmentCopy[j].title = appointmentList[i].patient.name;
                    break;
                }
            }
        }
        setAppointments(appointmentCopy);
        console.log(appointments);
    }

    function handleBackClick() {
        navigate('/homePage');
    }

    return(
        <>
            <button onClick={bookAllAppointments}>Book all appointments</button>
            <button onClick={handleBackClick}>Back</button>
            <Fullcalendar 
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={'timeGridWeek'}
            events={appointments}/>    
        </>    
    )
}