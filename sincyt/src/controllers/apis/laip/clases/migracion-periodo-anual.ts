import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';
import { generarInsert, generarUpdate, generarSelect } from '../../../../utilities/functions';

export class migracionPeriodoAnual{
    constructor(){
    }

    public async migrarPeriodoAnual(){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const parametros = await connection.manager.query(generarSelect('laip_parametro', ['*'], {id: 1}))
                if (parametros[0].año_gestion + 1 != new Date().getFullYear()){
                    return { metodo: "migrarPeriodoAnual", codigo: 0, mensaje: "No es posible hacer la gestión en este momento" }
                };
                let datos = await connection.manager.query(generarSelect('laip_item', ['*'], {nombre: `Transparencia Presupuestaria -Ley Orgánica ${parametros[0].año_gestion}-`}))
                const padrePrincipal = datos[0]
                const idPadrePrincipal = padrePrincipal.id
                padrePrincipal.nombre  = `Transparencia Presupuestaria -Ley Orgánica ${parseInt(parametros[0].año_gestion, 10)+1}-`;
                datos = await connection.manager.query(`SELECT id FROM laip_item WHERE nombre LIKE '%Consulta de Años Anteriores de la Ley Orgánica del Presupuesto%'`)
                await connection.manager.query(generarUpdate('laip_item', {'nombre': `Año ${parametros[0].año_gestion}`, 'id_padre': datos[0].id}, {id: idPadrePrincipal}))
                migracionAnual(idPadrePrincipal, await insertarActualizarItem(padrePrincipal, padrePrincipal.id_padre, connection), connection)
                await connection.manager.query(generarUpdate('laip_parametro', {año_gestion: parametros[0].año_gestion + 1}, {id: 1}))
                const respuesta = { metodo: "migrarPeriodoAnual", codigo: 1 };
                return respuesta;
            } catch (e) {
                console.log(e)
                const respuesta = { metodo: "migrarPeriodoAnual", codigo: 0, mensaje: 'Ocurrio un error inesperado' };
                return respuesta;
            }
        });
    };
};

async function migracionAnual(padre: number/*actual*/, nuevoPadre: number/*nuevo*/, connection: any){ // Funcion recursiva
    try{
        const hijos = await connection.manager.query(generarSelect('laip_item', ['*'], {id_padre: padre}));
        if (hijos.length > 0){
            for (const hijo of hijos) {
                const actual = hijo.id
                const nuevo = await insertarActualizarItem(hijo, nuevoPadre, connection)
                migracionAnual(actual, nuevo, connection)
            };
        } else {
            // En caso no tenga hijos se hacen las relaciones y la periodicidad pues significa que es un elemento final o documento
            // Copiar la periodicidad
            const periodicidad = await connection.manager.query(generarSelect('laip_periocidad', ['*'], {id_item: padre}));
            for (const p of periodicidad){
                delete p.id;
                p.id_item = nuevoPadre;
                await connection.manager.query(generarInsert(p, 'laip_periocidad'))
            };
            // Copiar los encargados
            const asignaciones = await connection.manager.query(generarSelect('laip_asignacion', ['*'], {id_item: padre, id_estado: 1}))
            for (const asignacion of asignaciones){
                await connection.manager.query(generarUpdate('laip_asignacion', {id_estado: 2}, {id: asignacion.id}))
                delete asignacion.id;
                asignacion.id_item = nuevoPadre;
                asignacion.id_estado = 1;
                await connection.manager.query(generarInsert(asignacion, 'laip_asignacion'))
            };
        }
    } catch (e) {
        console.log(e);
    }
};

async function insertarActualizarItem(json: any, nuevoPadre: number, connection: any){
    try{
        await connection.manager.query(generarUpdate('laip_item', {id_estado: 2}, {id: json.id})); // Cambiamos el estado
        delete json.id;
        json.id_padre = nuevoPadre;
        const datos = await connection.manager.query(generarInsert(json, 'laip_item')) // Insertamos el nuevo elemento ya con el padre correspondiente
        return datos.insertId
    }catch (e) {
        console.log(e);
    }
};