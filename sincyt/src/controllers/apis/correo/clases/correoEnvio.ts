import { type } from 'os';
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import { correoCuerpo } from './correoCuerpo';
import { correoInsertarBd } from './correoInsertarBd';

export class correoEnvio {

    constructor() {
    }

    public async enviar(id_perfil_proyecto: any, isFase2: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                // Buscamos
                const rawData = await connection.manager.query(`
                select rp.correo_electronico,aad.id_mongo,l.id_linea,rp.nombres,rp.apellidos
                from app_detalle_proceso adp inner join asgp_app_documento aad on
                    adp.id_detalle_proceso = aad.id_detalle_proceso
                    inner join asgp_solicitud s on adp.cod_proceso=s.cod_proceso
                    inner join sgp_perfil_proyecto sp on s.id_perfil_proyecto=sp.id_perfil_proyecto
                    inner join rpe_persona rp on sp.no_registro_persona=rp.no_registro_persona
                    inner join sgp_linea l on sp.id_linea=l.id_linea
                    where s.id_perfil_proyecto=${id_perfil_proyecto} and aad.id_tipo_documento in(25,45);`);

                const correo = rawData[0].correo_electronico;
                const linea = rawData[0].id_linea;
                const usuario = rawData[0].nombres + ' ' + rawData[0].apellidos;
                const docs = [];
                for (const doc of rawData) {
                    docs.push(doc.id_mongo);
                }
                await new correoCuerpo().sendCorreo(correo, docs, linea, usuario, id_perfil_proyecto, isFase2);

                const respuesta = { metodo: "enviar", codigo: 1, rawData: correo };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta3 = await new correoInsertarBd().insertarBitacora('', '', '', '', '', 'No se encontró linea específica.', 0, e.toString());
                console.log(respuesta3);
                const respuesta = { metodo: "enviar", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async enviarGeneral(no_registro_persona: any, id_perfil_proyecto: any, asunto: any, cuerpo: any, idmodulo: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const tipo = no_registro_persona !== undefined ? 1 : 2;
                // Buscamos
                let rawData = [];
                if (tipo == 1) {// Con no_registro_persona
                    rawData = await connection.manager.query(`
                    SELECT nombre_completo,correo_electronico
                    FROM gtu_usuario
                    where id='${no_registro_persona}';`);
                    const correo = rawData[0].correo_electronico;
                    const nombre = rawData[0].nombre_completo;

                    await new correoCuerpo().sendCorreoGeneral(correo, nombre, asunto, cuerpo, idmodulo);
                } else {// Con id_perfil_proyecto
                    rawData = await connection.manager.query(`
                    SELECT u.nombre_completo,u.correo_electronico
                    FROM sincyt.gtu_usuario_perfil as p
                    inner join gtu_usuario u on u.id=p.id_usuario
                    where p.id_perfil=${id_perfil_proyecto};`);
                    for (const usr of rawData) {
                        await new correoCuerpo().sendCorreoGeneral(usr.correo_electronico, usr.nombre_completo, asunto, cuerpo, idmodulo);
                    }
                }


                const respuesta = { metodo: "enviar", codigo: 1, tipoCorreoReinicio: tipo, rawData };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta3 = await new correoInsertarBd().insertarBitacora('', '', '', '', '', 'No se encontró parametros correctos.', 0, e.toString());
                console.log(respuesta3);
                const respuesta = { metodo: "enviar", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async enviarGD(no_registro_persona: any, asunto: any, cuerpo: any, idmodulo: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                // Buscamos
                const rawData = await connection.manager.query(`
                    SELECT nombre_completo,correo_electronico
                    FROM gtu_usuario
                    where id='${no_registro_persona}';`);
                const correo = rawData[0].correo_electronico;
                const nombre = rawData[0].nombre_completo;
                await new correoCuerpo().sendCorreoGeneral(correo, nombre, asunto, cuerpo, idmodulo);
                const respuesta = { metodo: "enviarGD", codigo: 1, usuario: rawData };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta3 = await new correoInsertarBd().insertarBitacora('', '', '', '', '', 'No se encontró parametros correctos.', 0, e.toString());
                console.log(respuesta3);
                const respuesta = { metodo: "enviarGD", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados", usuario: -1 };
                return respuesta;
            }
        });
    }
}