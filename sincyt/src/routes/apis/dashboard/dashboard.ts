import express = require("express");
import DashboardController from "../../../controllers/apis/dashboard/dashboard";

export const routerTablero = express.Router();
const tablero = new DashboardController();

routerTablero.use('',tablero.router);

export default routerTablero;