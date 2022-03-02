import * as express from 'express';
import {Request, Response} from "express";
import MongoGlobals from "./../../../constants/mongoGlobals";
import MongoModels from "./../../../models/mongodb/fs.files";
import 'reflect-metadata';
import { ConnectionSINCYT }  from '../../../models/ConnectionSINCYT';
import {getConnection} from "typeorm";

export class FsadmController {

    // Dirección base/origen
    public path = '';

    // Objeto de ruteo
    public router: express.Router = express.Router();

    /**
     * Inicializardor del objeto
     */
    constructor() {
        this.initializeRoutes();
    }

    /**
     * Inicializador de las rutas del controlador
     */
    public initializeRoutes() {

        /**
         * AGREGAR LAS RUTAS A UTILIZAR POR CADA CONTROLADOR
         */

        // Controller endpoints middleware


        this.router.get(this.path + '/listadoModulo',this.listadoModulos);
        this.router.get(this.path + '/listaDocs', this.senacytFilesAll);
        this.router.get(this.path + '/download', this.descargaSenacytFile);
        this.router.get(this.path + '/upload', this.ejemplo);
        this.router.get(this.path + '/dashboard', this.dashboard);
        this.router.get(this.path + '/extra', (req, res) => {
            res.send("hola");
        });
        this.middleChanger(this.router); // Ruta de upload de archivos this.path + '/upload'

        /*
        * EJEMPLOS DE RUTA:
        * this.router.post(this.path, this.createUser);
        * this.router.get(this.path, this.getAllUsers);
        * this.router.get(this.path + '/:id', this.getUser);
        * this.router.put(this.path + '/:id', this.updateUser);
        * this.router.delete(this.path + '/:id', this.deleteUser);
        */
    }

    public async dashboard(req : Request, res :Response){
        res.render('./views/convocatoriasDashboard/inicio');
    }

    public async ejemplo(req : Request, res : Response){
        res.render('./views/fsadm/dashboard.convocatorias.index.pug');
    }

    /**
     * variablesGlobales
     */
    public gridFsStorage = require('multer-gridfs-storage');

    /**
     * Carga de un archivo a la base de datos MongoDB en el collection fs
     * @param req Parametro de pregunta
     * @param res Parametro de respuesta
     */

    public async middleChanger( router : express.Router ) {
        const myMongoModels = new MongoModels();
        const myMongoDriver = new MongoGlobals();
        await myMongoDriver.CrearConexion().then(() => {
            myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
            myMongoModels.setConexion(myMongoDriver.getConexion());
            myMongoModels.uploadFile(router, this.path);
        });
    }

    /**
     * Obtener la información de todos los archivos almacenados en mongodb
     * @param req Parametro de pregunta
     * @param res Parametro de respuesta
     */
    public async senacytFilesAll ( req : Request, res : Response) {
        const myMongoModels = new MongoModels();
        const myMongoDriver = new MongoGlobals();

        await myMongoDriver.CrearConexion();
        myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
        myMongoModels.setConexion(myMongoDriver.getConexion());

        res.send( await  myMongoModels.selectAllFiles());
    }

    /**
     * Descarga un archivo almacenado en mongodb, se deberá enviar el parametro _id de mongodb para el collection fs, el parametro en nodejs es ?id=xxxx
     * @param req Parametro de pregunta
     * @param res Parametro de respuesta
     */
    public async descargaSenacytFile (req : Request, res : Response){


        const myMongoModels = new MongoModels();
        const myMongoDriver = new MongoGlobals();

        await myMongoDriver.CrearConexion().then(() => {

            myMongoDriver.AgregarModelo(myMongoModels.senacytFsName);
            myMongoModels.setConexion(myMongoDriver.getConexion());

            const idArchivo = req.query.id;
            const path = require("path");
            // @ts-ignore
            myMongoModels.infoFileByID(idArchivo).then( infoDocs => {
                // @ts-ignore
                myMongoModels.downloadFile(idArchivo,infoDocs._doc.filename,res);
            });
        });

    }

    /**
     * Busqueda de información de un archvo por medio de su id, el parametro de valor id es ?id=xxxxxxx
     * @param req Parametro de pregunta
     * @param res Parametro de respuesta
     */
    public async senacytFilesFindOne( req : Request, res : Response){
        const mongooseDB = require('mongoose');
        const myMongoG = new MongoGlobals();
        mongooseDB.connect(myMongoG.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const doc = mongooseDB.model('fs',{},'fs');
       doc.find({ _id:req.query.id }, (err:any,data:any)=>{
            if(err) return err;
            res.send(data);
        })
    }

    /**
     * Informacion de los modulos de la plataforma de servicios rgistrados en la tabla gtu_modulo
     * @param req Parametro de pregunta
     * @param res Parametro de respuesta
     */
    public async listadoModulos (req : Request, res : Response){

        const os = require('os').hostname();
        const conexionGlobal = getConnection(os);

        if(conexionGlobal.isConnected){
            const query : string = `select * from gtu_modulo where siglas is not null;`;
            const rawData = await conexionGlobal.manager.query(query);
            res.status(200).send(rawData);
        }else{
            res.status(900).send({
                mensaje : 'conexion fallida'
            });
        }
    }

    /**
     * Información de los modulos de la plataforma de servicios, identificador y siglas del modulo registrado en gtu_modulo
     * @param req Parametro de pregunta
     * @param res Parametro de respuesta
     */
    public async listadoModulosParcial (req : Request, res : Response) {

        const os = require('os').hostname();
        const connection = getConnection(os);

        if(connection.isConnected){
            const rawData = await connection.manager.query(`select id, siglas from gtu_modulo where siglas is not null;`);
            await connection.close();
            res.status(200).send(rawData);
        }else{
            res.status(900).send({
                mensaje : 'conexion fallida'
            });
        }
    }

    /**
     * Consulta de la información de todas las entidades registradas en la tabla dne_entidad
     * @param req Parametro de pregunta
     * @param res Parametro de repsuesta
     */
    public async consultaEntidades (req : Request, res : Response){
        const os = require('os').hostname();
        const connection = getConnection(os);
            if(connection.isConnected){
                const rawData = await connection.manager.query(`SELECT * FROM dne_entidad`);
                await connection.close();
                res.status(200).send(rawData);
            }else{
                res.status(900).send({
                    mensaje : 'conexion fallida'
                });
            }
    }

    /**
     * Validador de las consultas por medio de la URL del APIS
     * @param req Parametro de pregunta
     * @param res Parametro de respuesta
     * @param next Parametro de siguiente funciona a ejecutar
     */
    public validateInput(req: express.Request, res: express.Response, next: express.NextFunction) {
        const params = {id: req.url.split('/')[2]};
        switch (req.method) {
            case 'GET':
                break;
            case 'DELETE':
                if (!params.id) { return res.status(400).send({ message: 'Id is required'}); }
                break;
            case 'POST':
                if (Object.keys(req.body).length === 0) { return res.status(400).send({ message: "Request body can't be empty"}); }
                break;
            case 'PUT':
                if (!params.id) { return res.status(400).send({ message: 'Id is required'}); }
                if (Object.keys(req.body).length === 0) { return res.status(400).send({ message: "Request body can't be empty"}); }
                break;
        }
        next();
    }

}

export default FsadmController;
