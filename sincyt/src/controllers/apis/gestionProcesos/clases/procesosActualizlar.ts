import { ConnectionSINCYT }  from '../../../../models/ConnectionSINCYT';

export class procesosActualizlar{
    constructor(){
    }

    public async actualizarProceso(objetivo : string, alcance : string,  padre: any, estado : any, convocatoria : number, version:string, nombre : string, proceso : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{

                const rawData = await connection.manager.query('UPDATE sincyt.gdp_proceso SET objetivo_proceso= \'' +objetivo+'\', alcance_proceso =  \''+ alcance+'\', ' +
                    'proceso_padre = '+ padre+', estado =  '+ estado+', id_convocatoria ='+ convocatoria+' , version = \''+ version+'\', nombre = \''+ nombre+'\' ' +
                    'WHERE id_proceso = ' + proceso);
                const id = rawData.insertId;
                const respuesta = { metodo: "actualizarProceso", codigo: 1, no_proceso: id};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "actualizarProceso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }
}


