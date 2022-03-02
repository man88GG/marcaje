import express = require("express");
import { Request, Response } from "express";
import corebController from "../../../controllers/apis/coreb/coreb";

export const routerCorb = express.Router();

const controlador = new corebController();

routerCorb.use('',controlador.router);


routerCorb.get('/mostrar', (req : Request, res : Response) => {

    res.status(200).json(
        {
            resultado : "hola",
            mensaje : "mundo"
        }
    );

});

export default routerCorb;