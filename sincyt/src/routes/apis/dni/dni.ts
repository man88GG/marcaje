import express = require("express");
import { Request, Response } from "express";

import  dni from "../../../controllers/apis/dni/dni";

export const routerdni = express.Router();

const controlador = new dni();

routerdni.use('',controlador.router);


routerdni.get('/mostrar', (req : Request, res : Response) => {

    res.status(200).json(
        {
            resultado : "hola",
            mensaje : "mundo"
        }
    );

});

export default routerdni;