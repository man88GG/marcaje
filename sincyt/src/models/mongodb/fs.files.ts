import { Schema, Document, model } from "mongoose";
import { Request, Response, Router } from "express";
import * as  mongoType from "mongoose";
import MongoGlobals from "../../constants/mongoGlobals";
import { Any } from "typeorm";

class FsFiles {

    // Schema y tipos
    public senacytFilesSchema = new Schema({});
    public mongooseDBFs: any;

    // Nombre de Schemas
    public senacytFsName: string = "fs";
    public senacytFsFilesName: string = "fs.files";
    public senacytFsChunksName: string = "fs.chunks";

    public obtenerInformacionDocumento(idDocumento: string): string {
        const MongoGlobal = new MongoGlobals();
        const MyNewConnection = MongoGlobal.CrearConexion();
        MongoGlobal.AgregarModelo(this.senacytFsName);
        return "";
    }

    public setConexion(mongooseDBNew: typeof mongoType) {
        this.mongooseDBFs = mongooseDBNew;
    }

    public async infoFileByID(idFile: string): Promise<any> {
        this.mongooseDBFs.models = {};
        // @ts-ignore
        const docs = this.mongooseDBFs.model(this.senacytFsFilesName, {}, this.senacytFsFilesName);
        const mongooseObject = require("mongoose");
        let resultado: string;

        resultado = await docs.findOne({ _id: mongooseObject.Types.ObjectId(idFile) }, (err: any, valores: any) => {
            if (err) {
                return "error de conexión";
            } else {
                return valores;
            }
        });

        return await resultado;
    }

    public async deleteByID(idFile: string): Promise<any> {
        this.mongooseDBFs.models = {};
        // @ts-ignore
        const docs = this.mongooseDBFs.model(this.senacytFsFilesName, {}, this.senacytFsFilesName);
        const mongooseObject = require("mongoose");

        await docs.findByIdAndDelete(mongooseObject.Types.ObjectId(idFile), function (err: any, docs: any) {
            if (err) {
                return;
            }
            else {
                console.log("Eliminado: ", docs);
            }
        });
    }

    public async updateByID(id_mongo: string, nombre: string): Promise<any> {
        this.mongooseDBFs.models = {};
        // @ts-ignore
        const docs = this.mongooseDBFs.model(this.senacytFsFilesName, { filename: String, "metadata.nombre_documento_original": String }, this.senacytFsFilesName);
        const mongooseObject = require("mongoose");

        const filename = `doc${await this.GetFecha()}${nombre}`;

        await docs.findByIdAndUpdate(mongooseObject.Types.ObjectId(id_mongo), { filename, "metadata.nombre_documento_original": nombre }, { new: true }, function (err: any, docs: any) {
            if (err) {
                return;
            }
            else {
                console.log("Modificado: ", docs);
            }
        });
    }

    public async updateMetaByID(id_mongo: string, metadata: any): Promise<any> {
        this.mongooseDBFs.models = {};
        // @ts-ignore
        const docs = this.mongooseDBFs.model(this.senacytFsFilesName, { "metadata.gestiones": Array }, this.senacytFsFilesName);
        const mongooseObject = require("mongoose");

        metadata.fecha_uso = new Date();
        await docs.findByIdAndUpdate(mongooseObject.Types.ObjectId(id_mongo), { $addToSet: { "metadata.gestiones": metadata } }, { new: true, upsert: true }, function (err: any, docs: any) {
            if (err) {
                return;
            }
            else {
                console.log("Modificado: ", docs);
            }
        });
    }


