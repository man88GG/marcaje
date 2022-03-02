
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import { correoCuerpoPermisoLaboral} from './correoCuerpoPermisosLaborales';

export class correoEnvioPermisoLaboral {

    constructor() {
    }
    public async Enviaralsolicitantedepermiso () {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT p.id as numeroPermiso, u.nombre_completo, u.correo_electronico, tp.descripcion
                FROM sincyt.rrhh_permiso p, sincyt.gtu_usuario u, sincyt.rrhh_tipo_permiso tp
                where p.id_usuario=u.id and p.id_tipo_permiso=tp.id and p.id=(select id
                from sincyt.rrhh_permiso
                order by id desc
                limit 1);`);


                 const numeroPermiso = rawData[0].numeroPermiso;
                 const nombre = rawData[0].nombre_completo;
                 const correo = 'mmejia@senacyt.gob.gt';
                 const TipoPermiso = rawData[0].descripcion;
                 await new correoCuerpoPermisoLaboral().sendSolicitanteIngresoPermisoLaboral(correo, nombre, TipoPermiso, numeroPermiso);
                 const respuesta = { metodo: "enviarNotificacionsOLICITANTEDEPERMISO", codigo: 1,};
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "enviar notificacion de ingreso de permiso laboral", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async Enviaralaprobadordepermiso () {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`SELECT p.id as numeroPermiso, u.nombre_completo, u.correo_electronico, tp.descripcion,DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as fecha,DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as fecha_final,
                p.hora_inicial as hora_inicial, p.hora_final as hora_final, p.descripcion as comentario, uu.nombre_completo as solicitante
                                 FROM sincyt.rrhh_permiso p, sincyt.gtu_usuario u, sincyt.rrhh_tipo_permiso tp, sincyt.gtu_usuario uu
                                 where p.id_usuario_jefe =u.id and p.id_tipo_permiso=tp.id and p.id_usuario = uu.id and p.id=(select id
                  from sincyt.rrhh_permiso
                 order by id desc
                 limit 1);`);


                 const hora_inicial = rawData[0].hora_inicial;
                 const fecha = rawData[0].fecha;
                 const solicitante = rawData[0].solicitante;
                 const fecha_final = rawData[0].fecha_final;
                 const hora_final = rawData[0].hora_final;
                 const comentario = rawData[0].comentario;
                 const numeroPermiso = rawData[0].numeroPermiso;
                 const nombre = rawData[0].nombre_completo;
                 const correo = 'mmejia@senacyt.gob.gt';
                 const TipoPermiso = rawData[0].descripcion;
                 await new correoCuerpoPermisoLaboral().sendAprovadorIngresoPermisoLaboral(correo,nombre,TipoPermiso,numeroPermiso,hora_inicial,fecha,solicitante,fecha_final,hora_final,comentario);
                 const respuesta = { metodo: "enviarNotificacionaPROVADORDEPERMISO", codigo: 1,};
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "enviar notificacion de ingreso de permiso laboral al aprovador", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async EnviaraldirectordeRH (destinatario:any, correo_electronico:any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`SELECT p.id as numeroPermiso, u.nombre_completo, u.correo_electronico, tp.descripcion,DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as fecha,DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as fecha_final,
                p.hora_inicial as hora_inicial, p.hora_final as hora_final, p.descripcion as comentario, uu.nombre_completo as solicitante
                                 FROM sincyt.rrhh_permiso p, sincyt.gtu_usuario u, sincyt.rrhh_tipo_permiso tp, sincyt.gtu_usuario uu
                                 where p.id_usuario_jefe =u.id and p.id_tipo_permiso=tp.id and p.id_usuario = uu.id and p.id=(select id
                  from sincyt.rrhh_permiso
                 order by id desc
                 limit 1);`);


                 const hora_inicial = rawData[0].hora_inicial;
                 const fecha = rawData[0].fecha;
                 const solicitante = rawData[0].solicitante;
                 const fecha_final = rawData[0].fecha_final;
                 const hora_final = rawData[0].hora_final;
                 const comentario = rawData[0].comentario;
                 const numeroPermiso = rawData[0].numeroPermiso;
                 const nombre = destinatario;
                 const correo = 'mmejia@senacyt.gob.gt';
                 const TipoPermiso = rawData[0].descripcion;
                 await new correoCuerpoPermisoLaboral().sendRHIngresoPermisoLaboral(correo,nombre,TipoPermiso,numeroPermiso,hora_inicial,fecha,solicitante,fecha_final,hora_final,comentario);
                 const respuesta = { metodo: "enviarNotificacionDireccionRhh", codigo: 1,};
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "enviar notificacion de ingreso de permiso laboral al aprovador", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async EnviaraDespachosuperior(destinatario:any, correo_electronico:any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`SELECT p.id as numeroPermiso, u.nombre_completo, u.correo_electronico, tp.descripcion,DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as fecha,DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as fecha_final,
                p.hora_inicial as hora_inicial, p.hora_final as hora_final, p.descripcion as comentario, uu.nombre_completo as solicitante
                                 FROM sincyt.rrhh_permiso p, sincyt.gtu_usuario u, sincyt.rrhh_tipo_permiso tp, sincyt.gtu_usuario uu
                                 where p.id_usuario_jefe =u.id and p.id_tipo_permiso=tp.id and p.id_usuario = uu.id and p.id=(select id
                  from sincyt.rrhh_permiso
                 order by id desc
                 limit 1);`);


                 const hora_inicial = rawData[0].hora_inicial;
                 const fecha = rawData[0].fecha;
                 const solicitante = rawData[0].solicitante;
                 const fecha_final = rawData[0].fecha_final;
                 const hora_final = rawData[0].hora_final;
                 const comentario = rawData[0].comentario;
                 const numeroPermiso = rawData[0].numeroPermiso;
                 const nombre = destinatario;
                 const correo = 'mmejia@senacyt.gob.gt';
                 const TipoPermiso = rawData[0].descripcion;
                 await new correoCuerpoPermisoLaboral().sendDespachoGeneralIngresoPermisoLaboral(correo,nombre,TipoPermiso,numeroPermiso,hora_inicial,fecha,solicitante,fecha_final,hora_final,comentario);
                 const respuesta = { metodo: "enviarNotificacionDespachosuperior", codigo: 1,};
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "enviar notificacion de ingreso de permiso laboral al aprovador", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async EnviaraEliminacionasolicitante(permiso:any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`select p.id, u.nombre_completo, u.correo_electronico
                FROM sincyt.rrhh_permiso p, sincyt.gtu_usuario u
                where p.id_usuario = u.id and p.id = ${permiso};`);

                 const numeroPermiso = rawData[0].id;
                 const nombre = rawData[0].nombre_completo;
                 const correo = 'mmejia@senacyt.gob.gt';
                 await new correoCuerpoPermisoLaboral().sendEliminacionSolicitante(correo,nombre,numeroPermiso);
                 const respuesta = { metodo: "EnviaraEliminacionasolicitante", codigo: 1,};
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "enviar notificacion de Eliminaacion de permiso laboral al Solicitante", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async EnviaraAprobacionSolicitante(permiso:any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`select p.id, u.nombre_completo, u.correo_electronico
                FROM sincyt.rrhh_permiso p, sincyt.gtu_usuario u
                where p.id_usuario = u.id and p.id = ${permiso};`);

                 const numeroPermiso = rawData[0].id;
                 const nombre = rawData[0].nombre_completo;
                 const correo = 'mmejia@senacyt.gob.gt';
                 await new correoCuerpoPermisoLaboral().sendAprobacionSolicitante(correo,nombre,numeroPermiso);
                 const respuesta = { metodo: "EnviaraAprobacionSolicitante", codigo: 1,};
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "enviar notificacion de Aprovacion de permiso laboral al Solicitante", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async EnviaraAprobacionAprovador(permiso:any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`select p.id, u.nombre_completo, u.correo_electronico
                FROM sincyt.rrhh_permiso p, sincyt.gtu_usuario u
                where p.id_usuario_jefe = u.id and p.id = ${permiso};`);

                 const numeroPermiso = rawData[0].id;
                 const nombre = rawData[0].nombre_completo;
                 const correo = 'mmejia@senacyt.gob.gt';
                 await new correoCuerpoPermisoLaboral().sendAprobacionAprovador(correo,nombre,numeroPermiso);
                 const respuesta = { metodo: "EnviaraAprobacionAprovador", codigo: 1,};
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "enviar notificacion de Aprovacion de permiso laboral al Aprovador", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async EnviaraNegacionSolicitante(permiso:any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`select p.id, u.nombre_completo, u.correo_electronico
                FROM sincyt.rrhh_permiso p, sincyt.gtu_usuario u
                where p.id_usuario = u.id and p.id = ${permiso};`);

                 const numeroPermiso = rawData[0].id;
                 const nombre = rawData[0].nombre_completo;
                 const correo = 'mmejia@senacyt.gob.gt';
                 await new correoCuerpoPermisoLaboral().sendDenegadoSolicitante(correo,nombre,numeroPermiso);
                 const respuesta = { metodo: "EnviaraNegacionSolicitante", codigo: 1,};
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "enviar notificacion de Negacion de permiso laboral al Solicitante", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async EnviaraNegacionAprovador(permiso:any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`select p.id, u.nombre_completo, u.correo_electronico
                FROM sincyt.rrhh_permiso p, sincyt.gtu_usuario u
                where p.id_usuario_jefe = u.id and p.id = ${permiso};`);

                 const numeroPermiso = rawData[0].id;
                 const nombre = rawData[0].nombre_completo;
                 const correo = 'mmejia@senacyt.gob.gt';
                 await new correoCuerpoPermisoLaboral().sendDenegadoAprovador(correo,nombre,numeroPermiso);
                 const respuesta = { metodo: "EnviaraNegacionAprovador", codigo: 1,};
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "enviar notificacion de Negacion de permiso laboral al Aprovador", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

}

