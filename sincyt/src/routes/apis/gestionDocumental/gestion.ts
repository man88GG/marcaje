import * as express from 'express';
import { Request, Response } from "express";

import gestiondController from "../../../controllers/apis/gestionDocumental/gestion";

export const rutergestiond = express.Router();

const controlador = new gestiondController();

rutergestiond.use('', controlador.router);


rutergestiond.get('/saludo', (req: Request, res: Response) => {

    res.status(200).json(
        {
            resultado: "hola",
            mensaje: "desde gestion documental"
        }
    );

});

export default rutergestiond;