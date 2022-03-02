import { type } from 'os';
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';

export class correoInsertarBd {

    constructor() {
    }

    public async insertarCorreo(correo_usuario: any, asunto: any, contenido: any, id_tipo: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                INSERT INTO apic_correo (correo_usuario,asunto,contenido,fecha_envio,id_tipo)
                VALUES('${correo_usuario}','${asunto}','${contenido}',NOW(),${id_tipo});`);

                const id = rawData.insertId;

                const respuesta = { metodo: "insertarCorreo", codigo: 1, id_correo: id };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "insertarCorreo", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_correo: -1 };
                return respuesta;
            }
        });
    }

    public async insertarDestinatario(nombre: any, correo: any, id_correo: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                INSERT INTO apic_destinatario (nombre,correo,id_correo)
                VALUES('${nombre}','${correo}',${id_correo});`);

                const id = rawData.insertId;

                const respuesta = { metodo: "insertarDestinatario", codigo: 1, id_destinatario: id };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "insertarDestinatario", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_destinatario: -1 };
                return respuesta;
            }
        });
    }

    public async insertarDocumento(nombre: any, ref_mongodb: any, id_correo: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                INSERT INTO apic_documento (nombre,ref_mongodb,id_correo)
                VALUES('${nombre}','${ref_mongodb}',${id_correo});`);

                const id = rawData.insertId;

                const respuesta = { metodo: "insertarDocumento", codigo: 1, id_documento: id };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "insertarDocumento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async insertarBitacora(emisor: any, receptor: any, contenido: any, nombre_documento: any, ref_mongodb: any, tipo_correo: any, estatus: any, descripcion_error: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                INSERT INTO apic_bitacora (emisor,receptor,contenido,nombre_documento,ref_mongodb,tipo_correo,fecha_envio,estatus,descripcion_error)
                VALUES('${emisor}','${receptor}','${contenido}','${nombre_documento}','${ref_mongodb}','${tipo_correo}',NOW(),${estatus},"${descripcion_error}");`);

                const id = rawData.insertId;

                const respuesta = { metodo: "insertarBitacora", codigo: 1, id_bitacora: id };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "insertarBitacora", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_bitacora: -1 };
                return respuesta;
            }
        });
    }

    public async getYear() {
        const date_ob = new Date();

        // current year
        const year = date_ob.getFullYear();

        // YYYY format
        return year;
    }
}