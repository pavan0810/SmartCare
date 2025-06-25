import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'

export default function Calendar({ user, appointmentList, updateAppointmentList }) {
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

    function sendAppointmentEmail(name, dateTime, patientEmail) {
        const [ date, time ] = dateTime.split("T");
        const templateParams = {
            to_email: patientEmail,
            to_name: name,
            date: date,
            time: time
        }

        emailjs
        .send('service_p6cyfms', 'template_1ze6zpb', templateParams, '_Ulwx2cxo7Nbw1ce8')
        .then(
          () => {
            alert('Appointment email sent sucessfully');
          },
          (error) => {
            console.log('Failed to sent appointment email' + error.text);
          }
        );
    }
    

    function bookAllAppointments(){
        const priorityOrder = { H: 1, M: 2, L: 3 };
        appointmentList.sort((a, b) => priorityOrder[a.severity] - priorityOrder[b.severity]);
        let appointmentCopy = appointments;
        for(let i = 0; i < appointmentList.length;i++) {
            for(let j = 0; j < appointmentCopy.length; j++) {
                if(appointmentCopy[j].title === '') {
                    appointmentCopy[j].title = appointmentList[i].patient.name;
                    sendAppointmentEmail(appointmentList[i].patient.name, appointmentCopy[j].start, 
                        appointmentList[i].patient.email);
                    break;
                }
            }
        }
        setAppointments(appointmentCopy);
        alert("Appointments booked sucessfully");
        updateAppointmentList("");
        // fetch request to update doctor's appointment schedule
    }

    function handleBackClick() {
        navigate('/homePage');
    }

    return(
        <>
            {appointmentList.length === 0 ? <button disabled>Book all appointments</button> : <button onClick={bookAllAppointments}>Book all appointments</button>}
            <button onClick={handleBackClick}>Back</button>
            <Fullcalendar 
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={'timeGridWeek'}
            events={appointments}/>    
        </>    
    )
}