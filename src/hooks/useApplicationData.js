import {useState, useEffect} from "react";
import axios from 'axios'


export default function useApplicationData() {

const[state,setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers:{}
})

const setDay = day => setState({ ...state, day });

useEffect(() => {

  Promise.all([
   axios.get('/api/days'),
   axios.get('/api/appointments'),
   axios.get('/api/interviewers')
 ]).then((all) => {
  setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data}));
});
}, [])


/**
 ** SPOT Function
*/

const countSpot =(day,apointments)=>{

  let spots = 0;
  for(const apptId of day.appointments){
    if(apointments[apptId].interview==null){
      spots++
    }
  }
  return spots
}

const updateSpots = (apointments) => {


const newlyCalculatedDays = state.days.map((day)=>{
  return {
    ...day,
    spots: countSpot(day,apointments)
  }
})
return newlyCalculatedDays;

};


/**
 ** Book Interview Function
*/

function bookInterview(id, interview) {

const appointment = {
  ...state.appointments[id],
  interview: { ...interview }
}
const appointments = {
  ...state.appointments,
  [id]: appointment
};
const days = updateSpots(appointments)

  return axios.put(`/api/appointments/${id}`,{interview})
  .then((response)=>{
    setState({
      ...state,
      appointments,
      days
    });
  })
};


/**
 ** Cancel Interview
*/

const cancelInterview = (id,interview)=>{
  const appointment = {
    ...state.appointments[id],
    interview:null
  }
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const days = updateSpots(appointments)

return axios.delete(`/api/appointments/${id}`,{interview})
  .then(()=>{
    setState({
      ...state,
      appointments,
      days
    });

  })
}

return {
  state,
  setDay,
  bookInterview,
  cancelInterview}
}
