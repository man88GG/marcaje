import { type } from 'os';
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import { gestionObtener } from './gestionObtener';
// let chilkat = require('@chilkat/ck-node14-win64');
import path from 'path';

export class gestionRegistrar {

    constructor() {
    }

    public async registrarGestion(asunto: any, contenido: any, usuario: any, id_tipo: any, id_gestion: any, receptores: any, id_estado: any, id_gestion_padre: any, referencia: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`
                INSERT INTO gd_gestion (asunto,contenido,fecha_creada,id_gtu_usuario,id_tipo,id_corb_gestion,id_gestion_padre,referencia)
                VALUES('${asunto}','${contenido}',NOW(),${usuario},${id_tipo},${id_gestion},${id_gestion_padre == undefined ? 'null' : id_gestion_padre},'${referencia}');`);

                if (receptores !== undefined) {
                    receptores.forEach(async (element: any) => {
                        await this.registrarReceptor(rawData.insertId, element, id_estado);
                    });
                }
                // registrar estado
                await this.registrarEstado(rawData.insertId, id_estado);// 1 edicion---2 enviada

                // insertar en bitacora
                await this.registrarBitacora(usuario, "Insertar", "Se insertó una nueva gestión: " + rawData.insertId);
                const respuesta = { metodo: "registrarGestion", codigo: 1, id_gestion: rawData.insertId };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "registrarGestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_gestion: -1 };
                return respuesta;
            }
        });
    }

    public async registrarBitacora(usuario: any, accion: any, descripcion: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`
                INSERT INTO gd_bitacora (usuario,accion,descripcion,fecha)
                VALUES('${usuario}','${accion}','${descripcion}',NOW());`);

                const respuesta = { metodo: "registrarBitacora", codigo: 1, bitacora: rawData.insertId };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "registrarBitacora", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", bitacora: -1 };
                return respuesta;
            }
        });
    }


    public async registrarDocumentos(id_tipo: any, id_gestion: any, documentos: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                let id_evidencia = '';
                const docs: any[] = [];
                documentos.forEach(async (element: any) => {
                    const rawData2 = await connection.manager.query(`
                    SELECT id_evidencia
                    FROM corb_evidencia
                    WHERE valor='${element.id}';`);
                    id_evidencia = rawData2[0].id_evidencia;

                    const rawData = await connection.manager.query(`
                INSERT INTO gd_documento (nombre,fecha_carga,ref_mongodb,id_gestion,id_evidencia,id_tipo)
                VALUES('${element.originalname}',NOW(),'${element.id}',${id_gestion},${id_evidencia},${id_tipo});`);
                    docs.push(rawData.insertId);
                });

                const respuesta = { metodo: "registrarDocumentos", codigo: 1, documentos: docs };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "registrarDocumentos", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async registrarReceptor(id_gestion: any, usuario: any, id_estado: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                INSERT INTO gd_receptor (id_gtu_usuario,id_gestion,fecha,id_estado_receptor)
                VALUES(${usuario},${id_gestion},NOW(),${id_estado});`);

                // insertar en bitacora
                await this.registrarBitacora(usuario, "Insertar", "Se insertó una nuevo receptor: " + usuario + " a la gestión: " + id_gestion);
                const respuesta = { metodo: "registrarReceptor", codigo: 1, id_receptor: rawData.insertId };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "registrarReceptor", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_receptor: -1 };
                return respuesta;
            }
        });
    }

    public async registrarEstado(id_gestion: any, id_estado: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                INSERT INTO gd_estado_gestion (id_estado,id_gestion,fecha)
                VALUES(${id_estado},${id_gestion},NOW());`);

                const respuesta = { metodo: "registrarEstado", codigo: 1, id_estado: rawData.insertId };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "registrarEstado", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_estado: -1 };
                return respuesta;
            }
        });
    }
/*
    public async registrarFirma(id_usuario: any, contra: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                var pdf = new chilkat.Pdf();
                var success = pdf.LoadFile(__dirname + '\\signed.pdf');
                //var success = pdf.LoadFile(__dirname + '\\signed.pdf');
                if (success == false) {
                    console.log(pdf.LastErrorText);
                    return;
                }
                var json = new chilkat.JsonObject();

                //Pagina y coordenadas de firma
                json.UpdateInt("page", 1);
                json.UpdateString("appearance.y", "top");
                //json.UpdateString("appearance.x", "left");
                json.UpdateString("appearance.x", "right");


                //Escala de letra
                json.UpdateString("appearance.fontScale", "5.0");

                //cert_cn=el certificado
                //current_dt=fecha actual
                json.UpdateString("appearance.text[0]", "Firmado digitalmente por: cert_cn");
                json.UpdateString("appearance.text[1]", "Fecha: current_dt");
                json.UpdateString("appearance.text[2]", "Razón: firmo de recibido.");

                //Logo para firma
                var jpgData = new chilkat.BinData();
                success = jpgData.LoadFile(path.join(__dirname, '../logos/senacyt.jpg'));
                if (success == false) {
                    console.log("Failed to load the JPG image.");
                    return;
                }

                //Configuramos el logo en el pdf
                success = pdf.SetSignatureJpeg(jpgData);
                if (success == false) {
                    console.log(pdf.LastErrorText);
                    return;
                }
                json.UpdateString("appearance.image", "custom-jpg");
                json.UpdateString("appearance.imagePlacement", "top");
                //json.UpdateString("appearance.imagePlacement", "center");
                json.UpdateString("appearance.imageOpacity", "50");

                //Carga del certificado .pfx
                var cert = new chilkat.Cert();
                success = cert.LoadPfxFile("C:\\Users\\bcortez\\Desktop\\BreynnerCortez.pfx", contra);
                //success = cert.LoadPfxFile("C:\\Users\\bcortez\\Desktop\\kevin_firma.pfx", contra);
                if (success == false) {
                    console.log(cert.LastErrorText);
                    return;
                }

                //Se le dice al pdf que use el certificado
                success = pdf.SetSigningCert(cert);
                if (success == false) {
                    console.log(pdf.LastErrorText);
                    return;
                }

                //Path de nuevo documento
                success = pdf.SignPdf(json, __dirname + '\\signed.pdf');
                if (success == false) {
                    console.log(pdf.LastErrorText);
                    return;
                }

                console.log("El PDF ha sido firmado digitalmente correctamente.");

                const respuesta = { metodo: "registrarFirma", codigo: 1, id_usuario: id_usuario };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "registrarFirma", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_usuario: -1 };
                return respuesta;
            }
        });
    }*/

}