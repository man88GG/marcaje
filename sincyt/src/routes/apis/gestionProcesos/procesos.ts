import express = require("express");
import { Request, Response } from "express";

import procesosController from "../../../controllers/apis/gestionProcesos/procesos";

export const routerProcesos = express.Router();

const controlador = new procesosController();

routerProcesos.use('',controlador.router);


routerProcesos.get('/mostrar', (req : Request, res : Response) => {

    res.status(200).json(
        {
            resultado : "hola",
            mensaje : "mundo"
        }
    );

});

export default routerProcesos;