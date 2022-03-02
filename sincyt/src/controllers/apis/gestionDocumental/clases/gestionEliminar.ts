import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import MongoGlobals from "../../../../constants/mongoGlobals";
import MongoModels from "../../../../models/mongodb/fs.files";
import { gestionRegistrar } from './gestionRegistrar';

export class gestionEliminar {
    constructor() {
    }
    public async eliminarGestion(id_gestion: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                let rawData = await connection.manager.query(`
                DELETE FROM gd_estado_gestion WHERE id_gestion=${id_gestion};
                `);

                rawData = await connection.manager.query(`
                DELETE FROM gd_receptor WHERE id_gestion=${id_gestion};
                `);

                rawData = await connection.manager.query(`
                DELETE FROM gd_documento WHERE id_gestion=${id_gestion};
                `);

                rawData = await connection.manager.query(`
                DELETE FROM gd_gestion WHERE id_gestion=${id_gestion};
                `);


                // insertar en bitacora
                await new gestionRegistrar().registrarBitacora('', "Eliminación", "Se eliminó la gestion: " + id_gestion);
                const respuesta = { metodo: "eliminarGestion", codigo: 1, gestion: id_gestion };
                return respuesta;
            } catch (e) {
                console.log(e);
                const respuesta = { metodo: "eliminarGestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }
}