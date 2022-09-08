import React, { useState } from "react";
import classNames from "classnames";
import './InterviewerListItem.scss'

const InterviewerListItem =(props)=>{

const[interviewer,setInterviewer]=useState()

const listIntervieweListItem =classNames("interviewers__item",
{
  "interviewers__item--selected":props.selected
}
)


  return(
  <li className={listIntervieweListItem} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
 {props.selected && props.name}
</li>)
};

export default InterviewerListItem;