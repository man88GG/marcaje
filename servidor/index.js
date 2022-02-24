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
    database: "dbmarcaje",
});

//insertar datos
app.post("/create", (req,res) =>{
  
    const codigo_barra = req.body.codigo_barra;
    const hora_marcaje = req.body.hora_marcaje;
    const id = 2;

    db.query(
        "INSERT INTO marcaje (hra_entrada, hra_salida, fk_id_empleado) VALUES(?,?,?)",
    [codigo_barra,hora_marcaje,id],  
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

   db.query("UPDATE empleado SET tel_empleado = ? WHERE pk_id_empleado =?", [hora_marcaje, codigo_barra],
   (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
            return result;
        }
    
    });

});

//buscar datos
app.post("/buscar",(req,res)=>{
    
   const codigo_barra = req.body.codigo_barra;
    db.query("SELECT nombre_completo FROM empleado WHERE pk_id_empleado =?",[codigo_barra] , 
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

app.listen(3001, ()=>{
    console.log("Server Running on port 3001");
});

