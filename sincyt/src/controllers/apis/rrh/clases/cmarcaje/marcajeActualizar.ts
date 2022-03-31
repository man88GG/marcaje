import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class marcajeActualizar{


    public async actualizarHraSalidaMarcaje(id_empleado:any, hora_marcaje:any,fecha_marcaje:any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`UPDATE sincyt.rrhh_marcaje SET hra_salida = '${hora_marcaje}' WHERE fecha_marcaje = '${fecha_marcaje}' AND id_empleado = '${id_empleado}' AND hra_salida IS NULL;`);
                const respuesta = { metodo: "actualizarHraSalidaMarcaje", codigo: 1, hora_marcaje, id_empleado};
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarHraSalidaMarcaje", codigo: 0, mensaje: "Error en la consulta Verifique los parametros" };
                return respuesta;
            }
        });
    }

    /*
    public async actualizarTiempoLaboradoDiario(id_empleado:any, tiempo_laborado:any ) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`UPDATE sincyt.rrhh_marcaje SET horas_laboradas = '${tiempo_laborado}' WHERE id_empleado = '${id_empleado}';`);
                const respuesta = { metodo: "actualizarTiempoLaboradoDiario", codigo: 1, tiempo_laborado, id_empleado};
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "actualizarTiempoLaboradoDiario", codigo: 0, mensaje: "Error en la consulta Verifique los parametros" };
                return respuesta;   
            }
        });
    }*/




}