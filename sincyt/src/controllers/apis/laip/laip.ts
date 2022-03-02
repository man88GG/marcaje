import * as express from 'express';
import { Request, Response } from "express";
import { migracionPeriodoAnual } from "./clases/migracion-periodo-anual"
import { parametros } from "./clases/parametro"

export class laipController {
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
        /*GET*/
        this.router.get('/prueba', this.prueba);
        this.router.get('/obtenerParametro/:id', this.obtenerParametro);
        /*PUT*/
        this.router.put('/migracionAnualLAIP', this.migrarAnio);
    }

    /*GET*/
    public async prueba(req: Request, res: Response) {
        res.status(200).send({prueba: "holaaa"})
    }
    public async obtenerParametro(req: Request, res: Response) {
        const obj = new parametros();
        res.status(200).send(await obj.obtenerParametro(parseInt(req.params.id, 10)))
    }

    /*PUT*/
    public async migrarAnio(req: Request, res: Response) {
        const obj = new migracionPeriodoAnual();
        res.status(200).send(await obj.migrarPeriodoAnual());
    }
}

export default laipController;