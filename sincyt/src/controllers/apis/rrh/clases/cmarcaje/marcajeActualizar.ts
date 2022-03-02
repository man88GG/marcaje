import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class marcajeActualizar{


    public async actualizarHraSalidaAlmMarcaje(id_empleado:any, hora_marcaje:any ) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`UPDATE sincyt.rrhh_marcaje SET hra_salida_alm = '${hora_marcaje}' WHERE id_evaluacion = '${id_empleado}';`);
                const respuesta = { metodo: "actualizarHraSalidaAlmMarcaje", codigo: 1, hora_marcaje, id_empleado};
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarHraSalidaAlmMarcaje", codigo: 0, mensaje: "Error en la consulta Verifique los parametros" };
                return respuesta;
            }
        });
    }


    public async actualizarHraEntradaAlmMarcaje(id_empleado:any, hora_marcaje:any ) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`UPDATE sincyt.rrhh_marcaje SET hra_entrada_alm = '${hora_marcaje}' WHERE id_evaluacion = '${id_empleado}';`);
                const respuesta = { metodo: "actualizarHraEntradaAlmMarcaje", codigo: 1, hora_marcaje, id_empleado};
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarHraEntradaAlmMarcaje", codigo: 0, mensaje: "Error en la consulta Verifique los parametros" };
                return respuesta;
            }
        });
    }

    public async actualizarHraSalidaMarcaje(id_empleado:any, hora_marcaje:any ) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`UPDATE sincyt.rrhh_marcaje SET hra_salida = '${hora_marcaje}' WHERE id_evaluacion = '${id_empleado}';`);
                const respuesta = { metodo: "actualizarHraSalidaMarcaje", codigo: 1, hora_marcaje, id_empleado};
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarHraSalidaMarcaje", codigo: 0, mensaje: "Error en la consulta Verifique los parametros" };
                return respuesta;
            }
        });
    }





}