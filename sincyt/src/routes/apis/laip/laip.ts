import * as express from 'express';
import { Request, Response } from "express";

import laipController from "../../../controllers/apis/laip/laip";

export const routerLAIP = express.Router();

const controlador = new laipController();

routerLAIP.use('', controlador.router);


routerLAIP.get('/saludo', (req: Request, res: Response) => {

    res.status(200).json(
        {
            resultado: "hola",
            mensaje: "desde laip"
        }
    );

});

export default routerLAIP;