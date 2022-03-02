import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class claseinsertarp {
    constructor(){
    }

    public async insertarnuevoper (hora_inicial: any, hora_final: any, descripcion: any, id_usuario: any, id_departamento: any, id_usuario_jefe: any, id_departamento_jefe: any, id_tipo_permiso: any, per_fech_solicitud: any, per_id_estatus: any, per_fech_permiso: any, per_us_solicitante: any, per_emergencia: any, per_fech_fpermiso: any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                    const rawData = await connection.manager.query(`
                    INSERT INTO sincyt.rrhh_permiso (hora_inicial, hora_final, descripcion, id_usuario, id_departamento, id_usuario_jefe, id_departamento_jefe, id_tipo_permiso, per_fech_solicitud, per_id_estatus, per_fech_permiso, per_us_solicitante, per_emergencia, per_fech_fpermiso)
                    VALUES('${hora_inicial}','${hora_final}','${descripcion}','${id_usuario}','${id_departamento}','${id_usuario_jefe}','${id_departamento_jefe}','${id_tipo_permiso}','${per_fech_solicitud}','${per_id_estatus}','${per_fech_permiso}','${per_us_solicitante}','${per_emergencia}','${per_fech_fpermiso}')`);
                    const respuesta = { metodo: "registropermiso", codigo: 1, id_documento: hora_inicial, hora_final, descripcion, id_usuario, id_departamento, id_usuario_jefe, id_departamento_jefe, id_tipo_permiso, per_fech_solicitud, per_id_estatus, per_fech_permiso, per_us_solicitante, per_emergencia, per_fech_fpermiso};
                    return respuesta;

        } catch (e) {
                    console.log(e);
                    const respuesta = { metodo: "registropermiso", codigo: 0, mensaje: "Error en el registro", id_documento: -1 };
                    return respuesta;
        }
        });
    }

    public async insertarTipodePermiso (descripcion: any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                    const rawData = await connection.manager.query(`
                    INSERT INTO sincyt.rrhh_tipo_permiso (descripcion, id_estado)VALUES('${descripcion}',1)`);
                    const respuesta = { metodo: "insertarTipodePermiso", codigo: 1, id_documento: descripcion};
                    return respuesta;

        } catch (e) {
                    console.log(e);
                    const respuesta = { metodo: "insertarTipodePermiso", codigo: 0, mensaje: "Error en el registro", id_documento: -1 };
                    return respuesta;
        }
        });
    }

    public async insertarNuevoDiaFestivo (fecha: any, descripcion: any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                    const rawData = await connection.manager.query(`
                    INSERT INTO sincyt.rrhh_dia_festivo (fecha, descripcion, estado) VALUES ('${fecha}', '${descripcion}', 4);`);
                    const respuesta = { metodo: "RegistrarDiaFestivo", codigo: 1, id_documento: fecha, descripcion};
                    return respuesta;

        } catch (e) {
                    console.log(e);
                    const respuesta = { metodo: "RegistrarDiaFestivo", codigo: 0, mensaje: "Error en el registro", id_documento: -1 };
                    return respuesta;
        }
        });
    }

    public async insertarenbitacora (accion: any, descripcion: any,tabla: any, usuario: any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                    const rawData = await connection.manager.query(`INSERT INTO sincyt.rrhh_bitacora(accion,descripcion,tabla,fecha,usuario)
                    VALUES ('`+accion+`','`+descripcion+`','`+tabla+`',NOW(),'`+usuario+`');`);
                    const respuesta = { metodo: "insertarenbitacora", codigo: 1, id_documento: accion, descripcion,tabla, usuario};
                    return respuesta;

        } catch (e) {
                    console.log(e);
                    const respuesta = { metodo: "insertarenbitacora", codigo: 0, mensaje: "Error en el registro", id_documento: -1 };
                    return respuesta;
        }
        });
    }

}


