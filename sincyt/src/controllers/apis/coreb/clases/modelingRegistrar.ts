import { NumericTypes } from 'mongoose';
import { ConnectionSINCYT }  from '../../../../models/ConnectionSINCYT';

export class modelingRegistrar {

    constructor() {
    }

    public async RegistrarProceso(nombre : any, descripcion : any, version : any, estado : any, procesoPadre : any, tipoProceso : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO corb_proceso (nombre, descripcion, version, id_estado, id_proceso_padre, id_tipo_proceso)' +
                    ' VALUES(\'' + nombre + '\',\'' + descripcion+ '\',\'' + version + '\'' +
                    ', ' + estado + ', ' + procesoPadre + ', ' + tipoProceso + ');');

                const id = rawData.insertId;
                const respuesta = { metodo: "RegistrarProceso", codigo: 1, no_gestion: id};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "RegistrarProceso", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async RegistrarCaracterizacion(nombre : any, alcance : any, objetivo : any, proceso : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO corb_caracterizacion (nombre, alcance, objetivo, id_proceso)' +
                    ' VALUES(\'' + nombre + '\',\'' + alcance+ '\',\'' + objetivo + '\'' +
                    ', ' + proceso + ');');

                const id = rawData.insertId;
                const respuesta = { metodo: "RegistrarCaracterizacion", codigo: 1, no_caracetrizacion: id};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "RegistrarCaracterizacion", codigo: 0, no_caracetrizacion: -1};
                return respuesta;
            }
        });
    }

    public async RegistrarTarea(nombre : any, duracion : number,  max_duracion: number,  costo : number,  ejecucion : number, tipo : number,  proceso : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO corb_tarea (nombre, duracion, max_duracion, costo, ejecucion, id_tipo_tarea, id_proceso)' +
                    ' VALUES(\'' + nombre + '\', ' + duracion + ', ' + max_duracion + ', ' + costo + ', ' + ejecucion + ', ' + tipo + ', ' + proceso + ');');

                const id = rawData.insertId;
                const respuesta = { metodo: "RegistrarTarea", codigo: 1, no_tarea: id};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "RegistrarTarea", codigo: 0, no_tarea: -1};
                return respuesta;
            }
        });
    }

    public async RegistrarCriterio(nombre : any,tipo : number,  criterio: number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO corb_criterio (nombre, id_tipo_criterio,id_funcion_criterio)' +
                    ' VALUES(\'' + nombre + '\', ' + tipo + ', ' + criterio + ');');

                const id = rawData.insertId;
                const respuesta = { metodo: "RegistrarCriterio", codigo: 1, no_criterio: id};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "RegistrarCriterio", codigo: 0, no_criterio: -1};
                return respuesta;
            }
        });
    }

    public async AsociarCriterioTarea(tarea : number,  criterio: number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO corb_tarea_criterio (id_tarea, id_criterio)' +
                    ' VALUES(' + tarea + ', ' + criterio + ');');

                const respuesta = { metodo: "AsociarCriterioTarea", codigo: 1};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "AsociarCriterioTarea", codigo: 0};
                return respuesta;
            }
        });
    }

    public async RegistrarRuta(tareaOrigen : number,  tareaDestino: number,  prioridad: number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO corb_ruta (id_tarea_origen, id_tarea_destino, prioridad)' +
                    ' VALUES(' + tareaOrigen + ', ' + tareaDestino + ', ' + prioridad + ');');

                const id = rawData.insertId;
                const respuesta = { metodo: "RegistrarRuta", codigo: 1, no_ruta: id};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "RegistrarRuta", codigo: 0, no_ruta: -1};
                return respuesta;
            }
        });
    }

    public async RegistrarReglaRuta(criterio : number,  ruta: number,  operador: any, valor : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO corb_regla (id_criterio, id_ruta, operador, valor)' +
                    ' VALUES(' + criterio + ', ' + ruta + ', \'' + operador + '\', \'' + valor+ '\');');

                const id = rawData.insertId;
                const respuesta = { metodo: "RegistrarReglaRuta", codigo: 1, id_regla: id};
                return respuesta;
            }catch(e){

                const respuesta = { metodo: "RegistrarReglaRuta", codigo: 0, id_regla: -1};
                return respuesta;
            }
        });
    }

    public async AsociarPerfilProceso(perfil : number,  proceso: number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO corb_perfil_proceso (id_perfil, id_proceso)' +
                    ' VALUES(' + perfil + ', ' + proceso + ');');

                const respuesta = { metodo: "AsociarPerfilProceso", codigo: 1};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "AsociarPerfilProceso", codigo: 0};
                return respuesta;
            }
        });
    }

    public async AsociarPerfilTarea(perfil : number,  tarea: number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO corb_perfil_tarea (id_perfil, id_tarea)' +
                    ' VALUES(' + perfil + ', ' + tarea + ');');

                const respuesta = { metodo: "AsociarPerfilTarea", codigo: 1};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "AsociarPerfilTarea", codigo: 0};
                return respuesta;
            }
        });
    }

    public async InformacionProceso(proceso : number,  tipo: number, clave : any, valor : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO corb_informacion_adicional (id_proceso, id_tipo_informacion, clave, valor)' +
                    ' VALUES(' + proceso + ', ' +tipo + ',\''+clave+'\', \''+valor+'\');');
                const respuesta = { metodo: "InformacionProceso", codigo: 1};
                return await respuesta;
            }catch(e){
                const respuesta = { metodo: "InformacionProceso", codigo: 0};
                return respuesta;
            }
        });
    }

}
