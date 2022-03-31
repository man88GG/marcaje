import { raw } from 'body-parser';
import { connection } from 'mongoose';
import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class marcajeObtener{


    public async obtenerEmpleado(id_empleado:any){

        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{

                const rawData = await connection.manager.query(`
                SELECT nombre, apellido FROM sincyt.rrhh_empleado WHERE id_empleado ='${id_empleado}';
                `);
                const respuesta = { metodo: "obtenerEmpleado",id_empleado: rawData  };
                return rawData;
            }
            catch(e){
                const respuesta = { metodo: "obtenerEmpleado", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }


    public async obtenerFechaMarcaje(id_empleado:any, fecha_marcaje:any){

        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
               /*
                const codigo_barra = req.body.codigo_barra;
                const dia_marcaje= req.body.dia_marcaje;
                const mes_marcaje= req.body.mes_marcaje;
                const periodo_marcaje= req.body.periodo_marcaje;

                const fecha_marcaje = (periodo_marcaje +"-"+ mes_marcaje+"-"+dia_marcaje);*/

                const rawData = await connection.manager.query(`
                SELECT fecha_marcaje, hra_entrada, hra_salida FROM sincyt.rrhh_marcaje WHERE fecha_marcaje ='${fecha_marcaje}' AND id_empleado = '${id_empleado}';
                `);
                const respuesta = { metodo: "obtenerFechaMarcaje",id_empleado: rawData };

                return rawData;
            }
            catch(e){
                const respuesta = { metodo: "obtenerFechaMarcaje", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }
    
    public async obtenerFechaExistente(id_empleado:any, fecha_marcaje:any){

        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
               /*
                const codigo_barra = req.body.codigo_barra;
                const dia_marcaje= req.body.dia_marcaje;
                const mes_marcaje= req.body.mes_marcaje;
                const periodo_marcaje= req.body.periodo_marcaje;

                const fecha_marcaje = (periodo_marcaje +"-"+ mes_marcaje+"-"+dia_marcaje);*/

                const rawData = await connection.manager.query(`
                SELECT fecha_marcaje, hra_entrada, hra_salida FROM sincyt.rrhh_marcaje WHERE fecha_marcaje ='${fecha_marcaje}' AND id_empleado = '${id_empleado}' AND hra_salida IS NULL ORDER BY hra_entrada ASC;
                `);
                const respuesta = { metodo: "obtenerFechaExistente",id_empleado: rawData };

                return rawData;
            }
            catch(e){
                const respuesta = { metodo: "obtenerFechaExistente", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }










}