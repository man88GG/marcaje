import { ConnectionSINCYT }  from '../../../../models/ConnectionSINCYT';

export class modelingEliminar{

    constructor() {
    }

    public async EliminarProceso(proceso : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM corb_proceso WHERE id_proceso = ' + proceso);

                const respuesta = { metodo: "EliminarProceso", codigo: 1, id_proceso: proceso};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "EliminarProceso", codigo: 0, id_proceso: -1};
                return respuesta;
            }
        });
    }

    public async EliminarCaracterizacion(caracterizacion : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM corb_caracterizacion WHERE id_caracterizacion = ' + caracterizacion);

                const respuesta = { metodo: "EliminarCaracterizacion", codigo: 1, id_caracterizacion: caracterizacion};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "EliminarCaracterizacion", codigo: 0, id_caracterizacion: -1};
                return respuesta;
            }
        });
    }

    public async EliminarTarea(tarea : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM corb_tarea WHERE id_tarea = ' + tarea);

                const id = rawData.insertId;
                const respuesta = { metodo: "EliminarTarea", codigo: 1, id_tarea: id};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "EliminarTarea", codigo: 0, id_tarea: -1};
                return respuesta;
            }
        });
    }

    public async EliminarCriterio(criterio : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM corb_criterio WHERE id_criterio = ' + criterio);

                const respuesta = { metodo: "EliminarCriterio", codigo: 1, id_crtierio: criterio};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "EliminarCriterio", codigo: 0, id_crtierio: -1};
                return respuesta;
            }
        });
    }

    public async EliminarCriterioTarea(criterio : number, tarea : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM corb_tarea_criterio WHERE id_criterio = ' + criterio + ' AND id_tarea = '+ tarea);

                const respuesta = { metodo: "EliminarCriterioTarea", codigo: 1, id_crtierio: criterio};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "EliminarCriterioTarea", codigo: 0, id_crtierio: -1};
                return respuesta;
            }
        });
    }

    public async EliminarRuta(ruta : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM corb_ruta WHERE id_ruta = ' + ruta);

                const respuesta = { metodo: "EliminarRuta", codigo: 1, id_ruta: ruta};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "EliminarRuta", codigo: 0, id_ruta: -1};
                return respuesta;
            }
        });
    }

    public async EliminarRutaRegla(regla : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM corb_regla WHERE id_regla = ' + regla);

                const respuesta = { metodo: "EliminarRutaRegla", codigo: 1, id_regla: regla};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "EliminarRutaRegla", codigo: 0, id_regla: -1};
                return respuesta;
            }
        });
    }

    public async EliminarProcesoPerfil(proceso : number, perfil : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM corb_perfil_proceso WHERE id_proceso = ' + proceso + ' AND id_perfil ='+perfil);

                const respuesta = { metodo: "EliminarRutaRegla", codigo: 1, id_perfil: perfil};
                return await respuesta;
            }catch(e){

                console.log(e);
                const respuesta = { metodo: "EliminarRutaRegla", codigo: 0, id_perfil: -1};
                return respuesta;
            }
        });
    }

    public async EliminarTareaPerfil(proceso : number, perfil : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM corb_perfil_tarea WHERE id_tarea = ' + proceso + ' AND id_perfil ='+perfil);

                const respuesta = { metodo: "EliminarTareaPerfil", codigo: 1, id_perfil: perfil};
                return await respuesta;
            }catch(e){

                console.log(e);
                const respuesta = { metodo: "EliminarTareaPerfil", codigo: 0, id_perfil: -1};
                return respuesta;
            }
        });
    }
}