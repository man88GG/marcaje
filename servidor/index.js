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
    database: "dbmarcaje2",
});

//insertar datos
app.post("/create", (req,res) =>{
  
    //datos para el marcaje
    const codigo_barra = req.body.codigo_barra;
    const hora_marcaje = req.body.hora_marcaje;

    //datos para la bitacora
    const dia_marcaje= req.body.dia_marcaje;
    const mes_marcaje= req.body.mes_marcaje;
    const periodo_marcaje= req.body.periodo_marcaje;

    const fecha_marcaje = (periodo_marcaje +"-"+ mes_marcaje+"-"+dia_marcaje);

    //consulta ingreso de marcaje
    db.query(
        "INSERT INTO marcaje (fecha_marcaje,hra_entrada, fk_id_empleado) VALUES(?,?,?)",
    [fecha_marcaje,hora_marcaje,codigo_barra]);

    //consulta para la bitacora
    db.query(
        "INSERT INTO bitacora_marcaje (fecha_bitacora_marcaje,id_empleado_bitacora_marcaje) VALUES(?,?)",
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
app.put("/actualizar", (req,res) =>{
  
    const codigo_barra = req.body.codigo_barra;
    const hora_marcaje = req.body.hora_marcaje;

    //datos para la bitacora
    const dia_marcaje= req.body.dia_marcaje;
    const mes_marcaje= req.body.mes_marcaje;
    const periodo_marcaje= req.body.periodo_marcaje;

    const fecha_marcaje = (periodo_marcaje +"-"+ mes_marcaje+"-"+dia_marcaje);

   db.query("UPDATE marcaje SET hra_salida = ? WHERE fk_id_empleado =?", [hora_marcaje, codigo_barra],
   (err,result)=>{
    if(err){
        console.log(err)

    }else{
        res.send("Values inserted");
    }

});
 //consulta para la bitacora
   db.query(
    "INSERT INTO bitacora_marcaje (fecha_bitacora_marcaje,id_empleado_bitacora_marcaje) VALUES(?,?)",
[fecha_marcaje +" "+ hora_marcaje,codigo_barra]);

});

//buscar datos y verificar si existe el empleado
app.post("/buscarEmpleado",(req,res)=>{
    
   const codigo_barra = req.body.codigo_barra;
    db.query("SELECT nombre, apellido FROM empleado WHERE id_empleado =?",[codigo_barra] , 
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

     db.query("SELECT fecha_marcaje, hra_entrada, hra_salida_alm, hra_entrada_alm,  hra_salida FROM marcaje WHERE fecha_marcaje =? AND fk_id_empleado =?",[fecha_marcaje, codigo_barra] , 
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

