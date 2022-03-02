
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import MongoGlobals from "./../../../../constants/mongoGlobals";
import MongoModels from "./../../../../models/mongodb/fs.files";
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';
// const url_api = 'http://localhost:5000';

export class carpetaObtener {
    constructor() {

    }
    public obtenerUrl() { return url_api; }


    public async obtenerRaiz(idusuario: any) {
        // const idusuario = await this.obtenerUsuario(id_usuario);
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id_carpeta, nombre,fecha_creada,id_idcarpeta
                FROM cd_carpeta c
                    INNER JOIN gtu_usuario u
                    ON c.id_gtu_usuario=u.id where u.id=${idusuario} and nombre='_raiz';`);
                const respuesta = { metodo: "obtenerRaiz", codigo: 1, raiz: rawData };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "obtenerRaiz", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerUsuario(id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id from gtu_usuario where usuario='${id_usuario}';`);
                return rawData[0].id;
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuario", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerUsuarioRPE_GTU(id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT  *  FROM rpe_persona where no_registro_persona=${id_usuario};`);
                const respuesta = { metodo: "obtenerUsuarioRPE_GTU", codigo: 1, usuario: rawData[0].id_usuario };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuarioRPE_GTU", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerUsuarioRPE(id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id_usuario from rpe_persona where no_registro_persona=${id_usuario};`);
                return rawData[0].id_usuario;
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuarioRPE", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerDocumento(id_documento: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id_documento, nombre,fecha_carga,ref_mongodb,id_carpeta
                FROM cd_documento
                    where id_documento= ${id_documento};`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerDocumento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerCarpetas(idusuario: string) {
        // const idusuario = await this.obtenerUsuario(id_usuario);
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id_carpeta, nombre,fecha_creada,id_idcarpeta
                FROM cd_carpeta c
                    INNER JOIN gtu_usuario u
                    ON c.id_gtu_usuario=u.id where u.id=${idusuario};`);
                const respuesta = { metodo: "obtenerCarpetas", codigo: 1, carpetas: rawData };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "obtenerCarpetas", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", carpetas: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerDocumentos(idusuario: string) {
        // const idusuario = await this.obtenerUsuario(id_usuario);
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id_documento, d.nombre,fecha_carga,ref_mongodb,d.id_carpeta,c.nombre as nombrec
                FROM cd_documento d
                    INNER JOIN cd_carpeta c
                    ON c.id_carpeta=d.id_carpeta
                    INNER JOIN gtu_usuario u
                    ON c.id_gtu_usuario=u.id
                    where u.id= ${idusuario};`);
                const respuesta = { metodo: "obtenerDocumentos", codigo: 1, documentos: rawData };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "obtenerDocumentos", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", documentos: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerDocumentoMongo(id_mongo: any) {
        try {
            const myMongoModels = new MongoModels();
            const myMongoDriver = new MongoGlobals();
            let documento;
            await myMongoDriver.CrearConexion().then(async () => {
                myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
                myMongoModels.setConexion(myMongoDriver.getConexion());
                documento = await myMongoModels.getFileByID(id_mongo);
            });
            const respuesta = { metodo: "obtenerDocumentoMongo", codigo: 1, documento };
            return respuesta;
        } catch (e) {
            console.log(e);
            const respuesta = { metodo: "obtenerDocumentoMongo", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_mongo };
            return respuesta;
        }
    }

    public async obtenerDocumentoMongoTam(id_mongo: any) {
        try {
            const myMongoModels = new MongoModels();
            const myMongoDriver = new MongoGlobals();
            let documento;
            await myMongoDriver.CrearConexion().then(async () => {
                myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
                myMongoModels.setConexion(myMongoDriver.getConexion());
                documento = await myMongoModels.getFileByIDTam(id_mongo);
            });
            const respuesta = { metodo: "obtenerDocumentoMongo", codigo: 1, documento };
            return respuesta;
        } catch (e) {
            console.log(e);
            const respuesta = { metodo: "obtenerDocumentoMongo", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_mongo };
            return respuesta;
        }
    }

    public async obtenerIdDocumentoMongo(id_mongo: any) {
        try {
            const myMongoModels = new MongoModels();
            const myMongoDriver = new MongoGlobals();
            let documento: any = {};
            await myMongoDriver.CrearConexion().then(async () => {
                myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
                myMongoModels.setConexion(myMongoDriver.getConexion());
                documento = await myMongoModels.getFileByID(id_mongo);
            });

            return documento;
        } catch (e) {
            console.log(e);
            const respuesta = { metodo: "obtenerDocumentoMongo", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_mongo };
            return respuesta;
        }
    }


    public async obtenerBloque(bloque: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT nombre
                FROM rpe_bloque c
                WHERE no_bloque=${bloque};`);
                const respuesta = { metodo: "obtenerBloque", codigo: 1, bloque: rawData[0] };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "obtenerBloque", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", bloque: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerUsuarioSes(vars1: any, vars2: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                let usuario = '';
                if (vars2.trim().length === 0) {
                    const rawData2 = await connection.manager.query(`
                    SELECT id FROM gtu_usuario where usuario='${vars1}';`);
                    usuario = rawData2[0].id;
                } else {
                    const rawData = await connection.manager.query(`
                    SELECT no_registro_oficial,id_usuario
                    FROM rpe_persona
                        where no_registro_persona= ${vars2};`);
                    if (rawData[0].no_registro_oficial === vars1) {
                        const rawData2 = await connection.manager.query(`
                    SELECT id FROM gtu_usuario where usuario='${vars1}';`);
                        usuario = rawData2[0].id;
                    } else {
                        usuario = rawData[0].id_usuario;
                    }
                }
                const respuesta = { metodo: "obtenerUsuarioSes", codigo: 1, usuario };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "obtenerUsuarioSes", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", bloque: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerDocumentoByIdMongo(id_mongo: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id_documento
                FROM cd_documento
                    where ref_mongodb= '${id_mongo}';`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerDocumento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerDocumentosNoRegistro(no_registro: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT * from rpe_documento where no_registro=${no_registro};`);

                const respuesta = { metodo: "obtenerDocumentosNoRegistro", codigo: 1, documentos: rawData };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "obtenerDocumentosNoRegistro", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", documentos: -1 };
                return respuesta;
            }
        });
    }

    public async GetFecha() {
        const date_ob = new Date();

        // current date
        const date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        const year = date_ob.getFullYear();

        // current hours
        const hours = date_ob.getHours();

        // current minutes
        const minutes = date_ob.getMinutes();

        // current seconds
        const seconds = date_ob.getSeconds();

        // YYYY-MM-DD HH-MM-SS format
        return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    }

}