    public async updateEnUso(id_mongo: string, no_bloque: any, id_especifico: any, no_registro: any): Promise<any> {
        let consultaExtra = false;
        if (no_registro !== undefined && no_registro !== '') {
            consultaExtra = true;
            console.log("entro a NO REGISTRO", no_registro !== undefined || no_registro !== '')
        }

        this.mongooseDBFs.models = {};

        const metadata = new Schema(
            {
                /* usuario: { type: Number },
                 nombre_documento_original: { type: String },
                 modulo: { type: String },*/
                gestiones: [{
                    id_especifico: { type: String },
                    no_bloque: { type: String },
                    en_uso: { type: String },
                    no_registro: { type: String },
                }]
            }
        );
        // @ts-ignore
        const docs = this.mongooseDBFs.model(this.senacytFsFilesName, { metadata }, this.senacytFsFilesName);

        await docs.find({
            "_id": id_mongo,
            "metadata.gestiones.no_bloque": no_bloque
        }, function (err: any, objs: any) {
            if (err) {
                return;
            }
            else {
                for (const obj of objs) {
                    for (const gestion of obj.metadata.gestiones) {
                        if (gestion.id_especifico == id_especifico) {
                            if (consultaExtra) {
                                if (gestion.no_registro == no_registro) {
                                    gestion.en_uso = "0";
                                    console.log("Modificado: ", gestion);
                                }
                            } else {
                                gestion.en_uso = "0";
                            }
                        }
                    }
                    obj.save();
                }
            }

        });
    }

    public async updateEnUsoCTI(id_mongo: string, id_perfil: any, id_especifico: any): Promise<any> {

        this.mongooseDBFs.models = {};

        const metadata = new Schema(
            {
                /* usuario: { type: Number },
                 nombre_documento_original: { type: String },
                 modulo: { type: String },*/
                gestiones: [{
                    id_especifico: { type: String },
                    no_bloque: { type: String },
                    en_uso: { type: String },
                    id_perfil: { type: String },
                }]
            }
        );
        // @ts-ignore
        const docs = this.mongooseDBFs.model(this.senacytFsFilesName, { metadata }, this.senacytFsFilesName);

        await docs.find({
            "_id": id_mongo,
            "metadata.gestiones.id_perfil": id_perfil
        }, function (err: any, objs: any) {
            if (err) {
                return;
            }
            else {
                for (const obj of objs) {
                    for (const gestion of obj.metadata.gestiones) {
                        if (gestion.id_especifico == id_especifico) {
                            gestion.en_uso = "0";
                        }
                    }
                    obj.save();
                }
            }

        });
    }

    // Método que elimina documento si el documento no pertenece a el modulo de carpeta digital
    public async deleteByID_CD(id_mongo: string): Promise<any> {
        this.mongooseDBFs.models = {};

        const metadata = new Schema(
            {
                modulo: { type: String }
            }
        );
        // @ts-ignore
        const docs = this.mongooseDBFs.model(this.senacytFsFilesName, { metadata }, this.senacytFsFilesName);

        await docs.findOneAndDelete({ _id: id_mongo, "metadata.modulo": { $ne: "CD" } }, function (err: any, docs: any) {
            if (err) {
                console.log("Error: ", err);
                return;
            }
            else {
                console.log("Eliminado: ", docs);
            }
        });

    }

    public async getFileByID(id_mongo: string): Promise<any> {
        this.mongooseDBFs.models = {};
        const metadata = new Schema(
            {
                nombre_documento_original: { type: String }
            }
        );
        // @ts-ignore
        const docs = this.mongooseDBFs.model(this.senacytFsFilesName, { metadata }, this.senacytFsFilesName);

        const doc = await docs.findOne({ _id: id_mongo }, function (err: any, docs: any) {
            if (err) {
                console.log("Error: ", err);
                return;
            }
            else {
                return docs;
            }
        });
        return doc.metadata;
    }

    public async getFileByIDTam(id_mongo: string): Promise<any> {
        this.mongooseDBFs.models = {};
        const metadata = new Schema(
            {
                nombre_documento_original: { type: String }
            }
        );
        // @ts-ignore
        const docs = this.mongooseDBFs.model(this.senacytFsFilesName, { metadata }, this.senacytFsFilesName);

        const doc = await docs.findOne({ _id: id_mongo }, function (err: any, docs: any) {
            if (err) {
                console.log("Error: ", err);
                return;
            }
            else {
                return docs;
            }
        });
        return doc;
    }


