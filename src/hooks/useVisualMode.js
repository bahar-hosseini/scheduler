import React,{useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(seconde,replace = false) {
if(replace){
back()
}
setMode(seconde)
setHistory([...history,seconde])
   
  }
 
    function back() { 
      if(history.length > 1){
      const removeState = history.pop()
      
      const pervMode = history[history.length-1]
   setMode(pervMode)
  }
  }


  return {mode ,transition, back };

}
