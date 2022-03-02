import * as express from 'express';
import { Request, Response } from "express";
import { gestionRegistrar } from "./clases/gestionRegistrar";
import { gestionObtener } from "./clases/gestionObtener";
import { gestionActualizar } from "./clases/gestionActualizar";
import { gestionEliminar } from "./clases/gestionEliminar";

import upload from "./clases/gestionUploadMongo";

export class gestiondController {
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
        /*POST*/
        this.router.post(this.path + '/registrar/gestion', this.registrarGestion);
        this.router.post(this.path + '/registrar/documentomongo/:id_usuario/:tipog/:tipodoc/:ref', this.registrarDocumentoMongo);
        this.router.post(this.path + '/registrar/documentos', this.registrarDocumentos);
        this.router.post(this.path + '/registrar/bitacora', this.registrarBitacora);
        this.router.post(this.path + '/registrar/firma', this.registrarFirma);
        /*GET*/
        this.router.get(this.path + '/obtener/usuarios/:id_usuario', this.obtenerUsuarios);
        this.router.get(this.path + '/obtener/direcciones', this.obtenerDirecciones);
        this.router.get(this.path + '/obtener/usuarios/direccion/:id_usuario/:id_direccion', this.obtenerUsuariosDireccion);
        this.router.get(this.path + '/obtener/tipodocs', this.obtenerTiposDocumentos);
        this.router.get(this.path + '/obtener/gestiones/:id_usuario', this.obtenerListadoGestiones);
        this.router.get(this.path + '/obtener/gestion/:id_gestion', this.obtenerGestion);
        /*PUT*/
        this.router.put(this.path + '/actualizar/gestion', this.actualizarGestion);
        this.router.put(this.path + '/actualizar/estado/gestion', this.actualizarEstadoGestion);
        /*DELETE*/
        this.router.delete(this.path + '/eliminar/gestion/:id_gestion', this.eliminarGestion);
    }

    /*POST*/
    public async registrarGestion(req: Request, res: Response) {
        const obj = new gestionRegistrar();
        res.status(200).send(await obj.registrarGestion(req.body.asunto, req.body.contenido,
            req.body.usuario, req.body.id_tipo, req.body.id_gestion, req.body.receptores, req.body.id_estado, req.body.id_gestion_padre, req.body.referencia));
    }
    public async registrarBitacora(req: Request, res: Response) {
        const obj = new gestionRegistrar();
        res.status(200).send(await obj.registrarBitacora(req.body.usuario, req.body.accion, req.body.descripcion));
    }
    public async registrarDocumentoMongo(req: any, res: any) {
        const obj = await upload(req, res);
        res.status(200).send(res.req.file);
    }
    public async registrarDocumentos(req: Request, res: Response) {
        const obj = new gestionRegistrar();
        res.status(200).send(await obj.registrarDocumentos(req.body.id_tipo, req.body.id_gestion, req.body.documentos));
    }
    public async registrarFirma(req: Request, res: Response) {
        const obj = new gestionRegistrar();
        // res.status(200).send(await obj.registrarFirma(req.body.id_usuario, req.body.contra));
    }
    /*GET*/
    public async obtenerUsuarios(req: Request, res: Response) {
        const obj = new gestionObtener();
        res.status(200).send(await obj.obtenerUsuarios(req.params.id_usuario));
    }
    public async obtenerDirecciones(req: Request, res: Response) {
        const obj = new gestionObtener();
        res.status(200).send(await obj.obtenerDirecciones());
    }
    public async obtenerUsuariosDireccion(req: Request, res: Response) {
        const obj = new gestionObtener();
        res.status(200).send(await obj.obtenerUsuariosDireccion(req.params.id_usuario, req.params.id_direccion));
    }
    public async obtenerTiposDocumentos(req: Request, res: Response) {
        const obj = new gestionObtener();
        res.status(200).send(await obj.obtenerTiposDocumentos());
    }
    public async obtenerListadoGestiones(req: Request, res: Response) {
        const obj = new gestionObtener();
        res.status(200).send(await obj.obtenerListadoGestiones(req.params.id_usuario));
    }
    public async obtenerGestion(req: Request, res: Response) {
        const obj = new gestionObtener();
        res.status(200).send(await obj.obtenerGestion(req.params.id_gestion));
    }
    /*PUT*/
    public async actualizarGestion(req: Request, res: Response) {
        const obj = new gestionActualizar();
        res.status(200).send(await obj.actualizarGestion(req.body.id_gestion, req.body.asunto, req.body.contenido,
            req.body.id_tipo, req.body.receptores, req.body.id_estado, req.body.referencia));
    }
    public async actualizarEstadoGestion(req: Request, res: Response) {
        const obj = new gestionActualizar();
        res.status(200).send(await obj.actualizarEstadoGestion(req.body.id_gestion, req.body.estado, req.body.id_receptor));
    }
    /*DELETE*/
    public async eliminarGestion(req: Request, res: Response) {
        const obj = new gestionEliminar();
        res.status(200).send(await obj.eliminarGestion(req.params.id_gestion));
    }
}

export default gestiondController;