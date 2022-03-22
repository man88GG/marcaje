
import React,{useEffect, useState} from "react";


function Reloj(){
  const [clockState, setClockState] = useState();

useEffect (()=>{ 
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);
  

  /*
//Se obtiene la fecha actual y se divide en fragmentos para mostrar en el diseño luego
/////
  const [dateTime, setDateTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  });
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setDateTime({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
/////
*/


  return <div style={{ fontSize: "85px", margin: "10px" }} >{clockState}</div>;
}


export default Reloj;