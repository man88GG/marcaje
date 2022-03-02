import { ConnectionSINCYT }  from '../../../../models/ConnectionSINCYT';

export class procesosEliminar{
    constructor(){
    }

    public async eliminarInfoProceso(tabla : string, proceso : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM sincyt.'+tabla+'' +
                    ' WHERE id_proceso = ' + proceso);
                const respuesta = { metodo: "eliminarInfoProceso", codigo: 1, no_proceso: proceso};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "eliminarInfoProceso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async eliminarInfoSIPOC(sipoc : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('delete gdp_informacion_adicional_tarea from gdp_informacion_adicional_tarea inner join gdp_tarea on ' +
                    'gdp_informacion_adicional_tarea.id_tarea  = gdp_tarea.id_terea' +
                    ' where' +
                    ' gdp_tarea.id_sipoc = ' + sipoc);

                 const rawData2 = await connection.manager.query('DELETE FROM sincyt.gdp_tarea' +
                    ' WHERE id_sipoc = ' + sipoc);

                const respuesta = { metodo: "eliminarInfoSIPOC", codigo: 1, no_proceso: sipoc};
                return respuesta;
            }catch(e){
                console.log(e);
                const respuesta = { metodo: "eliminarInfoSIPOC", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async eliminarInfoTareaSIPOC(tarea : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM sincyt.gdp_informacion_adicional_tarea' +
                    ' WHERE id_tarea = ' + tarea);
                const respuesta = { metodo: "eliminarInfoTareaSIPOC", codigo: 1, no_proceso: tarea};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "eliminarInfoTareaSIPOC", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }
}