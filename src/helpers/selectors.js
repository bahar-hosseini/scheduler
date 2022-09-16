/**
 ** getAppointmentsForDay
*/

export function getAppointmentsForDay(state, day) {
  let result = []

 if(state.days.length===0){
  return [];
 }

 const filterDay = state.days.filter(d=>d.name === day)
 if(filterDay.length === 0){
  return [];
 }

 const dayApponintment = state.days.filter(d=>d.name === day && d)
 const appointment = dayApponintment[0].appointments

  for(const key in state.appointments){
    for(let i of appointment){
     // to make i string
      i = `${i}`
      i === key && result.push(state.appointments[key])
    }
    }
  return result;
  };


/**
 ** getInterview
*/
  export function getInterview(state, interview){

    const interviewer = {};
    if(!interview){
      return null;
    }
  
    for(const key in  state.interviewers){
      if (key === `${interview.interviewer}`){
  interviewer['student']=interview['student']
  interviewer["interviewer"]=state.interviewers[key]
      }
  
    }
  return interviewer;
  }
  

/**
 ** getInterviewersForDay
*/
  export function getInterviewersForDay(state, day) {
    let result = []
  
   if(state.days.length===0){
    return [];
   }
  
   const filterDay = state.days.filter(d=>d.name === day)
   if(filterDay.length === 0){
    return [];
   }
  
   const dayApponintment = state.days.filter(d=>d.name === day && d)
   const interviewers = dayApponintment[0].interviewers

    for(const key in state.interviewers){
      for(let i of interviewers){
        // to make i string
        i = `${i}`
        i === key && result.push(state.interviewers[key])
      }
      }
    return result;
    };
  