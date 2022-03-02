import * as express from 'express';
import { Request, Response } from "express";

import carpetaController from "../../../controllers/apis/carpetaDigital/carpeta";

export const routercarpeta = express.Router();

const controlador = new carpetaController();

routercarpeta.use('', controlador.router);


routercarpeta.get('/saludo', (req: Request, res: Response) => {

    res.status(200).json(
        {
            resultado: "hola",
            mensaje: "desde carpeta digital"
        }
    );

});

export default routercarpeta;