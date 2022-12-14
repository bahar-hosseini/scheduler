import React from "react";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// Internal Modules
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay,getInterview,getInterviewersForDay} from "../helpers/selectors"
import useApplicationData from "hooks/useApplicationData";


/**
 ** Application component
*/
export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


const resultAppointmentsForDay = getAppointmentsForDay(state,state.day)

const ListAppointments = resultAppointmentsForDay.map((appointment,index)=>{
const interview = getInterview(state, appointment.interview);
const interviewers =getInterviewersForDay(state,state.day)


  return(
<Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}

/>
  )
}) 
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
  />
  <hr className="sidebar__separator sidebar--centered" />
  <nav className="sidebar__menu">
  <DayList
  days={state.days}
  value={state.day}
  onChange={setDay}
/>
  </nav>
  <img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
  />
      </section>
      <section className="schedule">
{ListAppointments}
      </section>
      
    </main>
  );
}
