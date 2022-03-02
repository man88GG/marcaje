import * as express from 'express';
import {Request, Response} from "express";
import {procesosRegistrar} from "./clases/procesosRegistrar";
import {procesosObtener} from "./clases/procesosObtener";
import {procesosActualizlar} from "./clases/procesosActualizlar";
import {procesosEliminar} from "./clases/procesosEliminar";

export class procesosController {
    public path = '';
    public router: express.Router = express.Router();

    constructor() {
        this.router.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });

        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post(this.path + '/registrar/convocatoria/:detalle/:fecha_reunion/:lugar/:gestion', this.crearConvocatoria);
        this.router.post(this.path + '/registrar/asociar_usuario/:convocatoria/:usuarios', this.asociarUsuarios);
        this.router.post(this.path + '/registrar/proceso/:objetivo/:alcance/:padre/:estado/:convocatoria/:version/:nombre', this.crearProceso);
        this.router.post(this.path + '/registrar/sipoc/:proceso/:estado', this.crearSIPOC);
        this.router.post(this.path + '/registrar/tareas/:sipoc/:tareas', this.crearTareas);
        this.router.post(this.path + '/registrar/tareas_proceso/:sipoc/:tareas/:proceso/:tipo', this.crearTareasProceso);
        this.router.post(this.path + '/registrar/asociar_duenio/:proceso/:perfil', this.asociarDuenio);
        this.router.post(this.path + '/registrar/asociar_direccion/:proceso/:direccion', this.asociarDireccion);
        this.router.post(this.path + '/registrar/asociar_responsable/:proceso/:perfiles', this.asociarResponsables);
        this.router.post(this.path + '/registrar/info_adicional/:proceso/:clave/:valores', this.crearInfoAdicional);
        this.router.post(this.path + '/registrar/crear_ruta/:tareas', this.crearRuta);
        this.router.post(this.path + '/registrar/crear_kpi/:proceso/:kpis', this.crearKPI);
        this.router.post(this.path + '/registrar/crear_observacion/:usuario/:proceso/:comentario/:tipo', this.crearObservacion);
        this.router.post(this.path + '/registrar/crear_archivo/:proceso/:clave/:mongo', this.crearDocumento);

        this.router.get(this.path + '/obtener/usuarios/', this.obtenerUsuarios);
        this.router.get(this.path + '/obtener/direcciones/', this.obtenerDirecciones);
        this.router.get(this.path + '/obtener/perfiles/', this.obtenerPerfiles);
        this.router.get(this.path + '/obtener/perfiles_nogestion/', this.obtenerPerfilesNoGestion);
        this.router.get(this.path + '/obtener/convocatoria/:gestion', this.obtenerGestion);
        this.router.get(this.path + '/obtener/proceso/:convocatoria', this.obtenerProceso);
        this.router.get(this.path + '/obtener/info_proceso/:proceso', this.obtenerInfoProceso);
        this.router.get(this.path + '/obtener/sipoc_datos/:proceso/:clave', this.obtenerSIPOC);
        this.router.get(this.path + '/obtener/id_sipoc/:proceso/:estado', this.obtenerIdSIPOC);
        this.router.get(this.path + '/obtener/tareas_sipoc/:sipoc', this.obtenerTareasSIPOC);
        this.router.get(this.path + '/obtener/tareas_listado/:gestion/:estado', this.obtenerTareasListadoSIPOC);
        this.router.get(this.path + '/obtener/kpi/:proceso', this.obtenerKPI);
        this.router.get(this.path + '/obtener/costumers', this.obtenerCostumers);
        this.router.get(this.path + '/obtener/comentario/:proceso/:tipo', this.obtenerComentario);
        this.router.get(this.path + '/obtener/archivos/:proceso/', this.obtenerArchivos);
        this.router.get(this.path + '/obtener/difundir/:proceso', this.difundir);
        this.router.get(this.path + '/obtener/rutas/:sipoc', this.obtenerRutasSIPOC);
        this.router.get(this.path + '/obtener/procesos_gdc/', this.obtenerProcesosGDC);
        this.router.get(this.path + '/obtener/duenio_proceso/:proceso', this.obtenerduenioproceso);
        this.router.get(this.path + '/obtener/send_mail/:usuario/:proceso', this.sendMail);

        this.router.put(this.path + '/actualizar/proceso/:objetivo/:alcance/:padre/:estado/:convocatoria/:version/:nombre/:proceso', this.actualizarProceso);

        this.router.delete(this.path + '/eliminar/info_proceso/:tabla/:proceso', this.eliminarInfoProceso);
        this.router.delete(this.path + '/eliminar/info_sipoc/:sipoc', this.eliminarInfoSIPOC);
        this.router.delete(this.path + '/eliminar/info_tarea/:tarea', this.eliminarInfoTareaSIPOC);
    }


    public async difundir(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.difundir(+req.params.proceso));
    }

    public async crearConvocatoria(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.crearConvocatoria(req.params.detalle, req.params.fecha_reunion, req.params.lugar, +req.params.gestion));
    }

    public async obtenerUsuarios(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerUsuarios());
    }

    public async obtenerduenioproceso(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerduenioproceso(+req.params.proceso));
    }

    public async sendMail(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.sendMail(req.params.usuario, +req.params.proceso, JSON.stringify(req.body)));
    }

    public async asociarUsuarios(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.asociarUsuarios(+req.params.convocatoria, req.params.usuarios));
    }

    public async obtenerDirecciones(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerDirecciones());
    }

    public async obtenerPerfiles(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerPerfiles());
    }

    public async obtenerPerfilesNoGestion(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerPerfilesNoGestion());
    }


    public async obtenerGestion(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerGestion(+req.params.gestion));
    }

    public async obtenerProceso(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerProceso(+req.params.convocatoria));
    }

    public async crearProceso(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.crearProceso(req.params.objetivo, req.params.alcance, req.params.padre, req.params.estado, +req.params.convocatoria, req.params.version, req.params.nombre));
    }

    public async crearSIPOC(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.crearSIPOC(+req.params.proceso, +req.params.estado));
    }

    public async crearTareas(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.crearTareas(+req.params.sipoc, JSON.stringify(req.body)));
    }

    public async crearTareasProceso(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.crearTareasProceso(+req.params.sipoc,  JSON.stringify(req.body), +req.params.proceso, +req.params.tipo));
    }

    public async crearObservacion(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.crearObservacion(+req.params.usuario, +req.params.proceso, req.params.comentario, +req.params.tipo));
    }

    public async crearDocumento(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.crearDocumento(+req.params.proceso, req.params.clave, req.params.mongo));
    }

    public async actualizarProceso(req : Request, res : Response){
        const obj = new procesosActualizlar();
        res.status(200).send(await obj.actualizarProceso(req.params.objetivo, req.params.alcance, req.params.padre, req.params.estado, +req.params.convocatoria, req.params.version,req.params.nombre, +req.params.proceso));
    }

    public async asociarDuenio(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.asociarDuenio(+req.params.proceso, req.params.perfil));
    }

    public async asociarDireccion(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.asociarDireccion(+req.params.proceso, req.params.direccion));
    }

    public async asociarResponsables(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.asociarResponsables(+req.params.proceso, req.params.perfiles));
    }

    public async crearInfoAdicional(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.crearInfoAdicional(+req.params.proceso, req.params.clave, req.params.valores));
    }

    public async eliminarInfoProceso(req : Request, res : Response){
        const obj = new procesosEliminar();
        res.status(200).send(await obj.eliminarInfoProceso(req.params.tabla, +req.params.proceso));
    }

    public async obtenerInfoProceso(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerInfoProceso(+req.params.proceso));
    }

    public async obtenerSIPOC(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerSIPOC(+req.params.proceso, req.params.clave));
    }

    public async obtenerIdSIPOC(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerIdSIPOC(+req.params.proceso, +req.params.estado));
    }

    public async obtenerTareasSIPOC(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerTareasSIPOC(+req.params.sipoc));
    }

    public async obtenerTareasListadoSIPOC(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerTareasListadoSIPOC(+req.params.gestion, +req.params.estado));
    }

    public async crearRuta(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.crearRuta(JSON.stringify(req.body)));
    }

    public async obtenerRutasSIPOC(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerRutasSIPOC(+req.params.sipoc));
    }


    public async obtenerKPI(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerKPI(+req.params.proceso));
    }

    public async obtenerComentario(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerComentario(+req.params.proceso, +req.params.tipo));
    }

    public async obtenerArchivos(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerArchivos(+req.params.proceso));
    }
    public async eliminarInfoSIPOC(req : Request, res : Response){
        const obj = new procesosEliminar();
        res.status(200).send(await obj.eliminarInfoSIPOC(+req.params.sipoc));
    }

    public async eliminarInfoTareaSIPOC(req : Request, res : Response){
        const obj = new procesosEliminar();
        res.status(200).send(await obj.eliminarInfoTareaSIPOC(+req.params.tarea));
    }

    public async crearKPI(req : Request, res : Response){
        const obj = new procesosRegistrar();
        res.status(200).send(await obj.crearKPI(+req.params.proceso, JSON.stringify(req.body)));
    }

    public async obtenerProcesosGDC(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerProcesosGDC());
    }

    public async obtenerCostumers(req : Request, res : Response){
        const obj = new procesosObtener();
        res.status(200).send(await obj.obtenerCostumers());
    }

}

export default procesosController;

