import * as express from 'express';
import { Request, Response } from "express";

import { runtimeRegistrar } from './clases/runtimeRegistrar';

import 'reflect-metadata';
import { runtimeObtener } from "./clases/runtimeObtener";
import { modelingRegistrar } from "./clases/modelingRegistrar";
import { modelingActualizar } from "./clases/modelingActualizar";
import { modelingEliminar } from "./clases/modelingEliminar";
import { modelingConsultar } from "./clases/modelingConsultar";


// tslint:disable-next-line:class-name
export class corebController {

    public path = '';
    public router: express.Router = express.Router();
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        // RUNTIME
        this.router.post(this.path + '/runtime/registrar/iniciar_gestion/:usuario/:proceso', this.iniciar_gestion);
        this.router.post(this.path + '/runtime/registrar/set_inicio/:proceso/:gestion', this.set_inicio);
        this.router.post(this.path + '/runtime/registrar/set_primera_etapa/:gestion/:tarea/:usuario', this.set_primera_etapa);
        this.router.post(this.path + '/runtime/registrar/crear_gestion/:usuario/:proceso', this.crear_gestion);
        this.router.post(this.path + '/runtime/registrar/insertar_evidencia/:criterio/:etapa/:valor/:metadata', this.insertar_evidencia);
        this.router.post(this.path + '/runtime/registrar/super_insertar_evidencia/:criterio/:etapa/:valor/:metadata', this.super_insertar_evidencia);
        this.router.post(this.path + '/runtime/registrar/super_insertar_evidencia/:criterio/:etapa/:valor', this.super_insertar_evidencia2);
        this.router.post(this.path + '/runtime/registrar/super_insertar_evidencia_multiple/:criterio/:etapa/:valor/:usuario', this.super_insertar_evidencia_multiple);
        this.router.post(this.path + '/runtime/registrar/insertar_evidencia/:criterio/:etapa/:valor/', this.insertar_evidencia2);

        this.router.post(this.path + '/runtime/registrar/actualizar_etapa/:etapa/:estado/:tipo', this.actualizar_etapa);
        this.router.post(this.path + '/runtime/registrar/actualizar_asignacion/:etapa/:estado/:tipo/:usuario', this.actualizarAsignación);

        this.router.get(this.path + '/runtime/consultar/get_evidencias/:etapa/:funcion_criterio', this.get_evidencias);
        this.router.get(this.path + '/runtime/consultar/get_condiciones/:tarea', this.get_condiciones);
        this.router.get(this.path + '/runtime/consultar/get_rutas/:tarea', this.get_rutas);
        this.router.get(this.path + '/runtime/consultar/get_reglas/:ruta', this.get_reglas);
        this.router.get(this.path + '/runtime/consultar/validar_condiciones/:evidencias/:condiciones', this.validar_condiciones);
        this.router.get(this.path + '/runtime/consultar/validar_reglas/:evidencias/:reglas', this.validar_reglas);
        this.router.get(this.path + '/runtime/consultar/decidir_ruta/:tarea/:etapa/:rutas', this.decidir_ruta);
        this.router.get(this.path + '/runtime/consultar/calcular_proxima_ruta/:etapa/:usuarioperfil', this.calcular_proxima_ruta);
        this.router.get(this.path + '/runtime/consultar/calcular_proxima_ruta/:etapa/', this.calcular_proxima_ruta2);
        this.router.get(this.path + '/runtime/consultar/calcular_proxima_ruta_usuario/:etapa/:usuario', this.calcular_proxima_ruta_usuario);
        this.router.get(this.path + '/runtime/consultar/calcular_proxima_ruta_usuarios/:etapa/', this.calcular_proxima_ruta_usuarios);
        this.router.get(this.path + '/runtime/consultar/get_dashboard/:usuario', this.get_dashboard);
        this.router.get(this.path + '/runtime/consultar/get_etapa_actual/:gestion', this.getEtapa);
        this.router.get(this.path + '/runtime/consultar/estapa_siguiente/:etapa', this.estapaSiguiente);
        this.router.get(this.path + '/runtime/consultar/existe_evidencia/:criterio/:etapa', this.existeEvidencia);
        this.router.get(this.path + '/runtime/consultar/existe_criterio_etapa/:criterio/:etapa', this.existeCriterioEtapa);
        this.router.get(this.path + '/runtime/consultar/get_catalogo_documentos_etapa/:tarea', this.getCatalogoDocumentosEtapa);
        this.router.get(this.path + '/runtime/consultar/get_evidencias_autorizadas/:gestion/:perfil', this.getEvidenciasAutorizadas);
        this.router.get(this.path + '/runtime/consultar/get_perfil_by_etapa/:perfil', this.get_perfil_by_etapa);
        this.router.get(this.path + '/runtime/consultar/get_tarea_by_etapa/:etapa', this.get_tarea_by_etapa);
        this.router.get(this.path + '/runtime/consultar/get_proceso_by_perfil/:perfil', this.get_proceso_by_perfil);
        this.router.get(this.path + '/runtime/consultar/get_asignado/:etapa/:usuario', this.getAsignado);
        this.router.get(this.path + '/runtime/consultar/evidencia_consulta/:perfil/:gestion', this.getEvidenciasConsulta);
        this.router.get(this.path + '/runtime/consultar/dashboard_consulta/:usuario', this.getDashboardConsulta);
        this.router.get(this.path + '/runtime/consultar/get_usuario_ruta/:etapa', this.get_usuario_ruta);

