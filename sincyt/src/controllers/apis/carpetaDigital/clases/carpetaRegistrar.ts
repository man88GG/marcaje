import { type } from 'os';
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import { carpetaObtener } from './carpetaObtener';
import { carpetaDNIRegistrar } from './carpetaDNIRegistrar';
import { carpetaActualizar } from './carpetaActualizar';
import { carpetaSGPRegistrar } from "./carpetaSGPRegistrar";

export class carpetaRegistrar {

    constructor() {
    }

    public async registrarDocumento(nombre: any, id_carpeta: any, ref_mongodb: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const nombre_normal = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

                const rawData = await connection.manager.query(`
                INSERT INTO cd_documento (nombre,fecha_carga,ref_mongodb,id_carpeta)
                VALUES('${nombre_normal}',NOW(),'${ref_mongodb}',${id_carpeta});`);

                const id = rawData.insertId;
                const documento = await new carpetaObtener().obtenerDocumento(id);

                const respuesta = { metodo: "registrarDocumento", codigo: 1, id_documento: id, documento };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "registrarDocumento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async registrarCarpeta(nombre: any, usuario: any, id_carpeta: any) {
        // const usuario = await new carpetaObtener().obtenerUsuario(idusuario);
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const nombre_normal = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

                const rawData = await connection.manager.query(`
                INSERT INTO cd_carpeta (nombre,fecha_creada,id_gtu_usuario,id_idcarpeta)
                VALUES('${nombre_normal}',NOW(),${usuario},${id_carpeta});`);
                const id = rawData.insertId;

                const carpeta = await connection.manager.query(`
                    SELECT fecha_creada from cd_carpeta WHERE id_carpeta = ${id};`);
                const fecha_creada = carpeta[0].fecha_creada;

                const respuesta = { metodo: "registrarCarpeta", codigo: 1, id_carpeta: id, fecha_creada };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "registrarCarpeta", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async registrarCarpetaBandeja(nombre: any, usuario: any, id_carpeta: any) {
        // const usuario = await new carpetaObtener().obtenerUsuario(idusuario);
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const c_bandeja = await connection.manager.query(`
                SELECT * from cd_carpeta
                WHERE nombre='Bandeja Entrada' and id_gtu_usuario=${usuario}
                ;`);
                let id = -1;
                if (c_bandeja.length === 0) {
                    const rawData = await connection.manager.query(`
                INSERT INTO cd_carpeta (nombre,fecha_creada,id_gtu_usuario,id_idcarpeta)
                VALUES('${nombre}',NOW(),${usuario},${id_carpeta});`);
                    id = rawData.insertId;
                }

                const respuesta = { metodo: "registrarCarpeta", codigo: 1, id_carpeta: id };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "registrarCarpeta", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async registrarBitacora(usuario: any, accion: any, tabla: any, descripcion: any) {
        // Insersion en Mongo DB
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                INSERT INTO cd_bitacora (usuario,accion,tabla,descripcion,fecha)
                VALUES('${usuario}','${accion}','${tabla}','${descripcion}',NOW());`);

                const respuesta = { metodo: "registrarBitacora", codigo: 1, accion, tabla, };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "registrarBitacora", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async registrarusuarioRPE(usuariorpe: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT  *  FROM rpe_persona where no_registro_persona=${usuariorpe};`);

                let usuarioGTU = rawData[0].id_usuario;
                let no_doc = rawData[0].cui;
                if (no_doc === null) {
                    no_doc = rawData[0].no_pasaporte;
                }


                if (usuarioGTU === null) {// Si no tiene usuario en gtu se creara uno
                    const rawData2 = await connection.manager.query(`
                        INSERT INTO gtu_usuario
                        (usuario,nombre_completo,correo_electronico,id_estado,id_departamento_puesto,id_tipo_usuario)
                        VALUES(${no_doc},'','',1,32,2);`);
                    usuarioGTU = rawData2.insertId;

                    await connection.manager.query(`
                    UPDATE rpe_persona
                    SET id_usuario = ${usuarioGTU}
                    WHERE no_registro_persona = ${usuariorpe};
                `);
                }

                const respuesta = { metodo: "registrarusuarioRPE", codigo: 1, usuarioRPE: usuariorpe, usuarioGTU };
                return respuesta;
            } catch (e) {
                console.log(e)
                const respuesta = { metodo: "registrarusuarioRPE", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarioGTU: -1 };
                return respuesta;
            }
        });
    }

    // Migracion RPE
    public async migracionRPE(no_documento: any) {
        // Insersion en Mongo DB
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                select d.no_documento,d.id_mongo,d.no_bloque,d.no_registro,d.no_tipo_documento,
                p.no_registro_persona,r.id_usuario, t.nombre_tipo_documento
                from rpe_documento d
                inner join rpe_persona_bloque_documento p on d.no_documento=p.no_documento
                inner join rpe_persona r on p.no_registro_persona=r.no_registro_persona
                inner join rpe_tipo_documento t on d.no_bloque=t.no_bloque and d.no_tipo_documento=t.no_tipo_documento
                where d.no_documento=${no_documento};`);

                const datos = rawData[0];

                // Verificacion carpeta Raiz
                const raiz = await this.VerificarCarpetaRaiz(datos);
                // Obtenemos el nombre del documento
                const doc = await new carpetaObtener().obtenerIdDocumentoMongo(datos.id_mongo);
                const nombredoc = doc.nombre_documento_original.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                // Insertamos documento en carpeta raiz
                let docCD: any = {};
                docCD = await this.registrarDocumento(nombredoc, raiz, datos.id_mongo);
                // Insertamos en gestion DNI
                let no_registro = '';
                if (datos.no_registro !== null) {
                    no_registro = datos.no_registro;
                }
                const dni = await new carpetaDNIRegistrar().registrarDocumentoDNIMigracion
                    (datos.id_usuario, datos.no_bloque, datos.no_tipo_documento, datos.id_mongo, no_registro, docCD.documento.id_documento);
                // Actualizamos metadata en MongoDB
                const metadata = {
                    no_tipo_documento: datos.no_tipo_documento,
                    nombre_tipo_documento: datos.nombre_tipo_documento,
                    no_bloque: datos.no_bloque,
                    id_especifico: datos.no_tipo_documento,
                    en_uso: 1,
                    nombre_gestion: "DNI",
                    modulo: "RPE"
                }
                const meta = await new carpetaActualizar().actualizarMetaDocumento(docCD.documento.id_documento, metadata);




                const respuesta = { metodo: "migracionRPE", codigo: 1, datos, raiz, nombredoc, docCD, dni, meta };
                return respuesta;
            } catch (e) {
                console.log(e)
                const respuesta = { metodo: "migracionRPE", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }
    // Migracion SGP
    public async migracionSGP(id_perfil_requisito: any) {
        // Insersion en Mongo DB
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT rp.no_registro_persona,rp.id_usuario,pr.descripcion,pr.id_documento_mongo,pr.id_perfil_proyecto,pr.id_requisito_linea FROM
                sgp_perfil_requisito pr inner join sgp_perfil_proyecto pp on pr.id_perfil_proyecto=pp.id_perfil_proyecto
                inner join rpe_persona rp on pp.no_registro_persona=rp.no_registro_persona
                where pr.id_perfil_requisito=${id_perfil_requisito};`);

                const datos = rawData[0];

                // Verificacion carpeta Raiz
                const raiz = await this.VerificarCarpetaRaiz(datos);
                // Obtenemos el nombre del documento
                // let nombredoc = datos.descripcion;
                const doc = await new carpetaObtener().obtenerIdDocumentoMongo(datos.id_documento_mongo);
                const nombredoc = doc.nombre_documento_original.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                // Insertamos documento en carpeta raiz
                let docCD: any = {};
                docCD = await this.registrarDocumento(nombredoc, raiz, datos.id_documento_mongo);
                // Insertamos en metadata mongo
                let metadata = {};
                switch (datos.id_requisito_linea) {
                    case 1:
                        metadata = {
                            id_perfil: datos.id_perfil_proyecto,
                            no_tipo_documento: 2,
                            nombre_tipo_documento: datos.descripcion,
                            no_bloque: 1001,
                            id_especifico: 2,
                            en_uso: 1,
                            nombre_gestion: "SGP",
                            modulo: "RPE"
                        }
                        break;
                    case 4:
                        metadata = {
                            id_perfil: datos.id_perfil_proyecto,
                            no_tipo_documento: 2,
                            nombre_tipo_documento: datos.descripcion,
                            no_bloque: 1004,
                            id_especifico: 2,
                            en_uso: 1,
                            nombre_gestion: "SGP",
                            modulo: "RPE"
                        }
                        break;
                    default:
                        metadata = {
                            id_perfil: datos.id_perfil_proyecto,
                            nombre_tipo_documento: datos.descripcion,
                            id_especifico: datos.id_requisito_linea,
                            en_uso: 1,
                            nombre_gestion: "SGP",
                            modulo: "SGP"
                        }
                        break;
                }
                const meta = await new carpetaActualizar().actualizarMetaDocumento(docCD.documento.id_documento, metadata);

                const respuesta = { metodo: "migracionSGP", codigo: 1, id_perfil_requisito, datos, raiz, nombredoc, docCD, meta };
                return respuesta;
            } catch (e) {
                console.log(e)
                const respuesta = { metodo: "migracionSGP", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async VerificarCarpetaRaiz(data: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const c_raiz = await connection.manager.query(`
                SELECT * from cd_carpeta
                WHERE nombre='_raiz' and id_gtu_usuario=${data.id_usuario}
                ;`);

                if (c_raiz.length === 0) {// No tiene carpeta raiz se debe crear
                    let raiz: any = {};
                    raiz = await this.registrarCarpeta("_raiz", data.id_usuario, 'null');
                    return raiz.id_carpeta;
                } else {
                    return c_raiz[0].id_carpeta;
                }

            } catch (e) {
                return e;
            }
        });
    }

    // -------------------------------------ASGP-------------------------------------
    public async registrarDocumentoAdmin(nombre: any, ref_mongodb: any, usuario: any, cod_proceso: any, id_actividad: any) {
        const id_usuario = await new carpetaObtener().obtenerUsuarioRPE(usuario);
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const c_bandeja = await connection.manager.query(`
                SELECT * from cd_carpeta
                WHERE nombre='Bandeja Entrada' and id_gtu_usuario=${id_usuario}
                ;`);
                let id;
                let documento;
                let id_carpeta;
                if (c_bandeja.length === 0) {
                    const carpeta = await connection.manager.query(`
                    INSERT INTO cd_carpeta (nombre,fecha_creada,id_gtu_usuario,id_idcarpeta)
                    VALUES('Bandeja Entrada',NOW(),${id_usuario},null);`);
                    id_carpeta = carpeta.insertId;
                } else {
                    id_carpeta = c_bandeja[0].id_carpeta;
                }

                const rawData = await connection.manager.query(`
            INSERT INTO cd_documento (nombre,fecha_carga,ref_mongodb,id_carpeta)
            VALUES('${nombre}',NOW(),'${ref_mongodb}',${id_carpeta});`);

                id = rawData.insertId;
                documento = await new carpetaObtener().obtenerDocumento(id);


                // Inserción en ASGP
                const detalle = await connection.manager.query(`
                SELECT id_detalle_proceso FROM app_detalle_proceso
                WHERE cod_proceso=${cod_proceso} AND id_actividad=${id_actividad};`);
                const id_detalle_proceso = detalle[0].id_detalle_proceso;

                const rawDataDetalle = await connection.manager.query(`
            INSERT INTO asgp_app_documento (id_mongo,fecha_carga,id_detalle_proceso,id_tipo_documento)
            VALUES('${ref_mongodb}',NOW(),${id_detalle_proceso},53);`);// 53 default para notificación Carpeta Digital

                const respuesta = { metodo: "registrarDocumentoAdmin", codigo: 1, id_documento: id, documento, usuario: id_usuario };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "registrarDocumentoAdmin", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async registrarDocumentoAdminWithoutGestion(nombre: any, ref_mongodb: any, usuario: any) {
        const id_usuario = await new carpetaObtener().obtenerUsuarioRPE(usuario);
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const c_bandeja = await connection.manager.query(`
                SELECT * from cd_carpeta
                WHERE nombre='Bandeja Entrada' and id_gtu_usuario=${id_usuario}
                ;`);

                let id_carpeta;
                if (c_bandeja.length === 0) {
                    const carpeta = await connection.manager.query(`
                    INSERT INTO cd_carpeta (nombre,fecha_creada,id_gtu_usuario,id_idcarpeta)
                    VALUES('Bandeja Entrada',NOW(),${id_usuario},null);`);
                    id_carpeta = carpeta.insertId;
                } else {
                    id_carpeta = c_bandeja[0].id_carpeta;
                }

                const rawData = await connection.manager.query(`
            INSERT INTO cd_documento (nombre,fecha_carga,ref_mongodb,id_carpeta)
            VALUES('${nombre}',NOW(),'${ref_mongodb}',${id_carpeta});`);

            } catch (e) {
                // console.log(e);
                const respuesta = { metodo: "registrarDocumentoAdmin", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }
}