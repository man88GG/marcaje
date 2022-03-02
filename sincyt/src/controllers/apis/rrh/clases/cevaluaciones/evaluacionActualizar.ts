import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class evaluacionActualizar{

    public async actualizarEvaluacionDesempenio(id_evaluacion:string, fecha_inicio:string, fecha_fin:string, id_nivel : string, id_tipo_evaluacion : string ) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`UPDATE sincyt.rrhh_evaluacion SET fecha_inicio = '${fecha_inicio}',
                fecha_fin = '${fecha_fin}', id_nivel = '${id_nivel}', id_tipo_evaluacion = '${id_tipo_evaluacion}' WHERE id_evaluacion = '${id_evaluacion}';`);
                const respuesta = { metodo: "actualizarEvaluacion", codigo: 1, fecha_inicio, fecha_fin, id_nivel, id_tipo_evaluacion, id_evaluacion};
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarEvaluacionDesempenio", codigo: 0, mensaje: "Error en la consulta Verifique los parametros" };
                return respuesta;
            }
        });
    }

    public async registrarComentarioEvaluador( id_persona : string, comentarioEvaluador : string ){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try{
                const rawData = await connection.manager.query(`
                UPDATE sincyt.rrhh_persona SET res_evaluador = '${comentarioEvaluador}' WHERE (id_persona = '${id_persona}');
                `);
                const respuesta = { metodo: "registrarComentarioEvaluador", codigo: 1, comentarioEvaluador, id_persona };
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "registrarEvaluacionDesempenio", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", };
                return respuesta;
            }
        });
    }

    public async enviarEvaluacion(id_persona : string ) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                UPDATE sincyt.rrhh_persona SET estado_persona = '3' WHERE (id_persona = '${id_persona}');
                `);
                const respuesta = { metodo: "actualizarEvaluacion", codigo: 1, id_persona};
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarEvaluacionDesempenio", codigo: 0, mensaje: "Error en la consulta Verifique los parametros" };
                return respuesta;
            }
        });
    }

    public async registrarAccion(id_compromiso : any, contenido : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try {
                const rawData = await connection.manager.query(`
                UPDATE sincyt.rrhh_compromiso SET res_accion = '${contenido}' WHERE (id_compromiso = '${id_compromiso}');

                `);
                const respuesta = { metodo : "registrarAspecto", codigo : 1, id_compromiso, contenido}
                return respuesta;
            } catch (e) {
                const respuesta = { metodo : "registrarAspecto", codigo: 0, mensaje : "error en la consulta, revise los parametros ingresado"};
                return respuesta;
            }
        })
    }


}

