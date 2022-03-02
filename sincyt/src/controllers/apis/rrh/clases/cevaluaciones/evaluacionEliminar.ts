import { connection } from 'mongoose';
import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class evaluacionEliminar{
    public async eliminarEvaluador(id_evaluador : string){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
           try{
                const rawData = await connection.manager.query( ` DELETE FROM sincyt.rrhh_evaluador WHERE id_evaluador = ${id_evaluador}`);
                const respuesta = { metodo : "eliminarEvaluador", codigo : 1, id_evaluador};
                return respuesta;
           }
           catch(e){
                const respuesta = { metodo : "eliminarEvaluador", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados"};
                return respuesta;
           }
        })
    }


    public async eliminarEvaluado(id_persona : string){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try{
                const rawData = await connection.manager.query( `DELETE FROM sincyt.rrhh_persona WHERE id_persona = ${id_persona} ` );
                const respuesta = { metodo : "eliminarEvaluado", codigo : 1 , id_persona};
                return respuesta;
            }
            catch(e){
                const respuesta = { metodo : "eliminarEvaluado", codigo : 0, mensaje : "Error en la consulta, revise los parametros ingresados"};
                return respuesta;
            }
        })
    }
}