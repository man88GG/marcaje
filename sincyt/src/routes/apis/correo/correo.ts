import * as express from 'express';
import { Request, Response } from "express";

import correoController from "../../../controllers/apis/correo/correo";

export const routercorreo = express.Router();

const controlador = new correoController();

routercorreo.use('', controlador.router);


routercorreo.get('/saludo', (req: Request, res: Response) => {

    res.status(200).json(
        {
            resultado: "hola",
            mensaje: "desde api de correo"
        }
    );

});

export default routercorreo;