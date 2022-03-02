import * as express from 'express';
import { Request, Response } from "express";

import { validador } from './clases/validador';
import { obtener_proyectos } from './clases/obtener_proyectos';

export class proyectos {

    public path = '';
    public router: express.Router = express.Router();
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path + '/obtener/validar_monto/:fonacyt/:contrapartida/:linea', this.validarMontos);
        this.router.get(this.path + '/obtener/dictamen_dni/:solicitud/:categoria', this.dictamenDNI);
        this.router.get(this.path + '/obtener/categorias', this.getCategorias);
        this.router.get(this.path + '/obtener/proyectos/:usuario', this.obtenerProyectos);
        this.router.post(this.path + '/obtener/proyectos_admin/:usuario', this.obtenerProyectos_admin);
    }

    public async validarMontos(req: Request, res: Response) {
        const obj = new validador();
        res.status(200).send(await obj.validarMontos(+req.params.fonacyt, +req.params.contrapartida, +req.params.linea));
    }

    public async dictamenDNI(req: Request, res: Response) {
        const obj = new validador();
        const file = await obj.dictamenDNI(+req.params.solicitud, req.params.categoria);
        res.download(__dirname + "/clases/" + file);
    }

    public async getCategorias(req: Request, res: Response) {
        const obj = new validador();
        res.status(200).send(await obj.getCategorias());
    }

    public async obtenerProyectos(req: Request, res: Response) {
        const obj = new obtener_proyectos();
        res.status(200).send(await obj.obtenerProyectos(req.params.usuario));
    }

    public async obtenerProyectos_admin(req: Request, res: Response) {
        const obj = new obtener_proyectos();
        res.status(200).send(await obj.obtenerProyectos_admin(req.params.usuario));
    }
}

export default proyectos;