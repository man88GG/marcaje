import { type } from 'os';
import nodemailer from 'nodemailer';
import { carpetaObtener } from '../../carpetaDigital/clases/carpetaObtener';
import { correoInsertarBd } from './correoInsertarBd';
import path from 'path';

export class correoCuerpo {

    constructor() {
    }
    public async sendCorreo(correo: any, docs: any, linea: any, usuario: any, id_perfil_proyecto: any, isFase2: any) {
        const asunto = await this.getAsunto(id_perfil_proyecto);
        const logo = await this.getLogo(linea);
        const cuerpo = await this.getCuerpo(linea, usuario, logo, isFase2);
        const docsAdjuntos = await this.getAdjuntos(docs, linea);
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo

        const transporter = nodemailer.createTransport({
            host: 'correo.senacyt.gob.gt',
            auth: {
                user: correo_origen,
                pass: 'Tempseptiembre2021'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'Plataforma de servicios <no-reply@senacyt.gob.gt>',
            to: correo_receptor,
            bcc: correo_origen,
            subject: asunto,
            html: cuerpo,
            attachments: docsAdjuntos
        };
        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error);
                return 0;
            } else {
                console.log('Email enviado: ' + info.response);
                return 1;
            }
        });

        // Insertamos informacion en base de datos relacional
        await this.insertarRelacional(docs, linea, asunto, usuario, correo_origen, correo_receptor, isFase2);
    }

    public async sendCorreoGeneral(correo: any, usuario: any, asuntocorreo: any, cuerpocorreo: any, idmodulo: any) {
        const asunto = asuntocorreo;
        const logo = await this.getLogoModulo(idmodulo);
        const cuerpo = await this.getCuerpoGeneral(cuerpocorreo, usuario, logo);
        const logo_adjunto = await this.getLogoAdjunto(idmodulo);
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo

        const transporter = nodemailer.createTransport({
            host: 'correo.senacyt.gob.gt',
            auth: {
                user: correo_origen,
                pass: 'Tempseptiembre2021'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: 'Plataforma de servicios <no-reply@senacyt.gob.gt>',
            to: correo_receptor,
            bcc: correo_origen,
            subject: asunto,
            html: cuerpo,
            attachments: logo_adjunto,
            // attachments: docsAdjuntos
        };
        transporter.sendMail(mailOptions, await function (error: any, info: any) {
            if (error) {
                console.log(error);
                return 0;
            } else {
                console.log('Email enviado: ' + info.response);
                return 1;
            }
        });

        // Insertamos informacion en base de datos relacional
        await this.insertarRelacionalGeneral(idmodulo, asunto, usuario, correo_origen, correo_receptor, cuerpocorreo);
    }

    public async getLogoAdjunto(idmodulo: any) {
        let logo;
        idmodulo = Number(idmodulo);
        switch (idmodulo) {
            case 173:
                logo = [{
                    filename: "173.png",
                    path: path.join(__dirname, '../logos/173.png'),
                    cid: "logo_173" // same cid value as in the html img src
                }];
                break;
            case 209:
                logo = [{
                    filename: "209.png",
                    path: path.join(__dirname, '../logos/209.png'),
                    cid: "logo_209" // same cid value as in the html img src
                }];
                break;
            default:
                break;
        }
        return logo;
    }

    public async getAsunto(id_perfil_proyecto: any): Promise<any> {
        const asunto = 'Envío a evaluación de perfil ' + id_perfil_proyecto;
        return asunto;
    }

    public async getLogoModulo(idmodulo: any): Promise<any> {
        let logo = ''
        idmodulo = Number(idmodulo);
        switch (idmodulo) {
            case 116://
                logo = 'https://senacyt.gob.gt/portal/images/2021/01/28/iconos-nuevo-portal_mesa-de-trabajo-1.jpg';
                break;
            case 10://
                logo = 'https://senacyt.gob.gt/portal/images/2021/01/28/iconos-nuevo-portal-02.jpg';
                break;
            case 173:
                logo = 'cid:logo_173';
                break;
            case 209:
                logo = 'cid:logo_209';
                break;
            default://
                logo = 'https://senacyt.gob.gt/portal/images/senacyt/iconos/LOGOTIPO-GOBIERNO-SENACYT-01.png';
                break;
        }
        return logo;
    }

    public async getLogo(linea: any): Promise<any> {
        let logo = ''
        switch (linea) {
            case 5:// GenereaCyT
                logo = 'https://fondo.senacyt.gob.gt/portal/templates/yootheme/cache/convocatorias-abiertas-01-2021_Mesa-de-trabajo-1-34db01ab.jpeg';
                break;
            case 6:// Gestiona I+D
                logo = 'https://fondo.senacyt.gob.gt/portal/templates/yootheme/cache/convocatorias-abiertas-01-2021-02-8736b5e6.jpeg';
                break;
            case 10:// SinerCyt
                logo = 'https://fondo.senacyt.gob.gt/portal/templates/yootheme/cache/convocatorias-abiertas-01-2021-05-d575ee90.jpeg';
                break;
            case 11:// InterCTi
                logo = 'https://fondo.senacyt.gob.gt/portal/templates/yootheme/cache/convocatorias-abiertas-01-2021-03-ad1e8d84.jpeg';
                break;
            case 13:// EmprendeCTi
                logo = 'https://fondo.senacyt.gob.gt/portal/templates/yootheme/cache/convocatorias-abiertas-01-2021-06-ab0da636.jpeg';
                break;
            case 14:// TransfiereCTi
                logo = 'https://fondo.senacyt.gob.gt/portal/templates/yootheme/cache/convocatorias-abiertas-01-2021-07-81259e54.jpeg';
                break;
            case 16:// DifundeCTi
                logo = 'https://fondo.senacyt.gob.gt/portal/templates/yootheme/cache/convocatorias-abiertas-01-2021-08-ddcdf22b.jpeg';
                break;
            default:// Corb
                logo = 'https://senacyt.gob.gt/portal/images/senacyt/iconos/LOGOTIPO-GOBIERNO-SENACYT-01.png';
                break;
        }
        return logo;
    }

    public async getCuerpo(linea: any, usuario: any, logo: any, isFase2: any): Promise<any> {
        const cuerpoLinea = await this.getCuerpoPorLinea(linea, isFase2);

        const cuerpo = `<table
    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 800px;Margin: 0 auto;background-color: #f9f9f9;width:100%"
    cellpadding="0" cellspacing="0">
    <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">

                <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
                    <div class="u-row"
                        style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
                        <div
                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                            <div class="u-col u-col-100"
                                style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                <div style="width: 100% !important;">
                                    <div
                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                        <table style="font-family:'Lato',sans-serif;" role="presentation"
                                            cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;"
                                                        align="left">

                                                        <table height="0px" align="center" border="0" cellpadding="0"
                                                            cellspacing="0" width="100%"
                                                            style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                            <tbody>
                                                                <tr style="vertical-align: top">
                                                                    <td
                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                        <span>&nbsp;</span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row"
                        style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #214555;">
                        <div
                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                            <div class="u-col u-col-100"
                                style="max-width: 800px;min-width: 650px;display: table-cell;vertical-align: top;">
                                <div style="width: 100% !important;">
                                    <div
                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                        <table style="font-family:tahoma,arial,helvetica,sans-serif;"
                                            role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:tahoma,arial,helvetica,sans-serif;"
                                                        align="left">

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-right: 0px;padding-left: 0px;"
                                                                            align="center">

                                                                            <img align="center" border="0"
                                                                                src="https://ci4.googleusercontent.com/proxy/4Jd3xL_8HoMgVdjaSluD_6nTOwHpgDhE4RYlVm_FBeE9_hoQmnH2ck-2xmDsxQIFRF_embNCTU8kvw9T3cPXL21F_8bqVjBhXg5P_dmJQ97IKuQg7eVmcXYwnQ=s0-d-e1-ft#https://www.senacyt.gob.gt/portal/images/yootheme/senacyt/logos/logo.png&quot;"
                                                                                alt="Image" title="Image"
                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 29%;max-width: 168.2px;"
                                                                                width="168.2">

                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #214555;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 800px;min-width: 650px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                            <table style="font-family:tahoma,arial,helvetica,sans-serif;"
                                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:tahoma,arial,helvetica,sans-serif;"
                                                            align="left">

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #161a39;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                    <div class="u-col u-col-100"
                                        style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 10px 10px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                                    border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-right: 0px;padding-left: 0px;"
                                                                                align="center">

                                                                                <img align="center" border="0"
                                                                                    src="${logo}"
                                                                                    alt="Image" title="Image"
                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 15%;max-width: 90px;"
                                                                                    width="90">

                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <div
                                                                    style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p
                                                                        style="font-size: 14px; line-height: 140%; text-align: center;">
                                                                        <span
                                                                            style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;">Estimado
                                                                            Investigador: ${usuario} </span>
                                                                    </p>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #214555;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                    <div class="u-col u-col-100"
                                        style="max-width: 800px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                                <table style="font-family:tahoma,arial,helvetica,sans-serif;"
                                                    role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                    border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:tahoma,arial,helvetica,sans-serif;"
                                                                align="left">

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                <div class="u-row"
                                    style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                    <div
                                        style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                        <div class="u-col u-col-100"
                                            style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                            <div style="width: 100% !important;">
                                                <div
                                                    style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;"
                                                                    align="left">

                                                                    <div>
                                                                        ${cuerpoLinea}

                                                                        <p style="font-size: 14px; line-height: 140%;">
                                                                        <span
                                                                        style="font-size: 18px; line-height: 25.2px; color: #666666;">
                                                                        Atte.
                                                                        Secretaría Nacional de Ciencia y Tecnología
                                                                        </span>
                                                                        </p>

                                                                        <strong>No responda a este correo, ya que fue generado de forma automática desde la plataforma de servicios de la SENACYT.</strong>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;"
                                                                    align="left">

                                                                    <div align="center">
                                                                        <a href="https://e.senacyt.gob.gt"
                                                                            target="_blank"
                                                                            data-saferedirecturl="https://www.google.com/url?q=https://e.senacyt.gob.gt&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNGMVrB_dDccplbd7mtYLBWE_GqTTg"
                                                                            style="box-sizing: border-box;display: inline-block;font-family:'Lato',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #18163a; border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;border-top-width: 3px; border-top-style: solid; border-top-color: #CCC; border-left-width: 3px; border-left-style: solid; border-left-color: #CCC; border-right-width: 3px; border-right-style: solid; border-right-color: #CCC; border-bottom-width: 3px; border-bottom-style: solid; border-bottom-color: #CCC;">
                                                                            <span
                                                                                style="display:block;padding:15px 40px;line-height:120%;"><span
                                                                                    style="font-size: 18px; line-height: 21.6px;">
                                                                                    Iniciar
                                                                                    Sesión</span></span>
                                                                        </a>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <table width="570" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                    <tr>
                                        <td align="center">
                                            <p style="font-size: 15px; line-height: 140%;">
                                                <span style="font-size: 15px; line-height: 25.2px; color: #666666;">©
                                                    ${await new correoInsertarBd().getYear()}
                                                    Secretaría Nacional de Ciencia y
                                                    Tecnología.</span>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                <div class="u-row"
                                    style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #214555;">
                                    <div
                                        style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                        <div class="u-col u-col-100"
                                            style="max-width: 800px;min-width: 650px;display: table-cell;vertical-align: top;">
                                            <div style="width: 100% !important;">
                                                <div
                                                    style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                                    <table style="font-family:tahoma,arial,helvetica,sans-serif;"
                                                        role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                        border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:tahoma,arial,helvetica,sans-serif;"
                                                                    align="left">

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div class="u-row-container" style="padding: 0px;background-color: #ffffff">
                                    <div class="u-row"
                                        style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                        <div
                                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                            <div class="u-col u-col-100"
                                                style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                                <div style="background-color: #161a39;width: 100% !important;">
                                                    <div
                                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                        <table style="font-family:'Lato',sans-serif;"
                                                            role="presentation" cellpadding="0" cellspacing="0"
                                                            width="100%" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;"
                                                                        align="left">

                                                                        <div
                                                                            style="line-height: 350%; text-align: left; word-wrap: break-word;">
                                                                            <table width="100" cellspacing="0"
                                                                                cellpadding="0" align="center">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="33%" valign="middle"
                                                                                            align="left"><a
                                                                                                href="https://www.facebook.com/senacytgt"
                                                                                                target="_blank"
                                                                                                data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/senacyt&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNH0SR6hCxVZJ49v7e-ik_D81CFO7Q"><img
                                                                                                    src="https://ci6.googleusercontent.com/proxy/Xp2fp6OebCWTJ4_myG83cuRxsSg-naPph4Nef1ZkkGK1PR3tByObtf8_M2oueI3hvRSoNSP1X3-ILd4vo-3rOkpmgQ=s0-d-e1-ft#https://e.senacyt.gob.gt/public/img/facebook.png"
                                                                                                    width="48"
                                                                                                    height="48"
                                                                                                    class="CToWUd"></a>
                                                                                        </td>
                                                                                        <td width="34%" valign="middle"
                                                                                            align="left"><a
                                                                                                href="https://twitter.com/senacytgt"
                                                                                                target="_blank"
                                                                                                data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/senacytgt&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNHgETRDgkYWGWJdtkS1VrbK1CGC6w"><img
                                                                                                    src="https://ci4.googleusercontent.com/proxy/pHnsrq-qvTyiGzge2EDdg6H-Glgu61jjyPBgMUSkQqrgfgZzdBc1nvWm7AZ_OrJ4QEdqg0AAfuPrKExw79hHjU9N=s0-d-e1-ft#https://e.senacyt.gob.gt/public/img/twitter.png"
                                                                                                    width="48"
                                                                                                    height="48"
                                                                                                    class="CToWUd"></a>
                                                                                        </td>
                                                                                        <td width="33%" valign="middle"
                                                                                            align="left"><a
                                                                                                href="http://www.linkedin.com/company/senacyt_2"
                                                                                                target="_blank"
                                                                                                data-saferedirecturl="https://www.google.com/url?q=http://www.linkedin.com/company/senacyt_2&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNEuFCgm0WfejIwC3Rd18DgVovpBUQ"><img
                                                                                                    src="https://ci4.googleusercontent.com/proxy/FWN6EqjsYmUazLpxKQ-T5_ZEHYDg772QeyboS7XLviL8uYm8UCmfrRW6uy8numqjbBSdiwAC_MSzwU9pHKuN5XjcFw=s0-d-e1-ft#https://e.senacyt.gob.gt/public/img/linkedin.png"
                                                                                                    width="48"
                                                                                                    height="48"
                                                                                                    class="CToWUd"></a>
                                                                                        </td>
                                                                                        <td width="33%" valign="middle"
                                                                                            align="left"><a
                                                                                                href="https://www.youtube.com/user/senacytconcyt"
                                                                                                target="_blank"
                                                                                                data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/user/senacytconcyt&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNGG8KSQJ33A4HxXppXgPBY6UI0RSg"><img
                                                                                                    src="https://ci6.googleusercontent.com/proxy/QM_Lnh3bFzr9sp2GMS_kEaSgBVOzkeCmDoTYasq1sTNxiEhKW2ZvU-DwHX5P2fIQ-DpFnXMTEalrWEHKr6QsjEdV=s0-d-e1-ft#https://e.senacyt.gob.gt/public/img/youtube.png"
                                                                                                    width="48"
                                                                                                    height="48"
                                                                                                    class="CToWUd"></a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>

                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                    <div class="u-row"
                                        style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #214555;">
                                        <div
                                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                            <div class="u-col u-col-100"
                                                style="max-width: 800px;min-width: 650px;display: table-cell;vertical-align: top;">
                                                <div style="width: 100% !important;">
                                                    <div
                                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                                        <table style="font-family:tahoma,arial,helvetica,sans-serif;"
                                                            role="presentation" cellpadding="0" cellspacing="0"
                                                            width="100%" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:tahoma,arial,helvetica,sans-serif;"
                                                                        align="left">

                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                        <div class="u-row"
                                            style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
                                            <div
                                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">

                                                <div class="u-col u-col-100"
                                                    style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                                    <div style="width: 100% !important;">
                                                        <div
                                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                            <table style="font-family:'Lato',sans-serif;"
                                                                role="presentation" cellpadding="0" cellspacing="0"
                                                                width="100%" border="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px 30px 20px;font-family:'Lato',sans-serif;"
                                                                            align="left">
                                                                            <div
                                                                                style="line-height: 140%; text-align: left; word-wrap: break-word;">

                                                                            </div>

                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            </td>
        </tr>
    </tbody>
</table>`
        return cuerpo;
    }

    public async getCuerpoGeneral(cuerpocorreo: any, usuario: any, logo: any): Promise<any> {
        const cuerpo = `<table
    style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 800px;Margin: 0 auto;background-color: #f9f9f9;width:100%"
    cellpadding="0" cellspacing="0">
    <tbody>
        <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">

                <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
                    <div class="u-row"
                        style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
                        <div
                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                            <div class="u-col u-col-100"
                                style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                <div style="width: 100% !important;">
                                    <div
                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                        <table style="font-family:'Lato',sans-serif;" role="presentation"
                                            cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;"
                                                        align="left">

                                                        <table height="0px" align="center" border="0" cellpadding="0"
                                                            cellspacing="0" width="100%"
                                                            style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                            <tbody>
                                                                <tr style="vertical-align: top">
                                                                    <td
                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                        <span>&nbsp;</span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row"
                        style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #214555;">
                        <div
                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                            <div class="u-col u-col-100"
                                style="max-width: 800px;min-width: 650px;display: table-cell;vertical-align: top;">
                                <div style="width: 100% !important;">
                                    <div
                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                        <table style="font-family:tahoma,arial,helvetica,sans-serif;"
                                            role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:tahoma,arial,helvetica,sans-serif;"
                                                        align="left">

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px;font-family:'Lato',sans-serif;"
                                                            align="left">

                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-right: 0px;padding-left: 0px;"
                                                                            align="center">

                                                                            <img align="center" border="0"
                                                                                src="https://ci4.googleusercontent.com/proxy/4Jd3xL_8HoMgVdjaSluD_6nTOwHpgDhE4RYlVm_FBeE9_hoQmnH2ck-2xmDsxQIFRF_embNCTU8kvw9T3cPXL21F_8bqVjBhXg5P_dmJQ97IKuQg7eVmcXYwnQ=s0-d-e1-ft#https://www.senacyt.gob.gt/portal/images/yootheme/senacyt/logos/logo.png&quot;"
                                                                                alt="Image" title="Image"
                                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 29%;max-width: 168.2px;"
                                                                                width="168.2">

                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #214555;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <div class="u-col u-col-100"
                                    style="max-width: 800px;min-width: 650px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                            <table style="font-family:tahoma,arial,helvetica,sans-serif;"
                                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:tahoma,arial,helvetica,sans-serif;"
                                                            align="left">

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #161a39;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                    <div class="u-col u-col-100"
                                        style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 10px 10px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                                    border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="padding-right: 0px;padding-left: 0px;"
                                                                                align="center">

                                                                                <img align="center" border="0"
                                                                                    src="${logo}"
                                                                                    alt="Image" title="Image"
                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 15%;max-width: 90px;"
                                                                                    width="90">

                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                align="left">

                                                                <div
                                                                    style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p
                                                                        style="font-size: 14px; line-height: 140%; text-align: center;">
                                                                        <span
                                                                            style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;">Estimado
                                                                            Usuario: ${usuario} </span>
                                                                    </p>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #214555;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                    <div class="u-col u-col-100"
                                        style="max-width: 800px;min-width: 650px;display: table-cell;vertical-align: top;">
                                        <div style="width: 100% !important;">
                                            <div
                                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                                <table style="font-family:tahoma,arial,helvetica,sans-serif;"
                                                    role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                    border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:tahoma,arial,helvetica,sans-serif;"
                                                                align="left">

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                <div class="u-row"
                                    style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                    <div
                                        style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                        <div class="u-col u-col-100"
                                            style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                            <div style="width: 100% !important;">
                                                <div
                                                    style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;"
                                                                    align="left">

                                                                    <div>

                                                                    <p style="font-size: 14px; line-height: 140%;">
                                                                        <span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">
                                                                            ${cuerpocorreo}
                                                                        </span>
                                                                    </p>

                                                                        <strong>No responda a este correo, ya que fue generado de forma automática desde la plataforma de servicios de la SENACYT.</strong>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px;font-family:'Lato',sans-serif;"
                                                                    align="left">

                                                                    <div align="center">
                                                                        <a href="https://e.senacyt.gob.gt"
                                                                            target="_blank"
                                                                            data-saferedirecturl="https://www.google.com/url?q=https://e.senacyt.gob.gt&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNGMVrB_dDccplbd7mtYLBWE_GqTTg"
                                                                            style="box-sizing: border-box;display: inline-block;font-family:'Lato',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #18163a; border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;border-top-width: 3px; border-top-style: solid; border-top-color: #CCC; border-left-width: 3px; border-left-style: solid; border-left-color: #CCC; border-right-width: 3px; border-right-style: solid; border-right-color: #CCC; border-bottom-width: 3px; border-bottom-style: solid; border-bottom-color: #CCC;">
                                                                            <span
                                                                                style="display:block;padding:15px 40px;line-height:120%;"><span
                                                                                    style="font-size: 18px; line-height: 21.6px;">
                                                                                    Iniciar
                                                                                    Sesión</span></span>
                                                                        </a>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <table width="570" cellspacing="0" cellpadding="0" align="center">
                                <tbody>
                                    <tr>
                                        <td align="center">
                                            <p style="font-size: 15px; line-height: 140%;">
                                                <span style="font-size: 15px; line-height: 25.2px; color: #666666;">©
                                                    ${await new correoInsertarBd().getYear()}
                                                    Secretaría Nacional de Ciencia y
                                                    Tecnología.</span>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                            <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                <div class="u-row"
                                    style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #214555;">
                                    <div
                                        style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                        <div class="u-col u-col-100"
                                            style="max-width: 800px;min-width: 650px;display: table-cell;vertical-align: top;">
                                            <div style="width: 100% !important;">
                                                <div
                                                    style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                                    <table style="font-family:tahoma,arial,helvetica,sans-serif;"
                                                        role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                        border="0">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:tahoma,arial,helvetica,sans-serif;"
                                                                    align="left">

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div class="u-row-container" style="padding: 0px;background-color: #ffffff">
                                    <div class="u-row"
                                        style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                        <div
                                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                            <div class="u-col u-col-100"
                                                style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                                <div style="background-color: #161a39;width: 100% !important;">
                                                    <div
                                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                        <table style="font-family:'Lato',sans-serif;"
                                                            role="presentation" cellpadding="0" cellspacing="0"
                                                            width="100%" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;"
                                                                        align="left">

                                                                        <div
                                                                            style="line-height: 350%; text-align: left; word-wrap: break-word;">
                                                                            <table width="100" cellspacing="0"
                                                                                cellpadding="0" align="center">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="33%" valign="middle"
                                                                                            align="left"><a
                                                                                                href="https://www.facebook.com/senacytgt"
                                                                                                target="_blank"
                                                                                                data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/senacyt&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNH0SR6hCxVZJ49v7e-ik_D81CFO7Q"><img
                                                                                                    src="https://ci6.googleusercontent.com/proxy/Xp2fp6OebCWTJ4_myG83cuRxsSg-naPph4Nef1ZkkGK1PR3tByObtf8_M2oueI3hvRSoNSP1X3-ILd4vo-3rOkpmgQ=s0-d-e1-ft#https://e.senacyt.gob.gt/public/img/facebook.png"
                                                                                                    width="48"
                                                                                                    height="48"
                                                                                                    class="CToWUd"></a>
                                                                                        </td>
                                                                                        <td width="34%" valign="middle"
                                                                                            align="left"><a
                                                                                                href="https://twitter.com/senacytgt"
                                                                                                target="_blank"
                                                                                                data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/senacytgt&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNHgETRDgkYWGWJdtkS1VrbK1CGC6w"><img
                                                                                                    src="https://ci4.googleusercontent.com/proxy/pHnsrq-qvTyiGzge2EDdg6H-Glgu61jjyPBgMUSkQqrgfgZzdBc1nvWm7AZ_OrJ4QEdqg0AAfuPrKExw79hHjU9N=s0-d-e1-ft#https://e.senacyt.gob.gt/public/img/twitter.png"
                                                                                                    width="48"
                                                                                                    height="48"
                                                                                                    class="CToWUd"></a>
                                                                                        </td>
                                                                                        <td width="33%" valign="middle"
                                                                                            align="left"><a
                                                                                                href="http://www.linkedin.com/company/senacyt_2"
                                                                                                target="_blank"
                                                                                                data-saferedirecturl="https://www.google.com/url?q=http://www.linkedin.com/company/senacyt_2&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNEuFCgm0WfejIwC3Rd18DgVovpBUQ"><img
                                                                                                    src="https://ci4.googleusercontent.com/proxy/FWN6EqjsYmUazLpxKQ-T5_ZEHYDg772QeyboS7XLviL8uYm8UCmfrRW6uy8numqjbBSdiwAC_MSzwU9pHKuN5XjcFw=s0-d-e1-ft#https://e.senacyt.gob.gt/public/img/linkedin.png"
                                                                                                    width="48"
                                                                                                    height="48"
                                                                                                    class="CToWUd"></a>
                                                                                        </td>
                                                                                        <td width="33%" valign="middle"
                                                                                            align="left"><a
                                                                                                href="https://www.youtube.com/user/senacytconcyt"
                                                                                                target="_blank"
                                                                                                data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/user/senacytconcyt&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNGG8KSQJ33A4HxXppXgPBY6UI0RSg"><img
                                                                                                    src="https://ci6.googleusercontent.com/proxy/QM_Lnh3bFzr9sp2GMS_kEaSgBVOzkeCmDoTYasq1sTNxiEhKW2ZvU-DwHX5P2fIQ-DpFnXMTEalrWEHKr6QsjEdV=s0-d-e1-ft#https://e.senacyt.gob.gt/public/img/youtube.png"
                                                                                                    width="48"
                                                                                                    height="48"
                                                                                                    class="CToWUd"></a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>

                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                    <div class="u-row"
                                        style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #214555;">
                                        <div
                                            style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                            <div class="u-col u-col-100"
                                                style="max-width: 800px;min-width: 650px;display: table-cell;vertical-align: top;">
                                                <div style="width: 100% !important;">
                                                    <div
                                                        style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                                                        <table style="font-family:tahoma,arial,helvetica,sans-serif;"
                                                            role="presentation" cellpadding="0" cellspacing="0"
                                                            width="100%" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:tahoma,arial,helvetica,sans-serif;"
                                                                        align="left">

                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                                        <div class="u-row"
                                            style="Margin: 0 auto;min-width: 800px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
                                            <div
                                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">

                                                <div class="u-col u-col-100"
                                                    style="max-width: 800px;min-width: 600px;display: table-cell;vertical-align: top;">
                                                    <div style="width: 100% !important;">
                                                        <div
                                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                            <table style="font-family:'Lato',sans-serif;"
                                                                role="presentation" cellpadding="0" cellspacing="0"
                                                                width="100%" border="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 40px 30px 20px;font-family:'Lato',sans-serif;"
                                                                            align="left">
                                                                            <div
                                                                                style="line-height: 140%; text-align: left; word-wrap: break-word;">

                                                                            </div>

                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            </td>
        </tr>
    </tbody>
</table>`
        return cuerpo;
    }

    public async getCuerpoPorLinea(linea: any, isFase2: any): Promise<any> {
        const nombre_linea = await this.getNombreLinea(linea);
        let cuerpo = ''
        switch (linea) {
            case 5:// GenereaCyT - Fase 2
                cuerpo = isFase2 == true ? await this.getCuerpo5y6Fase2(nombre_linea) : await this.getCuerpo5y6(nombre_linea);
                break;
            case 6:// Gestiona I+D - Fase 2
                cuerpo = isFase2 == true ? await this.getCuerpo5y6Fase2(nombre_linea) : await this.getCuerpo5y6(nombre_linea);
                break;
            case 9:// Social - Fase 2
                cuerpo = await this.getCuerpo9(nombre_linea);
                break;
            case 10:// SinerCyt
                cuerpo = await this.getCuerpo10(nombre_linea);
                break;
            case 11:// InterCTi
                cuerpo = await this.getCuerpo11(nombre_linea);
                break;
            case 13:// EmprendeCTi
                cuerpo = await this.getCuerpo13y14(nombre_linea);
                break;
            case 14:// TransfiereCTi
                cuerpo = await this.getCuerpo13y14(nombre_linea);
                break;
            case 16:// DifundeCTi
                cuerpo = await this.getCuerpo16(nombre_linea);
                break;
            default:// Corb, notifiacacion a senacyt y notificacion a investigador
                break;
        }
        return cuerpo;
    }

    public async getCuerpo5y6Fase2(nombre_linea: any): Promise<any> {
        return ``;
    }

    public async getCuerpo5y6(nombre_linea: any): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Estimado Investigador, su solicitud de
                    financiamiento ${nombre_linea} ha sido
                    recibida exitosamente. Se adjunta el
                    Perfil, la Ficha Financiera y el formato
                    de la Carta Aval y Constancia de Apoyo
                    Institucional y/o de Otras Fuentes. <br>
                    <br>
                    Favor presentar los siguientes
                    requisitos, a la Dirección de Generación
                    y Transferencia de Conocimiento de la
                    Secretaría Nacional de Ciencia y
                    Tecnología -Senacyt-, 3ra Avenida 13-28
                    zona 1, Ciudad de Guatemala, de Lunes a
                    Viernes en horario 8:00 a 14:00, en un
                    máximos de 5 días hábiles. <br>
                    <br>
                    Requisitos: <br>
                </span>
            </p>
            <ul style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    <li>El perfil (Solicitud de Apoyo
                        Financiero Perfiles-ProCiencia
                        Gt-)
                        original y copia. </li>
                    <li>La Ficha Financiera. </li>
                    <li>Carta y Constancia de Apoyo
                        Institucional y/o de Otras
                        Fuentes. </li>
                    <li>Curriculum Vitae que genera el
                        DNI.
                    </li>
                    <li>Fotocopia del DPI. </li>
                    <li>Constancia de Colegiado Activo
                        para
                        el Investigador Principal. </li>
                    <li>Constancia de registro
                        actualizado
                        en el Directorio Nacional de
                        Investigadores DNI del
                        Investigador
                        Principal y/o Coordinador y del
                        Investigador Asociado. </li>
                    <li>Constancia de registro
                        actualizado
                        en el Directorio Nacional de
                        Entidades
                        DNE de la Entidad solicitante.
                    </li>
                    <li>Constancia del Registro
                        Tributario
                        Unificado RTU vigente del
                        Investigador
                        Principal. </li>
                </span>
            </ul>`;
    }

    public async getCuerpo9(nombre_linea: any): Promise<any> {
        return ``;
    }


    public async getCuerpo10(nombre_linea: any): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Estimado Investigador, su solicitud de financiamiento ${nombre_linea}
                    ha sido recibida exitosamente. Se adjunta el Perfil, la Ficha Financiera
                    y el formato de la Carta Aval y Constancia de Apoyo Institucional y/o de
                    Otras Fuentes. <br>
                    <br>
                    Favor presentar los siguientes requisitos, a la Dirección de Generación
                    y Transferencia de Conocimiento de la Secretaría Nacional de Ciencia y Tecnología
                    -Senacyt-, 3ra Avenida 13-28 zona 1, Ciudad de Guatemala, de Lunes a Viernes en
                    horario 8:00 a 14:00, en un máximos de 5 días hábiles. <br>
                    <br>
                    Requisitos:
                </span>
            </p>
            <ul style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    <li>El perfil (Solicitud de Apoyo Financiero Perfiles-ProCiencia Gt-) original y copia. </li>
                    <li>La Ficha Financiera. </li>
                    <li>Curriculum Vitae que genera el DNI. </li>
                    <li>Fotocopia del DPI.</li>
                    <li>Constancia de Colegiado Activo para el Investigador Principal. </li>
                    <li>Constancia de registro actualizado en el Directorio Nacional de Investigadores
                    DNI del Investigador Principal y/o Coordinador y del Investigador Asociado. </li>
                    <li>Constancia de registro actualizado en el Directorio Nacional de Entidades
                    DNE de la Entidad solicitante. </li>
                    <li>Constancia del Registro Tributario Unificado RTU vigente del Investigador Principal.</li>
                    <li>Carta y Constancia de Apoyo Institucional y/o de Otras Fuentes
                    <strong>de todas las entidades.</strong> </li>
                    <li>Constancia de registro actualizado en el Directorio Nacional
                    de Entidades DNE <strong>de todas las entidades solicitantes.</strong></li>
                </span>
            </ul>`;
    }

    public async getCuerpo11(nombre_linea: any): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Estimado Investigador, su solicitud de
                    financiamiento ${nombre_linea} ha sido
                    recibida exitosamente. Se adjunta el
                    Perfil, la Ficha Financiera y el formato
                    de la Carta Aval y Constancia de Apoyo
                    Institucional y/o de Otras Fuentes. <br>
                    <br>
                    Favor presentar los siguientes
                    requisitos, a la Dirección de Generación
                    y Transferencia de Conocimiento de la
                    Secretaría Nacional de Ciencia y
                    Tecnología -Senacyt-, 3ra Avenida 13-28
                    zona 1, Ciudad de Guatemala, de Lunes a
                    Viernes en horario 8:00 a 14:00, en un
                    máximos de 5 días hábiles. <br>
                    <br>
                    Requisitos: <br>
                </span>
            </p>
            <ul style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    <li>El perfil (Solicitud de Apoyo
                        Financiero Perfiles-ProCiencia
                        Gt-)
                        original y copia. </li>
                    <li>La Ficha Financiera. </li>
                    <li>Curriculum Vitae que genera el
                        DNI.
                    </li>
                    <li>Fotocopia del DPI. </li>
                    <li>Constancia de Colegiado Activo
                        para
                        el Investigador Principal. </li>
                    <li>Constancia de registro
                        actualizado
                        en el Directorio Nacional de
                        Investigadores DNI del
                        Investigador
                        Principal y/o Coordinador y del
                        Investigador Asociado. </li>
                    <li>Constancia de registro
                        actualizado
                        en el Directorio Nacional de
                        Entidades
                        DNE de la Entidad solicitante.
                    </li>
                    <li>Constancia del Registro
                        Tributario
                        Unificado RTU vigente del
                        Investigador
                        Principal. </li>
                    <li>Carta y Constancia de Apoyo
                        Institucional y/o de Otras
                        Fuentes. </li>
                    <li>Carta de aprobación de la Convocatoria Internacional. </li>
                    <li>Copia del Protocolo aprobado. </li>
                </span>
            </ul>`;
    }

    public async getCuerpo13y14(nombre_linea: any): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Estimado Investigador, su solicitud de financiamiento de ${nombre_linea} ha
                    sido recibida exitosamente. Se adjunta el Perfil y la Ficha Financiera.

                    Favor presentarlos debidamente firmados, a la Dirección de Generación y Transferencia
                    de Conocimiento de la Secretaría Nacional de Ciencia y Tecnología -Senacyt-, 3ra Avenida
                    13-28 zona 1, Ciudad de Guatemala, de Lunes a Viernes en horario 8:00 a 14:00, en un máximo
                    de el 2 de agosto de 2021.
                </span>
            </p>`
    }

    public async getCuerpo16(nombre_linea: any): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Estimado Investigador, su solicitud de financiamiento ${nombre_linea} ha sido recibida exitosamente.
        Se adjunta el Protocolo, mismo que deberá imprimir, firmar y presentar en la Dirección de Popularización
        Científica y Tecnológica de la Secretaría Nacional de Ciencia y Tecnología - SENACYT -, 3era.Avenida 13 - 28 zona 1,
        Ciudad de Guatemala, de Lunes a viernes en horario  08:00 a 16:00, en un plazo máximo de 5 días hábiles.
                </span>
            </p>`;
    }

    public async getAdjuntos(docs: any, linea: any): Promise<any> {
        const documentos = [];
        for (const doc of docs) {
            const docmongo = await new carpetaObtener().obtenerIdDocumentoMongo(doc);
            const nombredoc = docmongo.nombre_documento_original.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            const nuevo = {
                filename: nombredoc,
                href: new carpetaObtener().obtenerUrl() + '/apis/fsadm/download?id=' + doc
            }
            documentos.push(nuevo);
            console.log(nuevo);
        }

        if ([5, 6, 10, 11].includes(linea)) {// si es administrador se adjunta reporte de investigador
            const doc = '60427a1934e033305c003748';
            const docmongo = await new carpetaObtener().obtenerIdDocumentoMongo(doc);
            const nombredoc = docmongo.nombre_documento_original.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            const nuevo = {
                filename: nombredoc,
                href: new carpetaObtener().obtenerUrl() + '/apis/fsadm/download?id=' + doc
            }
            documentos.push(nuevo);
        }

        return documentos;
    }

    public async getNombreLinea(linea: any): Promise<any> {
        let nombre = ''
        switch (linea) {
            case 5:// GenereaCyT
                nombre = 'GenereaCyT';
                break;
            case 6:// Gestiona I+D
                nombre = 'Gestiona I+D';
                break;
            case 10:// SinerCyt
                nombre = 'SinerCyt';
                break;
            case 11:// InterCTi
                nombre = 'InterCTi';
                break;
            case 13:// EmprendeCTi
                nombre = 'EmprendeCTi';
                break;
            case 14:// TransfiereCTi
                nombre = 'TransfiereCTi';
                break;
            case 16:// DifundeCTi
                nombre = 'DifundeCTi';
                break;
            default:// Corb
                break;
        }
        return nombre;
    }

    public async getTipoCorreoDescripcion(linea: any): Promise<any> {
        let tipo = ''
        switch (linea) {
            case 5:// GenereaCyT
                tipo = 'La Línea EducaCTi-, brinda apoyo económico complementario para realizar estudios a nivel superior (Doctorado, Maestría, Licenciatura) y cursos de especialización o actualización con orientación científico-tecnológica en el exterior o programas a nivel nacional.';
                break;
            case 6:// Gestiona I+D
                tipo = 'Promover la investigación interdisciplinaria, multidisciplinaria y transdisciplinaria, que responda a demandas sociales y económicas para el desarrollo integral del país.';
                break;
            case 10:// SinerCyt
                tipo = 'Promover la investigación científica, básica, aplicada, de desarrollo tecnológico y experimental, de manera interdisciplinaria, multidisciplinaria y transdisciplinaria, que respondan a convocatorias de organismos internacionales de cooperación y atiendan demandas sociales y de producción nacional, regional e internacional.';
                break;
            case 11:// InterCTi
                tipo = 'Promover la investigación científica, básica, aplicada, de desarrollo tecnológico y experimental, de manera interdisciplinaria, multidisciplinaria y transdisciplinaria, que respondan a convocatorias de organismos internacionales de cooperación y atiendan demandas sociales y de producción nacional, regional e internacional.';
                break;
            case 13:// EmprendeCTi
                tipo = 'La misión es generar capacidades en el sector productivo, estado y las diferentes instituciones Académicas, mediante el apoyo a programas de alto impacto que permitan brindar conocimientos y destrezas en innovación y emprendimiento a efecto de ser entes multiplicadores del conocimiento.';
                break;
            case 14:// TransfiereCTi
                tipo = 'Lograr que surjan y crezcan más empresas de base científico-tecnológica que sean innovadoras, dinámicas y responsables, para luego insertarlas al mercado mediante el apoyo a proyectos de alto impacto, desde el ámbito individual de cada empresa y grupos empresariales que trabajan asociativamente hasta cadenas de producción, incluyendo clústeres e instituciones en torno a una actividad productiva.';
                break;
            case 16:// DifundeCTi
                tipo = 'Estimular la difusión, promoción y apropiación social de la producción científica y tecnológica, por medio de diferentes mecanismos, asegurando que la misma llegue a todos los públicos y actores vinculados al desarrollo socioeconómico nacional.';
                break;
            default:// Corb
                break;
        }
        return tipo;
    }

    public async getTipoCorreo(linea: any): Promise<any> {
        switch (linea) {
            case 5:// GenereaCyT
                return 2;
            case 6:// Gestiona I+D
                return 3;
            case 10:// SinerCyt
                return 4;
            case 11:// InterCTi
                return 5;
            case 13:// EmprendeCTi
                return 6;
            case 14:// TransfiereCTi
                return 7;
            case 16:// DifundeCTi
                return 1;
            default:// Corb, notifiacacion a senacyt y notificacion a investigador
                return 0;
        }
    }

    public async getTipoCorreoDescripcionGeneral(idmodulo: any): Promise<any> {
        let tipo = ''
        idmodulo = Number(idmodulo);
        switch (idmodulo) {
            case 2:// Configuración institucional
                tipo = 'Configuración institucional';
                break;
            case 5:// Configuración de plataforma
                tipo = 'Configuración de plataforma';
                break;
            case 7:// Gestión de planes operativos anuales
                tipo = 'Gestión de planes operativos anuales';
                break;
            case 10:// Directorio Nacional de Investigadores
                tipo = 'Directorio Nacional de Investigadores';
                break;
            case 39:// Gestión de Calidad
                tipo = 'Gestión de Calidad';
                break;
            case 66:// Gestión de comisiones
                tipo = 'Gestión de comisiones';
                break;
            case 86:// Ley de Acceso de la Información Pública
                tipo = 'Ley de Acceso de la Información Pública';
                break;
            case 105:// Servicios Internos
                tipo = 'Servicios Internos';
                break;
            case 114:// Gestión de archivos
                tipo = 'Gestión de archivos';
                break;
            case 116:// Directorio Nacional de Entidades
                tipo = 'Directorio Nacional de Entidades';
                break;
            case 127:// Mesa de Servicios
                tipo = 'Mesa de Servicios';
                break;
            case 162:// Gestión de Documentos Internos
                tipo = 'estión de Documentos Internos';
                break;
            case 167:// Blockchain
                tipo = 'Blockchain';
                break;
            case 171:// Gestión de Requisiciones
                tipo = 'Gestión de Requisiciones';
                break;
            case 173:// Gestión de Requisiciones
                tipo = 'Registro de Requisición';
                break;
            case 177:// Nomenclatura Presupuestaria
                tipo = 'Nomenclatura Presupuestaria';
                break;
            case 180:// Gestión de Procesos
                tipo = 'Gestión de Procesos';
                break;
            case 183:// SIMPLE
                tipo = 'SIMPLE';
                break;
            case 185:// Gestión Administrativa
                tipo = 'Gestión Administrativa';
                break;
            case 187:// Actualizacion
                tipo = 'Actualizacion';
                break;
            case 192:// Carpeta digital
                tipo = 'Carpeta digital';
                break;
            case 199:// Servicios de popularización
                tipo = 'Servicios de popularización';
                break;
            case 209:// Gestión Documental
                tipo = 'Gestión Documental';
                break;
            default:// cambiar
                break;
        }
        return tipo;
    }

    public async getTipoCorreoGeneral(idmodulo: any): Promise<any> {
        idmodulo = Number(idmodulo);
        switch (idmodulo) {
            case 2:// Configuración institucional
                return 10;
            case 5:// Configuración de plataforma
                return 11;
            case 7:// Gestión de planes operativos anuales
                return 12;
            case 10:// Directorio Nacional de Investigadores
                return 13;
            case 39:// Gestión de Calidad
                return 14;
            case 66:// Gestión de comisiones
                return 15;
            case 86:// Ley de Acceso de la Información Pública
                return 16;
            case 105:// Servicios Internos
                return 17;
            case 114:// Gestión de archivos
                return 18;
            case 116:// Directorio Nacional de Entidades
                return 19;
            case 127:// Mesa de Servicios
                return 20;
            case 162:// Gestión de Documentos Internos
                return 21;
            case 167:// Blockchain
                return 22;
            case 171:// Gestión de Requisiciones
                return 23;
            case 173:// Registro de Requisición
                return 31;
            case 177:// Nomenclatura Presupuestaria
                return 24;
            case 180:// Gestión de Procesos
                return 25;
            case 183:// SIMPLE
                return 26;
            case 185:// Gestión Administrativa
                return 27;
            case 187:// Actualizacion
                return 28;
            case 192:// Carpeta digital
                return 29;
            case 199:// Servicios de popularización
                return 30;
            case 209:// Gestión Documental
                return 32;
            default:// cambiar
                return 0;
        }
    }

    public async insertarRelacional(docs: any, linea: any, asunto: any, usuario: any, correo_origen: any, correo: any, isFase2: any): Promise<any> {

        const tipoCorreo = await this.getTipoCorreo(linea);

        const tipoCorreoDescripcion = await this.getTipoCorreoDescripcion(linea);

        const cuerpo = asunto + await this.getCuerpoPorLinea(linea, isFase2);

        const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, tipoCorreo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(usuario, correo, respuesta.id_correo);
        console.log(respuesta1);

        for (const doc of docs) {
            const docmongo = await new carpetaObtener().obtenerIdDocumentoMongo(doc);
            const nombredoc = docmongo.nombre_documento_original.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            const respuesta2 = await new correoInsertarBd().insertarDocumento(nombredoc, doc, respuesta.id_correo);
            console.log(respuesta2);
            const respuesta3 = await new correoInsertarBd().insertarBitacora(correo_origen, correo, cuerpo, nombredoc, doc, tipoCorreoDescripcion, 1, '');
            console.log(respuesta3);
        }

        if ([5, 6, 10, 11].includes(linea)) {// si es administrador se adjunta reporte de investigador
            const doc = '60427a1934e033305c003748';
            const docmongo = await new carpetaObtener().obtenerIdDocumentoMongo(doc);
            const nombredoc = docmongo.nombre_documento_original.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            const respuesta4 = await new correoInsertarBd().insertarDocumento(nombredoc, doc, respuesta.id_correo);
            console.log(respuesta4);
            const respuesta5 = await new correoInsertarBd().insertarBitacora(correo_origen, correo, cuerpo, nombredoc, doc, tipoCorreoDescripcion, 1, '');
            console.log(respuesta5);
        }

        // Si no trae adjuntos igual se registra en bitacora
        if (docs.length == 0 && !([5, 6, 10, 11].includes(linea))) {
            const respuesta1_envio = await new correoInsertarBd().insertarBitacora(correo_origen, correo, cuerpo, '', '', tipoCorreoDescripcion, 1, '');
            console.log(respuesta1_envio);
        }

    }

    public async insertarRelacionalGeneral(idmodulo: any, asunto: any, usuario: any, correo_origen: any, correo: any, cuerpo: any): Promise<any> {

        const tipoCorreo = await this.getTipoCorreoGeneral(idmodulo);

        const tipoCorreoDescripcion = await this.getTipoCorreoDescripcionGeneral(idmodulo);

        const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, tipoCorreo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(usuario, correo, respuesta.id_correo);
        console.log(respuesta1);


        const respuesta1_envio = await new correoInsertarBd().insertarBitacora(correo_origen, correo, cuerpo, '', '', tipoCorreoDescripcion, 1, '');
        console.log(respuesta1_envio);
    }
}