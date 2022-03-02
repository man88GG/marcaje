import * as express from 'express';
import { Request, Response } from "express";
import { correoEnvio } from "./clases/correoEnvio";
import { correoEnvioRed } from "./clases/correoEnvioRed";
import { correoEnvioEvaluaciones } from "./clases/correoEnvioEvaluaciones";
import { resolve } from 'path';
import { correoCuerpoEvaluaciones } from './clases/correoCuerpoEvaluaciones';

export class correoController {
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
        // Lineas
        this.router.post(this.path + '/enviar', this.enviarCorreo);
        this.router.post(this.path + '/enviar/fase2', this.enviarCorreoFase2);// revisar
        // Red
        this.router.post(this.path + '/enviar/red/investigador', this.enviarCorreoRedInv);
        this.router.post(this.path + '/enviar/red/admin', this.enviarCorreoRedAdmin);
        // General
        this.router.post(this.path + '/enviar/general', this.enviarCorreoGeneral);
        // GD
        this.router.post(this.path + '/enviar/GD', this.enviarCorreoGD);
        // Notificacion Evaluacion
        this.router.post(this.path + '/enviar/notificacionEvaluacion/:id_persona', this.enviarCorreoNotificacionEvaluacion);
        this.router.post(this.path + '/enviar/enviarNotificacionEvaluacionEvaluador/:id_evaluador', this.enviarCorreoNotificacionEvaluacionEvaluador);


        /*GET*/
        // this.router.get(this.path + '/obtener/carpetas/:id_usuario', this.obtenerCarpetas);
        /*PUT*/
        // this.router.put(this.path + '/actualizar/documento', this.actualizarDocumento);
        /*DELETE*/
        // this.router.delete(this.path + '/eliminar/documento', this.eliminarDocumento);
    }

    /*POST*/
    public async enviarCorreo(req: Request, res: Response) {
        const obj = new correoEnvio();
        res.status(200).send(await obj.enviar(req.body.id_perfil_proyecto, false));
    }
    // ENVIAR CORREO DE NOTIFICACION DE HABILITACION DE EVALUACIONES
    public async enviarCorreoNotificacionEvaluacion( req : Request, res: Response){
        const obj = new correoEnvioEvaluaciones();
        res.status(200).send(await obj.enviarNotificacionEvaluacion(req.params.id_persona));
    }

    public async enviarCorreoNotificacionEvaluacionEvaluador(req: Request, res: Response){
        const obj = new correoEnvioEvaluaciones();
        res.status(200).send( await obj.enviarNotificacionEvaluacionEvaluador(req.params.id_evaluador));
    }

    public async enviarCorreoFase2(req: Request, res: Response) {
        const obj = new correoEnvio();
        res.status(200).send(await obj.enviar(req.body.id_perfil_proyecto, true));
    }

    public async enviarCorreoRedInv(req: Request, res: Response) {
        const obj = new correoEnvioRed();
        res.status(200).send(await obj.enviarRed(req.body.no_registro_persona, 0));
    }

    public async enviarCorreoRedAdmin(req: Request, res: Response) {
        const obj = new correoEnvioRed();
        res.status(200).send(await obj.enviarRed(req.body.no_registro_persona, 1));
    }

    public async enviarCorreoGeneral(req: Request, res: Response) {
        const obj = new correoEnvio();
        res.status(200).send(await obj.enviarGeneral(req.body.no_registro_persona, req.body.id_perfil_proyecto, req.body.asunto, req.body.cuerpo, req.body.idmodulo));
    }

    public async enviarCorreoGD(req: Request, res: Response) {
        const obj = new correoEnvio();
        res.status(200).send(await obj.enviarGD(req.body.no_registro_persona, req.body.asunto, req.body.cuerpo, req.body.idmodulo));
    }


    /*GET
    public async obtenerCarpetas(req: Request, res: Response) {
        const obj = new carpetaObtener();
        res.status(200).send(await obj.obtenerCarpetas(req.params.id_usuario));
    }*/

    /*PUT
    public async actualizarDocumento(req: Request, res: Response) {
        const obj = new carpetaActualizar();
        res.status(200).send(await obj.actualizarDocumento(req.body.id_documento, req.body.nombre));
    }*/

    /*DELETE
    public async eliminarDocumento(req: Request, res: Response) {
        const obj = new carpetaEliminar();
        res.status(200).send(await obj.eliminarDocumento(req.body.id_documento));
    }*/
}

export default correoController;