import * as express from 'express';
import { Request, Response } from "express";
import { carpetaRegistrar } from "./clases/carpetaRegistrar";
import { carpetaDNIRegistrar } from "./clases/carpetaDNIRegistrar";
import { carpetaSGPRegistrar } from "./clases/carpetaSGPRegistrar";
import { carpetaObtener } from "./clases/carpetaObtener";
import { carpetaActualizar } from "./clases/carpetaActualizar";
import { carpetaEliminar } from "./clases/carpetaEliminar";

import upload from "./clases/carpetaUploadMongo";

export class carpetaController {
    public path = '';
    public router: express.Router = express.Router();

    constructor() {
        this.router.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });

        this.initializeRoutes();
    }

    public initializeRoutes() {
        /*POST*/
        this.router.post(this.path + '/registrar/documento', this.registrarDocumento);
        this.router.post(this.path + '/registrar/carpeta', this.registrarCarpeta);
        this.router.post(this.path + '/registrar/carpetabandeja', this.registrarCarpetaBandeja);
        this.router.post(this.path + '/registrar/documentomongo/:id_usuario', this.registrarDocumentoMongo);
        this.router.post(this.path + '/registrar/bitacora', this.registrarBitacora);
        this.router.post(this.path + '/registrar/usuariorpe', this.registrarUsuarioRPE);
        // MIGRACION
        this.router.post(this.path + '/registrar/migracionrpe', this.migracionRPE);
        this.router.post(this.path + '/registrar/migracionsgp', this.migracionSGP);
        // ------------------------DNI------------------------
        this.router.post(this.path + '/registrar/docdni', this.registrarDocDNI);
        // ------------------------SGP------------------------
        this.router.post(this.path + '/registrar/requisito', this.registrarReqSGP);
        // ------------------------ASGP-----------------------
        this.router.post(this.path + '/registrar/documentomongoadmin/:id_usuario', this.registrarDocumentoMongoAdmin);
        this.router.post(this.path + '/registrar/documentoadmin', this.registrarDocumentoAdmin);
        this.router.post(this.path + '/registrar/documentoadminSinGestion', this.registrarDocumentoAdminWithoutGestion);
        /*GET*/
        this.router.get(this.path + '/obtener/carpetas/:id_usuario', this.obtenerCarpetas);
        this.router.get(this.path + '/obtener/documentos/:id_usuario', this.obtenerDocumentos);
        this.router.get(this.path + '/obtener/raiz/:id_usuario', this.obtenerRaiz);
        this.router.get(this.path + '/obtener/documentomongo/:id_mongo', this.obtenerDocumentoMongo);
        this.router.get(this.path + '/obtener/documentomongotam/:id_mongo', this.obtenerDocumentoMongoTam);
        this.router.get(this.path + '/obtener/bloque/:bloque', this.obtenerBloque);
        this.router.get(this.path + '/obtener/usuario/:vars1/:vars2', this.obtenerUsuarioSes);
        this.router.get(this.path + '/obtener/usuariorpe/:id_usuario', this.obtenerUsuarioRPE_GTU);
        // ------------------------DNI------------------------
        this.router.get(this.path + '/obtener/documentosbyregistro/:no_registro', this.obtenerDocumentosNoRegistro);
        /*PUT*/
        this.router.put(this.path + '/actualizar/documento', this.actualizarDocumento);
        this.router.put(this.path + '/actualizar/carpeta', this.actualizarCarpeta);
        this.router.put(this.path + '/actualizar/posicion/documento', this.actualizarPosicionDocumento);
        this.router.put(this.path + '/actualizar/posicion/carpeta', this.actualizarPosicionCarpeta);
        this.router.put(this.path + '/actualizar/metadocumento', this.actualizarMetaDocumento);
        this.router.put(this.path + '/actualizar/metadocumentomongo', this.actualizarMetaDocumentoMongo);
        this.router.put(this.path + '/actualizar/metaenuso', this.actualizarMetaEnUso);
        // ------------------------SGP------------------------
        this.router.put(this.path + '/actualizar/metaenusocti', this.actualizarMetaEnUsoCTI);
        /*DELETE*/
        this.router.delete(this.path + '/eliminar/documento', this.eliminarDocumento);
        this.router.delete(this.path + '/eliminar/carpeta', this.eliminarCarpeta);
        this.router.delete(this.path + '/eliminar/documentomongo', this.eliminarDocumentoMongo_Verificar);
        this.router.delete(this.path + '/eliminar/docmongo', this.eliminarDocumentoMongo);
        // ------------------------DNI------------------------
        this.router.delete(this.path + '/eliminar/documentoapp', this.eliminarDocumentoApp);
        // ------------------------SGP------------------------
        this.router.delete(this.path + '/eliminar/requisito', this.eliminarRequisito);
    }

    /*POST*/
    public async registrarDocumento(req: Request, res: Response) {
        const obj = new carpetaRegistrar();
        res.status(200).send(await obj.registrarDocumento(req.body.nombre, req.body.id_carpeta, req.body.ref_mongodb));
    }
    public async registrarCarpeta(req: Request, res: Response) {
        const obj = new carpetaRegistrar();
        res.status(200).send(await obj.registrarCarpeta(req.body.nombre, req.body.idusuario, req.body.id_carpeta));
    }
    public async registrarCarpetaBandeja(req: Request, res: Response) {
        const obj = new carpetaRegistrar();
        res.status(200).send(await obj.registrarCarpetaBandeja(req.body.nombre, req.body.idusuario, req.body.id_carpeta));
    }
    public async registrarDocumentoMongo(req: any, res: any) {
        // const usuario = await new carpetaObtener().obtenerUsuario(req.params.id_usuario);
        // req.params.id_usuario = usuario;
        console.log(req.file);
        const obj = await upload(req, res);
        res.status(200).send(res.req.file);
    }
    public async registrarBitacora(req: Request, res: Response) {
        const obj = new carpetaRegistrar();
        res.status(200).send(await obj.registrarBitacora(req.body.usuario, req.body.accion, req.body.tabla, req.body.descripcion));
    }
    public async registrarUsuarioRPE(req: Request, res: Response) {
        const obj = new carpetaRegistrar();
        res.status(200).send(await obj.registrarusuarioRPE(req.body.usuariorpe));
    }

    public async migracionRPE(req: Request, res: Response) {
        const obj = new carpetaRegistrar();
        res.status(200).send(await obj.migracionRPE(req.body.no_documento));
    }

    public async migracionSGP(req: Request, res: Response) {
        const obj = new carpetaRegistrar();
        res.status(200).send(await obj.migracionSGP(req.body.id_perfil_requisito));
    }
    // ------------------------DNI------------------------
    public async registrarDocDNI(req: Request, res: Response) {
        const obj = new carpetaDNIRegistrar();
        res.status(200).send(await obj.registrarDocumentoDNI(req.body.usuario, req.body.no_bloque, req.body.no_tipo_documento, req.body.id_mongo, req.body.no_registro, req.body.id_documento));
    }
    // ------------------------SGP------------------------
    public async registrarReqSGP(req: Request, res: Response) {
        const obj = new carpetaSGPRegistrar();
        res.status(200).send(await obj.limpiarReqSGP(req.body.descripcion, req.body.id_mongo, req.body.id_perfil, req.body.id_requisito_linea));
    }
    // ------------------------ASGP------------------------
    public async registrarDocumentoAdmin(req: Request, res: Response) {
        const obj = new carpetaRegistrar();
        res.status(200).send(await obj.registrarDocumentoAdmin(req.body.nombre, req.body.ref_mongodb, req.body.usuario, req.body.cod_proceso, req.body.id_actividad));
    }
    public async registrarDocumentoAdminWithoutGestion(req: Request, res: Response) {
        const obj = new carpetaRegistrar();
        console.log(req.body);
        res.status(200).send(await obj.registrarDocumentoAdminWithoutGestion(req.body.nombre, req.body.ref_mongodb, req.body.usuario));
    }
    public async registrarDocumentoMongoAdmin(req: any, res: any) {
        const usuario = await new carpetaObtener().obtenerUsuarioRPE(req.params.id_usuario);
        req.params.id_usuario = usuario;
        const obj = await upload(req, res);
        res.status(200).send(res.req.file);
    }

    /*GET*/
    public async obtenerCarpetas(req: Request, res: Response) {
        const obj = new carpetaObtener();
        res.status(200).send(await obj.obtenerCarpetas(req.params.id_usuario));
    }

    public async obtenerDocumentos(req: Request, res: Response) {
        const obj = new carpetaObtener();
        res.status(200).send(await obj.obtenerDocumentos(req.params.id_usuario));
    }

    public async obtenerDocumento(req: Request, res: Response) {
        const obj = new carpetaObtener();
        res.status(200).send(await obj.obtenerDocumento(req.params.id_documento));
    }

    public async obtenerRaiz(req: Request, res: Response) {
        const obj = new carpetaObtener();
        res.status(200).send(await obj.obtenerRaiz(req.params.id_usuario));
    }

    public async obtenerDocumentoMongo(req: Request, res: Response) {
        const obj = new carpetaObtener();
        res.status(200).send(await obj.obtenerDocumentoMongo(req.params.id_mongo));
    }

    public async obtenerDocumentoMongoTam(req: Request, res: Response) {
        const obj = new carpetaObtener();
        res.status(200).send(await obj.obtenerDocumentoMongoTam(req.params.id_mongo));
    }

    public async obtenerBloque(req: Request, res: Response) {
        const obj = new carpetaObtener();
        res.status(200).send(await obj.obtenerBloque(req.params.bloque));
    }

    public async obtenerUsuarioRPE_GTU(req: Request, res: Response) {
        const obj = new carpetaObtener();
        res.status(200).send(await obj.obtenerUsuarioRPE_GTU(req.params.id_usuario));
    }

    public async obtenerUsuarioSes(req: Request, res: Response) {
        const obj = new carpetaObtener();
        res.status(200).send(await obj.obtenerUsuarioSes(req.params.vars1, req.params.vars2));
    }

    // ------------------------DNI------------------------
    public async obtenerDocumentosNoRegistro(req: Request, res: Response) {
        const obj = new carpetaObtener();
        res.status(200).send(await obj.obtenerDocumentosNoRegistro(req.params.no_registro));
    }
    /*PUT*/
    public async actualizarDocumento(req: Request, res: Response) {
        const obj = new carpetaActualizar();
        res.status(200).send(await obj.actualizarDocumento(req.body.id_documento, req.body.nombre));
    }

    public async actualizarCarpeta(req: Request, res: Response) {
        const obj = new carpetaActualizar();

        res.status(200).send(await obj.actualizarCarpeta(req.body.id_carpeta, req.body.nombre));
    }

    public async actualizarPosicionDocumento(req: Request, res: Response) {
        const obj = new carpetaActualizar();
        res.status(200).send(await obj.actualizarPosicionDocumento(req.body.id, req.body.id_padre));
    }

    public async actualizarPosicionCarpeta(req: Request, res: Response) {
        const obj = new carpetaActualizar();
        res.status(200).send(await obj.actualizarPosicionCarpeta(req.body.id, req.body.id_padre));
    }

    public async actualizarMetaDocumento(req: Request, res: Response) {
        const obj = new carpetaActualizar();
        res.status(200).send(await obj.actualizarMetaDocumento(req.body.id_documento, req.body.metadata));
    }

    public async actualizarMetaDocumentoMongo(req: Request, res: Response) {
        const obj = new carpetaActualizar();
        res.status(200).send(await obj.actualizarMetaDocumento_Mongo(req.body.id_mongo, req.body.metadata));
    }

    public async actualizarMetaEnUso(req: Request, res: Response) {
        const obj = new carpetaActualizar();
        res.status(200).send(await obj.actualizarMetaEnUso(req.body.id_mongo, req.body.no_bloque, req.body.id_especifico, req.body.no_registro));
    }
    // ------------------------SGP------------------------
    public async actualizarMetaEnUsoCTI(req: Request, res: Response) {
        const obj = new carpetaActualizar();
        res.status(200).send(await obj.actualizarMetaEnUsoMongo_CTI(req.body.id_mongo, req.body.id_perfil, req.body.id_especifico));
    }
    /*DELETE*/
    public async eliminarDocumento(req: Request, res: Response) {
        const obj = new carpetaEliminar();
        res.status(200).send(await obj.eliminarDocumento(req.body.id_documento));
    }

    public async eliminarCarpeta(req: Request, res: Response) {
        const obj = new carpetaEliminar();
        res.status(200).send(await obj.eliminarCarpeta(req.body.id_carpeta));
    }

    public async eliminarDocumentoMongo_Verificar(req: Request, res: Response) {
        const obj = new carpetaEliminar();
        res.status(200).send(await obj.eliminarDocumentoMongo_Verificar(req.body.id_mongo));
    }

    public async eliminarDocumentoMongo(req: Request, res: Response) {
        const obj = new carpetaEliminar();
        res.status(200).send(await obj.eliminarDocumentoMongo(req.body.id_mongo));
    }
    // ------------------------DNI------------------------
    public async eliminarDocumentoApp(req: Request, res: Response) {
        const obj = new carpetaEliminar();
        res.status(200).send(await obj.eliminarDocumentoApp(req.body.usuario, req.body.id_mongo));
    }
    // ------------------------SGP------------------------
    public async eliminarRequisito(req: Request, res: Response) {
        const obj = new carpetaEliminar();
        res.status(200).send(await obj.eliminarRequisito(req.body.id_usuario, req.body.no_bloque, req.body.id_especifico, req.body.id_perfil_proyecto, req.body.id_requisito_linea));
    }
}

export default carpetaController;