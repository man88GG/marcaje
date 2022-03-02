import { ConnectionSINCYT }  from '../../../../models/ConnectionSINCYT';

export class modelingConsultar {

    constructor() {
    }

    public async ConsultarProceso(proceso : number){
        if(proceso === -1){
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_proceso');

                    const respuesta = { metodo: "ConsultarProceso", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarProceso", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }else{
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_proceso WHERE id_proceso = '+proceso);

                    const respuesta = { metodo: "ConsultarProceso", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarProceso", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }
    }

    public async ConsultarCaracterizacion(proceso : number){
        if(proceso === -1){
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_caracterizacion');

                    const respuesta = { metodo: "ConsultarCaracterizacion", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarCaracterizacion", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }else{
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_caracterizacion WHERE id_proceso = '+proceso);

                    const respuesta = { metodo: "ConsultarCaracterizacion", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarCaracterizacion", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }
    }

    public async ConsultarTarea(proceso : number){
        if(proceso === -1){
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_tarea');

                    const respuesta = { metodo: "ConsultarTarea", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarTarea", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }else{
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_tarea WHERE id_proceso = '+proceso);

                    const respuesta = { metodo: "ConsultarTarea", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarTarea", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }
    }

    public async ConsultarCriterio(criterio : number){
        if(criterio === -1){
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_criterio');

                    const respuesta = { metodo: "ConsultarCriterio", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarCriterio", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }else{
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_criterio WHERE id_criterio = '+criterio);

                    const respuesta = { metodo: "ConsultarCriterio", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarCriterio", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }
    }

    public async ConsultarRuta(ruta : number){
        if(ruta === -1){
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_ruta');

                    const respuesta = { metodo: "ConsultarRuta", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarRuta", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }else{
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_ruta WHERE id_ruta = '+ruta);

                    const respuesta = { metodo: "ConsultarRuta", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarRuta", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }
    }

    public async ConsultarRegla(ruta : number){
        if(ruta === -1){
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_regla');

                    const respuesta = { metodo: "ConsultarRegla", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarRegla", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }else{
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_regla WHERE id_ruta = '+ruta);

                    const respuesta = { metodo: "ConsultarRegla", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarRegla", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }
    }

    public async ConsultarPerfilProceso(proceso : number){
        if(proceso === -1){
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_perfil_proceso');

                    const respuesta = { metodo: "ConsultarPerfilProceso", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarPerfilProceso", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }else{
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_perfil_proceso WHERE id_proceso = '+proceso);

                    const respuesta = { metodo: "ConsultarPerfilProceso", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarPerfilProceso", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }
    }

    public async ConsultarProcesoPerfil(perfil : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('SELECT * FROM corb_perfil_proceso WHERE id_perfil = '+perfil);

                const respuesta = { metodo: "ConsultarProcesoPerfil", codigo: 1, data: rawData};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "ConsultarProcesoPerfil", codigo: 0, data : ""};
                return respuesta;
            }
        });
    }

    public async ConsultarPerfilTarea(tarea : number){
        if(tarea === -1){
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_perfil_tarea');

                    const respuesta = { metodo: "ConsultarPerfilTarea", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarPerfilTarea", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }else{
            return new ConnectionSINCYT().retornarConexion().then(async connection => {
                try{
                    const rawData = await connection.manager.query('SELECT * FROM corb_perfil_tarea WHERE id_tarea = '+tarea);

                    const respuesta = { metodo: "ConsultarPerfilTarea", codigo: 1, data: rawData};
                    return await respuesta;
                }catch(e){

                    const respuesta = { metodo: "ConsultarPerfilTarea", codigo: 0, data : ""};
                    return respuesta;
                }
            });
        }
    }

    public async ConsultarTareaPerfil(perfil : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('SELECT * FROM corb_perfil_tarea WHERE id_perfil = '+perfil);

                const respuesta = { metodo: "ConsultarTareaPerfil", codigo: 1, data: rawData};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "ConsultarTareaPerfil", codigo: 0, data : ""};
                return respuesta;
            }
        });
    }
}