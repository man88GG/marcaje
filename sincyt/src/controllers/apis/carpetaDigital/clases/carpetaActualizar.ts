import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import MongoGlobals from "./../../../../constants/mongoGlobals";
import MongoModels from "./../../../../models/mongodb/fs.files";
import { carpetaObtener } from './carpetaObtener';

export class carpetaActualizar {
    constructor() {
    }

    public async actualizarDocumento(id_documento: number, nombre: string) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const documento = await new carpetaObtener().obtenerDocumento(id_documento);
                const update = await this.actualizarDocumentoMongo(documento.ref_mongodb, nombre);

                const rawData = await connection.manager.query(`
                UPDATE cd_documento
                SET nombre = '${nombre}'
                WHERE id_documento = ${id_documento};
                `);
                const respuesta = { metodo: "actualizarDocumento", codigo: 1, id_documento, mongo: update };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarDocumento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async actualizarCarpeta(id_carpeta: number, nombre: string) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                UPDATE cd_carpeta
                SET nombre = '${nombre}'
                WHERE id_carpeta = ${id_carpeta};
                `);
                const respuesta = { metodo: "actualizarCarpeta", codigo: 1, id_carpeta };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarCarpeta", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_carpeta: -1 };
                return respuesta;
            }
        });
    }

    public async actualizarPosicionDocumento(id_documento: number, id_padre: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                UPDATE cd_documento
                SET id_carpeta = ${id_padre}
                WHERE id_documento = ${id_documento};
                `);
                const respuesta = { metodo: "actualizarPosicionDocumento", codigo: 1, id_documento };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarPosicionDocumento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async actualizarPosicionCarpeta(id_carpeta: number, id_padre: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                UPDATE cd_carpeta
                SET id_idcarpeta = ${id_padre}
                WHERE id_carpeta = ${id_carpeta};
                `);
                const respuesta = { metodo: "actualizarPosicionCarpeta", codigo: 1, id_carpeta };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarPosicionCarpeta", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_carpeta: -1 };
                return respuesta;
            }
        });
    }

    public async actualizarDocumentoMongo(id_mongo: string, nombre: string) {
        try {
            const myMongoModels = new MongoModels();
            const myMongoDriver = new MongoGlobals();
            await myMongoDriver.CrearConexion().then(() => {
                myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
                myMongoModels.setConexion(myMongoDriver.getConexion());
                myMongoModels.updateByID(id_mongo, nombre);
            });
            const respuesta = { metodo: "actualizarDocumentoMongo", codigo: 1, id_mongo };
            return respuesta;
        } catch (e) {
            console.log(e);
            const respuesta = { metodo: "actualizarDocumentoMongo", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_mongo };
            return respuesta;
        }
    }

    public async actualizarMetaDocumentoMongo(id_mongo: string, metadata: any) {
        try {
            const myMongoModels = new MongoModels();
            const myMongoDriver = new MongoGlobals();
            let id_;
            await myMongoDriver.CrearConexion().then(() => {
                myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
                myMongoModels.setConexion(myMongoDriver.getConexion());
                id_ = myMongoModels.updateMetaByID(id_mongo, metadata);
            });
            const respuesta = { metodo: "actualizarMetaDocumentoMongo", codigo: 1, modificado: 1 };
            return respuesta;
        } catch (e) {
            console.log(e);
            const respuesta = { metodo: "actualizarMetaDocumentoMongo", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_mongo };
            return respuesta;
        }
    }

    public async actualizarMetaEnUsoMongo(id_mongo: any, no_bloque: any, id_especifico: any, no_registro: any) {
        try {
            const myMongoModels = new MongoModels();
            const myMongoDriver = new MongoGlobals();
            await myMongoDriver.CrearConexion().then(() => {
                myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
                myMongoModels.setConexion(myMongoDriver.getConexion());
                myMongoModels.updateEnUso(id_mongo, no_bloque, id_especifico, no_registro);
            });
            const respuesta = { metodo: "actualizarMetaEnUsoMongo", codigo: 1, id_mongo };
            return respuesta;
        } catch (e) {
            console.log(e);
            const respuesta = { metodo: "actualizarMetaEnUsoMongo", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_mongo };
            return respuesta;
        }
    }

    public async actualizarMetaEnUsoMongo_CTI(id_mongo: any, id_perfil: any, id_especifico: any) {
        try {
            const myMongoModels = new MongoModels();
            const myMongoDriver = new MongoGlobals();
            await myMongoDriver.CrearConexion().then(() => {
                myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
                myMongoModels.setConexion(myMongoDriver.getConexion());
                myMongoModels.updateEnUsoCTI(id_mongo, id_perfil, id_especifico);
            });
            const respuesta = { metodo: "actualizarMetaEnUsoMongo_CTI", codigo: 1, id_mongo };
            return respuesta;
        } catch (e) {
            console.log(e);
            const respuesta = { metodo: "actualizarMetaEnUsoMongo_CTI", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_mongo };
            return respuesta;
        }
    }

    public async actualizarMetaDocumento(id_documento: number, metadata: any) {
        try {
            const documento = await new carpetaObtener().obtenerDocumento(id_documento);
            const update = await this.actualizarMetaDocumentoMongo(documento.ref_mongodb, metadata);
            const respuesta = { metodo: "actualizarMetaDocumento", codigo: 1, id_documento, mongo: update };
            return respuesta;
        } catch (e) {
            const respuesta = { metodo: "actualizarMetaDocumento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
            return respuesta;
        }
    }

    public async actualizarMetaDocumento_Mongo(id_mongo: any, metadata: any) {
        try {
            const update = await this.actualizarMetaDocumentoMongo(id_mongo, metadata);
            const respuesta = { metodo: "actualizarMetaDocumento", codigo: 1, id_mongo, mongo: update };
            return respuesta;
        } catch (e) {
            const respuesta = { metodo: "actualizarMetaDocumento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
            return respuesta;
        }
    }

    public async actualizarMetaEnUso(id_mongo: any, no_bloque: any, id_especifico: any, no_registro: any) {
        try {
            const update = await this.actualizarMetaEnUsoMongo(id_mongo, no_bloque, id_especifico, no_registro);
            const respuesta = { metodo: "actualizarMetaEnUso", codigo: 1, id_mongo, mongo: update };
            return respuesta;
        } catch (e) {
            const respuesta = { metodo: "actualizarMetaEnUso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
            return respuesta;
        }
    }
}