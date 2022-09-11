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
    for(const i of appointment){
      i == key && result.push(state.appointments[key])
    }
    }
  return result;
  };