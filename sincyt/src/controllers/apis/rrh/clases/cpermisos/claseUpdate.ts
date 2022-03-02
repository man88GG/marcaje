import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class claseactualizar{


    constructor(){
    }

    public async actualizarDiaFestivo(fecha: string, estado: string, id:string) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`UPDATE sincyt.rrhh_dia_festivo SET fecha = '${fecha}', estado = '${estado}' WHERE id = '${id}';`);
                const respuesta = { metodo: "actualizarfecha", codigo: 1, fecha, estado, id };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarfecha", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_carpeta: -1 };
                return respuesta;
            }
        });
    }

    public async actualizarpermisosantiguos (observaciones: string, id_permiso:string, estatus: string) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`update sincyt.rrhh_permiso p, sincyt.rrhh_transaccion_permiso tp
                SET tp.id_estatus = '${estatus}', p.per_id_estatus = '${estatus}' , p.observaciones = '${observaciones}'
                WHERE p.id = '${id_permiso}' and tp.id_permiso = '${id_permiso}';`);
                const respuesta = { metodo: "aprobacionpermisos", codigo: 1, observaciones, id_permiso, estatus };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "aprobacionpermisos", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_permiso: -1 };
                return respuesta;
            }
        });
    }

    public async actualizarDiaFestactualizarnuevospermisosivo(observaciones: string, id_permiso:string, estatus: string) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`update sincyt.rrhh_permiso p
                SET p.per_id_estatus = '${estatus}' , p.observaciones = '${observaciones}'
                WHERE p.id = '${id_permiso}';`);
                const respuesta = { metodo: "aprobacionpermisos", codigo: 1, observaciones, id_permiso, estatus };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "aprobacionpermisos", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_permiso: -1 };
                return respuesta;
            }
        });
    }

    public async actualizarTPPermiso( estado: string, id:string) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`UPDATE sincyt.rrhh_tipo_permiso SET  id_estado = '${estado}' WHERE id = '${id}';`);
                const respuesta = { metodo: "actualizarfecha", codigo: 1, estado, id };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarfecha", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_carpeta: -1 };
                return respuesta;
            }
        });
    }

}