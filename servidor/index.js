const express = require ("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "",
    database: "dbmarcaje3",
});

//insertar datos
app.post("/DatosMarcajeEmpleado", (req,res) =>{
  
    //datos para el marcaje
    const codigo_barra = req.body.codigo_barra;
    const hora_marcaje = req.body.hora_marcaje;
    
    const dia_marcaje= req.body.dia_marcaje;
    const mes_marcaje= req.body.mes_marcaje;
    const periodo_marcaje= req.body.periodo_marcaje;

    const fecha_marcaje = (periodo_marcaje +"-"+ mes_marcaje+"-"+dia_marcaje);

    //consulta ingreso de marcaje
    db.query(
        "INSERT INTO rrhh_marcaje (fecha_marcaje,hra_entrada, id_empleado) VALUES(?,?,?)",
    [fecha_marcaje,hora_marcaje,codigo_barra],
    (err,result)=>{
        if(err){
            console.log(err)

        }else{
            res.send("Values inserted");
        }
    
    });
    
});


//insertar bitacora
app.post("/bitacora", (req,res) =>{
  

    const codigo_barra = req.body.codigo_barra;
    const hora_marcaje = req.body.hora_marcaje;

    const dia_marcaje= req.body.dia_marcaje;
    const mes_marcaje= req.body.mes_marcaje;
    const periodo_marcaje= req.body.periodo_marcaje;

    const fecha_marcaje = (periodo_marcaje +"-"+ mes_marcaje+"-"+dia_marcaje);

    //consulta para la bitacora
    db.query(
        "INSERT INTO rrhh_bitacora_marcaje (fecha_bitacora_marcaje,id_empleado) VALUES(?,?)",
    [fecha_marcaje +" "+ hora_marcaje,codigo_barra],
    (err,result)=>{
        if(err){
            console.log(err)

        }else{
            res.send("Values inserted");
        }
    
    });
    
});


//actualizar datos
app.put("/actualizarHraSalida", (req,res) =>{
  
    const codigo_barra = req.body.codigo_barra;
    const hora_marcaje = req.body.hora_marcaje;
    const dia_marcaje= req.body.dia_marcaje;
    const mes_marcaje= req.body.mes_marcaje;
    const periodo_marcaje= req.body.periodo_marcaje;

    const fecha_marcaje = (periodo_marcaje +"-"+ mes_marcaje+"-"+dia_marcaje);

   db.query("UPDATE rrhh_marcaje SET hra_salida = ? WHERE fecha_marcaje =? AND id_empleado =?", [hora_marcaje, fecha_marcaje, codigo_barra],
   (err,result)=>{
    if(err){
        console.log(err)

    }else{
        res.send("Values inserted");
    }

});

});

////////
/*
//actualizar datos
app.put("/agregarTiempoLaborado", (req,res) =>{
  
    const codigo_barra = req.body.codigo_barra;
 
   db.query("UPDATE rrhh_marcaje SET horas_laboradas = ? WHERE id_empleado =?", [tiempo_laborado, codigo_barra],
   (err,result)=>{
    if(err){
        console.log(err)

        }else{
            res.send("Values inserted");
        }

    });

});
*/
////////

//buscar datos y verificar si existe el empleado
app.post("/buscarEmpleado",(req,res)=>{
    
   const codigo_barra = req.body.codigo_barra;
    db.query("SELECT nombre, apellido FROM rrhh_empleado WHERE id_empleado =?",[codigo_barra] , 
    (err,result)=>{
        if(err){
            res.send({err: err});
        }
            if(result.length > 0){
                res.send(result);
            }else{ 
                res.send({message:"Empleado No Registrado"});
            }
    });

});

//buscar datos y verificar si el empleado ya se registro de entrada
app.post("/buscarFecha",(req,res)=>{
    
    const codigo_barra = req.body.codigo_barra;
    const dia_marcaje= req.body.dia_marcaje;
    const mes_marcaje= req.body.mes_marcaje;
    const periodo_marcaje= req.body.periodo_marcaje;

    const fecha_marcaje = (periodo_marcaje +"-"+ mes_marcaje+"-"+dia_marcaje);

     db.query("SELECT fecha_marcaje, hra_entrada, hra_salida FROM rrhh_marcaje WHERE fecha_marcaje =? AND id_empleado =?",[fecha_marcaje, codigo_barra] , 
     (err,result)=>{
         if(err){
             res.send({err: err});
         }
             if(result.length > 0){
                 //res.send(result);
                 res.send(result);
             }else{ 
                 res.send({message:"Fecha No Registrada"});
             }
     });
 });



//buscar datos y verificar si el empleado ya se registro de entrada
app.post("/buscarFechaExistente",(req,res)=>{
    
    const codigo_barra = req.body.codigo_barra;
    const dia_marcaje= req.body.dia_marcaje;
    const mes_marcaje= req.body.mes_marcaje;
    const periodo_marcaje= req.body.periodo_marcaje;

    const fecha_marcaje = (periodo_marcaje +"-"+ mes_marcaje+"-"+dia_marcaje);

     db.query("SELECT fecha_marcaje, hra_entrada, hra_salida FROM rrhh_marcaje WHERE fecha_marcaje =? AND id_empleado =? AND hra_salida IS NULL ORDER BY hra_entrada ASC",[fecha_marcaje,codigo_barra] , 
     (err,result)=>{

        
         if(err){
             res.send({err: err});
         }
             if(result.length > 0){
                 //res.send(result);
                 res.send(result);
             }else{ 
                 res.send({message:"Fecha No Registrada"});
             }
     });
 });


app.listen(3001, ()=>{
    console.log("Server Running on port 3001");
});

