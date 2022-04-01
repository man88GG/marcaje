import * as express from 'express';
import { Request, Response } from "express";
import { resolve } from 'path';
import request from 'request';
import { runInThisContext } from 'vm';
import { evaluacionActualizar } from './clases/cevaluaciones/evaluacionActualizar';
import { evaluacionEliminar } from './clases/cevaluaciones/evaluacionEliminar';
import { evaluacionObtener } from './clases/cevaluaciones/evaluacionObtener';
import { evaluacionRegistrar } from './clases/cevaluaciones/evaluacionRegistrar';
import { claseconsultarp } from "./clases/cpermisos/claseconsultarp";
import { claseinsertarp } from "./clases/cpermisos/claseInsert";
import { claseactualizar } from "./clases/cpermisos/claseUpdate";
import { clasedelete } from "./clases/cpermisos/clasedelete";
import { marcajeRegistrar } from './clases/cmarcaje/marcajeRegistrar';
import { marcajeObtener } from './clases/cmarcaje/marcajeObtener';
import { marcajeActualizar } from './clases/cmarcaje/marcajeActualizar';

export class rrh{

    public path = '';
    public router: express.Router = express.Router();
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(){

        // ---------------Metodos Get--------------------------------------------

        this.router.get(this.path + '/obtener/idusuario/:id_usuario', this.obtenerIDusuario);
        this.router.get(this.path + '/obtener/permisospendietes/:id_usuario', this.obtenerPermisosPendientes);
        this.router.get(this.path + '/obtener/permisospendietes/todos/:id_usuario', this.obtenerPermisosPendientesDRRH);
        this.router.get(this.path + '/obtener/DiasFestivosDG/:id_usuario', this.obtenerDiaFestivoDG);
        this.router.get(this.path + '/obtener/UsuarioDepartamento/:id_usuario', this.obtenerUsuariodp);
        this.router.get(this.path + '/obtener/mispermisos/:id_usuario', this.obtenermispermisos);
        this.router.get(this.path + '/obtener/UsuariodTerceros/:id_usuario', this.obtenerUsuariosterceros);
        this.router.get(this.path + '/obtener/TipoPermiso/:id_usuario', this.obtenertipopermiso);
        this.router.get(this.path + '/obtener/Permisos3/:id_usuario', this.obtenerPermisos3);
        this.router.get(this.path + '/obtener/evaluaciones', this.obtenerEvaluaciones);
        this.router.get(this.path + '/obtener/nivelesEvaluaciones', this.obtenerNivelesEvaluaciones);
        this.router.get(this.path + '/obtener/tiposEvaluaciones', this.obtenerTiposEvaluaciones);
        this.router.get(this.path + '/obtener/usuarios', this.obtenerUsuarios);
        this.router.get(this.path + '/obtener/evaluados' , this.obtenerEvaluados);
        this.router.get(this.path + '/obtener/evaluadoresRegistrados', this.obtenerEvaluadoresRegistrados);
        this.router.get(this.path + '/obtener/evaluadoresRegistradosActualizar/:id_evaluacion', this.obtenerEvaluadoresRegistrados);
        this.router.get(this.path + '/obtener/evaluadosRegistrados/:id_evaluacion', this.obtenerEvaluadosRegistrados);
        this.router.get(this.path + '/obtener/informacionEvaluacion', this.obtenerInformacionEvaluacion);
        this.router.get(this.path + '/obtener/obtenerInformacionEvaluados/:usuario', this.obtenerInformacionEvaluados);
        this.router.get(this.path + '/obtener/obtenerInformacionEvaluadosOperativo/:usuario', this.obtenerInformacionEvaluadosOperativo);
        this.router.get(this.path + '/obtener/obtenerInformacionEvaluadosDirectivo/:usuario', this.obtenerInformacionEvaluadosDirectivo);
        this.router.get(this.path + '/obtener/obtenerInformacionEvaluadosAdministrativo/:usuario', this.obtenerInformacionEvaluadosAdministrativo);
        this.router.get(this.path + '/obtener/obtenerInfoEncabezadoEvaluacion/:id_persona', this.obtenerInfoEncabezadoEvaluacion);
        this.router.get(this.path + '/obtener/mostrarDatosEvaluacionEnviada/:usuario', this.mostrarDatosEvaluacionEnviada);
        this.router.get(this.path + '/obtener/obtenerTipoNivel/:usuario' , this.obtenerTipoNivel);
        this.router.get(this.path + '/obtener/muestraPreguntasDirectiva', this.muestraPreguntasDirectiva);
        this.router.get(this.path + '/obtener/muestraPreguntasAdministrativa/:id_pregunta', this.muestraPreguntasAdministrativa);
        this.router.get(this.path + '/obtener/muestraPreguntasOperativa', this.muestraPreguntasOperativa);
        this.router.get(this.path + '/obtener/obtenerID_Evaluacion' , this.obtenerID_Evaluacion);
        this.router.get(this.path + '/obtener/obtenerID_SeleccionEvaluacion/:id_persona', this.obtenerID_SeleccionEvaluacion);
        this.router.get(this.path + '/obtenerID_GuardarEvaluacion/:id_persona', this.obtenerID_GuardarEvaluacion);
        this.router.get(this.path + '/obtener/obtenerInformacionEntrevista/:usuario', this.obtenerInformacionEntrevista);
        this.router.get(this.path + '/obtenerComentarioEvaluador/:nombre/:id_persona', this.obtenerComentarioEvaluador);
        this.router.get(this.path + '/obtenerComentarioEvaluado/:nombre/:id_persona', this.obtenerComentarioEvaluado);
        this.router.get(this.path + '/obtenerInformacionRegistrada/:id_persona', this.obtenerInformacionRegistrada);
        this.router.get(this.path + '/obtener/obtieneIDEvaluador/:id_evaluador', this.obtieneIDEvaluador);
        this.router.get(this.path + '/obtener/Informaciondepermiso/:id_permiso', this.obtener_informacion_de_permiso_especifico);
        this.router.get(this.path + '/obtener/DepartamentoUSUARIO/:id_usuario', this.obtenerDEPARTAMENTOusuario);
        this.router.get(this.path + '/obtener/estadosdeactividad/:id_usuario', this.obtenerestadosdeactividad);
        this.router.get(this.path + '/obtener/IDtipopermio/:nombreprmiso', this.obtenerIDTipopermiso);
        this.router.get(this.path + '/obtener/DiasFestivosID/:id_dia', this.obtenerIDDiaFestivo);
        this.router.get(this.path + '/obtener/infoDiaFestivo/:id_dia', this.obtenerinfoDiaFestivo);
        this.router.get(this.path + '/obtener/obtenerinfoTipoPermiso/:id_permiso', this.obtenerifotipodepermiso);
        this.router.get(this.path + '/obtener/idTpermiso/:id_permiso', this.obteneridpermiso);
        this.router.get(this.path + '/obtener/usuariosDirector/:id_usuario', this.obtenerusuariosDirectores);
        this.router.get(this.path + '/obtener/usuariosSubDirector/:id_usuario', this.obtenerusuariosSUBDIRECTORES);
        this.router.get(this.path + '/obtener/usuariosEncargadosDirector/:id_usuario', this.obtenerusuariosEncargados);
        this.router.get(this.path + '/obtener/ContarusuariosDirector/:id_usuario', this.ContarusuariosDirector);
        this.router.get(this.path + '/obtener/obtenerdepartamentodeusuario/:id_usuario', this.obtenerdepartamento);
        this.router.get(this.path + '/obtener/usuarioporpuesto/:id_usuario', this.ContarusuariosEncargados);
        this.router.get(this.path + '/obtener/InfoPuetoJefe/:id_usuario', this.Obtenerinfopuestojefe);
        this.router.get(this.path + '/obtener/infopuestodelusuario/:id_usuario', this.obtenerpuestodelusuario);
        this.router.get(this.path + '/obtener/consultaasueto/:id_usuario', this.consultaasueto);
        this.router.get(this.path + '/obtener/consultarpermisos3porfecha/:id_usuario/:fecha1/:fecha2', this.buscarporfechasobtenerPermisos3);
        this.router.get(this.path + '/obtener/consultarpermisos3porestados/:id_usuario/:id', this.buscarporestadoobtenerPermisos3);
        this.router.get(this.path + '/obtener/consultarestadosdepermisos', this.obtenerestadosdeunpermiso);
        this.router.get(this.path + '/obtener/mispermisosporfecha/:id_usuario/:fecha1/:fecha2', this.obtenermispermisosporfecha);
        this.router.get(this.path + '/obtener/consultarpermisosporestados/:id_usuario/:id', this.obtenermispermisosporestado);
        this.router.get(this.path + '/obtener/obtenerusuariosdenotificacionparapermisosjefes', this.obtenerusuariosnotificacionjefe);
        this.router.get(this.path + '/obtener/obtenerdirectorrecursoshumanos', this.obtenerdirectorrecursoshumanos);
        this.router.get(this.path + '/obtener/TipoPermisoparacombox/:id_usuario', this.obtenertipopermisoparacombox);
        this.router.get(this.path + '/obtener/infosecre', this.obtenerinfoSecretarioGeneral);
        this.router.get(this.path + '/obtener/infoAsistenteD', this.obtenerinfoasistentedespacho);
        this.router.get(this.path + '/obtener/infoEncargadoD', this.obtenerinfoEncargadoDespacho);

        // ---------------Metodos set/post--------------------------------------------
        this.router.post(this.path + '/insertar/nuevopermiso/:hora_inicial/:hora_final/:descripcion/:id_usuario/:id_departamento/:id_usuario_jefe/:id_departamento_jefe/:id_tipo_permiso/:per_fech_solicitud/:per_id_estatus/:per_fech_permiso/:per_us_solicitante/:per_emergencia/:per_fech_fpermiso', this.insertarnuevoper);
        this.router.post(this.path + '/insertar/nuevoTipodepermiso/:descripcion', this.insertarTipodePermiso);
        this.router.post(this.path + '/insertar/nuevoDiafestivo/:fecha/:descripcion', this.insertarNuevoDiaFestivo);
        this.router.post(this.path + '/insertar/enbitacora/:accion/:descripcion/:tabla/:usuario', this.insertarenbitacora);
        // --------------Metodos Put-----------------------------------------------------
        this.router.put(this.path + '/actualizar/Diafestivo/:fecha/:estado/:id', this.actualizarDiaFestivo);
        this.router.put(this.path + '/actualizar/actualizarEvaluacionDesempenio/:id_evaluacion/:fecha_inicio/:fecha_fin/:id_nivel/:id_tipo_evaluacion', this.actualizarEvaluacionDesempenio);
        this.router.put(this.path + '/actualizar/permiso/:observaciones/:id_permiso/:estatus', this.actualizarDiaFestactualizarnuevospermisosivo);
        this.router.put(this.path + '/actualizar/permisoantiguo/:observaciones/:id_permiso/:estatus', this.actualizarpermisosantiguos);
        this.router.put(this.path + '/registrarComentarioEvaluador/:id_persona/:comentarioEvaluador', this.registrarComentarioEvaluador);
        this.router.put(this.path + '/enviarEvaluacion/:id_persona', this.enviarEvaluacion);
        this.router.put(this.path + '/registrarAccion/:id_compromiso/:contenido' , this.registrarAccion);

        // ---------------Metodos POST----------------------------------------------
        this.router.post(this.path + '/registrar/evaluacionesDesempenio/:fecha_inicio/:fecha_fin/:id_nivel/:id_tipo_evaluacion', this.registrarEvaluacionDesempenio);
        this.router.post(this.path + '/registrar/bitacoraDesempenio/:id_bitacora/:nombre_evaluador/:nombre_evaluado/:tipo_evaluacion/:estatus_evaluacion/:fecha', this.registrarBitacora)
        this.router.post(this.path + '/registrar/evaluadores/:id_usuario/:id_evaluacion', this.registrarEvaluadores);
        this.router.post(this.path + '/insertar/nuevopermiso/:hora_inicial/:hora_final/:descripcion/:id_usuario/:id_departamento/:id_usuario_jefe/:id_departamento_jefe/:id_tipo_permiso/:per_fech_solicitud/:per_id_estatus/:per_fech_permiso/:per_us_solicitante/:per_emergencia/:per_fech_fpermiso', this.insertarnuevoper);
        this.router.post(this.path + '/insertar/nuevoTipodepermiso/:descripcion', this.insertarTipodePermiso);
        this.router.post(this.path + '/insertar/nuevoDiafestivo/:fecha/:descripcion', this.insertarNuevoDiaFestivo);
        this.router.post(this.path + '/registrar/evaluados/:id_evaluado/:id_evaluador/:id_evaluacion', this.registrarEvaluados);
        this.router.post(this.path + '/registrar/registrarComentarioEvaluado/:id_persona/:comentarioEvaluado', this.registrarComentarioEvaluado);
        this.router.post(this.path + '/registrarEvaluacionRespuesta/:punteo/:id_persona/:id_pregunta/:id_evaluacion/:opcion', this.registrarEvaluacionRespuesta);
        this.router.post(this.path + '/registrarAspecto/:id_persona/:contenido', this.registrarAspecto);

        // ---------------Metodos PUT------------------------------------------------

        // ----------------Metodos DELETE --------------------------------------------
        this.router.delete(this.path + '/eliminar/eliminarEvaluador/:id_evaluador', this.eliminarEvaluador);
        this.router.delete(this.path + '/eliminar/eliminarEvaluado/:id_persona', this.eliminarEvaluado);
        // ----------------Metodos DELETE --------------------------------------------
        this.router.delete(this.path + '/eliminar/eliminarpermiso/:id_permiso', this.eliminarpermiso);


         // ---------------Metodos GET------------------------------------------------
         this.router.get(this.path + '/buscar/obtenerEmpleado/:id_empleado', this.obtenerEmpleado);
         this.router.get(this.path + '/buscar/obtenerFechaMarcaje/:id_empleado/:fecha_marcaje', this.obtenerFechaMarcaje);
         this.router.get(this.path + '/buscar/obtenerFechaExistente/:id_empleado/:fecha_marcaje', this.obtenerFechaExistente);
         // ---------------Metodos PUT------------------------------------------------
         this.router.put(this.path + '/actualizar/actualizarHraSalidaMarcaje/:id_empleado/:hora_marcaje/:fecha_marcaje', this.actualizarHraSalidaMarcaje);
         //this.router.put(this.path + '/actualizar/actualizarTiempoLaboradoDiario/:tiempo_laborado/:hora_marcaje', this.actualizarTiempoLaboradoDiario);
         
         // ---------------Metodos POST------------------------------------------------
         this.router.post(this.path + '/registrar/registrarMarcaje/:fecha_marcaje/:hra_entrada/:id_empleado', this.registrarMarcaje);
         this.router.post(this.path + '/registrar/registrarBitacoraMarcaje/:fecha_bitacora_marcaje/:hora_marcaje_bitacora/:id_empleado', this.registrarBitacoraMarcaje); 

        }

