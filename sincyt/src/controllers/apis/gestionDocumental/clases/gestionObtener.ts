import { raw } from 'body-parser';
import { AdvancedConsoleLogger } from 'typeorm';
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import MongoGlobals from "../../../../constants/mongoGlobals";
import MongoModels from "../../../../models/mongodb/fs.files";

export class gestionObtener {
    constructor() {

    }

    public async obtenerUsuarios(id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT u.id, CONCAT(u.nombre_completo, ' -- ' , u.usuario) as text, 'icon-usuario' as iconCls,d.nombre as 'group'
                FROM gtu_usuario u
                INNER JOIN gtu_departamento_puesto p
                ON p.id=u.id_departamento_puesto
                INNER JOIN gtu_departamento d
                ON d.id=p.id_departamento
                WHERE
                u.id_tipo_usuario=1 and u.id!=${id_usuario} and u.id_estado=1
                and NOT (u.usuario LIKE '%admin%')
                ORDER BY d.nombre;`);
                const respuesta = { metodo: "obtenerUsuarios", codigo: 1, usuarios: rawData };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "obtenerUsuarios", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerDirecciones() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id, nombre as text FROM gtu_departamento where padre=1;`);
                const respuesta = { metodo: "obtenerDirecciones", codigo: 1, direcciones: rawData };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "obtenerDirecciones", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", direcciones: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerUsuariosDireccion(id_usuario: any, id_direccion: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT u.id from gtu_departamento d
                INNER JOIN gtu_departamento_puesto p
                ON d.id=p.id_departamento
                INNER JOIN gtu_usuario u
                ON p.id=u.id_departamento_puesto
                WHERE
                d.padre=1 and u.id!=${id_usuario}
                and u.id_estado=1 and u.id_tipo_usuario=1 and NOT (u.usuario LIKE '%admin%') and d.id=${id_direccion};`);
                const respuesta = { metodo: "obtenerUsuariosDireccion", codigo: 1, usuarios: rawData };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "obtenerUsuariosDireccion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerTiposDocumentos() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id_tipo as id, nombre as text
                FROM gd_tipo_documento;`);
                const respuesta = { metodo: "obtenerTiposDocumentos", codigo: 1, usuarios: rawData };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "obtenerTiposDocumentos", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerGestion(id_gestion: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT *
                FROM gd_gestion
                WHERE id_gestion=${id_gestion};`);

                const rawData2 = await connection.manager.query(`
                SELECT id_gtu_usuario as id
                FROM gd_receptor
                WHERE id_gestion=${id_gestion};`);

                const rawData3 = await connection.manager.query(`
                SELECT id_documento,nombre as originalname,ref_mongodb as id,id_gestion,id_tipo
                FROM gd_documento
                WHERE id_gestion=${id_gestion};`);

                if (rawData[0].id_gestion_padre !== null) {
                    const docsPadres = await this.obtnerDocsPadres(rawData[0].id_gestion_padre);
                    docsPadres.forEach((element: any) => {
                        rawData3.push(element);
                    });
                }

                const respuesta = { metodo: "obtenerGestion", codigo: 1, gestion: rawData[0], receptores: rawData2, documentos: rawData3 };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "obtenerGestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", gestion: -1 };
                return respuesta;
            }
        });
    }


    public async obtnerDocsPadres(id_gestion_padre: any): Promise<any> {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT *
                FROM gd_gestion
                WHERE id_gestion=${id_gestion_padre};`);

                const rawData2 = await connection.manager.query(`
                SELECT id_documento,nombre as originalname,ref_mongodb as id,id_gestion,id_tipo
                FROM gd_documento
                WHERE id_gestion=${id_gestion_padre};`);

                if (rawData[0].id_gestion_padre !== null) {
                    const docsPadres = await this.obtnerDocsPadres(rawData[0].id_gestion_padre);
                    docsPadres.forEach((element: any) => {
                        rawData2.push(element);
                    });
                }
                return rawData2;
            } catch (e) {
                console.log(e);
                return -1;
            }
        });
    }

    public async obtenerListadoGestiones(id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT
                g.id_gestion as id, t.nombre as tipog, g.fecha_creada as fechag,
                u.nombre_completo as remig, ur.nombre_completo as destig, e.nombre as estadog,1 as tipo_fila
                FROM gd_gestion g
                INNER JOIN gd_tipo_gestion t
                ON t.id_tipo=g.id_tipo
                INNER JOIN gtu_usuario u
                ON u.id=g.id_gtu_usuario
                INNER JOIN gd_receptor r
                ON r.id_gestion=g.id_gestion
                INNER JOIN gtu_usuario ur
                ON ur.id=r.id_gtu_usuario
                INNER JOIN gd_estado_receptor e
                ON e.id_estado=r.id_estado_receptor
                WHERE g.id_gtu_usuario=${id_usuario}
                UNION
                SELECT
                g.id_gestion as id, t.nombre as tipog, g.fecha_creada as fechag,
                u.nombre_completo as remig, ur.nombre_completo as destig, e.nombre as estadog,2 as tipo_fila
                FROM gd_gestion g
                INNER JOIN gd_tipo_gestion t
                ON t.id_tipo=g.id_tipo
                INNER JOIN gtu_usuario u
                ON u.id=g.id_gtu_usuario
                INNER JOIN gd_receptor r
                ON r.id_gestion=g.id_gestion
                INNER JOIN gtu_usuario ur
                ON ur.id=r.id_gtu_usuario
                INNER JOIN gd_estado_receptor e
                ON e.id_estado=r.id_estado_receptor
                WHERE r.id_gtu_usuario=${id_usuario} and e.id_estado!=1 order by 3 desc,1,6;`);

                rawData.forEach(async (element: any) => {
                    element.fechag = await this.getFecha(element.fechag);
                });

                const respuesta = { metodo: "obtenerListadoGestiones", codigo: 1, gestiones: rawData };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "obtenerListadoGestiones", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", gestiones: -1 };
                return respuesta;
            }
        });
    }

    public async getFecha(date_v: any) {
        const date_ob = new Date(date_v);

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


