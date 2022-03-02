
import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class clasedelete{
    constructor(){
    }
    public async eliminarpermiso(id_permiso : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('DELETE FROM sincyt.rrhh_permiso WHERE  per_id_estatus = 1 and id = ' + id_permiso);

                const respuesta = { metodo: "eliminarpermiso", codigo: 1, id_permiso};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "eliminarpermiso", codigo: 0, id_permiso: -1};
                return respuesta;
            }
        });
    }
}