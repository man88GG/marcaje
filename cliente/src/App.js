import React, {Component,useEffect, useRef, useState} from 'react';
import logo from './img/logo.png';
import Reloj from './componentes/Reloj';
import Axios from 'axios'
import './css/App.css';
import axios from 'axios';
//import { findAllByTestId } from '@testing-library/react';

function UseAsyncState(initialValue) {
  const [value, setValue] = useState(initialValue);
  const setter = x =>
    new Promise(resolve => {
      setValue(x);
      resolve(x);
    });
  return [value, setter];
}

function App (){
//variables para obtener la fecha y hora
const date = new Date();
const dia_marcaje = date.getDate();
const mes_marcaje = (date.getMonth()+1);
const periodo_marcaje = date.getFullYear();
const fecha_marcaje = (periodo_marcaje +"-"+ mes_marcaje+"-"+dia_marcaje);

let hora_marcaje = date.toLocaleTimeString();
//Hooks para mostrar el nombre y apellido en pantalla
const[mensajeNombre, setMensajeNombre] =UseAsyncState("");
const[mensajeApellido, setMensajeApellido] =UseAsyncState("");
//Hook para el focus permanente
  const [state, setState] = useState('');

  const Captura = (event) => {  
    //condicion para la busqueda e ingreso de datos cuando el lector manda la señal
    if(event.key==='Enter'){
      setState(event.key);
      //se llama a la funcion 
      BusquedaEmpleado();
    }
  };
////////

//Hook para recibir el codigo de barra
const [codigo_barra, setCodigo_Barra] = useState("");

//hace focus al texbox que obtendrá la variable del codigo barras
const focusDiv = useRef(null);
useEffect(()=>{
  const focusPermanente = setInterval (()=>{
    //quita el focus del txt 
    focusDiv.current.blur();
    //condicion para realizar el focus y poder seleccionar todo el texto
    if(focusDiv.current)focusDiv.current.focus();
  },500);
  return()=>clearInterval(focusPermanente);
},[focusDiv]);

 useEffect(()=>{
  const limpiarTexto = setInterval (()=>{
    setMensajeNombre("")
    setMensajeApellido("")
  },300000);//5 min aprox
   //9min = 500000
 //17min = 1000000

  return()=>clearInterval(limpiarTexto);
},[]);

 //funcion para actualizar la variable que obtiene la hora
 function actualizarHora(){
  const fecha = new Date();
  hora_marcaje = fecha.toLocaleTimeString();
  }
//llama a la función para la Hora
  setInterval(actualizarHora, 1000); 

//seleccionar todo el contenido del txt
const handleFocus = (event) => event.target.select();

//insertar datos
const IngresoDatos =()=>{
  Axios.post('http://localhost:5000/apis/rrh/registrar/registrarMarcaje/'+ fecha_marcaje + '/' + hora_marcaje + '/' + codigo_barra, {    

}).then(()=>{
/*
console.log("conexion exitosa");
console.log("Ingreso Realizado");
*/ 
Bitacora();
  });
};
//

//insertar datos
const Bitacora =()=>{
  Axios.post('http://localhost:5000/apis/rrh/registrar/registrarBitacoraMarcaje/'+ fecha_marcaje + '/' + hora_marcaje + '/' + codigo_barra, {    
}).then(()=>{
/*
  console.log("Registro Bitacora")
  */
  });
};
//

const ActualizarDatosHraSalida = (codigo_barra)=>{

  Axios.put('http://localhost:5000/apis/rrh/actualizar/actualizarHraSalidaMarcaje/'+ codigo_barra + '/' + hora_marcaje + '/' + fecha_marcaje,{
  }).then(()=>{
  /*
   console.log("Dato Actualizado")
   */
   Bitacora();
  });  
};
//

const BusquedaEmpleado = () =>{
  axios.get('http://localhost:5000/apis/rrh/buscar/obtenerEmpleado/' + codigo_barra).then
  (result=>{
//condicional para verificar si existe el dato en la BD
     if(result.data.length > 0){
      //Se agrega el nombre y apellido para luego mostrarlos en pantalla
      setMensajeNombre(result.data[0].nombre)
      setMensajeApellido(result.data[0].apellido)
    //console.log("Empleado Encontrado: "+ result.data[0].nombre)
    BuscarFechaActual();
      
  }else{ 
      setMensajeNombre("Empleado No Encontrado")
      setMensajeApellido("")
  }
  
}).catch
  (console.log())
  }


//buscar datos
const BusquedaFechaExistente = () => {
  Axios.get('http://localhost:5000/apis/rrh/buscar/obtenerFechaExistente/'+ codigo_barra + '/' + fecha_marcaje).then

  (result=>{

    if(result.data.length > 0){

     // console.log("Fecha Existente Encontrada")
      ActualizarDatosHraSalida(codigo_barra);
     

       }else{
      //Fecha que contiene NULL en hra salida 
      // console.log("Fecha Existente No Encontrada")
      IngresoDatos(codigo_barra);
      
       }

       });
    };
//

//buscar datos
const BuscarFechaActual = () => {
  Axios.get('http://localhost:5000/apis/rrh/buscar/obtenerFechaMarcaje/'+ codigo_barra +'/'+ fecha_marcaje).then
  (result=>{
    //condicional para verificar si existe el dato en la BD
         if(result.data.length > 0){
          // console.log("Existe Fecha Anterior Registrada")
          BusquedaFechaExistente();
          
      }else{ 
        //No Existe el dato en la busqueda
        //Se inserta un nuevo Registro con Hora Entrada
       // console.log("Nuevo Registro de Hra Entrada")
       // console.log("Ingreso Marcaje: 0");

        IngresoDatos(codigo_barra);
        
      }
      
    }).catch
      (console.log())
      }

  /*
const CalculoTiempoDiario =(HoraEnt, HraSal)=>{
  console.log("Hora E: " + HoraEnt);
  console.log("Hora S: " + HraSal);

  var ObtieneHraFinal = (HraSal);
  var ObtieneHraInicial = (HoraEnt);

  var HoraFinal = (ObtieneHraFinal).split(":"),
      HoraInicial = (ObtieneHraInicial).split(":"),
      TiempoMayor = new Date(),
      TiempoMenor = new Date();

//Se establecen en arreglos los 3 parametros
TiempoMayor.setHours(HoraFinal[0], HoraFinal[1], HoraFinal[2]);
TiempoMenor.setHours(HoraInicial[0], HoraInicial[1], HoraInicial[2]);
//Calculo de tiempo laborado diariamente
TiempoMayor.setHours(TiempoMayor.getHours() - TiempoMenor.getHours(), TiempoMayor.getMinutes() - TiempoMenor.getMinutes(), TiempoMayor.getSeconds() - TiempoMenor.getSeconds());

var Horas =TiempoMayor.getHours();
var Minutos =TiempoMayor.getMinutes();
var Segundos =TiempoMayor.getSeconds();
//Se agregan los 0's faltantes 
if (Horas<10){Horas="0"+Horas;}
if (Minutos<10){Minutos="0"+Minutos;}
if (Segundos<10){Segundos="0"+Segundos;}
var HrasLaboradas = Horas + ":"+ Minutos + ":"+ Segundos;
console.log("Horas Laboradas: " + Horas + ":"+ Minutos + ":"+ Segundos);

ActualizarDatosTiempoLaborado(codigo_barra,HrasLaboradas);

}*/

  return(
    <main>
    <div className ="img_logo">
      <img src={logo}/>
    </div>
    <div className="reloj">
      <div>
      <Reloj></Reloj>
      </div>
    </div>
    <div className="nombre_emp">
    <h1>{mensajeNombre} {mensajeApellido}</h1>
    </div>
      <div className="codigo_barra">
        <input id="CodigoBarra" type="text" placeholder='codigo' ref={focusDiv}   onKeyDown={(e) => Captura(e)}  onFocus={handleFocus} onChange={(event) => {setCodigo_Barra(event.target.value);}}/>
      </div>
    </main>
  )
}

  export default App;