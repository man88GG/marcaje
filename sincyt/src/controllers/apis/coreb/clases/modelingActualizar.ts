import { ConnectionSINCYT }  from '../../../../models/ConnectionSINCYT';

export class modelingActualizar {
    constructor() {
    }

    public async ActualizarProceso(nombre : any, descripcion : any, version : any, estado : any, procesoPadre : any, tipoProceso : any, proceso : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('UPDATE corb_proceso SET nombre = \''+nombre+'\', descripcion = \'' + descripcion + '\''+
                    ', version = \'' + version + '\', id_estado = '+ estado + ', id_proceso_padre = ' +  procesoPadre+ ', id_tipo_proceso =' +tipoProceso +
                    ' WHERE id_proceso = '+proceso );

                const id = rawData.insertId;
                const respuesta = { metodo: "ActualizarProceso", codigo: 1, no_gestion: id};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "ActualizarProceso", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async ActualizarCaracterizacion(nombre : any, alcance : any, objetivo : any, proceso : number, caracterizacion : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('UPDATE corb_caracterizacion SET nombre = \''+nombre+'\', alcance = \'' + alcance + '\''+
                    ', objetivo = \'' + objetivo + '\', id_proceso = '+ proceso  +
                    ' WHERE id_caracterizacion = '+caracterizacion );

                const id = rawData.insertId;
                const respuesta = { metodo: "ActualizarCaracterizacion", codigo: 1, no_gestion: id};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "ActualizarCaracterizacion", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async ActualizarTarea(nombre : any, duracion : number,  max_duracion: number,  costo : number,  ejecucion : number, tipo : number,  proceso : number, tarea : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('UPDATE corb_tarea SET nombre = \''+nombre+'\',  id_proceso = '+ proceso  +
                    ', duracion ='+ duracion+ ', max_duracion ='+max_duracion+', costo =' +costo+', ejecucion = ' + ejecucion +
                    ', id_tipo_tarea ='+ tipo +', id_proceso='+proceso+
                    ' WHERE id_tarea = '+tarea );

                const id = rawData.insertId;
                const respuesta = { metodo: "ActualizarTarea", codigo: 1, no_gestion: id};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "ActualizarTarea", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async ActualizarCriterio(nombre : any,tipo : number,  funcion: number, criterio:number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('UPDATE corb_criterio SET nombre = \''+nombre+'\',  id_tipo_criterio = '+ tipo  +
                    ', id_funcion_criterio='+ funcion +
                    ' WHERE id_criterio = '+ criterio );

                const id = rawData.insertId;
                const respuesta = { metodo: "ActualizarCriterio", codigo: 1, no_gestion: id};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "ActualizarCriterio", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async ActualizarRuta(tareaOrigen : number,  tareaDestino: number,  prioridad: number, ruta : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('UPDATE corb_ruta SET id_tarea_origen = '+tareaOrigen+',  id_tarea_destino = '+ tareaDestino  +
                    ', prioridad='+ prioridad +
                    ' WHERE id_ruta= '+ ruta );

                const id = rawData.insertId;
                const respuesta = { metodo: "ActualizarRuta", codigo: 1, no_gestion: id};
                return await respuesta;
            }catch(e){

                console.log(e);
                const respuesta = { metodo: "ActualizarRuta", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }
}