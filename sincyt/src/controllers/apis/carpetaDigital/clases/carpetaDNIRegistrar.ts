import { raw } from 'body-parser';
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import { carpetaObtener } from './carpetaObtener';
import { carpetaActualizar } from './carpetaActualizar';
import { Console } from 'console';

export class carpetaDNIRegistrar {

    constructor() {
    }

    public async registrarDocumentoDNI(usuario: any, no_bloque: any, no_tipo_documento: any, id_mongo: any, no_registro: any, id_documento: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                let consultaExtra = '';
                if (no_registro !== undefined && no_registro !== '') {
                    consultaExtra = ' and d.no_registro=' + no_registro;
                }
                // Verificamos si tiene un documento registrado

                const rawData = await connection.manager.query(`
                 SELECT d.* FROM sincyt.rpe_documento d inner join rpe_persona_bloque_documento p on d.no_documento=p.no_documento
                 inner join rpe_persona rp on p.no_registro_persona=rp.no_registro_persona
                 where rp.id_usuario=${usuario} and d.no_bloque=${no_bloque} and d.no_tipo_documento=${no_tipo_documento} ${consultaExtra};`);
                if (rawData.length > 0) {
                    // Solo se actualiza
                    const no_documento = rawData[0].no_documento;
                    console.log('Solo se actualiza', no_documento);

                    const rawAnterior = await connection.manager.query(`
                     SELECT id_mongo
                     FROM sincyt.rpe_documento
                     WHERE no_documento = ${no_documento};`);

                    const rawData2 = await connection.manager.query(`
                     UPDATE rpe_documento
                     SET id_mongo = '${id_mongo}'
                     WHERE no_documento = ${no_documento};`);


                    /*---------------------------------------RELACION EN RELACIONAL-------------------------------------------*/

                    const documento = await new carpetaObtener().obtenerDocumentoByIdMongo(rawAnterior[0].id_mongo);
                    const id_documento_anterior = documento.id_documento;

                    // get NO_REGISTRO_PERSONA
                    const rawData3 = await connection.manager.query(`
                 SELECT no_registro_persona FROM rpe_persona where id_usuario=${usuario};`);
                    const no_registro_persona = rawData3[0].no_registro_persona;
                    // get COD_PROCESO
                    const rawData5 = await connection.manager.query(`
                 SELECT cod_proceso FROM rpe_solicitud where no_registro_persona=${no_registro_persona};`);
                    const cod_proceso = rawData5[0].cod_proceso;

                    // Inserta en tabla CD_DOCUMENTO_APP
                    const rawData6 = await connection.manager.query(`
                     UPDATE cd_documento_app
                     SET id_documento = '${id_documento}',fecha=NOW()
                     WHERE id_documento = ${id_documento_anterior} and cod_proceso=${cod_proceso};`);




                    // SE CAMBIA EN USO DE GESTION EN MONGO
                    const mongo_anterior = rawAnterior[0].id_mongo;
                    console.log(mongo_anterior, no_bloque, no_tipo_documento)
                    const update = await new carpetaActualizar().actualizarMetaEnUsoMongo(mongo_anterior, no_bloque, no_tipo_documento, no_registro)
                    console.log(update);
                } else {// RPE_DOCUMENTO
                    let consultaExtra2 = null;
                    if (no_registro !== undefined && no_registro !== '') {
                        consultaExtra2 = no_registro;
                    }

                    const rawData2 = await connection.manager.query(`
                     INSERT INTO rpe_documento (id_mongo,fecha_carga,no_tipo_documento,no_bloque,no_registro)
                     VALUES('${id_mongo}',NOW(),${no_tipo_documento},${no_bloque},${consultaExtra2});`);
                    const no_documento = rawData2.insertId;

                    // get NO_REGISTRO_PERSONA
                    const rawData3 = await connection.manager.query(`
                 SELECT no_registro_persona FROM rpe_persona where id_usuario=${usuario};`);
                    const no_registro_persona = rawData3[0].no_registro_persona;

                    // Inserta en tabla RPE_PERSONA_BLOQUE_DOCUMENTO
                    const rawData4 = await connection.manager.query(`
                 INSERT INTO rpe_persona_bloque_documento (no_registro_persona,no_documento)
                 VALUES('${no_registro_persona}',${no_documento});`);

                    /*---------------------------------------RELACION EN RELACIONAL-------------------------------------------*/
                    // get COD_PROCESO
                    const rawData5 = await connection.manager.query(`
                 SELECT cod_proceso FROM rpe_solicitud where no_registro_persona=${no_registro_persona};`);
                    const cod_proceso = rawData5[0].cod_proceso;

                    // Inserta en tabla CD_DOCUMENTO_APP
                    const rawData6 = await connection.manager.query(`
                 INSERT INTO cd_documento_app (id_documento,cod_proceso,fecha)
                 VALUES(${id_documento},${cod_proceso},NOW());`);

                }

                const respuesta = { metodo: "registrarDocumentoDNI", codigo: 1 };
                return respuesta;
            } catch (e) {
                console.log(e)
                const respuesta = { metodo: "registrarDocumentoDNI", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async registrarDocumentoDNIMigracion(usuario: any, no_bloque: any, no_tipo_documento: any, id_mongo: any, no_registro: any, id_documento: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                let consultaExtra = '';
                if (no_registro !== undefined && no_registro !== '') {
                    consultaExtra = ' and d.no_registro=' + no_registro;
                }
                // Verificamos si tiene un documento registrado

                const rawData = await connection.manager.query(`
                 SELECT d.* FROM sincyt.rpe_documento d inner join rpe_persona_bloque_documento p on d.no_documento=p.no_documento
                 inner join rpe_persona rp on p.no_registro_persona=rp.no_registro_persona
                 where rp.id_usuario=${usuario} and d.no_bloque=${no_bloque} and d.no_tipo_documento=${no_tipo_documento} ${consultaExtra};`);
                if (rawData.length > 0) {
                    // Solo se actualiza
                    const no_documento = rawData[0].no_documento;
                    console.log('Solo se actualiza', no_documento);

                    const rawAnterior = await connection.manager.query(`
                     SELECT id_mongo
                     FROM sincyt.rpe_documento
                     WHERE no_documento = ${no_documento};`);

                    const rawData2 = await connection.manager.query(`
                     UPDATE rpe_documento
                     SET id_mongo = '${id_mongo}'
                     WHERE no_documento = ${no_documento};`);


                    /*---------------------------------------RELACION EN RELACIONAL-------------------------------------------*/

                    const documento = await new carpetaObtener().obtenerDocumentoByIdMongo(rawAnterior[0].id_mongo);
                    const id_documento_anterior = documento.id_documento;

                    // get NO_REGISTRO_PERSONA
                    const rawData3 = await connection.manager.query(`
                 SELECT no_registro_persona FROM rpe_persona where id_usuario=${usuario};`);
                    const no_registro_persona = rawData3[0].no_registro_persona;
                    // get COD_PROCESO
                    const rawData5 = await connection.manager.query(`
                 SELECT cod_proceso FROM rpe_solicitud where no_registro_persona=${no_registro_persona};`);
                    const cod_proceso = rawData5[0].cod_proceso;



                    // Inserta en tabla CD_DOCUMENTO_APP
                    const rawData6 = await connection.manager.query(`
                 INSERT INTO cd_documento_app (id_documento,cod_proceso,fecha)
                 VALUES(${id_documento},${cod_proceso},NOW());`);


                    // SE CAMBIA EN USO DE GESTION EN MONGO
                    const mongo_anterior = rawAnterior[0].id_mongo;
                    console.log(mongo_anterior, no_bloque, no_tipo_documento)
                    const update = await new carpetaActualizar().actualizarMetaEnUsoMongo(mongo_anterior, no_bloque, no_tipo_documento, no_registro)
                    console.log(update);
                }

                const respuesta = { metodo: "registrarDocumentoDNI", codigo: 1 };
                return respuesta;
            } catch (e) {
                console.log(e)
                const respuesta = { metodo: "registrarDocumentoDNI", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }
}