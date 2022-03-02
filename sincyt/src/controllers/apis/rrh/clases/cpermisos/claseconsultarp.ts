
import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class claseconsultarp{
    constructor(){
    }

    public async obtenerPermisosPendientes(id_usuario : any) {
        return new ConnectionSINCYT().retornarConexion().then( async connection =>{
            try{
                const rawData = await connection.manager.query('SELECT p.id, DATE_FORMAT(t.fecha, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion as estado FROM sincyt.rrhh_transaccion_permiso t, sincyt.rrhh_permiso p , sincyt.rrhh_estatus e, sincyt.gtu_usuario u where t.id_permiso = p.id and t.id_estatus = e.id and u.id = p.id_usuario and e.id = 1 and p.id_usuario_jefe = ' + id_usuario + ' union SELECT p.id, DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion as estado FROM sincyt.rrhh_permiso p,sincyt.gtu_usuario u, sincyt.rrhh_estatus e where u.id=p.id_usuario and p.per_id_estatus = e.id and e.id= 1 and p.id_usuario_jefe =' + id_usuario);
                return rawData;
            }catch(e){
                console.log(e);
                const respuesta = { metodo: "obtenerPermisosPendientes", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async obtenerPermisosPendientesDRRH(id_usuario : any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('SELECT p.id, DATE_FORMAT(t.fecha, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion as estado FROM sincyt.rrhh_transaccion_permiso t, sincyt.rrhh_permiso p , sincyt.rrhh_estatus e, sincyt.gtu_usuario u where t.id_permiso = p.id and t.id_estatus = e.id and u.id = p.id_usuario and e.id = 1 and  24  <> 0 union SELECT p.id, DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion as estado FROM sincyt.rrhh_permiso p,sincyt.gtu_usuario u, sincyt.rrhh_estatus e where u.id=p.id_usuario and p.per_id_estatus = e.id and e.id = 1 and '+ id_usuario +'  <> 0' );
                return rawData;
            }catch(e){
                console.log(e);
                const respuesta = { metodo: "obtenerPermisosPendientesDRRH", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async obtenermispermisos(id_usuario : any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query(`SELECT p.id,DATE_FORMAT (t.fecha, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion as estado
                FROM sincyt.rrhh_transaccion_permiso t, sincyt.rrhh_permiso p , sincyt.rrhh_estatus e,
                sincyt.gtu_usuario u, sincyt.rrhh_tipo_permiso tp where t.id_permiso = p.id and t.id_estatus =
                e.id and u.id = p.id_usuario  and tp.id = t.id_permiso and p.id< 64 and p.id_usuario =`+id_usuario+`
                union
                select  p.id,DATE_FORMAT (p.per_fech_permiso, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion as estado
                from sincyt.rrhh_permiso p,sincyt.gtu_usuario u,sincyt.rrhh_estatus e
                where p.id_usuario = u.id and e.id=p.per_id_estatus and  p.id > 63 and p.id_usuario =`+id_usuario);
                return rawData;
            }catch(e){
                console.log(e);
                const respuesta = { metodo: "obtenermispermisos", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async obtenerUsuario(id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id from gtu_usuario where usuario='${id_usuario}';`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuario", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerDiaFestivoDG(id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query('select DATE_FORMAT(d.fecha, "%d-%m-%Y") as fecha, d.id , d.descripcion, e.descripcion as estado from sincyt.rrhh_dia_festivo d, sincyt.rrhh_estado e where e.id=d.estado and ' + id_usuario + ' <> 0');
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerDiaFestivoDG", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerinfoDiaFestivo(id_dia: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query('Select df.id, DATE_FORMAT(df.fecha, "%d-%m-%Y") as fecha , df.descripcion, e.descripcion as estatus from sincyt.rrhh_dia_festivo df, sincyt.rrhh_estado e where df.estado=e.id and df.id=' + id_dia);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerinfoDiaFestivo", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }



    public async obtenerUsuariosterceros(id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('SELECT u.id, u.nombre_completo FROM sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp where dp.id=u.id_departamento_puesto and dp.id_departamento = (SELECT dp.id_departamento from gtu_usuario u, sincyt.gtu_departamento_puesto dp where u.id_departamento_puesto=dp.id and u.id= '+ id_usuario +') ;');
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuariosterceros", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerUsuariodp(id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('SELECT dp.id_departamento from gtu_usuario u, sincyt.gtu_departamento_puesto dp where u.id_departamento_puesto=dp.id and u.id= '+ id_usuario);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuariodp", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenertipopermiso (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('SELECT tp.id, tp.descripcion, e.descripcion as estatus FROM sincyt.rrhh_tipo_permiso tp, sincyt.rrhh_estado e where e.id = tp.id_estado and 0 <> '+ id_usuario);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenertipopermiso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenertipopermisoparacombox (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('SELECT tp.id, tp.descripcion, e.descripcion as estatus FROM sincyt.rrhh_tipo_permiso tp, sincyt.rrhh_estado e where e.id = tp.id_estado and e.id=1 and 0 <> '+ id_usuario);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenertipopermiso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerPermisos3 (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('Select p.id ,DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion as estado from sincyt.rrhh_permiso p, sincyt.rrhh_estatus e , sincyt.gtu_usuario u where u.id=p.id_usuario and p.per_id_estatus = e.id and e.id = 1 and p.per_us_solicitante = '+ id_usuario);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerPermisos3", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }
    public async obtenerestadosdeactividad (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('SELECT id, descripcion FROM sincyt.rrhh_estado where id >0 and id<3 and '+ id_usuario+ ' <> 0');
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerestadosdeactividad", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerIDusuario (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                Select id from sincyt.gtu_usuario where usuario = '${id_usuario}';`);
                return rawData[0].id;
            } catch (e) {
                const respuesta = { metodo: "obtenerIDusuario", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerTipoPemiso () {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                Select id, descripcion from sincyt.rrhh_tipo_permiso;`);
                return rawData[0].id;
            } catch (e) {
                const respuesta = { metodo: "obtenerTipoPemiso", codigo: 0, mensaje: "Error en la consulta", id_documento: -1 };
                return respuesta;
            }
        });
    }


    public async obtenerDEPARTAMENTOusuario (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('Select dp.id_departamento from sincyt.gtu_departamento_puesto dp, sincyt.gtu_usuario u where u.id_departamento_puesto = dp.id and u.id ='+ id_usuario);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerDEPARTAMENTOusuario", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerIDTipopermiso (nombreprmiso: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`select id FROM sincyt.rrhh_tipo_permiso where descripcion = '`+ nombreprmiso +`';`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerIDTipopermiso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", nombreprmiso: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerIDDiaFestivo (id_dia: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`select id FROM sincyt.rrhh_dia_festivo where descripcion = '`+ id_dia +`';`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerIDDiaFestivo", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_dia: -1 };
                return respuesta;
            }
        });
    }

    public async obtener_informacion_de_permiso_especifico (id_permiso: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`Select u.nombre_completo, tp.descripcion as tipo_permiso, p.hora_inicial, p.hora_final, DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as inicio, DATE_FORMAT(p.per_fech_fpermiso, "%d-%m-%Y")  as fin, p.descripcion,
                if(p.per_emergencia = 1,'pedido lapso menor a 24 horas',if(p.per_emergencia = 0, 'pedido con lapso mayor a 24 horas', if(p.per_emergencia = null, 'sin datos', 'otro problema')))as emergencias
                from sincyt.rrhh_permiso p, sincyt.rrhh_tipo_permiso tp, sincyt.gtu_usuario u
                where p.per_id_estatus = tp.id and u.id = p.id_usuario and p.id >= 64 and p.id = ` + id_permiso +` union
                Select u.nombre_completo, tp.descripcion as tipo_permiso, p.hora_inicial, p.hora_final, DATE_FORMAT(t.fecha, "%d-%m-%Y")  as fin,  DATE_FORMAT(t1.fecha, "%d-%m-%Y") as inicio, p.descripcion,
                if(p.per_emergencia = 1,'pedido lapso menor a 24 horas',if(p.per_emergencia = 0, 'pedido con lapso mayor a 24 horas', if(p.per_emergencia = null, 'sin datos', 'otro problema'))) as emergencias
                from sincyt.rrhh_permiso p, sincyt.rrhh_transaccion_permiso t, sincyt.rrhh_transaccion_permiso t1 , sincyt.rrhh_tipo_permiso tp, sincyt.gtu_usuario u
                 where t.id_permiso =p.id  and t1.id_permiso =p.id and p.id = t.id_permiso and t.id_estatus= tp.id and u.id = p.id_usuario and p.id <= 63  and t.fecha =(
                Select Min(fecha) from sincyt.rrhh_transaccion_permiso where id_permiso = ` + id_permiso +`) and t1.fecha =(
                Select Max(fecha) from sincyt.rrhh_transaccion_permiso where id_permiso = ` + id_permiso +`) and t.id_permiso =` + id_permiso +` and t1.id_permiso =` + id_permiso +` and p.id = ` + id_permiso);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtener_informacion_de_permiso_especifico", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }
    public async obtenerifotipodepermiso (id_permiso: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`select tp.descripcion, e.descripcion as estatus from sincyt.rrhh_tipo_permiso tp, sincyt.rrhh_estado e
                where tp.id_estado=e.id and tp.id =`+ id_permiso +`;`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerifotipodepermiso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_permiso: -1 };
                return respuesta;
            }
        });
    }

    public async obteneridpermiso(id_permiso: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`Select id from sincyt.rrhh_tipo_permiso where descripcion='`+ id_permiso +`';`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obteneridpermiso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_permiso: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerusuariosDirectores (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`select u.nombre_completo as persona, p.nombre as puesto, p.notificar, p.id_estado, dp.id as id_dep_pues , d.nombre as departamento
                from sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp, sincyt.gtu_puesto p, sincyt.gtu_departamento d
                where u.id_departamento_puesto = dp.id and dp.id_puesto= p.id and dp.id_departamento = d.id and
                d.id = (select dp.id_departamento
                from sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp
                where u.id_departamento_puesto = dp.id and
                u.id = '`+ id_usuario +`') and p.nombre LIKE '%Director%';`);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerusuariosDirectores", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_usuario: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerusuariosSUBDIRECTORES (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`select u.nombre_completo as persona, p.nombre as puesto, p.notificar, p.id_estado, dp.id as id_dep_pues , d.nombre as departamento
                from sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp, sincyt.gtu_puesto p, sincyt.gtu_departamento d
                where u.id_departamento_puesto = dp.id and dp.id_puesto= p.id and dp.id_departamento = d.id and
                d.id = (select dp.id_departamento
                from sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp
                where u.id_departamento_puesto = dp.id and
                u.id = '`+ id_usuario +`') and p.nombre LIKE '%Subdirector%';`);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerusuariosSUBDIRECTORES", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_usuario: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerusuariosEncargados (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`select u.nombre_completo as persona, p.nombre as puesto, p.notificar, p.id_estado, dp.id as id_dep_pues , d.nombre as departamento
                from sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp, sincyt.gtu_puesto p, sincyt.gtu_departamento d
                where u.id_departamento_puesto = dp.id and dp.id_puesto= p.id and dp.id_departamento = d.id and
                d.id = (select dp.id_departamento
                from sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp
                where u.id_departamento_puesto = dp.id and
                u.id = '`+ id_usuario +`') and p.nombre LIKE '%Encargado de dirección%';`);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerusuariosEncargados", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_usuario: -1 };
                return respuesta;
            }
        });
    }

    public async ContarusuariosEncargados (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`SELECT u.id, u.nombre_completo
                FROM sincyt.gtu_puesto p, sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp
                where u.id_departamento_puesto=dp.id and dp.id_puesto=p.id
                and p.id ='`+ id_usuario +`'and u.id_estado = 1 ;`);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "ContarusuariosEncargados", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_usuario: -1 };
                return respuesta;
            }
        });
    }

    public async ContarusuariosDirector (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`select Count(p.nombre) as puesto
                from sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp, sincyt.gtu_puesto p, sincyt.gtu_departamento d
                where u.id_departamento_puesto = dp.id and dp.id_puesto= p.id and dp.id_departamento = d.id and
                d.id = (select dp.id_departamento
                from sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp
                where u.id_departamento_puesto = dp.id and
                u.id = '`+ id_usuario +`') and p.nombre LIKE '%Director%';`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerusuariosEncargados", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_usuario: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerdepartamento (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`SELECT d.id
                FROM sincyt.gtu_puesto p, sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp, sincyt.gtu_departamento d
                where u.id_departamento_puesto=dp.id and dp.id_puesto=p.id and dp.id_departamento = d.id
                and u.id = '`+ id_usuario +`';`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerdepartamento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_usuario: -1 };
                return respuesta;
            }
        });
    }

    public async Obtenerinfopuestojefe (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`SELECT * FROM sincyt.gtu_puesto WHERE ID =(SELECT PADRE
                    FROM sincyt.gtu_puesto
                    WHERE ID = '`+ id_usuario +`');`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "Obtenerinfopuestojefe", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_usuario: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerpuestodelusuario (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`SELECT p.id, p.padre, p.nombre, p.notificar, p.id_estado
                FROM sincyt.gtu_puesto p, sincyt.gtu_usuario u, sincyt.gtu_departamento_puesto dp
                WHERE u.id_departamento_puesto=dp.id and dp.id_puesto=p.id and u.id= `+ id_usuario +`;`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerpuestodelusuario", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_usuario: -1 };
                return respuesta;
            }
        });
    }

    public async consultaasueto (id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {

                const rawData = await connection.manager.query(`SELECT Count(df.id) as fecha
                FROM sincyt.rrhh_dia_festivo df
                where df.fecha = '`+ id_usuario +`'and df.estado = 1;`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "consultaasueto", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_usuario: -1 };
                return respuesta;
            }
        });
    }

    public async buscarporfechasobtenerPermisos3 (id_usuario: any,fecha1: any,fecha2: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`Select p.id ,DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion as estado
                from sincyt.rrhh_permiso p, sincyt.rrhh_estatus e , sincyt.gtu_usuario u
                where u.id=p.id_usuario and p.per_id_estatus = e.id
                and p.per_us_solicitante = '`+ id_usuario +`' and per_fech_permiso BETWEEN '`+ fecha1 +`' AND '`+ fecha2 +`';`);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "buscarporfechasobtenerPermisos3", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerestadosdeunpermiso () {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`SELECT * FROM sincyt.rrhh_estatus where id >0 and id<4;`);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerestadosdeunpermiso", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async buscarporestadoobtenerPermisos3 (id_usuario: any,id: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`Select p.id ,DATE_FORMAT(p.per_fech_permiso, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion as estado
                from sincyt.rrhh_permiso p, sincyt.rrhh_estatus e , sincyt.gtu_usuario u
                where u.id=p.id_usuario and p.per_id_estatus = e.id
                and p.per_us_solicitante = '`+ id_usuario +`' and e.id ='`+ id +`';`);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "buscarporestadoobtenerPermisos3", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenermispermisosporfecha(id_usuario: any,fecha1: any,fecha2: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query(`SELECT p.id,DATE_FORMAT (t.fecha, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion as estado
                FROM sincyt.rrhh_transaccion_permiso t, sincyt.rrhh_permiso p , sincyt.rrhh_estatus e,
                sincyt.gtu_usuario u, sincyt.rrhh_tipo_permiso tp where t.id_permiso = p.id and t.id_estatus =
                e.id and u.id = p.id_usuario  and tp.id = t.id_permiso and p.id< 64 and p.id_usuario ='`+id_usuario+`' and t.fecha BETWEEN '`+fecha1+`' AND '`+fecha2+`'
                union
                select  p.id,DATE_FORMAT (p.per_fech_permiso, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion  as estado
                from sincyt.rrhh_permiso p,sincyt.gtu_usuario u,sincyt.rrhh_estatus e
                where p.id_usuario = u.id and e.id=p.per_id_estatus and p.id > 63
                and p.id_usuario ='`+id_usuario+`' and per_fech_permiso BETWEEN '`+fecha1+`' AND '`+fecha2+`';`);
                return rawData;
            }catch(e){
                console.log(e);
                const respuesta = { metodo: "obtenermispermisos", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async obtenermispermisosporestado(id_usuario: any,id: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query(`SELECT p.id,DATE_FORMAT (t.fecha, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion as estado
                FROM sincyt.rrhh_transaccion_permiso t, sincyt.rrhh_permiso p , sincyt.rrhh_estatus e,
                sincyt.gtu_usuario u, sincyt.rrhh_tipo_permiso tp where t.id_permiso = p.id and t.id_estatus =
                e.id and u.id = p.id_usuario  and tp.id = t.id_permiso and p.id< 64 and p.id_usuario ='`+id_usuario+`' and e.id = '`+id+`'
                union
                select  p.id,DATE_FORMAT (p.per_fech_permiso, "%d-%m-%Y") as fecha, u.nombre_completo, p.descripcion, e.descripcion  as estado
                from sincyt.rrhh_permiso p,sincyt.gtu_usuario u,sincyt.rrhh_estatus e
                where p.id_usuario = u.id and e.id=p.per_id_estatus and p.id > 63
                and p.id_usuario ='`+id_usuario+`'  and per_fech_permiso and e.id = '`+id+`';`);
                return rawData;
            }catch(e){
                console.log(e);
                const respuesta = { metodo: "obtenermispermisos", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async obtenerusuariosnotificacionjefe () {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`SELECT nombre_completo, id FROM sincyt.gtu_usuario where id_departamento_puesto = 59 and id_estado = 1 union
                SELECT nombre_completo, id FROM sincyt.gtu_usuario where id_departamento_puesto = 79 and id_estado = 1 union
                SELECT nombre_completo, id FROM sincyt.gtu_usuario where id_departamento_puesto = 81 and id_estado = 1 union
                SELECT nombre_completo, id FROM sincyt.gtu_usuario where id_departamento_puesto = 82 and id_estado = 1 ;`);
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerusuariosnotificacionjefe", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }
    public async obtenerdirectorrecursoshumanos () {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`SELECT nombre_completo, id, correo_electronico FROM sincyt.gtu_usuario where id_departamento_puesto = 59 and id_estado = 1 ;`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerdirectorrecursoshumanos", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async obtenerinfoSecretarioGeneral() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`Select u.id, u.nombre_completo, u.correo_electronico, p.nombre
                from  sincyt.gtu_departamento_puesto dp, sincyt.gtu_puesto p, sincyt.gtu_usuario u
                where dp.id_puesto = p.id and dp.id= u.id_departamento_puesto and p.id =2;`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerinfoSecretarioGeneral", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async obtenerinfoasistentedespacho() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`Select u.id, u.nombre_completo, u.correo_electronico, p.nombre
                from  sincyt.gtu_departamento_puesto dp, sincyt.gtu_puesto p, sincyt.gtu_usuario u
                where dp.id_puesto = p.id and dp.id= u.id_departamento_puesto and p.id =40;`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerinfoSecretarioGeneral", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    public async obtenerinfoEncargadoDespacho() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`Select u.id, u.nombre_completo, u.correo_electronico, p.nombre
                from  sincyt.gtu_departamento_puesto dp, sincyt.gtu_puesto p, sincyt.gtu_usuario u
                where dp.id_puesto = p.id and dp.id= u.id_departamento_puesto and p.id =170;`);
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerinfoSecretarioGeneral", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }
}







