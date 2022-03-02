
import { AnyRecordWithTtl } from 'dns';
import { connection } from 'mongoose';
import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';


export class evaluacionRegistrar{


    public async registrarEvaluacionDesempenio(fecha_inicio:any, fecha_fin: any, id_nivel: any, id_tipo_evaluacion: any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            const estado_evaluacion=1;
            const desEstado = 'Evaluación Activa';
            try{
                const rawData = await connection.manager.query(`
                INSERT INTO sincyt.rrhh_evaluacion(fecha_inicio, fecha_fin, estado_evaluacion, id_nivel, id_tipo_evaluacion,des_estado_evaluacion)
                VALUES('${fecha_inicio}','${fecha_fin}','${estado_evaluacion}','${id_nivel}','${id_tipo_evaluacion}','${desEstado}');`);

                const id = rawData.insertId;
                /* const evaluacion= await new evaluacionObtener().obtenerEvaluaciones(id); */
                const respuesta = { metodo: "registrarEvaluacionDesempenio", codigo: 1, id_evaluacion:id, fecha_inicio, fecha_fin, estado_evaluacion, id_nivel, id_tipo_evaluacion};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "registrarEvaluacionDesempenio", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", };
                return respuesta;
            }
        });
    }


    public async registrarBitacora(nombre_evaluador:any, nombre_evaluado:any, tipo_evaluacion:any, estatus_evaluacion:any, fecha:any) {
        // Ingreso de datos en la bitacora
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                INSERT INTO hhrr_bitacora_evaluacion (nombre_evaluador, nombre_evaluado, tipo_evaluacion, estatus_evaluacion, fecha)
                VALUES('${nombre_evaluador}','${nombre_evaluado}','${tipo_evaluacion}','${estatus_evaluacion}','${fecha}') `);

                const id= rawData.insertId;
                const respuesta = { metodo: "registrarBitacora", codigo: 1, id_bitacora: id, nombre_evaluador, nombre_evaluado, tipo_evaluacion, estatus_evaluacion, fecha };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "registrarBitacora", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async registrarEvaluadores(id_usuario :any, id_evaluacion: any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {

            try{
                const rawData = await connection.manager.query(`
                INSERT INTO sincyt.rrhh_evaluador(id_usuario, id_evaluacion)
                VALUES('${id_usuario}','${id_evaluacion}');`);

                const id = rawData.insertId;
                /* const evaluacion= await new evaluacionObtener().obtenerEvaluaciones(id); */
                const respuesta = { metodo: "registrarEvaluacionDesempenio", codigo: 1, id_evaluado:id, id_usuario, id_evaluacion};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "registrarEvaluacionDesempenio", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", };
                return respuesta;
            }
        });
    }
    public async registrarEvaluados(id_evaluado :any, id_evaluador: any, id_evaluacion : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {

            try{
                const rawData = await connection.manager.query(`
                INSERT INTO sincyt.rrhh_persona(id_evaluado, id_evaluador, id_evaluacion)
                VALUES('${id_evaluado}','${id_evaluador}', ${id_evaluacion});`);

                const id = rawData.insertId;
                /* const evaluacion= await new evaluacionObtener().obtenerEvaluaciones(id); */
                this.habilitaEstadoPersona(id_evaluado);
                const respuesta = { metodo: "registrarEvaluacionDesempenio", codigo: 1, id_persona:id, id_evaluador, id_evaluado};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "registrarEvaluacionDesempenio", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", };
                return respuesta;
            }
        });
    }

    public async habilitaEstadoPersona(id_evaluado : any ){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            const estadoDescripcion = 'No evaluado';
            const estado = 1;
            try{
                const rawData = await connection.manager.query(`
                UPDATE sincyt.rrhh_persona SET estado_persona = '${estado}', des_estado_persona = '${estadoDescripcion}' WHERE (id_evaluado = '${id_evaluado}');
                `);
                const respuesta = { metodo: "actualizaEstado", codigo: 1};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "actualizaEstado", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", };
                return respuesta;
            }
        });
    }

    // esta funcion esta pendiente de usarse, para registrar las preguntas de las evaluaciones
    public async registrarEvaluacionRespuesta(punteo : any , id_persona : any, id_pregunta : any, id_evaluacion : any , opcion : any  ){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            const estado_evaluacion=2;
            try{
                const rawData = await connection.manager.query(`
                INSERT INTO sincyt.rrhh_respuesta (punteo, id_persona,id_pregunta, id_evaluacion, opcion)
                VALUES (${punteo}, ${id_persona}, ${id_pregunta}, ${id_evaluacion}, '${opcion}');
                `);
                 this.actualizaEstado(estado_evaluacion,id_persona);
                const id = rawData.insertId;
                const respuesta = { metodo: "registrarEvaluacionPregunta", codigo: 1, id_evaluacion, id_pregunta};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "registrarEvaluacionPregunta", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", };
                return respuesta;
            }
        });
    }

      // esta funcion esta pendiente de usarse, para registrar las preguntas de las evaluaciones
      public async actualizaEstado(estado_evaluacion : any, id_persona : any ){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {

            try{
                const rawData = await connection.manager.query(`
                UPDATE sincyt.rrhh_persona SET estado_persona = '${estado_evaluacion}' WHERE (id_persona = '${id_persona}');
                `);
                const respuesta = { metodo: "actualizaEstado", codigo: 1};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "actualizaEstado", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", };
                return respuesta;
            }
        });
    }


    public async registrarComentarioEvaluado(id_persona : any , comentarioEvaluado : any ){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try {
                 const rawData = await connection.manager.query(`
                    UPDATE sincyt.rrhh_persona SET res_evaluado = '${comentarioEvaluado}' WHERE (id_persona = ${id_persona});
                    ` );
             const id  = rawData.insertId;
             const respuesta = { metodo: "registrarComentarioEvaluado", codigo: 1, id_persona, comentarioEvaluado}
             return respuesta;
            } catch (e) {
                const respuesta = { metodo: "registrarEvaluacionDesempenio", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", };
                return respuesta;
            }
        })
    }

    public async registrarAspecto(id_persona : any, contenido : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try {
                const rawData = await connection.manager.query(`
                INSERT INTO rrhh_compromiso (res_aspecto, id_persona)
                values('${contenido}',${id_persona});

                `);
                const respuesta = { metodo : "registrarAspecto", codigo : 1, id_persona, contenido}
                return respuesta;
            } catch (e) {
                const respuesta = { metodo : "registrarAspecto", codigo: 0, mensaje : "error en la consulta, revise los parametros ingresado"};
                return respuesta;
            }
        })
    }




}