        this.router.delete(this.path + '/runtime/eliminar/evidencia/:evidencia/:etapa', this.deleteCriterioEtapa);

        // MODELING
        this.router.post(this.path + '/modeling/registrar/proceso/:nombre/:descripcion/:version/:estado/:proceso_padre/:tipo_proceso', this.RegistrarProceso);
        this.router.post(this.path + '/modeling/registrar/caracterizacion_proceso/:nombre/:alcance/:objetivo/:proceso', this.RegistrarCaracterizacion);
        this.router.post(this.path + '/modeling/registrar/tarea_proceso/:nombre/:duracion/:maxima/:costo/:ejecucion/:tipo/:proceso', this.RegistrarTarea);
        this.router.post(this.path + '/modeling/registrar/criterio/:nombre/:tipo/:funcion', this.RegistrarCriterio);
        this.router.post(this.path + '/modeling/registrar/criterio_tarea/:tarea/:criterio', this.AsociarCriterioTarea);
        this.router.post(this.path + '/modeling/registrar/ruta/:tarea_origen/:tarea_destino/:prioridad', this.RegistrarRuta);
        this.router.post(this.path + '/modeling/registrar/regla_ruta/:criterio/:ruta/:operador/:valor', this.RegistrarReglaRuta);
        this.router.post(this.path + '/modeling/registrar/perfil_proceso/:perfil/:proceso', this.AsociarPerfilProceso);
        this.router.post(this.path + '/modeling/registrar/perfil_tarea/:perfil/:tarea', this.AsociarPerfilTarea);
        this.router.post(this.path + '/modeling/registrar/informacion_proceso/:proceso/:tipo/:clave/:valor', this.InformacionProceso);

        this.router.put(this.path + '/modeling/actualizar/proceso/:nombre/:descripcion/:version/:estado/:proceso_padre/:tipo_proceso/:proceso', this.ActualizarProceso);
        this.router.put(this.path + '/modeling/actualizar/caracterizacion_proceso/:nombre/:alcance/:objetivo/:proceso/:caracterizacion', this.ActualizarCaracterizacion);
        this.router.put(this.path + '/modeling/actualizar/tarea_proceso/:nombre/:duracion/:maxima/:costo/:ejecucion/:tipo/:proceso/:tarea', this.ActualizarTarea);
        this.router.put(this.path + '/modeling/actualizar/criterio/:nombre/:tipo/:funcion/:criterio', this.ActualizarCriterio);
        this.router.put(this.path + '/modeling/actualizar/ruta/:tarea_origen/:tarea_destino/:prioridad/:ruta', this.ActualizarRuta);

