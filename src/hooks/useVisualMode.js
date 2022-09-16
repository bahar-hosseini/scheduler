import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(second,replace = false) {
if(replace){
  back()
}
setMode(second)
setHistory(prev=>[...prev, second]);
   
  }
 
    function back() { 
      if(history.length > 1){
     history.pop()
     
      const pervMode = history[history.length-1]
   setMode(pervMode)
  }
  }


  return {mode ,transition, back };

}
