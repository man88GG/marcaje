import {ConnectionSINCTY} from '../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080'

export class marcajeObtener{
    
    // funcion que obtiene todas las evaluaciones
    public async obtenerEmpleado(cod_barra : any){

        return new ConnectionSINCTY().retornarConexion().then(async connection => {
            try{
               /*  const rawData = await connection.manager.query(`
                SELECT m.pk_id_marcaje, m.hra_entrada, m.hra_salida FROM marcaje as m, empleado as e, tipo_empleado as te WHERE 
                m.fk_id_empleado = e.pk_id_empleado AND e.fk_id_tipoempleado = te.pk_id_tipo_empleado AND m.pk_id_marcaje = 
                {metodo: "obtenerCodigoBarra", cod_barra: rawData};

                 */
                const rawData = await connection.manager.query(
                
                `SELECT m.pk_id_marcaje, m.hra_entrada, m.hra_salida FROM marcaje as m, empleado as e, tipo_empleado as te 
                WHERE m.fk_id_empleado = e.pk_id_empleado AND e.fk_id_tipoempleado = te.pk_id_tipo_empleado AND m.pk_id_marcaje = (SELECT max(m.pk_id_marcaje)FROM marcaje)`
                
                );

                const respuesta = { metodo: "obtenerCodigoEmpleado",pk_id_marcaje: rawData  };

                return rawData;
            }
            catch(e){
                const respuesta = { metodo: "obtenerCodigoEmpleado", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }



    
}