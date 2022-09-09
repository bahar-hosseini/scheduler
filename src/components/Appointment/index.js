import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";

import './styles.scss'


const Appointment =(props)=>{


  return(
  <>
  <Header time={props.time}/>
 
  
  {(props.interview) ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty time={props.time} />}
  <article className="appointment"></article>
  </>)
}

export default Appointment;