       /*APIS DE MARCAJE */
       /*POST*/
       public async registrarMarcaje(req: Request, res: Response){
        const obj = new marcajeRegistrar();
         res.status(200).send(await obj.registrarMarcaje( req.params.fecha_marcaje,
        req.params.hra_entrada, req.params.id_empleado));
        
    }
    
    public async registrarBitacoraMarcaje(req: Request, res: Response){
        const obj = new marcajeRegistrar();
         res.status(200).send(await obj.registrarBitacoraMarcaje( req.params.fecha_bitacora_marcaje,
        req.params.hora_marcaje_bitacora, req.params.id_empleado));
    }

    public async obtenerEmpleado(req: Request, res: Response){
        const obj = new marcajeObtener();
         res.status(200).send(await obj.obtenerEmpleado( req.params.id_empleado));
         return obj;
    }

    public async obtenerFechaMarcaje(req: Request, res: Response){
        const obj = new marcajeObtener();
         res.status(200).send(await obj.obtenerFechaMarcaje( req.params.id_empleado,
        req.params.fecha_marcaje));
    }

    public async obtenerFechaExistente(req: Request, res: Response){
        const obj = new marcajeObtener();
         res.status(200).send(await obj.obtenerFechaExistente( req.params.id_empleado,
        req.params.fecha_marcaje));
    }

