/*
    Archivo de especificacion de rutas para el servidor NODEJS
*/

import express = require("express");
import { Request, Response } from "express";

export const router = express.Router();
import fsadm from "./apis/fsadm/fsadm";
import coreb from "./apis/corb/corb";
import dashboard from "./apis/dashboard/dashboard";
import procesos from "./apis/gestionProcesos/procesos";
import carpeta from "./apis/carpetaDigital/carpeta";
import correo from "./apis/correo/correo";
import proyectos from "./apis/ProCienciaGT/proyectos";
import dni from "./apis/dni/dni";
import gestiond from "./apis/gestionDocumental/gestion";
import rrh from "./apis/rrh/rrh";
import laip from "./apis/laip/laip"

router.use("/coreb", coreb);
router.use("/fsadm", fsadm);
router.use("/dash", dashboard);
router.use("/procesos", procesos);
router.use("/carpeta", carpeta);
router.use("/correo", correo);
router.use("/proyectos", proyectos);
router.use("/dni", dni);
router.use("/gestiond", gestiond);
router.use("/rrh", rrh);
router.use("/laip", laip);

router.get("/", (req: Request, res: Response) => {
    const parametro = "hola23";
    res
        .status(200)
        .json(
            { resultado: true, mensaje: parametro }
        );
});

export default router;




