import React,{useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


const Form =(props)=>{
// console.log(props)

  const [name, setName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer||null);
  const [error, setError] = useState("")

// console.log('^^^^^^^^^^^^^^^',interviewer)
  const reset =()=>{
    setName("")
    setInterviewer(null)
  }
  const cancel =()=>{
    reset()
    props.onCancel()
  }
// const interview  =()=>{
//   props.onSave(name,interviewer)
// }


function validate() {
  if (name === "") {
    setError("Student name cannot be blank");
    return;
  }

  if (interviewer === null) {
    setError("Please select an interviewer");
    return;
  }

  props.onSave(name, interviewer);
}

  return(
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        interviewers={props.interviewers}
        onChange={e=>setName(e.target.value)}
        data-testid="student-name-input"
        // student={props.student}
        // onSave={e=>setStudent(e.target.value)}
      />
      <section className="appointment__validation">{error}</section>
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
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
  )
}
export default Form;