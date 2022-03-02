import { raw } from 'body-parser';
import { connection } from 'mongoose';
import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class marcajeObtener{



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
                SELECT fecha_marcaje, hra_entrada, hra_salida_alm, hra_entrada_alm, hra_salida FROM marcaje WHERE fecha_marcaje WHERE fecha_marcaje ='${fecha_marcaje}' AND fk_id_empleado = '${id_empleado}';
                `);
                const respuesta = { metodo: "obtenerFechaMarcaje",id_marcaje: rawData };

                return rawData;
            }
            catch(e){
                const respuesta = { metodo: "obtenerFechaMarcaje", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }


    public async obtenerFechaEmpleado(id_empleado:any){

        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
            

                const rawData = await connection.manager.query(`
                SELECT nombre, apellido FROM empleado WHERE id_empleado ='${id_empleado}';
                `);
                const respuesta = { metodo: "obtenerFechaEmpleado",id_empleado: rawData  };

                return rawData;
            }
            catch(e){
                const respuesta = { metodo: "obtenerFechaEmpleado", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }





}