
import { raw } from 'body-parser';
import { connection } from 'mongoose';
import { ConnectionSINCYT } from '../../../../../models/ConnectionSINCYT';
const url_api = 'https://desarrolloapi.senacyt.gob.gt:8080';

export class evaluacionObtener{

    // funcion que obtiene todas las evaluaciones
    public async obtenerEvaluaciones(){

        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
               /*  const rawData = await connection.manager.query(`
                SELECT e.id_evaluacion id, e.id_tipo_evaluacion id, d.descripcion_evaluacion FROM rrhh_evaluacion e, rrhh_tipo_evaluacion d
                WHERE e.id_tipo_evaluacion = d.id_tipo_evaluacion and e.id_evaluacion =(SELECT max(id_evaluacion) FROM rrhh_evaluacion);`);
                const respuesta = { metodo: "obtenerNivelesEvaluaciones",id_evaluacion: rawData  }; */
                const rawData = await connection.manager.query(`
                SELECT e.id_evaluacion id, d.descripcion_evaluacion FROM rrhh_evaluacion e, rrhh_tipo_evaluacion d
                WHERE e.id_tipo_evaluacion = d.id_tipo_evaluacion and e.id_evaluacion =(SELECT max(id_evaluacion) FROM rrhh_evaluacion)
                `);
                const respuesta = { metodo: "obtenerNivelesEvaluaciones",id_evaluacion: rawData  };

                return rawData;
            }
            catch(e){
                const respuesta = { metodo: "obtenerEvaluaciones", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    // funcion que obtiene los tipos de las evaluaciones: Administrativa, Directiva, Operativa
    public async obtenerTiposEvaluaciones(){

        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query(`
                SELECT id_tipo_evaluacion id, descripcion_evaluacion FROM rrhh_tipo_evaluacion;`);
                const respuesta = { metodo: "obtenerEvaluacionesDesemepenio", codigo: 1, descripcion_evaluacion : rawData };
                return rawData;
            }
            catch(e){
                const respuesta = { metodo: "obtenerEvaluacionesDesempenio", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    // funcion que obtiene los niveles de las evaluacion: Administrativo, Directivo, Operativo
    public async obtenerNivelesEvaluaciones(){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query(`
                select id_nivel id, descripcion_nivel from rrhh_nivel where id_nivel`);
                const respuesta = { metodo: "obtenerNivelesEvaluaciones", codigo:1, descripcion_nivel : rawData};
                return rawData;
            }
            catch(e){
                const respuesta = { metodo: "obtenerNivelesEvaluaciones", mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }

    // funcion que obtiene los usuarios para registrar los evaluadores
    public async obtenerUsuarios() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id id, nombre_completo nombre from gtu_usuario
                WHERE id_estado = 1 and id_tipo_usuario = 1;
                `);

                const respuesta = { metodo: "obtenerEvaluadores", codigo:1, id: rawData}
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuarioEvaluador", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    // funcion que obtiene los usuarios para registrar a los evaluados
    public async obtenerEvaluados() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT id id, nombre_completo FROM gtu_usuario
                WHERE id_estado = 1 and id_tipo_usuario = 1; `);
                const respuesta = { metodo: "obtenerEvaluados", codigo:1, id:rawData}
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuarioEvaluador", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    // funcion que obtiene los evaluadores registrados de una evaluacion en especifico
    public async obtenerEvaluadoresRegistrados(){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try{
                 const rawData = await connection.manager.query(`
                    SELECT e.id_evaluador id, d.nombre_completo FROM rrhh_evaluador e
                    inner join gtu_usuario d
                    on e.id_usuario = d.id
                    inner join  rrhh_evaluacion f
                    on e.id_evaluacion = f.id_evaluacion and f.id_evaluacion = (SELECT max(id_evaluacion) FROM rrhh_evaluacion);
                 `);
                const respuesta = { metodo: "obtenerEvaluados", codigo:1, id:rawData}
                return rawData;
            }catch(e){
                const respuesta = { metodo: "obtenerUsuarioEvaluador", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerEvaluadoresRegistradosActualizar(id_evaluacion : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try{
                /* const rawData = await connection.manager.query(`
                SELECT e.id_evaluador id, d.nombre_completo FROM rrhh_evaluador e, gtu_usuario d
                WHERE e.id_usuario = d.id;
                 `); */
                 const rawData = await connection.manager.query(`
                 SELECT e.id_evaluador id, d.nombre_completo FROM rrhh_evaluador e
                 inner join gtu_usuario d
                 on e.id_usuario = d.id
                 inner join  rrhh_evaluacion f
                 on e.id_evaluacion = f.id_evaluacion and f.id_evaluacion = ${id_evaluacion}
                 `);
                const respuesta = { metodo: "obtenerEvaluados", codigo:1, id:rawData}
                return rawData;
            }catch(e){
                const respuesta = { metodo: "obtenerUsuarioEvaluador", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", id_documento: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerEvaluadosRegistrados(id_evaluacion : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try{
                const rawData = await connection.manager.query(`
                SELECT id_evaluado , nombre_completo
                FROM rrhh_persona a
                INNER JOIN gtu_usuario b on a.id_evaluado = b.id
                INNER JOIN rrhh_evaluacion c on c.id_evaluacion = a.id_evaluacion
                WHERE a.id_evaluacion ='${id_evaluacion}';
                 `);
                const respuesta = { metodo: "obtenerEvaluados", codigo:1, id:rawData}
                return rawData;
            }catch(e){
                const respuesta = { metodo: "obtenerUsuarioEvaluador", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados" };
                return respuesta;
            }
        });
    }
    public async obtenerInformacionEvaluacion(){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try{
                const rawData = await connection.manager.query(`
                SELECT e.id_evaluacion id,
                DATE_FORMAT (e.fecha_inicio , "%d-%m-%Y")  as fecha_inicio,
                DATE_FORMAT (e.fecha_fin, "%d-%m-%Y") as fecha_fin,
                d.descripcion_evaluacion as descripcion_evaluacion,
                c.descripcion_nivel as descripcion_nivel,
                e.des_estado_evaluacion as estado_evaluacion
                                FROM rrhh_evaluacion e
                                inner join rrhh_tipo_evaluacion d on e.id_tipo_evaluacion = d.id_tipo_evaluacion
                                inner join rrhh_nivel c on e.id_nivel = c.id_nivel
                                WHERE e.id_tipo_evaluacion = d.id_tipo_evaluacion and e.id_nivel=c.id_nivel;

                 `);
                const respuesta = { metodo: "obtenerEvaluados", codigo:1, id:rawData}
                return rawData;
            }catch(e){
                const respuesta = { metodo: "obtenerInformacionE", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados"};
                return respuesta;
            }
        });
    }

    public async obtenerInformacionEvaluados(usuario : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try {
                const rawData = await connection.manager.query(`
                select e.id_persona as id_persona,
                                f.nombre_completo as evaluado,
                                DATE_FORMAT (en.fecha_inicio,"%d-%m-%Y") as fecha_inicio,
                                DATE_FORMAT(en.fecha_fin, "%d-%m-%Y") as fecha_fin,
                                te.descripcion_evaluacion as descripcion_evaluacion,
                                n.descripcion_nivel as descripcion_nivel,
                                e.des_estado_persona as estado_persona

                from rrhh_persona e
                inner join gtu_usuario f on e.id_evaluado = f.id
                inner join rrhh_evaluador j on  e.id_evaluador = j.id_evaluador
                inner join gtu_usuario m on j.id_usuario = m.id
                inner join rrhh_evaluacion en on en.id_evaluacion = j.id_evaluacion
                inner join rrhh_nivel n on n.id_nivel = en.id_nivel
                inner join rrhh_tipo_evaluacion te on te.id_tipo_evaluacion = en.id_tipo_evaluacion
                where j.id_usuario = m.id and m.usuario = '${usuario}' and e.estado_persona!=3;
        `);
                const respuesta = { metodo: "obtenerInformacionEvaluados", codigo:1, id:rawData}
                return rawData;
            } catch (e) {
                const respuesta = { metodo : "obtenerInformacionEvaluados", codigo: 0, mensaje : "Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }

    public async obtenerInformacionEvaluadosDirectivo(usuario : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try {
                const rawData = await connection.manager.query(`
                select e.id_persona id,
                f.nombre_completo as evaluado,
                DATE_FORMAT(en.fecha_inicio,"%d-%m-%Y") as fecha_inicio,
                DATE_FORMAT(en.fecha_fin,"%d-%m-%Y" ) as fecha_fin,
                te.descripcion_evaluacion as descripcion_evaluacion,
                n.descripcion_nivel as descripcion_nivel
                from rrhh_persona e
                inner join gtu_usuario f on e.id_evaluado = f.id
                inner join rrhh_evaluador j on  e.id_evaluador = j.id_evaluador
                inner join gtu_usuario m on j.id_usuario = m.id
                inner join rrhh_evaluacion en on en.id_evaluacion = j.id_evaluacion
                inner join rrhh_nivel n on n.id_nivel = en.id_nivel
                inner join rrhh_tipo_evaluacion te on te.id_tipo_evaluacion = en.id_tipo_evaluacion
                where en.id_nivel = 1 and  j.id_usuario = m.id and m.usuario = '${usuario}';
                `);
                const respuesta = { metodo: "obtenerInformacionEvaluados", codigo:1, id:rawData}
                return rawData;
            } catch (e) {
                const respuesta = { metodo : "obtenerInformacionEvaluados", codigo: 0, mensaje : "Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }
    public async obtenerTipoNivel(usuario : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try{
                const rawData = await connection.manager.query(`
                select e.id_persona id,
                n.descripcion_nivel as descripcion_nivel
                from rrhh_persona e
                inner join gtu_usuario f on e.id_evaluado = f.id
                inner join rrhh_evaluador j on  e.id_evaluador = j.id_evaluador
                inner join gtu_usuario m on j.id_usuario = m.id
                inner join rrhh_evaluacion en on en.id_evaluacion = j.id_evaluacion
                inner join rrhh_nivel n on n.id_nivel = en.id_nivel
                inner join rrhh_tipo_evaluacion te on te.id_tipo_evaluacion = en.id_tipo_evaluacion
                where m.usuario = '${usuario}'

                `);
                const respuesta = { metodo: "obtenerTipoNivel", codigo: 1, id: rawData}
                return rawData;
            }catch(e){
                const respuesta = { metodo : "obtenerTipoNivel", codigo: 0 , mensaje: "Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }

    public async obtenerInformacionEvaluadosOperativo(usuario : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try {
                const rawData = await connection.manager.query(`
                select e.id_persona id,
                f.nombre_completo as evaluado,
                DATE_FORMAT(en.fecha_inicio ,"%d-%m-%Y") as fecha_inicio,
                DATE_FORMAT(en.fecha_fin, "%d-%m-%Y") as fecha_fin,
                te.descripcion_evaluacion as descripcion_evaluacion,
                n.descripcion_nivel as descripcion_nivel
                from rrhh_persona e
                inner join gtu_usuario f on e.id_evaluado = f.id
                inner join rrhh_evaluador j on  e.id_evaluador = j.id_evaluador
                inner join gtu_usuario m on j.id_usuario = m.id
                inner join rrhh_evaluacion en on en.id_evaluacion = j.id_evaluacion
                inner join rrhh_nivel n on n.id_nivel = en.id_nivel
                inner join rrhh_tipo_evaluacion te on te.id_tipo_evaluacion = en.id_tipo_evaluacion
                where en.id_nivel = 3 and  j.id_usuario = m.id and m.usuario = '${usuario}';
               `);
                const respuesta = { metodo: "obtenerInformacionEvaluados", codigo:1, id:rawData}
                return rawData;
            } catch (e) {
                const respuesta = { metodo : "obtenerInformacionEvaluados", codigo: 0, mensaje : "Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }

    public async obtenerInformacionEvaluadosAdministrativo(usuario : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try {
                const rawData = await connection.manager.query(`
                select e.id_persona id,
                f.nombre_completo as evaluado,
                DATE_FORMAT (en.fecha_inicio, "%d-%m-%Y" ) as fecha_inicio,
                DATE_FORMAT (en.fecha_fin,"%d-%m-%Y") as fecha_fin,
                te.descripcion_evaluacion as descripcion_evaluacion,
                n.descripcion_nivel as descripcion_nivel
                from rrhh_persona e
                inner join gtu_usuario f on e.id_evaluado = f.id
                inner join rrhh_evaluador j on  e.id_evaluador = j.id_evaluador
                inner join gtu_usuario m on j.id_usuario = m.id
                inner join rrhh_evaluacion en on en.id_evaluacion = j.id_evaluacion
                inner join rrhh_nivel n on n.id_nivel = en.id_nivel
                inner join rrhh_tipo_evaluacion te on te.id_tipo_evaluacion = en.id_tipo_evaluacion
                where en.id_nivel = 2 and  j.id_usuario = m.id and m.usuario = '${usuario}';
                `);
                const respuesta = { metodo: "obtenerInformacionEvaluados", codigo:1, id:rawData}
                return rawData;
            } catch (e) {
                const respuesta = { metodo : "obtenerInformacionEvaluados", codigo: 0, mensaje : "Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }

    public async obtenerInfoEncabezadoEvaluacion(id_persona : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try {
                const rawData = await connection.manager.query(`
                select e.id_persona,
				f.nombre_completo as nombre_evaluado,
				c.nombre as puesto_evaluado,
                a.nombre as direccion_evaluado,
				m.nombre_completo as nombre_evaluador

                from rrhh_persona e
                inner join gtu_usuario f on e.id_evaluado = f.id
                inner join rrhh_evaluador j on  e.id_evaluador = j.id_evaluador
                inner join gtu_usuario m on j.id_usuario = m.id
                inner join gtu_departamento_puesto g on m.id_departamento_puesto = g.id
                inner join gtu_departamento_puesto k on f.id_departamento_puesto = k.id
                inner join gtu_departamento a on k.id_departamento = a.id
                inner join gtu_departamento b on g.id_departamento = b.id
                inner join gtu_puesto c on k.id_puesto = c.id
                inner join gtu_puesto  d on g.id_puesto = d.id
                where e.id_persona= ${id_persona}
                `);
                const respuesta = { metodo : "obtenerInformacionEncabezadoEvaluacion", codigo: 1 , id:rawData}
                return rawData[0];
            }catch(e){
                const respuesta = { metodo : "obtenerInformacionEncabezadoEvaluacion", codigo: 0, mensaje:"Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }

    public async mostrarDatosEvaluacionEnviada(usuario : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try{
                const rawData = await connection.manager.query(`
                SELECT e.id_evaluacion as id,
                b.nombre_completo as nombre_e,
                d.nombre_completo as nombre_ev,
                DATE_FORMAT(e.fecha_inicio,"%d-%m-%Y") as fecha_ini,
                DATE_FORMAT(e.fecha_fin,"%d-%m-%Y") as fecha_fin,
                j.descripcion_evaluacion as descripcion_ev

                from rrhh_persona a
                inner join gtu_usuario b on a.id_evaluado = b.id
                inner join rrhh_evaluador c on a.id_evaluador = c.id_evaluador
                inner join gtu_usuario d on c.id_usuario = d.id
                inner join rrhh_evaluacion e on c.id_evaluacion = e.id_evaluacion
                inner join rrhh_tipo_evaluacion j on e.id_tipo_evaluacion = j.id_tipo_evaluacion
                where a.id_evaluado = b.id and b.usuario = '${usuario}'
                `);
                const respuesta = { metodo : "mostrarDatosEvaluacionEnviada", codigo : 1, id:rawData}
                return rawData;
            }catch(e){
                const respuesta = { metodo : " mostrarDatosEvaluacionEnviada", codigo: 0, mensaje : "Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }

    public async muestraPreguntasDirectiva(){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try{
                const rawData = await connection.manager.query(
                `SELECT id_pregunta id, descripcion FROM rrhh_pregunta
                 WHERE id_nivel = 1 ;
                `);
                const respuesta = { metodo : "mostrarPreguntasDirectiva", codigo: 1, id:rawData}
                return rawData;
            }
            catch(e){
                const respuesta = {metodo: "muestraPreguntasDirectiva", codigo: 0, mensaje:"Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }

    public async muestraPreguntasAdministrativa(id_pregunta : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try{
                const rawData = await connection.manager.query(`
                 SELECT id_pregunta id, descripcion as factor FROM rrhh_pregunta
                WHERE id_nivel = 2 and id_pregunta ='${id_pregunta}';

                `);
                const respuesta = {metodo : "mostrarPreguntasAdministrativa", codigo: 1, id:rawData}
                return rawData;
            }
            catch(e){
                const respuesta = { metodo :"mostrarPreguntasAdministrativa", codigo: 0, mensaje :"Error en la consulta, ingrese los parametros ingresados"}
                return respuesta;
            }
        })
    }

    public async muestraPreguntasOperativa(){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try{
                const rawData = await connection.manager.query(`
                SELECT id_pregunta id, descripcion FROM rrhh_pregunta
                WHERE id_nivel = 3;
                `);
                const respuesta = { metodo : "mostrarPreguntasOperativa", codigo: 1, id: rawData}
                return rawData;
            }catch(e){
                const respuesta = {metodo : "mostrarPreguntasOperativa", codigo:0 , mensaje: "Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }

    public async obtenerID_Evaluacion(){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try{
                const rawData = await connection.manager.query(`
                SELECT e.id_evaluacion id, c.descripcion_nivel as descripcion_nivel FROM rrhh_evaluacion e, rrhh_tipo_evaluacion d, rrhh_nivel c
                WHERE e.id_tipo_evaluacion = d.id_tipo_evaluacion and e.id_nivel = c.id_nivel and e.id_evaluacion =(SELECT max(id_evaluacion) FROM rrhh_evaluacion)

                `);
                const respuesta = { metodo : "obtenerID_evaluacion", codigo: 1, id: rawData}
                return rawData[0];
            }catch(e){
                const respuesta = {metodo : "obtenerID_evaluacion", codigo:0 , mensaje: "Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }
    // Api que devuelve el ID de la evaluacion Seleccionada, utilizada en la seleccion de la evaluacion
    public async obtenerID_SeleccionEvaluacion(id_persona : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try{
                const rawData = await connection.manager.query(`
                SELECT c.id_persona as id,
                a.id_nivel as id_nivel ,
                a.descripcion_nivel as descripcion_nivel,
                c.estado_persona as estado_persona
                FROM rrhh_nivel a
                            INNER JOIN rrhh_evaluacion b on b.id_nivel = a.id_nivel
                            INNER JOIN rrhh_persona c on c.id_evaluacion = b.id_evaluacion
                            WHERE c.id_persona = ${id_persona};


                `);
                const respuesta = { metodo: "obtenerID_SeleccionEvaluacion", codigo:1, id: rawData}
                return rawData[0];
            }catch(e){
                const respuesta = {metodo :"obtenerID_SeleccionEvaluacion", codigo:0, mensaje : "Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }

        // Api que devuelve el ID de la evaluacion Seleccionada, utilizada en la seleccion de la evaluacion
        public async obtenerID_GuardarEvaluacion(id_persona : any){
            return new ConnectionSINCYT().retornarConexion().then(async connection=>{
                try{
                    const rawData = await connection.manager.query(`
                    SELECT a.id_evaluacion as id_evaluacion FROM rrhh_persona a
                    INNER JOIN rrhh_evaluacion b on a.id_evaluacion = b.id_evaluacion
                    WHERE a.id_persona = ${id_persona};

                    `);
                    const respuesta = { metodo: "obtenerID_SeleccionEvaluacion", codigo:1, id: rawData}
                    return rawData[0];
                }catch(e){
                    const respuesta = {metodo :"obtenerID_SeleccionEvaluacion", codigo:0, mensaje : "Error en la consulta, revise los parametros ingresados"}
                    return respuesta;
                }
            })
        }

    // Api que muestra la informacion de las personas a las que se le realiza la entrevista de retroalimentacion
    public async obtenerInformacionEntrevista(usuario : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try {
                const rawData = await connection.manager.query(`
                select e.id_persona,
                f.nombre_completo evaluado,
                DATE_FORMAT (en.fecha_inicio,"%d-%m-%Y") as fecha_inicio,
                DATE_FORMAT(en.fecha_fin, "%d-%m-%Y") fecha_fin,
                te.descripcion_evaluacion descripcion_evaluacion,
                n.descripcion_nivel descripcion_nivel

                from rrhh_persona e
                inner join gtu_usuario f on e.id_evaluado = f.id
                inner join rrhh_evaluador j on  e.id_evaluador = j.id_evaluador
                inner join gtu_usuario m on j.id_usuario = m.id
                inner join rrhh_evaluacion en on en.id_evaluacion = j.id_evaluacion
                inner join rrhh_nivel n on n.id_nivel = en.id_nivel
                inner join rrhh_tipo_evaluacion te on te.id_tipo_evaluacion = en.id_tipo_evaluacion
                where j.id_usuario = m.id and m.usuario = '${usuario}' and e.estado_persona=3;
                `);
                const respuesta = { metodo: "obtenerInformacionEntrevista", codigo :1, id: rawData}
                return rawData;
            } catch (e) {
                const respuesta = {metodo : "obtenerInformacionEntrevista", codigo:0, mensaje: "Error en la consulta, revise los parametros ingresados"}
                return respuesta;
            }
        })
    }


    public async obtenerComentarioEvaluador(nombre : any , id_persona : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try{
                const rawData = await connection.manager.query(`
                SELECT a.id_persona  id ,
                a.res_evaluador as res_evaluador from rrhh_persona a
                INNER JOIN rrhh_evaluador b on a.id_evaluador = b.id_evaluador
                INNER JOIN gtu_usuario  c on b.id_usuario = c.id
                WHERE c.usuario = '${nombre}' and a.id_persona = ${id_persona};

                `);
                const respuesta = {metodo : "obtenerComentarioEvaluador", codigo: 1 , id: rawData}
                return rawData[0];
            }catch(e){
                const respuesta = { metodo : "obtenerComentarioEvaluado", codigo: 0, mensaje : "Error en la consulta, revise los parametros ingresado "}
                return respuesta;
            }
        })
    }

    public async obtenerComentarioEvaluado(nombre : any , id_persona : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try {
                const rawData = await connection.manager.query(`
                SELECT a.id_persona  id ,
                a.res_evaluado as res_evaluado from rrhh_persona a
                INNER JOIN rrhh_evaluador b on a.id_evaluador = b.id_evaluador
                INNER JOIN gtu_usuario  c on b.id_usuario = c.id
                WHERE c.usuario = '${nombre}' and a.id_persona = ${id_persona};

                `);
                const respuesta = { metodo : "obtenerComentarioEvaluado", codigo: 1, id : rawData}
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo :"obtenerComentarioEvaluado", codigo:0, mensaje : "Error en la consulta, revise los parametros ingresados" }
                return respuesta;
            }
        })
    }

    public async obtenerInformacionRegistrada(id_persona : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try {
                const rawData = await connection.manager.query(`
                select  a.id_respuesta as id_respuesta,
                a.opcion as opcion,
               a.punteo as punteo,
               b.id_pregunta as id_factor,
               b.variable as variable,
               b.descripcion as factor
               from rrhh_respuesta a
               inner join rrhh_pregunta b on a.id_pregunta = b.id_pregunta
               inner join rrhh_persona c on a.id_persona = c.id_persona
               where a.id_persona = ${id_persona}
               order by b.id_pregunta;


                `);
                const respuesta = { metodo : "obtenerComentarioEvaluado", codigo: 1, id : rawData}
                return rawData;
            } catch (e) {
                const respuesta = { metodo :"obtenerComentarioEvaluado", codigo:0, mensaje : "Error en la consulta, revise los parametros ingresados" }
                return respuesta;
            }
        })
    }

    public async obtieneCambios(id_persona : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection =>{
            try {
                const rawData = await connection.manager.query(`
                select  a.id_respuesta as id_respuesta,
                a.opcion as opcion,
               a.punteo as punteo,
               b.id_pregunta as id_factor,
               b.variable as variable,
               b.descripcion as factor
               from rrhh_respuesta a
               inner join rrhh_pregunta b on a.id_pregunta = b.id_pregunta
               inner join rrhh_persona c on a.id_persona = c.id_persona
               where a.id_persona = ${id_persona};


                `);
                const respuesta = { metodo : "obtenerComentarioEvaluado", codigo: 1, id : rawData}
                return rawData;
            } catch (e) {
                const respuesta = { metodo :"obtenerComentarioEvaluado", codigo:0, mensaje : "Error en la consulta, revise los parametros ingresados" }
                return respuesta;
            }
        })
    }

    public async obtieneIDEvaluador(id_evaluador : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection=>{
            try {
                const rawData = await connection.manager.query(`
                select a.id_evaluador as id ,
                b.nombre_completo as nombre_completo
                from rrhh_evaluador a
                inner join gtu_usuario b on  a.id_usuario = b.id
                where b.nombre_completo = '${id_evaluador}';
                `);
                const respuesta = { metodo : "obtenerIDEvaluador", codigo: 1, id : rawData}
                return  rawData;
            } catch (e) {
                const respuesta = { metodo : "registrarAspecto", codigo: 0, mensaje : "error en la consulta, revise los parametros ingresado"};
                return respuesta;
            }
        })
    }
}