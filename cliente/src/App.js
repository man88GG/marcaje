import React, {Component,useEffect, useRef, useState} from 'react';
import logo from './img/logo.jpg';
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
  
const date = new Date();
const dia_marcaje = date.getDate();
const mes_marcaje = (date.getMonth()+1);
const periodo_marcaje = date.getFullYear();
const fecha_marcaje = (periodo_marcaje +"-"+ mes_marcaje+"-"+dia_marcaje);
const hora_marcaje = date.toLocaleTimeString();
const[mensajeNombre, setMensajeNombre] =UseAsyncState("");
const[mensajeApellido, setMensajeApellido] =UseAsyncState("");
const[controlador1, setControlador1]=useState("");

  //////
  const [state, setState] = useState('');

  const Captura = (event) => {  
    //condicion para la busqueda e ingreso de datos cuando el lector manda la señal
    if(event.key==='Enter'){
    //se cambia el estado al nombre de la tecla que es presionada, en este caso es la tecla enter
    setControlador1('0')
      setState(event.key);
      //se llama a la funcion 
      BusquedaEmpleado();
    }else{
      //funcion para recargar la pagina luego de 5 min
      HandlerOne();
    }
  };
////////

//se declaran variables para envío de datos del MVC
const [codigo_barra, setCodigo_Barra] = useState("");

//hace focus al texbox que obtendrá la variable del codigo barras
const focusDiv = useRef(null);
useEffect(()=>{
  const focusPermanente = setInterval (()=>{
    //selecciona el texto del input 
    focusDiv.current.blur();
    if(focusDiv.current)focusDiv.current.focus();
  },500);
  return()=>clearInterval(focusPermanente);
},[focusDiv]);



const HandlerOne=(e)=>{
  //e.preventDefault();
   setControlador1('Inicia Request al Backend');
 setTimeout(()=>{
   setControlador1('1')
 },300000)//5 min aprox
 }
 
 //9min = 500000
 //17min = 1000000
 
 useEffect(()=>{
   if(controlador1 === '1'){
    window.location.href = window.location.href;
    //console.log("Prueba Hora: " + horaMarcaje);
   }
 },[controlador1])

 
//seleccionar todo el contenido 
const handleFocus = (event) => event.target.select();

//insertar datos
const IngresoDatos =()=>{
  Axios.post('http://localhost:5000/apis/rrh/registrar/registrarMarcaje/'+ fecha_marcaje + '/' + hora_marcaje + '/' + codigo_barra, {    

}).then(()=>{

console.log(date.toLocaleString());
console.log("conexion exitosa");
console.log("hora:");
console.log(date.toLocaleTimeString());
console.log(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());

  });
};
//


//insertar datos
const Bitacora =()=>{
  Axios.post('http://localhost:5000/apis/rrh/registrar/registrarBitacoraMarcaje/'+ fecha_marcaje + '/' + hora_marcaje + '/' + codigo_barra, {    
}).then(()=>{
console.log("Registro Bitacora")
  });
};
//

const ActualizarDatosHraSalida = (codigo_barra)=>{

  Axios.put('http://localhost:5000/apis/rrh/actualizar/actualizarHraSalidaMarcaje/'+ codigo_barra + '/' + hora_marcaje + '/' + fecha_marcaje,{
  }).then(()=>{
   console.log("Dato Actualizado")
  });  
};
//

const BusquedaEmpleado = () =>{
  axios.get('http://localhost:5000/apis/rrh/buscar/obtenerEmpleado/' + codigo_barra).then
  (result=>{
console.log(result);
//condicional para verificar si existe el dato en la BD
     if(result.data.length > 0){
      console.log("resultado obtenido")
      setMensajeNombre(result.data[0].nombre)
      setMensajeApellido(result.data[0].apellido)
    console.log("Empleado Encontrado: "+ result.data[0].nombre)
    BuscarFechaActual();
      
  }else{ 
   
    console.log("Resultado No Obtenido")
      console.log("Empleado No Encontrado: ");
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

    console.log(result);

    if(result.data.length > 0){

      console.log(result);
      console.log("Fecha Existente Encontrada")
      ActualizarDatosHraSalida(codigo_barra);
      Bitacora();

  
       }else{
      //Fecha que contiene NULL en hra salida
       
      console.log("Fecha Existente No Encontrada")
      console.log(result);
     
      IngresoDatos(codigo_barra);
       }

       });
    };
//



//buscar datos
const BuscarFechaActual = () => {
  Axios.get('http://localhost:5000/apis/rrh/buscar/obtenerFechaMarcaje/'+ codigo_barra +'/'+ fecha_marcaje).then
  (result=>{
    console.log(result);
    //condicional para verificar si existe el dato en la BD
         if(result.data.length > 0){
           console.log("Existe Fecha Anterior Registrada")
          BusquedaFechaExistente();
          
      }else{ 
       
        //No Existe el dato en la busqueda
        //Se inserta un nuevo Registro con Hora Entrada
        console.log("Nuevo Registro de Hra Entrada")
        console.log("Ingreso Marcaje: 0");
        IngresoDatos(codigo_barra);
        Bitacora();
      }
      
    }).catch
      (console.log())
      }

  //
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
        <input type="text" placeholder='codigo' ref={focusDiv}   onKeyDown={(e) => Captura(e)}  onFocus={handleFocus} onChange={(event) => {setCodigo_Barra(event.target.value);}}/>
      </div>
    </main>
  )
}

  export default App;