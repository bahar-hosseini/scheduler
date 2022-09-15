import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";




import useVisualMode from "../../hooks/useVisualMode"


import './styles.scss'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"



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
    .then(()=>transition(SHOW))
    .catch(()=>transition(ERROR_SAVE, true));
  }

 
function deleteInterview(){
// const  interview = null;
transition(CONFIRM);

}
function confirmDelete(){
  // const  interview = null;
  transition(DELETE,true)
    props
    .cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(()=>transition(ERROR_DELETE,true));
}

const editForm =()=>{
  transition(EDIT)
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
    onEdit={editForm}
  />
)}
{mode === CREATE &&  <Form interviewers={props.interviewers} onCancel={()=>back()} onSave={save}/>}
  
  <article className="appointment"></article>

{mode === SAVING && <Status message="Saving"/>}

{mode ===CONFIRM && <Confirm onConfirm={confirmDelete} onCancel={()=>back()}/>}
{mode === DELETE && <Status message='Deleting' />}
{mode === EDIT && 
  <Form interviewers={props.interviewers} onCancel={()=>back()} onSave={save} student={props.interview.student}
    interviewer={props.interview.interviewer.id}/>
}

{mode === ERROR_SAVE && <Error message="Error: Can not save" onClose={()=>back()}/>}
{mode === ERROR_DELETE && <Error message="Error: Can not delete" onClose={()=>back()}/>}
  </>)
}

export default Appointment;