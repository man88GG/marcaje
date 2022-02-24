
import React,{useEffect, useState} from "react";


function Reloj(){
  const [clockState, setClockState] = useState();

useEffect (()=>{ 
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);
  

  return <div style={{ fontSize: "85px", margin: "10px" }} >{clockState}</div>;
}


export default Reloj;