    /*PUT*/

    public async actualizarHraSalidaMarcaje(req : Request, res:Response){
        const obj = new marcajeActualizar();
        res.status(200).send(await obj.actualizarHraSalidaMarcaje(req.params.id_empleado, req.params.hora_marcaje,req.params.fecha_marcaje));
    }
/*
    public async actualizarTiempoLaboradoDiario(req : Request, res:Response){
        const obj = new marcajeActualizar();
        res.status(200).send(await obj.actualizarTiempoLaboradoDiario(req.params.id_empleado, req.params.tiempo_laborado));
    }*/
    
    ///////////////////////

    /*GET*/
    public async obtenerPermisosPendientes(req: Request, res: Response){
        const obj = new claseconsultarp();
        res.status(200).send( await obj.obtenerPermisosPendientes(req.params.id_usuario));
    }
    public async obtenerPermisosPendientesDRRH( req: Request, res: Response){
        const obj = new claseconsultarp();
        res.status(200).send( await obj.obtenerPermisosPendientesDRRH(req.params.id_usuario));
    }
    public async obtenerDiaFestivoDG(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerDiaFestivoDG(req.params.id_usuario));
    }
    public async obtenerUsuariodp(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerUsuariodp(req.params.id_usuario));
    }
    public async obtenerUsuariosterceros(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerUsuariosterceros(req.params.id_usuario));
    }
    public async obtenertipopermiso(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenertipopermiso(req.params.id_usuario));
    }
    public async obtenerPermisos3(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerPermisos3(req.params.id_usuario));
    }
    public async obtenerIDusuario(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerUsuario(req.params.id_usuario));
    }
    public async obtenermispermisos(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenermispermisos(req.params.id_usuario));
    }
    public async obtener_informacion_de_permiso_especifico(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtener_informacion_de_permiso_especifico(req.params.id_permiso));
    }
    public async obtenerestadosdeactividad(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerestadosdeactividad(req.params.id_usuario));
    }
    public async obtenerDEPARTAMENTOusuario(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerDEPARTAMENTOusuario(req.params.id_usuario));
    }
    public async obtenerIDTipopermiso(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerIDTipopermiso(req.params.nombreprmiso));
    }
    public async obtenerIDDiaFestivo(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerIDDiaFestivo(req.params.id_dia));
    }
    public async obtenerinfoDiaFestivo(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerinfoDiaFestivo(req.params.id_dia));
    }
    public async obtenerifotipodepermiso(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerifotipodepermiso(req.params.id_permiso));
    }
    public async obteneridpermiso(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obteneridpermiso(req.params.id_permiso));
    }
    public async obtenerusuariosDirectores(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerusuariosDirectores(req.params.id_usuario));
    }
    public async obtenerusuariosSUBDIRECTORES(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerusuariosSUBDIRECTORES(req.params.id_usuario));
    }
    public async obtenerusuariosEncargados(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerusuariosEncargados(req.params.id_usuario));
    }
    public async ContarusuariosDirector(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.ContarusuariosDirector(req.params.id_usuario));
    }
    public async obtenerdepartamento(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerdepartamento(req.params.id_usuario));
    }
    public async ContarusuariosEncargados(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.ContarusuariosEncargados(req.params.id_usuario));
    }
    public async Obtenerinfopuestojefe(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.Obtenerinfopuestojefe(req.params.id_usuario));
    }
    public async obtenerpuestodelusuario(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerpuestodelusuario(req.params.id_usuario));
    }
    public async consultaasueto(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.consultaasueto(req.params.id_usuario));
    }

    public async buscarporfechasobtenerPermisos3(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.buscarporfechasobtenerPermisos3(req.params.id_usuario,req.params.fecha1,req.params.fecha2));
    }

    public async obtenerestadosdeunpermiso(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerestadosdeunpermiso());
    }

    public async buscarporestadoobtenerPermisos3(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.buscarporestadoobtenerPermisos3(req.params.id_usuario,req.params.id));
    }

    public async obtenermispermisosporfecha(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenermispermisosporfecha(req.params.id_usuario,req.params.fecha1,req.params.fecha2));
    }

    public async obtenermispermisosporestado(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenermispermisosporestado(req.params.id_usuario,req.params.id));
    }

    public async obtenerusuariosnotificacionjefe(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerusuariosnotificacionjefe());
    }

    public async obtenerdirectorrecursoshumanos(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerdirectorrecursoshumanos());
    }

    public async obtenertipopermisoparacombox(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenertipopermisoparacombox(req.params.id_usuario));
    }

    public async obtenerinfoSecretarioGeneral(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerinfoSecretarioGeneral());
    }

    public async obtenerinfoasistentedespacho(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerinfoasistentedespacho());
    }

    public async obtenerinfoEncargadoDespacho(req: Request, res: Response ) {
        const obj = new claseconsultarp();
        res.status(200).send(await obj.obtenerinfoEncargadoDespacho());
    }

       /*APIS DE EVALUACION DE DESEMPEÑO*/
    public async obtenerEvaluaciones( req: Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerEvaluaciones());
    }
    public async obtenerNivelesEvaluaciones( req: Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerNivelesEvaluaciones());
    }
    public async obtenerTiposEvaluaciones( req: Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerTiposEvaluaciones());
    }
    public async obtenerUsuarios( req : Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerUsuarios());
    }
    public async obtenerEvaluados(req: Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerEvaluados());
    }
    public async obtenerEvaluadoresRegistrados(req: Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerEvaluadoresRegistrados());
    }
    public async obtenerEvaluadoresRegistradosActualizar(req: Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerEvaluadoresRegistradosActualizar(req.params.id_evaluacion));
    }
    public async obtenerEvaluadosRegistrados(req: Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerEvaluadosRegistrados(req.params.id_evaluacion));
    }
    public async obtenerInformacionEvaluacion(req:Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerInformacionEvaluacion());
    }

    public async obtenerInformacionEvaluados( req: Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerInformacionEvaluados(req.params.usuario));
    }

    public async obtenerInformacionEvaluadosDirectivo( req: Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerInformacionEvaluadosDirectivo(req.params.usuario));
    }
    public async obtenerInformacionEvaluadosAdministrativo( req: Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerInformacionEvaluadosAdministrativo(req.params.usuario));
    }
    public async obtenerInformacionEvaluadosOperativo( req: Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerInformacionEvaluadosOperativo(req.params.usuario));
    }
    public async obtenerInfoEncabezadoEvaluacion(req : Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerInfoEncabezadoEvaluacion(req.params.id_persona));
    }
    public async mostrarDatosEvaluacionEnviada(req : Request, res : Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.mostrarDatosEvaluacionEnviada(req.params.usuario));
    }
    public async obtenerTipoNivel(req : Request, res : Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerTipoNivel(req.params.usuario));
    }
    public async muestraPreguntasDirectiva(req: Request, res : Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.muestraPreguntasDirectiva());
    }
    public async muestraPreguntasAdministrativa(req : Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.muestraPreguntasAdministrativa(req.params.id_pregunta));
    }
    public async muestraPreguntasOperativa(req : Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.muestraPreguntasOperativa());
    }
    public async obtenerID_Evaluacion(req : Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerID_Evaluacion());
    }
    public async obtenerID_SeleccionEvaluacion(req:Request, res:Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerID_SeleccionEvaluacion(req.params.id_persona));
    }
    public async obtenerID_GuardarEvaluacion(req : Request, res : Response){
        const obj = new evaluacionObtener();
        res.status(200).send(await obj.obtenerID_GuardarEvaluacion(req.params.id_persona));
    }
    public async obtenerInformacionEntrevista( req : Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send( await obj.obtenerInformacionEntrevista(req.params.usuario))
    }
    public async obtenerComentarioEvaluador(req : Request , res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send ( await obj.obtenerComentarioEvaluador(req.params.nombre, req.params.id_persona));
    }
    public async obtenerComentarioEvaluado(req : Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send ( await obj.obtenerComentarioEvaluado( req.params.nombre, req.params.id_persona));
    }
    public async obtenerInformacionRegistrada(req : Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send ( await obj.obtenerInformacionRegistrada(req.params.id_persona));
    }
    public async obtieneIDEvaluador(req : Request, res: Response){
        const obj = new evaluacionObtener();
        res.status(200).send ( await obj.obtieneIDEvaluador(req.params.id_evaluador));
    }
    /*POST*/
    public async insertarnuevoper(req: Request, res: Response ) {
        const obj = new claseinsertarp();
        res.status(200).send(await obj.insertarnuevoper(
            req.params.hora_inicial, req.params.hora_final, req.params.descripcion, req.params.id_usuario, req.params.id_departamento, req.params.id_usuario_jefe, req.params.id_departamento_jefe, req.params.id_tipo_permiso, req.params.per_fech_solicitud, req.params.per_id_estatus, req.params.per_fech_permiso, req.params.per_us_solicitante, req.params.per_emergencia, req.params.per_fech_fpermiso));
    }

    public async insertarTipodePermiso(req: Request, res: Response ) {
        const obj = new claseinsertarp();
        res.status(200).send(await obj.insertarTipodePermiso
            (req.params.descripcion));
    }

    public async insertarNuevoDiaFestivo(req: Request, res: Response ) {
        const obj = new claseinsertarp();
        res.status(200).send(await obj.insertarNuevoDiaFestivo
            (req.params.fecha,req.params.descripcion));
    }
    public async insertarenbitacora(req: Request, res: Response ) {
        const obj = new claseinsertarp();
        res.status(200).send(await obj.insertarenbitacora
            (req.params.accion, req.params.descripcion,req.params.tabla, req.params.usuario));
    }

    /*APIS DE EVALUACION DE DESEMPEÑO */
    public async registrarEvaluacionDesempenio(req: Request, res: Response){
        const obj = new evaluacionRegistrar();
         res.status(200).send(await obj.registrarEvaluacionDesempenio( req.params.fecha_inicio,
        req.params.fecha_fin, req.params.id_nivel, req.params.id_tipo_evaluacion));
    }

    public async registrarBitacora ( req: Request, res: Response){
        const obj= new evaluacionRegistrar();
        res.status(200).send(await obj.registrarBitacora(req.params.nombre_evaluador, req.params.nombre_evaluado, req.params.tipo_evaluacion,
        req.params.estatus_evaluacion, req.params.fecha));
    }

    public async registrarEvaluados (req: Request, res: Response){
        const obj= new evaluacionRegistrar();
        res.status(200).send(await obj.registrarEvaluados(req.params.id_evaluado, req.params.id_evaluador, req.params.id_evaluacion));
    }

    public async registrarEvaluadores ( req: Request, res: Response){
        const obj= new evaluacionRegistrar();
        res.status(200).send(await obj.registrarEvaluadores(req.params.id_usuario, req.params.id_evaluacion));
    }
    public async registrarEvaluacionRespuesta ( req : Request , res: Response){
        const obj =  new evaluacionRegistrar();
        res.status(200).send(await obj.registrarEvaluacionRespuesta(req.params.punteo, req.params.id_persona, req.params.id_pregunta, req.params.id_evaluacion, req.params.opcion))
    }

    public async registrarComentarioEvaluado(req : Request, res : Response){
        const obj = new evaluacionRegistrar();
        res.status(200).send( await obj.registrarComentarioEvaluado(req.params.id_persona, req.params.comentarioEvaluado));
    }
    public async registrarAspecto(req : Request, res : Response){
        const obj = new evaluacionRegistrar();
        res.status(200).send( await obj.registrarAspecto(req.params.id_persona, req.params.contenido));
    }



     /*PUT*/
    public async actualizarTPPermiso(req: Request, res: Response ) {
        const obj = new claseactualizar();
        res.status(200).send(await obj.actualizarTPPermiso(
             req.params.estado, req.params.id));
    }


     /*PUT*/
    public async actualizarDiaFestivo(req: Request, res: Response ) {
        const obj = new claseactualizar();
        res.status(200).send(await obj.actualizarDiaFestivo(
            req.params.fecha, req.params.estado, req.params.id));
    }

    public async actualizarEvaluacionDesempenio(req : Request, res:Response){
        const obj = new evaluacionActualizar();
        res.status(200).send(await obj.actualizarEvaluacionDesempenio(req.params.id_evaluacion, req.params.fecha_inicio, req.params.fecha_fin, req.params.id_nivel, req.params.id_tipo_evaluacion));
    }
    public async actualizarDiaFestactualizarnuevospermisosivo(req: Request, res: Response ) {
        const obj = new claseactualizar();
        res.status(200).send(await obj.actualizarDiaFestactualizarnuevospermisosivo(
            req.params.observaciones, req.params.id_permiso, req.params.estatus));
    }

    public async actualizarpermisosantiguos(req: Request, res: Response ) {
        const obj = new claseactualizar();
        res.status(200).send(await obj.actualizarpermisosantiguos(
            req.params.observaciones, req.params.id_permiso, req.params.estatus));
    }

    public async registrarComentarioEvaluador(req : Request, res: Response){
        const obj = new evaluacionActualizar();
        res.status(200).send( await obj.registrarComentarioEvaluador(req.params.id_persona, req.params.comentarioEvaluador, ));
    }

    public async enviarEvaluacion(req : Request, res : Response){
        const obj = new evaluacionActualizar();
        res.status(200).send(await obj.enviarEvaluacion(req.params.id_persona));
    }
    public async registrarAccion( req : Request, res : Response){
        const obj = new evaluacionActualizar();
        res.status(200).send(await obj.registrarAccion(req.params.id_compromiso, req.params.contenido));
    }
    /*DELETE */

    public async eliminarEvaluador(req: Request, res: Response){
        const obj = new evaluacionEliminar();
        res.status(200).send(await obj.eliminarEvaluador(req.params.id_evaluador));
    }

    public async eliminarEvaluado( req: Request, res: Response){
        const obj = new evaluacionEliminar();
        res.status(200).send(await obj.eliminarEvaluado(req.params.id_persona));
    }

    // ---------------------------------Delete permisos-----------------------------------------------

    public async eliminarpermiso(req: Request, res: Response) {
        const obj = new clasedelete();
        res.status(200).send(await obj.eliminarpermiso(+req.params.id_permiso));
    }

}

export default rrh;