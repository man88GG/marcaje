import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import MongoGlobals from "./../../../../constants/mongoGlobals";
import MongoModels from "./../../../../models/mongodb/fs.files";
import { carpetaObtener } from './carpetaObtener';

export class carpetaEliminar {
    constructor() {
    }
    public async eliminarDocumento(id_documento: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const documento = await new carpetaObtener().obtenerDocumento(id_documento);
                const eliminacion = await this.eliminarDocumentoMongo(documento.ref_mongodb);

                const rawData = await connection.manager.query(`
                DELETE FROM cd_documento WHERE id_documento=${id_documento};
                `);
                const respuesta = { metodo: "eliminarDocumento", codigo: 1, id_documento, mongo: eliminacion };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "eliminarDocumento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async eliminarCarpeta(id_carpeta: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                DELETE FROM cd_carpeta WHERE id_carpeta = ${id_carpeta};
                `);
                const respuesta = { metodo: "eliminaCarpeta", codigo: 1, id_carpeta };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "eliminaCarpeta", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_carpeta };
                return respuesta;
            }
        });
    }

    public async eliminarDocumentoMongo(id_mongo: string) {
        try {
            const myMongoModels = new MongoModels();
            const myMongoDriver = new MongoGlobals();
            await myMongoDriver.CrearConexion().then(() => {
                myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
                myMongoModels.setConexion(myMongoDriver.getConexion());
                myMongoModels.deleteByID(id_mongo);
            });
            const respuesta = { metodo: "eliminarDocumentoMongo", codigo: 1, id_mongo };
            return respuesta;
        } catch (e) {
            console.log(e);
            const respuesta = { metodo: "eliminarDocumentoMongo", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_mongo };
            return respuesta;
        }
    }

    public async eliminarDocumentoMongo_Verificar(id_mongo: any) {
        try {
            const myMongoModels = new MongoModels();
            const myMongoDriver = new MongoGlobals();
            await myMongoDriver.CrearConexion().then(() => {
                myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
                myMongoModels.setConexion(myMongoDriver.getConexion());
                myMongoModels.deleteByID_CD(id_mongo);
            });
            const respuesta = { metodo: "eliminarDocumentoMongo_Verificar", codigo: 1, id_mongo };
            return respuesta;
        } catch (e) {
            console.log(e);
            const respuesta = { metodo: "eliminarDocumentoMongo_Verificar", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_mongo };
            return respuesta;
        }
    }

    public async eliminarDocumentoApp(usuario: any, id_mongo: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const documento = await new carpetaObtener().obtenerDocumentoByIdMongo(id_mongo);
                const id_documento = documento.id_documento;

                // get NO_REGISTRO_PERSONA
                const rawData2 = await connection.manager.query(`
                 SELECT no_registro_persona FROM rpe_persona where id_usuario=${usuario};`);
                const no_registro_persona = rawData2[0].no_registro_persona;

                // get COD_PROCESO
                const rawData3 = await connection.manager.query(`
                 SELECT cod_proceso FROM rpe_solicitud where no_registro_persona=${no_registro_persona};`);
                const cod_proceso = rawData3[0].cod_proceso;

                // Elimina en tabla CD_DOCUMENTO_APP
                console.log('DOCUMENTO', id_documento, 'CODPROCESO', cod_proceso);
                const rawData4 = await connection.manager.query(`
                DELETE FROM cd_documento_app WHERE id_documento=${id_documento} and cod_proceso=${cod_proceso}`);
                const respuesta = { metodo: "eliminarDocumentoApp", codigo: 1, id_documento };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "eliminarDocumentoApp", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }
    // --------------------------------------------SPG--------------------------------------------
    public async eliminarRequisito(id_usuario: any, no_bloque: any, id_especifico: any, id_perfil_proyecto: any, id_requisito_linea: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawDataRegistro = await connection.manager.query(`
                 SELECT no_registro_persona FROM rpe_persona where id_usuario=${id_usuario};`);
                const registro = rawDataRegistro[0].no_registro_persona;
                console.log('HOLAregistroAAA', registro);

                if (no_bloque !== undefined) {
                    const rawData = await connection.manager.query(`
                    Delete RPER,RDOC
                    from rpe_documento RDOC
                    inner join rpe_persona_bloque_documento RPER on RPER.no_documento = RDOC.no_documento
                    where RPER.no_registro_persona = ${registro}
                    and RDOC.no_bloque = ${no_bloque} and RDOC.no_tipo_documento =${id_especifico};
                `);
                }

                const rawData2 = await connection.manager.query(`
                Delete from sgp_perfil_requisito
                where id_perfil_proyecto = ${id_perfil_proyecto}
                and id_requisito_linea = ${id_requisito_linea};
                `);

                const respuesta = { metodo: "eliminarDocumento", codigo: 1, id_documento: registro };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "eliminarDocumento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }
}