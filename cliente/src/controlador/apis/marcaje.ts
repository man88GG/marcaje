import * as express from 'express';
import { Request, Response } from "express";
import { resolve } from 'path';
import request from 'request';
import { runInThisContext } from 'vm';
import { marcajeObtener } from './marcaje/cmarcajeObtener';


export class marcaje{
    public path='';
    public router: express.Router = express.Router();
    constructor(){
        this.initializeRoutes();
    }
public initializeRoutes(){

    //---------Get
    this.router.get(this.path + 'obtener/CodigoEmpleado/:pk_id_marcaje',this.obtenerCodigoEmpleado);

}

    public async obtenerCodigoEmpleado( req: Request, res: Response){
        const obj = new marcajeObtener();
        res.status(200).send(await obj.obtenerEmpleado(req.params.fk_id_empleado));
    }

}

export default marcaje

