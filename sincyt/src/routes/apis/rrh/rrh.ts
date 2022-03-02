import express = require("express");
import { Request, Response } from "express";

import  rrh from "../../../controllers/apis/rrh/rrh"

export const routerrrh = express.Router();

const controlador = new rrh();

routerrrh.use('',controlador.router);


routerrrh.get('/saludo', (req : Request, res : Response) => {

    res.status(200).json(
        {
            resultado : "hola",
            mensaje : " desde rrh"
        }
    );

});

export default routerrrh;