import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import { generarSelect } from '../../../../utilities/functions';

export class parametros{
    constructor(){
    };

    public async obtenerParametro(id: number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const parametros = await connection.manager.query(generarSelect('laip_parametro', ['*'], {id}))
                if (parametros.length == 0){
                    return {metodo: 'obtenerParametro', codigo: false, mensaje: 'Id no encontrado'}
                };
                return {metodo: 'obtenerParametro', codigo: true, datos: parametros[0]}
            }catch (e) {
                return {metodo: 'obtenerParametro', codigo: false, mensaje: 'Error no esperado'}
            }
        });
    };
};