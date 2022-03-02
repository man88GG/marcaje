import { Application } from "express";
import express from "express";
import * as mongoType from "mongoose";

const app: Application = express();

class MongoGlobals {

    public usuario: string = "developer";
    public contrasenia: string = "des+2016";
    public host: string = "mongodb";
    public port: string = "27017";
    public dbNombre: string = "senacyt_files";
    public db: string;// "mongodb://<username>:<password>@172.16.1.:<port>/<database_name>";
    public mongooseDB: any;

    constructor() {
        this.db = "mongodb://" + this.usuario + ":" + this.contrasenia + "@" + this.host + ":" + this.port + "/" + this.dbNombre;
    }

    public async CrearConexion(): Promise<any> {
        this.mongooseDB = require('mongoose');
        return this.mongooseDB.connect(this.db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            this.mongooseDB.models = {};
            return this.mongooseDB;
        });
    }

    public AgregarModelo(nombreColeccion: string) {
        this.mongooseDB.models = {};
        this.mongooseDB.model(nombreColeccion, new mongoType.Schema<any>(), nombreColeccion);
    }

    public getConexion(): typeof mongoType {
        return this.mongooseDB;
    }

}

export default MongoGlobals;
// mongoConnect(db);
