import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";


import './styles.scss'


const Appointment =(props)=>{

  return(
  <div>
  <Header time={props.time}/>
  {props.interview ?  <Show student={props.student}/>:<Empty />}
 
  
  <article className="appointment"></article>
  </div>)
}

export default Appointment;