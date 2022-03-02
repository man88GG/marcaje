import * as express from 'express';
import { Request, Response } from "express";

import {red} from "./clases/red";


export class dni{

    public path = '';
    public router: express.Router = express.Router();
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post(this.path + '/registrar/postulacion/:persona/:convocatoria', this.postulacion);
        this.router.post(this.path + '/registrar/datos/:persona', this.guardarDatos);

        this.router.get(this.path + '/obtener/postulacion/:persona', this.getPostulacion);
        this.router.get(this.path + '/obtener/habilitacion/:persona', this.getHabilitado);
        this.router.get(this.path + '/obtener/fotografia_persona/:persona', this.getFotografia);
        this.router.get(this.path + '/obtener/fotografia_persona/:expendiente', this.getInfoDNI);
    }

    public async postulacion(req: Request, res: Response) {
        const obj = new red();
        res.status(200).send(await obj.postulacion(+req.params.persona, +req.params.convocatoria, JSON.stringify(req.body)));
    }

    public async guardarDatos(req: Request, res: Response) {
        const obj = new red();
        res.status(200).send(await obj.guardarDatos(+req.params.persona, JSON.stringify(req.body)));
    }

    public async getPostulacion(req: Request, res: Response) {
        const obj = new red();
        res.status(200).send(await obj.getPostulacion(+req.params.persona));
    }

    public async getHabilitado(req: Request, res: Response) {
        const obj = new red();
        res.status(200).send(await obj.getHabilitado(+req.params.persona));
    }

    public async getInfoDNI(req: Request, res: Response) {
        const obj = new red();
        res.status(200).send(await obj.getInfoDNI(+req.params.persona));
    }

    public async getFotografia(req: Request, res: Response) {
        const obj = new red();
        res.status(200).send(await obj.getFotografia(+req.params.persona));
    }
}

export default dni;