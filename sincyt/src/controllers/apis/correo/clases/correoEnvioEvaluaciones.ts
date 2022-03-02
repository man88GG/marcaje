import { raw } from 'body-parser';
import { connection } from 'mongoose';
import { type } from 'os';
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import { correoCuerpoEvaluaciones } from './correoCuerpoEvaluaciones';
import { correoInsertarBd } from './correoInsertarBd';

export class correoEnvioEvaluaciones{
    constructor() {
    }

    public async enviarNotificacionEvaluacion(id_persona: any ){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                let rawData = [];
                 rawData = await connection.manager.query(`
                 select a.nombre_completo as nombre_completo, a.correo_electronico as correo_electronico
                 from gtu_usuario a
                 inner join rrhh_persona b on a.id = b.id_evaluado
                 where  b.id_persona = ${id_persona}`);
                 const nombre = rawData[0].nombre_completo;
                 const correo = rawData[0].correo_electronico;
                 await new correoCuerpoEvaluaciones().sendCorreoEvaluacion(correo, nombre, id_persona);
                 const respuesta = { metodo: "enviarNotificacionEvaluacion", codigo: 1, tipoCorreo: id_persona, rawData };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "enviar", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async enviarNotificacionEvaluacionEvaluador(id_evaluador : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try{
                let rawData=[];
                rawData = await connection.manager.query(`
                select a.nombre_completo as nombre_completo, a.correo_electronico as correo_electronico
                from gtu_usuario a
                inner join rrhh_evaluador b on a.id = b.id_evaluador
                where  b.id_evaluador = ${id_evaluador};
                `);
                const nombre_evaluador = rawData[0].nombre_completo;
                const correo_evaluador = rawData[0].correo_electronico;
                await new correoCuerpoEvaluaciones().sendCorreoEvaluacionEvaluador(correo_evaluador, nombre_evaluador, id_evaluador);
                const respuesta = { metodo :"enviarNotificacionEvaluacionEvaludor", codigo : 1, tipoCorreo : id_evaluador, rawData};
                return respuesta;
            }catch(e){
                console.log(e);
                const respuesta = { metodo: "enviar", codigo : 0, mensaje : "Error en la acción, revise los parametros ingresados"};
            }
        })
    }
}