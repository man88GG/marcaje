import express = require("express");
import { Request, Response } from "express";

import  proyectos from "../../../controllers/apis/ProCienciaGT/proyectos";

export const routerProyectos = express.Router();

const controlador = new proyectos();

routerProyectos.use('',controlador.router);


routerProyectos.get('/mostrar', (req : Request, res : Response) => {

    res.status(200).json(
        {
            resultado : "hola",
            mensaje : "mundo"
        }
    );

});

export default routerProyectos;