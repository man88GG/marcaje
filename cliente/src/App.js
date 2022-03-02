import React, {Component,useEffect, useRef, useState} from 'react';
import logo from './img/logo.jpg';
import Reloj from './componentes/Reloj';
import Axios from 'axios'
import './css/App.css';
import { findAllByTestId } from '@testing-library/react';



//hay un retraso de 30 seg al marcar con el lector
//ver como se pasa la hora en una variable para el calculo de horas


const date = new Date();

function App (){

const[mensajeNombre, setMensajeNombre] =useState("");
const[mensajeApellido, setMensajeApellido] =useState("");
const[mensajeHoraEnt, setMensajeHoraEnt] =useState("");
const[mensajeHoraSal, setMensajeHoraSal] =useState("");
const[mensajeHoraEntAlm, setMensajeHoraEntAlm] =useState("");
const[mensajeHoraSalAlm, setMensajeHoraSalAlm] =useState("");

  //////
  const [state, setState] = useState('');
    

  const captura = (event) => {
    
    //condicion para la busqueda e ingreso de datos cuando el lector manda la señal
    if(event.key==='Enter'){
      
    //se cambia el estado al nombre de la tecla que es presionada, en este caso es la tecla enter
      setState(event.key);
      //window.location.href = window.location.href;
      //se llama a la funcion 
      busquedaCB();
      
    }
    
  };
////////

//se declaran variables para envío de datos del MVC
const [codigo_barra, setCodigo_Barra] = useState("");

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

 
//hace focus al texbox que obtendrá la variable del codigo barras
  const focusDiv = useRef();
useEffect(()=>{
  if(focusDiv.current)focusDiv.current.focus();
},[focusDiv]);
//

//contendrá la busqueda del codigo barra
//luego de busqueda se hará un if para saber si se ingresa o modifica el campo

//insertar datos
const ingresoDatos =()=>{
  Axios.post('http://localhost:3001/create', {  

  
    codigo_barra: codigo_barra,
    //se llama a la fecha y obtiene solamente la hora
    hora_marcaje:date.toLocaleTimeString(),
    dia_marcaje: date.getDate(),
    mes_marcaje: (date.getMonth()+1),
    periodo_marcaje: date.getFullYear(),
}).then(()=>{

console.log(date.toLocaleString());
console.log("conexion exitosa");
console.log("hora:");
console.log(date.toLocaleTimeString());
console.log(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
//refresca la pagina para liberar el cargado de memoria de las variables usadas
window.location.href = window.location.href;
  });
};
//

//
const ActualizarDatosHraSalidaAlm = (codigo_barra)=>{

  Axios.put('http://localhost:3001/actualizarHraSalidaAlm',{
    codigo_barra:codigo_barra,
    hora_marcaje:date.toLocaleTimeString(),

    dia_marcaje: date.getDate(),
    mes_marcaje: (date.getMonth()+1),
    periodo_marcaje: date.getFullYear(),

  }).then(()=>{
    window.location.href = window.location.href;
  
  });  
};

const ActualizarDatosHraEntradaAlm = (codigo_barra)=>{

  Axios.put('http://localhost:3001/actualizarHraEntradaAlm',{
    codigo_barra:codigo_barra,
    hora_marcaje:date.toLocaleTimeString(),

    dia_marcaje: date.getDate(),
    mes_marcaje: (date.getMonth()+1),
    periodo_marcaje: date.getFullYear(),

  }).then(()=>{
    window.location.href = window.location.href;
  
  });  
};

const ActualizarDatosHraSalida = (codigo_barra)=>{

  Axios.put('http://localhost:3001/actualizarHraSalida',{
    codigo_barra:codigo_barra,
    hora_marcaje:date.toLocaleTimeString(),

    dia_marcaje: date.getDate(),
    mes_marcaje: (date.getMonth()+1),
    periodo_marcaje: date.getFullYear(),

  }).then(()=>{
    window.location.href = window.location.href;
  
  });  
};
//

//buscar datos
const busquedaCB = () => {
  Axios.post('http://localhost:3001/buscarEmpleado',{
    codigo_barra:codigo_barra
  
}).then((response)=>{

 if(response.data.message){
   //muestra mensaje de Empleado no encontrado
  setMensajeNombre(response.data.message)
  setMensajeApellido("")
  window.location.href = window.location.href;
 }else{

   //obtiene de la posición 0 del array el elemento de la entidad que se declara luego del punto
   setMensajeNombre(response.data[0].nombre)
   setMensajeApellido(response.data[0].apellido)

   ingresoDatos();
   //para la modificacion comparar codigo de barra y fecha actual, luego if para ver si el campo de entrada está en NULL
   //si es null ingreso hra entrada, de lo contrario ingreso hra salida.
   //ActualizarDatos(codigo_barra);


   
 }

  });

};
//


const busquedaPr = () => {
  Axios.post('http://localhost:3001/buscarFecha',{
    codigo_barra:codigo_barra,
    dia_marcaje: date.getDate(),
    mes_marcaje: (date.getMonth()+1),
    periodo_marcaje: date.getFullYear(),

}).then((response)=>{

 if(response.data.message){
   //muestra mensaje de Empleado no encontrado
  setMensajeNombre(response.data.message);
  //setMensajeApellido("")
  //window.location.href = window.location.href;
 }else{
   //obtiene de la posición 0 del array el elemento de la entidad que se declara luego del punto
   //setMensajeNombre(response.data.message)
   //setMensajeApellido(response.data[0].apellido)
   setMensajeNombre(response.data[0].hra_entrada);
/////
   setMensajeHoraEnt(response.data[0].hra_entrada)
   setMensajeHoraSalAlm(response.data[0].hra_salida_alm)
   setMensajeHoraEntAlm(response.data[0].hra_entrada_alm)
   setMensajeHoraSal(response.data[0].hra_salida)

if (mensajeHoraEnt != null && mensajeHoraSalAlm == null && mensajeHoraEntAlm == null && mensajeHoraSal == null){
console.log("Ingreso mensaje hora Salida Almuerzo: 1");
  ActualizarDatosHraSalidaAlm(codigo_barra);
}else{
  if(mensajeHoraEnt != null && mensajeHoraSalAlm != null && mensajeHoraEntAlm == null && mensajeHoraSal == null){
    console.log("Ingreso mensaje hora Entrada Almuerzo: 2");
    ActualizarDatosHraEntradaAlm(codigo_barra);
}else{
  if(mensajeHoraEnt != null && mensajeHoraSalAlm != null && mensajeHoraEntAlm != null && mensajeHoraSal == null){
    console.log("Ingreso mensaje hora Salida: 3");
    ActualizarDatosHraSalida(codigo_barra);
    }else{
      if(mensajeHoraEnt != null && mensajeHoraSalAlm != null && mensajeHoraEntAlm != null && mensajeHoraSal != null){
        console.log("Ya se han realizado todos los marcajes del día: 4");
      }else{
        console.log("El empleado ha realizado un marcaje erróneo 1072022");
      }
    }
  }
}
//////

   //se obtiene el dato null pero luego del elemento que lo tiene ej:
   //4 tiene null pero no se muestra, 5 no tiene null pero se muestra el null del 4
    if(mensajeNombre === null){
    console.log("obtiene dato NULL");
    }else{
    console.log("valor");
    //console.log(setMensajeNombre);
   
    }
    //setMensajeNombre(response.data[0].hra_entrada)

    //ingresoDatos();
    //para la modificacion comparar codigo de barra y fecha actual, luego if para ver si el campo de entrada está en NULL
    //si es null ingreso hra entrada, de lo contrario ingreso hra salida.
    //ActualizarDatos(codigo_barra);
    }
    console.log(response);
    });

};




  return(
    <main>
    <div className ="img_logo">
      <img src={logo}/>
    </div>
    <div className="reloj">
      <div>
        {dateTime.hours}:{dateTime.minutes}:{dateTime.seconds}
      </div>
    </div>
    <div className="nombre_emp">
    <h1>{mensajeNombre} {mensajeApellido}</h1>
    </div>
    
      <div className="codigo_barra">
        <input type="text" placeholder='codigo' ref={focusDiv}   onKeyDown={(e) => captura(e)}     onChange={(event) => {setCodigo_Barra(event.target.value);}}/>
      </div>
      <div>
        <button id="probar" onClick={busquedaCB}>Prueba</button>
      </div>
  <div>
  <button id="probar2" onClick={busquedaPr}>Prueba2</button>
      
  </div>

      

    </main>
  )
}
  export default App;
