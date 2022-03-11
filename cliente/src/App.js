import React, {Component,useEffect, useRef, useState} from 'react';
import logo from './img/logo.jpg';
import Reloj from './componentes/Reloj';
import Axios from 'axios'
import './css/App.css';
import { findAllByTestId } from '@testing-library/react';


//hay un retraso de 30 seg al marcar con el lector
//ver como obtener los valores al realizar la busqueda la primera vez


//buscar fecha actual
//si no hay la inserta y busca empleado (o se llama a si misma la funcion)
//si hay nomas busca empleado
//si no existe empleado, mostrar mensaje que no existe
// si existe, comparar los nulls de las fechas para saber donde insertar


const date = new Date();

function App (){

const[mensajeNombre, setMensajeNombre] =useState("a");
const[mensajeApellido, setMensajeApellido] =useState("a");
const[mensajeHoraEnt, setMensajeHoraEnt] =useState("a");
const[mensajeHoraSal, setMensajeHoraSal] =useState("a");
const[mensajeHoraEntAlm, setMensajeHoraEntAlm] =useState("a");
const[mensajeHoraSalAlm, setMensajeHoraSalAlm] =useState("a");
const total_horas =0;



  //////
  const [state, setState] = useState('');
    

  const captura = (event) => {
    
    //condicion para la busqueda e ingreso de datos cuando el lector manda la señal
    if(event.key==='Enter'){
      
    //se cambia el estado al nombre de la tecla que es presionada, en este caso es la tecla enter
      setState(event.key);
      //window.location.href = window.location.href;
      //se llama a la funcion 
      BusquedaEmpleado();
      
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


//insertar datos
const ingresoDatos =()=>{
  Axios.post('http://localhost:3001/DatosMarcajeEmpleado', {    
    codigo_barra: codigo_barra,
    hora_marcaje:date.toLocaleTimeString(),
    //se llama a la fecha 
    dia_marcaje: date.getDate(),
    mes_marcaje: (date.getMonth()+1),
    periodo_marcaje: date.getFullYear(),
}).then(()=>{

console.log(mensajeNombre);
console.log(mensajeApellido);
console.log(mensajeHoraEnt);
console.log(mensajeHoraSal);
console.log(mensajeHoraEntAlm);
console.log(mensajeHoraSalAlm);


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


//insertar datos
const Bitacora =()=>{
  Axios.post('http://localhost:3001/bitacora', {    
    codigo_barra: codigo_barra,
    //se llama a la fecha y obtiene solamente la hora
    hora_marcaje:date.toLocaleTimeString(),
    dia_marcaje: date.getDate(),
    mes_marcaje: (date.getMonth()+1),
    periodo_marcaje: date.getFullYear(),
}).then(()=>{

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
    //window.location.href = window.location.href;
    console.log(mensajeNombre);
    console.log(mensajeApellido);
    console.log(mensajeHoraEnt);
    console.log(mensajeHoraSal);
    console.log(mensajeHoraEntAlm);
    console.log(mensajeHoraSalAlm);
    
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
    //window.location.href = window.location.href;
    console.log(mensajeNombre);
console.log(mensajeApellido);
console.log(mensajeHoraEnt);
console.log(mensajeHoraSal);
console.log(mensajeHoraEntAlm);
console.log(mensajeHoraSalAlm);
 
  
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
    //window.location.href = window.location.href;
    console.log(mensajeNombre);
    console.log(mensajeApellido);
    console.log(mensajeHoraEnt);
    console.log(mensajeHoraSal);
    console.log(mensajeHoraEntAlm);
    console.log(mensajeHoraSalAlm);
     
  });  
};
//

//buscar datos
const BusquedaEmpleado = () => {
  Axios.post('http://localhost:3001/buscarEmpleado',{
    codigo_barra:codigo_barra,

}).then((response)=>{

    if(response.data.message){
        //muestra mensaje de Empleado no encontrado
        setMensajeNombre(response.data.message)
        setMensajeApellido("")
       }else{

        BuscarFechaActual();
        setMensajeNombre(response.data[0].nombre)
        setMensajeApellido(response.data[0].apellido)
       }

       });
    };
//

//buscar datos
const BuscarFechaActual = () => {
    Axios.post('http://localhost:3001/buscarFecha',{
        codigo_barra:codigo_barra,
        dia_marcaje: date.getDate(),
        mes_marcaje: (date.getMonth()+1),
        periodo_marcaje: date.getFullYear(),

  }).then((response)=>{
  
    if(response.data.message){
    
        //Se inserta Hora Entrada
        console.log("Ingreso Marcaje: 0");
        ingresoDatos();
        Bitacora();
        

       }else{

          // setMensajeNombre(response.data[0].hra_entrada);
         /////
            setMensajeHoraEnt(response.data[0].hra_entrada)
            setMensajeHoraSalAlm(response.data[0].hra_salida_alm)
            setMensajeHoraEntAlm(response.data[0].hra_entrada_alm)
            setMensajeHoraSal(response.data[0].hra_salida)
            
           if (mensajeHoraEnt != null && mensajeHoraSalAlm == null && mensajeHoraEntAlm == null && mensajeHoraSal == null){
         console.log("Ingreso mensaje hora Salida Almuerzo: 1");
             ActualizarDatosHraSalidaAlm(codigo_barra);
             Bitacora();
         }else{
           if(mensajeHoraEnt != null && mensajeHoraSalAlm != null && mensajeHoraEntAlm == null && mensajeHoraSal == null){
             console.log("Ingreso mensaje hora Entrada Almuerzo: 2");
             ActualizarDatosHraEntradaAlm(codigo_barra);
             Bitacora();
         }else{
           if(mensajeHoraEnt != null && mensajeHoraSalAlm != null && mensajeHoraEntAlm != null && mensajeHoraSal == null){
             console.log("Ingreso mensaje hora Salida: 3");
         
             ActualizarDatosHraSalida(codigo_barra);
             //CalculoTiempoDiario();
             Bitacora();
             console.log("Marcajes posibles realizados");
             }else{
               if(mensajeHoraEnt != null && mensajeHoraSalAlm != null && mensajeHoraEntAlm != null && mensajeHoraSal != null){
                 console.log("Ya se han realizado todos los marcajes del día: 4");
                 
                 console.log(mensajeNombre);
console.log(mensajeApellido);
console.log(mensajeHoraEnt);
console.log(mensajeHoraSal);
console.log(mensajeHoraEntAlm);
console.log(mensajeHoraSalAlm);

            
               }else{
                 console.log("El empleado ha realizado un marcaje erróneo 1072022");
                 
               }
             }
           }
         }
         
        }

    });
  };


const CalculoTiempoDiario =()=>{

  console.log("Hora E: " + mensajeHoraEnt);
  console.log("Hora S: " + mensajeHoraSal);
  var p1 = (mensajeHoraSal);
  var p2 = (mensajeHoraEnt);
  var hora1 = (p1).split(":"),
      hora2 = (p2).split(":"),
      t1 = new Date(),
      t2 = new Date();
//Se establecen en arreglos los 3 parametros
t1.setHours(hora1[0], hora1[1], hora1[2]);
t2.setHours(hora2[0], hora2[1], hora2[2]);
//Calculo de tiempo laborado diariamente
t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
//Mensaje de total de Horas
console.log("Total de Tiempo Laborado el día de hoy: " + (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " horas" : " hora") : "") + (t1.getMinutes() ? ", " + t1.getMinutes() + (t1.getMinutes() > 1 ? " minutos" : " minuto") : "") + (t1.getSeconds() ? (t1.getHours() || t1.getMinutes() ? " y " : "") + t1.getSeconds() + (t1.getSeconds() > 1 ? " segundos" : " segundo") : ""));

}

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
        <button id="probar" onClick={BusquedaEmpleado}>Prueba</button>
      </div>
  <div>
  <button id="probar2" onClick={BusquedaEmpleado}>Prueba2</button>
 
  </div>
    </main>
  )
}

  export default App;