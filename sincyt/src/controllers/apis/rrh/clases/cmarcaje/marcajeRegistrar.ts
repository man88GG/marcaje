
import { AnyRecordWithTtl } from 'dns';
import { connection } from 'mongoose';
import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class marcajeRegistrar{

    public async registrarMarcaje(fecha_marcaje:any, hra_entrada:any, fk_id_empleado: any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {

            try{
                const rawData = await connection.manager.query(`
                INSERT INTO sincyt.rrhh_marcaje (fecha_marcaje,hra_entrada, id_empleado)
                VALUES('${fecha_marcaje}','${hra_entrada}','${fk_id_empleado}');`);
                const id = rawData.insertId;
                /* const evaluacion= await new evaluacionObtener().obtenerEvaluaciones(id); */
                const respuesta = { metodo: "registrarMarcaje", codigo: 1, id_marcaje:id, fecha_marcaje, hra_entrada, fk_id_empleado};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "registrarMarcaje", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", };
                return respuesta;
            }
        });
    }


    public async registrarBitacoraMarcaje(fecha_bitacora_marcaje:any, hora_marcaje_bitacora:any ,id_empleado:any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {

            try{
                const rawData = await connection.manager.query(`
                INSERT INTO sincyt.rrhh_bitacora_marcaje (fecha_bitacora_marcaje,id_empleado)
                VALUES('${fecha_bitacora_marcaje + " "+ hora_marcaje_bitacora}','${id_empleado}');`);
                const id = rawData.insertId;
                /* const evaluacion= await new evaluacionObtener().obtenerEvaluaciones(id); */
                const respuesta = { metodo: "registrarBitacoraMarcaje", codigo: 1, id_bitacora_marcaje:id, fecha_bitacora_marcaje, id_empleado};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "registrarBitacoraMarcaje", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", };
                return respuesta;
            }
        });


    }


}