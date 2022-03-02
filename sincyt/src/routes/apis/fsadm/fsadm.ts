import express = require("express");
import FsadmController from "../../../controllers/apis/fsadm/fsadm";
import {ConnectionSINCYT} from "../../../models/ConnectionSINCYT";

export const routerFsadm = express.Router();

const controlador = new FsadmController();

routerFsadm.use('',controlador.router);

export default routerFsadm;