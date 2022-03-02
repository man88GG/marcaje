import * as express from 'express';
import {Request, Response} from "express";
import 'reflect-metadata';
import {connection} from "mongoose";
import { ConnectionSINCYT }  from '../../../models/ConnectionSINCYT';
import {Connection, createConnection, getConnection} from "typeorm";

export class Dashboard {

    // Dirección base/origen
    public path = '';
    public router: express.Router = express.Router();
    public conexionGlobal: Connection = null;

    public async informacionTematicaConvocatoria(req : Request, res : Response){

        const os = require('os').hostname();
        const conexion = getConnection(os);
        if(conexion.isConnected){
            const query ='select * from sgp_tematica_convocatoria where numero_convocatoria = \'' + req.query.id + '\';';
            const rawData = await conexion.manager.query(query);
            res.status(200).send(rawData);
        }else{
            res.status(900).send({
                mensaje : 'Error conexión a la base de datos.'
            });
        }

    }

    constructor() {
        this.initializeRoutes()
    }

    initializeRoutes(){
        this.router.get(this.path + '/listadoConvocatorias',this.listadoConvocatorias);
        this.router.get(this.path + '/listadoLineasFinanciamiento', this.listadoLineasFinanciamiento);
        this.router.get(this.path + '/listadoProgramasFonacyt',this.listadoProgramasFonacyt);
        this.router.get(this.path + '/informacionConvocatoria',this.informacionConvocatoria);
        this.router.get(this.path + '/informacionLineaConvocatoria',this.informacionLineaConvocatoria);
        this.router.get(this.path + '/informacionTematicaConvocatoria',this.informacionTematicaConvocatoria);
        this.router.get(this.path + '/requisitosLineaAsociacionConvocatoria', this.requisitosLineaAsociacionConvocatoria);
        this.router.get(this.path + '/listadoConvocatoriasFiltrado', this.listadoConvocatoriasFiltrado);
    }

    public async listadoConvocatoriasFiltrado( req : Request, res : Response){

        const fecha_Inicio = req.query.inicio;
        const fecha_Final = req.query.fin;
        const programa = req.query.programa;
        const linea = req.query.linea;

        let query = 'select distinct SCONV.numero_convocatoria, SCONV.nombre, DATE_FORMAT(SCONV.fecha_inicio, \'%d/%m/%Y\') fecha_inicio , DATE_FORMAT(SCONV.fecha_fin, \'%d/%m/%Y\') fecha_fin, SCONV.url_afiche, SCONV.descripcion,  SCONV.fecha_registro, SCONV.fecha_creacion \n' +
            'from sgp_convocatoria SCONV\n';
        const filtro_fecha =
            'where \'' + fecha_Inicio + '\' <= SCONV.fecha_inicio \n' +
            'and \'' + fecha_Final + '\' >= SCONV.fecha_fin\n';

        let caso = -1;
        const joinProgramaLinea =
            'left join sgp_linea_convocatoria SLC on SLC.numero_convocatoria = SCONV.numero_convocatoria \n' +
            'left join sgp_linea SLINEA ON SLINEA.id_linea = SLC.id_linea';

        const filtroPrograma = ' SLINEA.id_linea_padre = ' + programa + "\n";
        const filtroLinea = 'and SLINEA.id_linea in (' + linea + ')';

        // @ts-ignore
        if(programa != -1 && linea != -1){
            // Busqueda por programas y lineas
            caso = 0;
            query += joinProgramaLinea + "\n";
            if(fecha_Inicio == fecha_Final && fecha_Inicio == 'NaN-NaN-NaN'){
                query += 'where' + filtroPrograma;
            }else{
                query += filtro_fecha + "\n";
                query += 'and' + filtroPrograma + "\n";
            }
            query += filtroLinea + "\n";

            // @ts-ignore
        }else if (programa != -1 && linea == -1){
            // Busqueda por programa
            caso = 1;
            query += joinProgramaLinea + "\n";
            if(fecha_Inicio == fecha_Final && fecha_Inicio == 'NaN-NaN-NaN'){
                query += 'where' + filtroPrograma;
            }else{
                query += filtro_fecha + "\n";
                query += 'and' + filtroPrograma + "\n";
            }

            // @ts-ignore
        }else if (programa == -1 && linea == -1){
            // Busqueda sin programa o lineas
            query += filtro_fecha;
            caso = 2;
        }else{
            // Error, linea asignada pero programa no
            caso = 3;
        }

        const ordenPor = 'order by fecha_registro desc;';
        query = query  + ordenPor;


        const os = require('os').hostname();
        const connection = getConnection(os);

        if(connection.isConnected){
            const resultado = await connection.manager.query(query);
            res.status(200).send(resultado);
        }else{
            res.status(900).send({
                mensaje : 'Error conexión a la base de datos.'
            });
        }

    }

