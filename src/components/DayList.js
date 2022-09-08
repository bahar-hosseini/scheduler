import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props)=>{

  const listsItems = props.days.map((item,index)=>{
return(<DayListItem 
  key={index}
  name={item.name} 
  spots={item.spots} 
  selected={item.name === props.value}
  setDay={props.onChange}  
/>)
  }) 
  return(
<ul>
      {listsItems}
    </ul>)
}

export default DayList;