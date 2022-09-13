import React,{useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


const Form =(props)=>{
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


  const reset =()=>{
    setStudent("")
    setInterviewer(null)
  }
  const cancel =()=>{
    reset()
    props.onCancel()
  }
const interview  =()=>{
  props.onSave(student,interviewer)
}



  return(
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        interviewers={props.interviewers}
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={e=>setStudent(e.target.value)}
        // student={props.student}
        // onSave={e=>setStudent(e.target.value)}
   
      />
    </form>
    <InterviewerList 
    interviewer={props.interviewer}
    interviewers={props.interviewers}
    onChange={setInterviewer}
    value={interviewer}

    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={interview }>Save</Button>
    </section>
  </section>
</main>
  )
}
export default Form;