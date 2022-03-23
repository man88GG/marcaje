import React, {Component,useEffect, useRef, useState} from 'react';
import logo from './img/logo.jpg';
import Reloj from './componentes/Reloj';
import Axios from 'axios'
import './css/App.css';
import { findAllByTestId } from '@testing-library/react';


//revisar lo de los periodos para marcaje y usar ifs para saber donde ubicar donde iria el marcaje
//esto ultimo hacerlo con ifs

function useAsyncState(initialValue) {
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

const[mensajeNombre, setMensajeNombre] =useAsyncState("");
const[mensajeApellido, setMensajeApellido] =useAsyncState("");

  //////
  const [state, setState] = useState('');

  const captura = (event) => {  
      
    //condicion para la busqueda e ingreso de datos cuando el lector manda la señal
    if(event.key==='Enter'){
    //se cambia el estado al nombre de la tecla que es presionada, en este caso es la tecla enter
      setState(event.key);
      //se llama a la funcion 
      BusquedaEmpleado();
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


//seleccionar todo el contenido 
const handleFocus = (event) => event.target.select();


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
 

  
console.log(date.toLocaleString());
console.log("conexion exitosa");
console.log("hora:");
console.log(date.toLocaleTimeString());
console.log(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
//refresca la pagina para liberar el cargado de memoria de las variables usadas
//window.location.href = window.location.href;
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
  
   BusquedaEmpleado();
  });  
};
//

const ActualizarDatosTiempoLaborado = (codigo_barra,tiempo_laborado)=>{

  Axios.put('http://localhost:3001/agregarTiempoLaborado',{
    codigo_barra:codigo_barra,
    tiempo_laborado:tiempo_laborado

  }).then(()=>{
   
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
        ingresoDatos(codigo_barra);
        
        Bitacora();
        

       }else{

        
           if (response.data[0].hra_entrada != null && response.data[0].hra_salida_alm == null && response.data[0].hra_entrada_alm == null && response.data[0].hra_salida == null){
         console.log("Ingreso mensaje hora Salida Almuerzo: 1");
         ActualizarDatosHraSalidaAlm(codigo_barra);
        
             Bitacora();
         }else{
           if(response.data[0].hra_entrada != null && response.data[0].hra_salida_alm != null && response.data[0].hra_entrada_alm == null && response.data[0].hra_salida == null){
             console.log("Ingreso mensaje hora Entrada Almuerzo: 2");
             ActualizarDatosHraEntradaAlm(codigo_barra);
           
           
             Bitacora();
         }else{
           if(response.data[0].hra_entrada != null && response.data[0].hra_salida_alm != null && response.data[0].hra_entrada_alm != null && response.data[0].hra_salida == null){
             console.log("Ingreso mensaje hora Salida: 3");
             ActualizarDatosHraSalida(codigo_barra);
      
             
             //CalculoTiempoDiario(response.data[0].hra_entrada,response.data[0].hra_salida);
             Bitacora();
             
             }else{
               if(response.data[0].hra_entrada != null && response.data[0].hra_salida_alm != null && response.data[0].hra_entrada_alm != null && response.data[0].hra_salida != null){
                 
                 console.log("Ya se han realizado todos los marcajes del día")
                 //setMensajeApellido("")
                
                 CalculoTiempoDiario(response.data[0].hra_entrada,response.data[0].hra_salida);

               }else{
                 console.log("El empleado ha realizado un marcaje erróneo ");
                 
               }
             }
           }
         }
         
          }
        
    });
  };
  //

//
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

}

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
        <input type="text" placeholder='codigo' ref={focusDiv}   onKeyDown={(e) => captura(e)}  onFocus={handleFocus} onChange={(event) => {setCodigo_Barra(event.target.value);}}/>
      </div>  
    </main>
  )
}

  export default App;