import {useState, useEffect} from "react";
import axios from 'axios'


export default function useApplicationData(props) {

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


////// SPOT FUNCTIONS ///////

const countSpot =()=>{
  const currentDay = state.days.find((day) => day.name === state.day);
  console.log('day correct?',currentDay)
const arrayOfAppointments=currentDay.appointments;

  const apptList = arrayOfAppointments.map((id) => state.appointments[id]);
  console.log('?????',apptList)
  const freeApts = apptList.filter((id) => state.appointments[id].interview === null);
  const amountFreeApts = freeApts.length;

  return amountFreeApts;

}

const updateSpots = () => {
  const currentDay = state.days.find((day) => day.name === state.day);
  const currentDayIndex = state.days.findIndex((day) => day.name === state.day);

  const updatedDay = { ...currentDay, spots: countSpot() };

  const updatedDays = [...state.days];
  updatedDays[currentDayIndex] = updatedDay;

  const updatedState = { ...state, days: updatedDays };

  return updatedState;
};

////////////////////////////
function bookInterview(id, interview) {
  // console.log('id /apointments:',id)
// console.log('test',state["days"][id-1].appointments)
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  }
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  // setState({
  //   ...state,
  //   appointments
  // });

  axios.put(`/api/appointments/${id}`,{interview})
  .then((response)=>{
    updateSpots()
    setState({
      ...state,
      appointments,
    });
console.log('------',response)
  })
  // .catch((error)=>{
  //   console.log(error)
  //     })
  console.log('AAAAAA',id, interview);

}




const cancelInterview = (id,interview)=>{
  const appointment = {
    ...state.appointments[id],
    interview:null
  }
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  // setState({
  //   ...state,
  //   appointments
  // });
  
  axios.delete(`/api/appointments/${id}`,{interview})
  .then((response)=>{
    updateSpots(state)
    setState({
      ...state,
      appointments,
    });
    console.log('********',response)
  })
  .catch((error)=>{
console.log(error)
  })
}

return {
  state,
  setDay,
  bookInterview,
  cancelInterview}
}
