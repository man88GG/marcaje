import { raw } from 'body-parser';
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import { Console } from 'console';
import { carpetaActualizar } from './carpetaActualizar';

export class carpetaSGPRegistrar {

    constructor() {
    }

    public async limpiarReqSGP(descripcion: any, id_mongo: any, id_perfil: any, id_requisito_linea: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawAnterior = await connection.manager.query(`
                     SELECT id_documento_mongo
                     FROM sgp_perfil_requisito
                     WHERE id_perfil_proyecto=${id_perfil} and id_requisito_linea=${id_requisito_linea};`);

                const mongo_anterior = rawAnterior[0].id_documento_mongo;
                const update = await new carpetaActualizar().actualizarMetaEnUsoMongo_CTI(mongo_anterior, id_perfil, id_requisito_linea)
                console.log(update);

                /*const rawDataeli = await connection.manager.query(`
                DELETE FROM sgp_perfil_requisito WHERE id_perfil_proyecto=${id_perfil} and id_requisito_linea=${id_requisito_linea};
                `);

                const rawData = await connection.manager.query(`
                INSERT INTO sgp_perfil_requisito (fecha_creacion,descripcion,id_documento_mongo,id_perfil_proyecto,id_requisito_linea)
                VALUES(NOW(),'${descripcion}','${id_mongo}',${id_perfil},${id_requisito_linea});`);
                const id = rawData.insertId;*/


                const respuesta = { metodo: "limpiarReqSGP", codigo: 1, update };
                return respuesta;
            } catch (e) {
                console.log(e)
                const respuesta = { metodo: "limpiarReqSGP", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", requisito: -1 };
                return respuesta;
            }
        });
    }
}