        this.router.delete(this.path + '/modeling/eliminar/proceso/:proceso', this.EliminarProceso);
        this.router.delete(this.path + '/modeling/eliminar/caracterizacion_proceso/:caracterizacion', this.EliminarCaracterizacion);
        this.router.delete(this.path + '/modeling/eliminar/tarea_proceso/:tarea', this.EliminarTarea);
        this.router.delete(this.path + '/modeling/eliminar/criterio/:criterio', this.EliminarCriterio);
        this.router.delete(this.path + '/modeling/eliminar/criterio_tarea/:criterio/:tarea', this.EliminarCriterioTarea);
        this.router.delete(this.path + '/modeling/eliminar/ruta/:ruta', this.EliminarRuta);
        this.router.delete(this.path + '/modeling/eliminar/regla_ruta/:regla', this.EliminarRutaRegla);
        this.router.delete(this.path + '/modeling/eliminar/perfil_proceso/:proceso/:perfil', this.EliminarProcesoPerfil);
        this.router.delete(this.path + '/modeling/eliminar/perfil_tarea/:tarea/:perfil', this.EliminarTareaPerfil);

        this.router.get(this.path + '/modeling/consultar/proceso/:proceso', this.ConsultarProceso);
        this.router.get(this.path + '/modeling/consultar/caracterizacion_proceso/:proceso', this.ConsultarCaracterizacion);
        this.router.get(this.path + '/modeling/consultar/tarea_proceso/:proceso', this.ConsultarTarea);
        this.router.get(this.path + '/modeling/consultar/criterio/:criterio', this.ConsultarCriterio);
        this.router.get(this.path + '/modeling/consultar/ruta/:ruta', this.ConsultarRuta);
        this.router.get(this.path + '/modeling/consultar/regla_ruta/:ruta', this.ConsultarRegla);
        this.router.get(this.path + '/modeling/consultar/perfil_proceso/:proceso', this.ConsultarPerfilProceso);
        this.router.get(this.path + '/modeling/consultar/perfil_tarea/:tarea', this.ConsultarPerfilTarea);
        this.router.get(this.path + '/modeling/consultar/proceso_perfil/:perfil', this.ConsultarProcesoPerfil);
        this.router.get(this.path + '/modeling/consultar/tarea_perfil/:perfil', this.ConsultarTareaPerfil);
    }


    public async iniciar_gestion(req: Request, res: Response) {
        const obj = new runtimeRegistrar();
        res.status(200).send(await obj.iniciar_gestion(+req.params.proceso, +req.params.usuario));
    }

    public async set_inicio(req: Request, res: Response) {
        const obj = new runtimeRegistrar();
        res.status(200).send(await obj.set_inicio(+req.params.proceso, +req.params.gestion));
    }

    public async set_primera_etapa(req: Request, res: Response) {
        const obj = new runtimeRegistrar();
        res.status(200).send(await obj.set_primera_etapa(+req.params.gestion, +req.params.tarea, +req.params.usuario));
    }

    public async crear_gestion(req: Request, res: Response) {
        const obj = new runtimeRegistrar();
        res.status(200).send(await obj.crear_gestion(+req.params.usuario, +req.params.proceso));
    }

    public async insertar_evidencia(req: Request, res: Response) {
        const obj = new runtimeRegistrar();
        res.status(200).send(await obj.super_insertar_evidencia(+req.params.criterio, +req.params.etapa, req.params.valor, req.params.metadata));
    }

    public async super_insertar_evidencia(req: Request, res: Response) {
        const obj = new runtimeRegistrar();
        res.status(200).send(await obj.super_insertar_evidencia(+req.params.criterio, +req.params.etapa, req.params.valor, req.params.metadata));
    }

    public async super_insertar_evidencia2(req: Request, res: Response) {
        const obj = new runtimeRegistrar();
        res.status(200).send(await obj.super_insertar_evidencia(+req.params.criterio, +req.params.etapa, req.params.valor, null));
    }

    public async super_insertar_evidencia_multiple(req: Request, res: Response) {
        const obj = new runtimeRegistrar();
        res.status(200).send(await obj.super_insertar_evidencia_multipe(+req.params.criterio, +req.params.etapa, req.params.valor, null, req.params.usuario));
    }

    public async insertar_evidencia2(req: Request, res: Response) {
        const obj = new runtimeRegistrar();
        res.status(200).send(await obj.insertar_evidencia(+req.params.criterio, +req.params.etapa, req.params.valor, null));
    }

    public async get_evidencias(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getEvidencias(+req.params.etapa, +req.params.funcion_criterio));
    }

    public async get_condiciones(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getCondiciones(+req.params.tarea));
    }

    public async get_rutas(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getRutas(+req.params.tarea));
    }

    public async get_reglas(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getReglas(+req.params.ruta));
    }

    public async validar_condiciones(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.validarCondiciones(req.params.evidencias, req.params.condiciones));
    }

    public async validar_reglas(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.validarReglas(req.params.evidencias, req.params.reglas));
    }

    public async decidir_ruta(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.decidirRuta(+req.params.tarea, +req.params.etapa, req.params.rutas));
    }

    public async get_usuario_ruta(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getUsuariosRuta(+req.params.etapa));
    }

    public async calcular_proxima_ruta(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.calcularProximaEtapa2(+req.params.etapa, JSON.parse(req.params.usuarioperfil)));
    }

    public async calcular_proxima_ruta2(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.calcularProximaEtapa3(+req.params.etapa));
    }

    public async calcular_proxima_ruta_usuario(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.calcularProximaEtapaUsuario(+req.params.etapa, +req.params.usuario));
    }

    public async calcular_proxima_ruta_usuarios(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.calcularProximaEtapaUsuarios(+req.params.etapa, req.body.usuarios));
    }

    public async getEtapa(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getEtapa(+req.params.gestion));
    }

    public async estapaSiguiente(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.estapaSiguiente(+req.params.etapa));
    }

    public async actualizar_etapa(req: Request, res: Response) {
        const obj = new runtimeRegistrar();
        res.status(200).send(await obj.actualizar_etapa(+req.params.etapa, +req.params.estado, +req.params.tipo));
    }

    public async actualizarAsignación(req: Request, res: Response) {
        const obj = new runtimeRegistrar();
        res.status(200).send(await obj.actualizarAsignación(+req.params.etapa, +req.params.estado, +req.params.tipo, +req.params.usuario));
    }

    public async get_dashboard(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getDashboard(+req.params.usuario));
    }

    public async existeEvidencia(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.existeEvidencia(+req.params.criterio, +req.params.etapa));
    }

    public async existeCriterioEtapa(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.existeCriterioEtapa(+req.params.criterio, +req.params.etapa));
    }

    public async deleteCriterioEtapa(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.deleteCriterioEtapa(+req.params.evidencia, +req.params.etapa));
    }

    public async getCatalogoDocumentosEtapa(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getCatalogoDocumentosEtapa(+req.params.tarea));
    }

    public async getEvidenciasAutorizadas(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getEvidenciasAutorizadas(+req.params.gestion, +req.params.perfil));
    }

    public async get_perfil_by_etapa(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.get_perfil_by_etapa(+req.params.perfil));
    }

    public async get_tarea_by_etapa(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.get_tarea_by_etapa(+req.params.etapa));
    }

    public async get_proceso_by_perfil(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.get_proceso_by_perfil(+req.params.perfil));
    }

    public async getAsignado(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getAsignado(+req.params.etapa, +req.params.usuario));
    }

    public async getEvidenciasConsulta(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getEvidenciasConsulta(+req.params.perfil, +req.params.gestion));
    }

    public async getDashboardConsulta(req: Request, res: Response) {
        const obj = new runtimeObtener();
        res.status(200).send(await obj.getDashboardConsulta(+req.params.usuario, req.body.fecha_inicio, req.body.fecha_fin));
    }
    public async RegistrarProceso(req: Request, res: Response) {
        const obj = new modelingRegistrar();
        res.status(200).send(await obj.RegistrarProceso(req.params.nombre, req.params.descripcion, req.params.version, req.params.estado, req.params.proceso_padre, req.params.tipo_proceso));
    }

    public async RegistrarCaracterizacion(req: Request, res: Response) {
        const obj = new modelingRegistrar();
        res.status(200).send(await obj.RegistrarCaracterizacion(req.params.nombre, req.params.alcance, req.params.objetivo, req.params.proceso));
    }

    public async RegistrarTarea(req: Request, res: Response) {
        const obj = new modelingRegistrar();
        res.status(200).send(await obj.RegistrarTarea(req.params.nombre, +req.params.duracion, +req.params.maxima, +req.params.costo, +req.params.ejecucion, +req.params.tipo, +req.params.proceso));
    }

    public async RegistrarCriterio(req: Request, res: Response) {
        const obj = new modelingRegistrar();
        res.status(200).send(await obj.RegistrarCriterio(req.params.nombre, +req.params.tipo, +req.params.funcion));
    }

    public async AsociarCriterioTarea(req: Request, res: Response) {
        const obj = new modelingRegistrar();
        res.status(200).send(await obj.AsociarCriterioTarea(+req.params.tarea, +req.params.criterio));
    }

    public async RegistrarRuta(req: Request, res: Response) {
        const obj = new modelingRegistrar();
        res.status(200).send(await obj.RegistrarRuta(+req.params.tarea_origen, +req.params.tarea_destino, +req.params.prioridad));
    }

    public async RegistrarReglaRuta(req: Request, res: Response) {
        const obj = new modelingRegistrar();
        res.status(200).send(await obj.RegistrarReglaRuta(+req.params.criterio, +req.params.ruta, req.params.operador, req.params.valor));
    }

    public async AsociarPerfilProceso(req: Request, res: Response) {
        const obj = new modelingRegistrar();
        res.status(200).send(await obj.AsociarPerfilProceso(+req.params.perfil, +req.params.proceso));
    }

    public async AsociarPerfilTarea(req: Request, res: Response) {
        const obj = new modelingRegistrar();
        res.status(200).send(await obj.AsociarPerfilTarea(+req.params.perfil, +req.params.tarea));
    }

    public async ActualizarProceso(req: Request, res: Response) {
        const obj = new modelingActualizar();
        res.status(200).send(await obj.ActualizarProceso(req.params.nombre, req.params.descripcion, req.params.version, req.params.estado, req.params.proceso_padre, req.params.tipo_proceso, +req.params.proceso));
    }

    public async ActualizarCaracterizacion(req: Request, res: Response) {
        const obj = new modelingActualizar();
        res.status(200).send(await obj.ActualizarCaracterizacion(req.params.nombre, req.params.alcance, req.params.objetivo, +req.params.proceso, +req.params.caracterizacion));
    }

    public async ActualizarTarea(req: Request, res: Response) {
        const obj = new modelingActualizar();
        res.status(200).send(await obj.ActualizarTarea(req.params.nombre, +req.params.duracion, +req.params.maxima, +req.params.costo, +req.params.ejecucion, +req.params.tipo, +req.params.proceso, +req.params.tarea));
    }

    public async ActualizarCriterio(req: Request, res: Response) {
        const obj = new modelingActualizar();
        res.status(200).send(await obj.ActualizarCriterio(req.params.nombre, +req.params.tipo, +req.params.funcion, +req.params.criterio));
    }

    public async ActualizarRuta(req: Request, res: Response) {
        const obj = new modelingActualizar();
        res.status(200).send(await obj.ActualizarRuta(+req.params.tarea_origen, +req.params.tarea_destino, +req.params.prioridad, +req.params.ruta));
    }

    public async EliminarProceso(req: Request, res: Response) {
        const obj = new modelingEliminar();
        res.status(200).send(await obj.EliminarProceso(+req.params.proceso));
    }

    public async EliminarCaracterizacion(req: Request, res: Response) {
        const obj = new modelingEliminar();
        res.status(200).send(await obj.EliminarCaracterizacion(+req.params.caracterizacion));
    }

    public async EliminarTarea(req: Request, res: Response) {
        const obj = new modelingEliminar();
        res.status(200).send(await obj.EliminarTarea(+req.params.tarea));
    }

    public async EliminarCriterio(req: Request, res: Response) {
        const obj = new modelingEliminar();
        res.status(200).send(await obj.EliminarCriterio(+req.params.criterio));
    }

    public async EliminarCriterioTarea(req: Request, res: Response) {
        const obj = new modelingEliminar();
        res.status(200).send(await obj.EliminarCriterioTarea(+req.params.criterio, +req.params.tarea));
    }

    public async EliminarRuta(req: Request, res: Response) {
        const obj = new modelingEliminar();
        res.status(200).send(await obj.EliminarRuta(+req.params.ruta));
    }
    public async EliminarRutaRegla(req: Request, res: Response) {
        const obj = new modelingEliminar();
        res.status(200).send(await obj.EliminarRutaRegla(+req.params.regla));
    }

    public async EliminarProcesoPerfil(req: Request, res: Response) {
        const obj = new modelingEliminar();
        res.status(200).send(await obj.EliminarProcesoPerfil(+req.params.proceso, +req.params.perfil));
    }

    public async EliminarTareaPerfil(req: Request, res: Response) {
        const obj = new modelingEliminar();
        res.status(200).send(await obj.EliminarTareaPerfil(+req.params.tarea, +req.params.perfil));
    }

    public async ConsultarProceso(req: Request, res: Response) {
        const obj = new modelingConsultar();
        res.status(200).send(await obj.ConsultarProceso(+req.params.proceso));
    }

    public async ConsultarCaracterizacion(req: Request, res: Response) {
        const obj = new modelingConsultar();
        res.status(200).send(await obj.ConsultarCaracterizacion(+req.params.proceso));
    }

    public async ConsultarTarea(req: Request, res: Response) {
        const obj = new modelingConsultar();
        res.status(200).send(await obj.ConsultarTarea(+req.params.proceso));
    }

    public async ConsultarCriterio(req: Request, res: Response) {
        const obj = new modelingConsultar();
        res.status(200).send(await obj.ConsultarCriterio(+req.params.criterio));
    }

    public async ConsultarRuta(req: Request, res: Response) {
        const obj = new modelingConsultar();
        res.status(200).send(await obj.ConsultarRuta(+req.params.ruta));
    }

    public async ConsultarRegla(req: Request, res: Response) {
        const obj = new modelingConsultar();
        res.status(200).send(await obj.ConsultarRegla(+req.params.ruta));
    }

    public async ConsultarPerfilProceso(req: Request, res: Response) {
        const obj = new modelingConsultar();
        res.status(200).send(await obj.ConsultarPerfilProceso(+req.params.proceso));
    }

    public async ConsultarPerfilTarea(req: Request, res: Response) {
        const obj = new modelingConsultar();
        res.status(200).send(await obj.ConsultarPerfilTarea(+req.params.tarea));
    }

    public async ConsultarProcesoPerfil(req: Request, res: Response) {
        const obj = new modelingConsultar();
        res.status(200).send(await obj.ConsultarProcesoPerfil(+req.params.perfil));
    }

    public async ConsultarTareaPerfil(req: Request, res: Response) {
        const obj = new modelingConsultar();
        res.status(200).send(await obj.ConsultarTareaPerfil(+req.params.perfil));
    }

    public async InformacionProceso(req: Request, res: Response) {
        const obj = new modelingRegistrar();
        res.status(200).send(await obj.InformacionProceso(+req.params.proceso, +req.params.tipo, +req.params.clave, +req.params.valor));
    }
}

export default corebController;
