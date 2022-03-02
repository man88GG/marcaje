/**
 * IMPORT DE MODULOS DE NODE.JS
 */

import express from "express";
import "reflect-metadata";
import { Request, Response } from "express";
import { ConnectionSINCYT } from "./models/ConnectionSINCYT";
import { Router } from "express";

const app = express();
import https from 'https';
import fs from 'fs';
import paht from 'path';
import osServer from 'os';
import cors from 'cors';
app.use(cors());

const port = 8080; // default port to listen
const devPort = 5000; // default port to listen

const os = osServer.hostname();
/*
const nombreServidor = require('dns').lookup(os,function (err :any,add:string,fam:any) {
});
*/

/**
 * Importacion del indice de rutas
 */

import indexRutas from "./routes/index";

/**
 * Set de direcciones raiz
 */

const creacionConexionsGlobal = new ConnectionSINCYT(os);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', __dirname + '/');

/**
 * Agregación de rutas al app
 */

app.get("/", (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', 1); // If needed
  res.send("SENACYT - API Rest");
});

/**
 * Inicio del servidor Express
 */


/**
 * Agregacion de rutas al router
 */

// app.set('view engine','jsx');
// const options = { beautify: true };
// tslint:disable-next-line:no-var-requires
// app.engine('jsx', require('express-react-views').createEngine(options));
app.set('view engine', 'pug');
app.use('/apis', indexRutas);

// tslint:disable-next-line:no-var-requires
const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.listen(devPort, () => {
  console.log(`develop server started at http://localhost:${devPort}`);
});

if (fs.existsSync(paht.join(__dirname, '/../../../crt/ssl-senacyt-2019.key')) && fs.existsSync(paht.join(__dirname, '/../../../crt/STAR_senacyt_gob_gt_2020.crt'))) {
  console.log("-----");
  console.log("Inicio de servidor producción en servidor https en puerto 8080");
  https.createServer({
    key: fs.readFileSync(paht.join(__dirname, '/../../../crt/ssl-senacyt-2019.key')),
    cert: fs.readFileSync(paht.join(__dirname, '/../../../crt/STAR_senacyt_gob_gt_2020.crt'))
  }, app).listen(port);
} else {
  console.log("no se inicio producción")
}