    public async requisitosLineaAsociacionConvocatoria( req : Request, res : Response){


        const os = require('os').hostname();
        const connection = getConnection(os);
        if(connection.isConnected){
            const query = 'select SC.*, SD.descripcion, SD.abreviatura, SD.tipo_documento\n' +
                'from sgp_convocatoria_documento SC\n' +
                'join sgp_tipo_documento SD on SC.id_tipo_documento = SD.id_tipo_documento\n' +
                'where numero_convocatoria = \'' + req.query.convocatoria + '\' \n' +
                'and id_linea = \'' + req.query.linea + '\';\n';

            const resultado = await connection.manager.query(query);
            res.status(200).send(resultado);
        }else{
            res.status(900).send({
                mensaje : 'Error conexión a la base de datos.'
            });
        }

    }

    public async consultaLineaConvocatoriaPorPrograma( id_convocatoria : number, id_programa : number){

        const os = require('os').hostname();
        const connection = getConnection(os);
        if(connection.isConnected){
            const query = 'select * from sgp_linea_convocatoria\n' +
                'join sgp_linea on sgp_linea_convocatoria.id_linea = sgp_linea.id_linea\n' +
                'where sgp_linea.id_linea_padre = ' + id_programa + '\n' +
                'and sgp_linea_convocatoria.numero_convocatoria = \'' + id_convocatoria + '\';'

            const resultado = await connection.manager.query(query);
            return resultado;
        }else{
            return {
                mensaje : 'Error conexión a la base de datos.'
            };
        }




        return  (new ConnectionSINCYT()).retornarConexion().then(async connection => {

        });
    }

    public async informacionLineaConvocatoria(req : Request, res : Response){


        const os = require('os').hostname();
        const conexion = getConnection(os);
        if(conexion.isConnected){

            const query : string = 'select * from sgp_linea where tipo_linea = 2;';
            const programasFonacyt = await conexion.manager.query(query);

            const cuerpo = [];

            for(let contador = 0; contador < programasFonacyt.length; contador ++){
                const objetoPivote = new Dashboard();

                // @ts-ignore
                const lineasAsociadas = await objetoPivote.consultaLineaConvocatoriaPorPrograma(req.query.id,programasFonacyt[contador].id_linea);
                if(lineasAsociadas.length > 0){
                    const nuevo = {
                        id_programa : programasFonacyt[contador].id_linea,
                        acronimo_programa : programasFonacyt[contador].acronimo,
                        nombre_programa : programasFonacyt[contador].nombre,
                        descripcion_programa : programasFonacyt[contador].descripcion,
                        lineas_asociadas : lineasAsociadas
                    }
                    cuerpo.push(nuevo);
                }
            }

            res.status(200).send(cuerpo);
        }else{
            res.status(900).send({
                mensaje : 'Error conexión a la base de datos.'
            });
        }

    }

    public async informacionConvocatoria(req : Request, res : Response){

        const os = require('os').hostname();
        const conexion = getConnection(os);
        if(conexion.isConnected){
            const rawData = await conexion.manager.query('select *, ( datediff(fecha_fin,current_date()) + 1 ) diferenciaFechas,DATE_FORMAT(fecha_inicio, \'%d/%m/%Y\') fechaI , DATE_FORMAT(fecha_fin, \'%d/%m/%Y\') fechaF  from sgp_convocatoria where numero_convocatoria = \'' + req.query.id +'\';');
            res.status(200).send(rawData);
        }else{
            res.status(900).send({
                mensaje : 'Error conexión a la base de datos.'
            });
        }
    }

    public async listadoConvocatorias(req : Request, res: Response ){

        const os = require('os').hostname();
        const conexion = getConnection(os);
        if(conexion.isConnected){
            const query = 'select numero_convocatoria, nombre, DATE_FORMAT(fecha_inicio, \'%d/%m/%Y\') fecha_inicio , DATE_FORMAT(fecha_fin, \'%d/%m/%Y\') fecha_fin, url_afiche, descripcion,  fecha_registro, fecha_creacion \n' +
                'from sgp_convocatoria \n' +
                'where current_date() >= sgp_convocatoria.fecha_inicio \n' +
                'and current_date() <= sgp_convocatoria.fecha_fin\n' +
                'and 1 = sgp_convocatoria.activo\n' +
                'order by fecha_registro desc;';
            const rawData = await conexion.manager.query(query);
            res.status(200).send(rawData);
        }else{
            res.status(900).send({
                mensaje : 'Error conexión a la base de datos.'
            });
        }

    }

    public async listadoLineasFinanciamiento(req : Request, res : Response){

        const os = require('os').hostname();
        const conexion = getConnection(os);
        if(conexion.isConnected){
            const rawData = await conexion.manager.query('select * from sgp_linea where tipo_linea > 2 and id_linea_padre = ' + req.query.id);
            res.status(200).send(rawData);
        }else{
            res.status(900).send({
                mensaje : 'Error conexión a la base de datos.'
            });
        }

    }

    public async listadoProgramasFonacyt(req : Request, res : Response){


        const os = require('os').hostname();
        const conexion = getConnection(os);
        if(conexion.isConnected){
            const query = 'select * from sgp_linea where tipo_linea = 2;';
            conexion.query(query).then(resultado => {
                res.status(200).send(resultado);
            });
        }else{
            res.status(900).send({
                mensaje : 'Error conexión a la base de datos.'
            });
        }

    }



}

export default Dashboard;