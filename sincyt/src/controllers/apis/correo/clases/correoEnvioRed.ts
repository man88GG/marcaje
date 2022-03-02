import { type } from 'os';
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import { correoCuerpoRed } from './correoCuerpoRed';
import { correoInsertarBd } from './correoInsertarBd';

export class correoEnvioRed {

    constructor() {
    }

    public async enviarRed(no_registro_persona: any, tipo_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                // Buscamos
                const rawData = await connection.manager.query(`
                SELECT * FROM sincyt.red_datos r
                inner join rpe_persona p on p.no_registro_persona=r.no_registro_persona
                where r.no_registro_persona=${no_registro_persona} order by id_datos desc;`);

                const correo = rawData[0].correo_electronico;
                const no_registro_oficial = rawData[0].no_registro_oficial;
                const usuario = rawData[0].nombres + ' ' + rawData[0].apellidos;
                const docs = [];
                docs.push(rawData[0].id_mongo);

                await new correoCuerpoRed().sendCorreoRed(correo, docs, usuario, tipo_usuario, no_registro_oficial, no_registro_persona);

                const respuesta = { metodo: "enviarRed", codigo: 1, rawData: correo };
                return respuesta;
            } catch (e) {
                console.log(e);
                const tipoCorreoDescripcion = await new correoCuerpoRed().getTipoCorreoDescripcion(tipo_usuario);

                const respuesta3 = await new correoInsertarBd().insertarBitacora('', '', '', '', '', tipoCorreoDescripcion, 0, e.toString());
                console.log(respuesta3);
                const respuesta = { metodo: "enviarRed", codigo: 0, mensaje: "Error en la acción, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }
}