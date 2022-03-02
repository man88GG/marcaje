import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import MongoGlobals from "../../../../constants/mongoGlobals";
import MongoModels from "../../../../models/mongodb/fs.files";
import { gestionRegistrar } from './gestionRegistrar';

export class gestionActualizar {
    constructor() {
    }

    public async actualizarGestion(id_gestion: any, asunto: any, contenido: any, id_tipo: any, receptores: any, id_estado: any, referencia: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                UPDATE gd_gestion
                SET
                    asunto = '${asunto}',
                    referencia = '${referencia}',
                    contenido = '${contenido}',
                    fecha_creada = NOW(),
                    id_tipo = ${id_tipo}
                WHERE
                    id_gestion = ${id_gestion};`);

                // Quitando receptores anteriores
                const rawData2 = await connection.manager.query(`
                DELETE FROM gd_receptor
                WHERE
                    id_gestion = ${id_gestion};`);

                if (receptores !== undefined) {
                    receptores.forEach(async (element: any) => {
                        await new gestionRegistrar().registrarReceptor(id_gestion, element, id_estado);
                    });
                }
                // registrar estado
                await this.actualizarEnvioGestion(id_gestion, id_estado);// 1 edicion---2 enviada


                // insertar en bitacora
                await new gestionRegistrar().registrarBitacora('', "Actualizar", "Se actualizó la información de la gestion: " + id_gestion);

                const respuesta = { metodo: "actualizarGestion", codigo: 1, id_gestion };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "actualizarGestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_gestion: -1 };
                return respuesta;
            }
        });
    }

    public async actualizarEnvioGestion(id_gestion: number, estado: string) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                UPDATE gd_estado_gestion
                SET id_estado = ${estado}
                WHERE id_gestion = ${id_gestion};
                `);

                const rawData2 = await connection.manager.query(`
                UPDATE gd_receptor
                SET id_estado_receptor = ${estado}
                WHERE id_gestion = ${id_gestion};
                `);
                const respuesta = { metodo: "actualizarGestion", codigo: 1, id_gestion };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "actualizarGestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_gestion: -1 };
                return respuesta;
            }
        });
    }

    public async actualizarEstadoGestion(id_gestion: number, estado: number, id_receptor: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData2 = await connection.manager.query(`
                UPDATE gd_receptor
                SET id_estado_receptor = ${estado}
                WHERE id_gestion = ${id_gestion} and id_gtu_usuario=${id_receptor};
                `);
                if (estado == 3) {
                    await this.revisarEstadoGestion(id_gestion, estado);
                }

                // insertar en bitacora
                await new gestionRegistrar().registrarBitacora('', "Actualizar", "Se actualizó el estado de la gestion: " + id_gestion);
                const respuesta = { metodo: "actualizarEstadoGestion", codigo: 1, id_gestion };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "actualizarEstadoGestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_gestion: -1 };
                return respuesta;
            }
        });
    }

    public async revisarEstadoGestion(id_gestion: number, estado: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                // REVISAR SI TODOS LOS RECEPTORES HAN LEIDO PARA CAMBIAR DE ESTADO LA GESTION
                const rawData = await connection.manager.query(`
                Select *
                FROM gd_receptor
                WHERE id_gestion = ${id_gestion};
                `);
                let cambio = true;
                rawData.forEach((e: any) => {
                    if (e.id_estado_receptor != estado) {
                        cambio = false;
                    }
                });

                if (cambio) {
                    await new gestionRegistrar().registrarEstado(id_gestion, estado);
                }
                const respuesta = { metodo: "revisarEstadoGestion", codigo: 1, id_gestion };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "revisarEstadoGestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_gestion: -1 };
                return respuesta;
            }
        });
    }
}