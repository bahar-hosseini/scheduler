import React,{useEffect} from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";




import useVisualMode from "../../hooks/useVisualMode"


import './styles.scss'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM"


const Appointment =(props)=>{
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(student, interviewer) {
    const interview = {
      student,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id,interview)
    // .then(()=>{
      transition(SHOW)
    // })
  }

 
function deleteInterview(){
// const  interview = null;
transition(CONFIRM);
  // props.cancelInterview(props.id,interview)
  // transition(DELETE);
}
function confirmDelete(){
  const  interview = null;
    props.cancelInterview(props.id,interview)
  transition(DELETE);
}

  
  return(
    <>
  
  <Header time={props.time}/>
  
  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}  />}
  {mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer.name}
    onDelete={deleteInterview}
  />
)}
{mode === CREATE &&  <Form interviewers={props.interviewers} onCancel={()=>back()} onSave={save}/>}
  
  <article className="appointment"></article>

{mode === SAVING && <Status />}

{mode ===CONFIRM && <Confirm onConfirm={confirmDelete} onCancel={()=>back()}/>}
{mode === DELETE && <Empty />}

  </>)
}

export default Appointment;