    public async downloadFile(idFile: string, nombreArchivo: string, res: Response) {

        // CONEXION MONGO Y LIBRERIA MONGOOSE PARA CONEXION
        this.mongooseDBFs.models = {};
        // @ts-ignore
        const docs = this.mongooseDBFs.model(this.senacytFsName, {}, this.senacytFsName);
        const mongooseObject = require("mongoose");
        const grid = require('gridfs-stream');
        grid.mongo = this.mongooseDBFs.mongo;
        const gfs = grid(this.mongooseDBFs.connection.db);

        gfs.collection(this.senacytFsName);
        gfs.files.find({ _id: mongooseObject.Types.ObjectId(idFile) }).toArray((err: any, files: any) => {
            if (!files || files.length === 0) {
                return res.status(400).json({
                    responseCode: 1,
                    responseMessage: "error"
                })
            } else {
                const readStream = gfs.createReadStream({
                    filename: files[0].filename,
                    root: this.senacytFsName
                });

                const mime = require('mime');
                const tipo = mime.lookup(files[0].filename);
                res.set('Content-Type', tipo);
                return readStream.pipe(res);
            }
        });
    }

    public async uploadFile(router: Router, pathRoot: string) {

        const crypto = require('crypto');
        const mongoose = require('mongoose');
        const GridFsStorage = require('multer-gridfs-storage');
        const Grid = require('gridfs-stream');
        const multer = require('multer');

        // Inicia el stream
        const gfs = await Grid(this.mongooseDBFs.connection.db, mongoose.mongo);
        gfs.collection('fs');

        let metadatas: any;
        const reiniciarMetadata: any = (objeto: any) => {
            metadatas = objeto;
        }

        // Engine
        const storage: any = new GridFsStorage({
            url: new MongoGlobals().db,
            cache: true,
            db: this.mongooseDBFs.connection.db,
            options: { useUnifiedTopology: true },
            file: (req: any, file: any) => {
                return new Promise((resolve, reject) => {
                    const fileInfo = {
                        filename: file.originalname,
                        bucketName: 'fs',
                        metadata: metadatas ? metadatas : "sin valor"
                    };
                    resolve(fileInfo);
                });
            }
        });

        const upload = multer({
            storage
        });

        router.post(
            pathRoot + '/upload',
            (req, res, next) => {
                if (req.query.metadata) {

                    // @ts-ignore
                    metadatas = JSON.parse(req.query.metadata);
                    reiniciarMetadata(metadatas);
                } else {
                    console.log("sin parametro");
                }
                next();
            },
            upload.single('inputArchivo'),
            (req: Request, res: Response) => {
                // @ts-ignore
                req.file._id = req.file.id;
                res.send(req.file);
            }
        );
    }

    public selectAllFiles(): string {

        this.mongooseDBFs.models = {};
        // @ts-ignore
        const docs = this.mongooseDBFs.model(this.senacytFsFilesName, {}, this.senacytFsFilesName);

        return docs.find({}, (err: any, valores: any) => {
            if (err) {
                return "error de conexión";
            } else {
                return valores;
            }
        });
        /*
                mongooseDB.connect(myMongoG.db,{useNewUrlParser: true, useUnifiedTopology: true});
                mongooseDB.models = {};
                const docs = mongooseDB.model(myMongoModels.senacytFsFilesName,{}, myMongoModels.senacytFsFilesName);

                docs.find({},(err : any ,valores: any ) => {
                    if(err){
                        res.send("error de conexión");
                    }else{
                        res.send(valores);
                    }
                });*/
    }

    public async GetFecha() {
        const date_ob = new Date();

        // current date
        const date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        const year = date_ob.getFullYear();

        // current hours
        const hours = date_ob.getHours();

        // current minutes
        const minutes = date_ob.getMinutes();

        // current seconds
        const seconds = date_ob.getSeconds();

        // YYYY-MM-DD HH-MM-SS format
        return year + "-" + month + "-" + date + " " + hours + "-" + minutes + "-" + seconds;
    }
}


export default FsFiles;
