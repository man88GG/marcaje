import nodemailer from 'nodemailer';
import { correoInsertarBd } from './correoInsertarBd';

export class correoCuerpoPermisoLaboral {

    constructor() {
    }

    /* ingreso de permiso laboral correo para solicitante */

    public async sendSolicitanteIngresoPermisoLaboral(correo:any, nombre:any, TipoPermiso:any, numeroPermiso:any){
        const asunto = 'Notificación de Ingreso de Permiso Laboral';
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo
        const nombre_receptor = nombre;
        const cuerpo = await this.cuerpodeingresodesolicitudlaboral( nombre,  numeroPermiso,TipoPermiso);

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
            html:cuerpo
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


        await this.insertarRelacional(asunto, nombre_receptor, correo_origen, correo_receptor);
    }

    public async cuerpodeingresodesolicitudlaboral ( nombre:any,  numeroPermiso:any ,TipoPermiso:any){
        const cuerpoUsuario = await this.getCuerpoNotificacionPermisoLaboralIngreso();
        // const botonInicio = await this.getBotonInicio(nombre);
        const cuerpo =  `
        <table
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
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0" >
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                    align="left">

                                                                    <div
                                                                        style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                        <p
                                                                            style="font-size: 14px; line-height: 140%; align: center;">
                                                                            <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${nombre}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                El numero de identificacion del permiso es:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${numeroPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                El Tipo de permiso es:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${TipoPermiso}</span>
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
                                                                            ${cuerpoUsuario}

                                                                            <p style="font-size: 14px; line-height: 140%;">
                                                                            <span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">
                                                                            Atte.
                                                                            Secretaría Nacional de Ciencia y Tecnología.
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
    </table>
    `
        return cuerpo;
    }

    public async getCuerpoNotificacionPermisoLaboralIngreso(): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Por este medio se le notifica que usted ingreso correctamente una solicitud de Permiso Laboral,
                    por favor estar atento a la respuesta.
                    !MUCHAS GRACIAS!.
                </span>
            </p>`;
    }

    public async insertarRelacional( asunto: any, nombre_receptor: any, correo_origen: any, correo_receptor: any): Promise<any> {

        const idModulo = 34;
        const cuerpo = asunto + await this.getCuerpoNotificacionPermisoLaboralIngreso();

       const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, idModulo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(nombre_receptor, correo_receptor, respuesta.id_correo);
        console.log(respuesta1);
    }

    /* ingreso de permiso laboral correo para Aprovador */

    public async sendAprovadorIngresoPermisoLaboral(correo:any, nombre:any, TipoPermiso:any, numeroPermiso:any, hora_inicial:any, fecha:any, solicitante:any, fecha_final:any, hora_final:any ,comentario:any){
        const asunto = 'Notificación de Ingreso de Permiso Laboral';
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo
        const nombre_receptor = nombre;
        const cuerpo = await this.cuerpodeingresodesolicitudlaboralAprovador( nombre,  numeroPermiso,TipoPermiso, hora_inicial,fecha,solicitante,fecha_final,hora_final,comentario);

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
            html:cuerpo
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


        await this.insertarRelacionalAprovador(asunto, nombre_receptor, correo_origen, correo_receptor);
    }

    public async cuerpodeingresodesolicitudlaboralAprovador ( nombre:any,  numeroPermiso:any ,TipoPermiso:any, hora_inicial:any, fecha:any, solicitante:any, fecha_final:any, hora_final:any, comentario:any){
        const cuerpoUsuario = await this.getCuerpoNotificacionPermisoLaboralIngresoAprovador();
        // const botonInicio = await this.getBotonInicio(nombre);
        const cuerpo =  `
        <table
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
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                    align="center">

                                                                    <div
                                                                        style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                        <p
                                                                            style="font-size: 14px; line-height: 140%; align: center;">
                                                                            <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${nombre}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Se ha ingresado una solicitud de permiso laboral con numero de identificacion:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${numeroPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                El Tipo de permiso es:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${TipoPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con fecha inicial:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${fecha}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con hora:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${hora_inicial}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con fehcha de finalización:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${fecha_final}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con hora:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${hora_final}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                La solicitud del permiso esta a nombre de:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${solicitante}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Comentario de Permiso:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${comentario}</span>
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
                                                                            ${cuerpoUsuario}

                                                                            <p style="font-size: 14px; line-height: 140%;">
                                                                            <span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">
                                                                            Atte.
                                                                            Secretaría Nacional de Ciencia y Tecnología.
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
    </table>
    `
        return cuerpo;
    }

    public async getCuerpoNotificacionPermisoLaboralIngresoAprovador(): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Por este medio se le notifica que tiene una nueva solicitud de permiso laboral pendiente de revisión.
                    Se le solicita la atencion a este pedido tan pronto sus actividades lo hagan posible.
                    !MUCHAS GRACIAS!.
                </span>
            </p>`;
    }

    public async insertarRelacionalAprovador( asunto: any, nombre_receptor: any, correo_origen: any, correo_receptor: any): Promise<any> {

        const idModulo = 34;
        const cuerpo = asunto + await this.getCuerpoNotificacionPermisoLaboralIngresoAprovador();

       const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, idModulo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(nombre_receptor, correo_receptor, respuesta.id_correo);
        console.log(respuesta1);
    }

    /* ingreso de permiso laboral correo para rh */

    public async sendRHIngresoPermisoLaboral(correo:any, nombre:any, TipoPermiso:any, numeroPermiso:any, hora_inicial:any, fecha:any, solicitante:any, fecha_final:any, hora_final:any ,comentario:any){
        const asunto = 'Notificación de Ingreso de Permiso Laboral';
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo
        const nombre_receptor = nombre;
        const cuerpo = await this.cuerpodeingresodesolicitudlaboralRH( nombre,  numeroPermiso,TipoPermiso, hora_inicial,fecha,solicitante,fecha_final,hora_final,comentario);

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
            html:cuerpo
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


        await this.insertarRelacionalRH(asunto, nombre_receptor, correo_origen, correo_receptor);
    }

    public async cuerpodeingresodesolicitudlaboralRH ( nombre:any,  numeroPermiso:any ,TipoPermiso:any, hora_inicial:any, fecha:any, solicitante:any, fecha_final:any, hora_final:any, comentario:any){
        const cuerpoUsuario = await this.getCuerpoNotificacionPermisoLaboralIngresoRH();
        // const botonInicio = await this.getBotonInicio(nombre);
        const cuerpo =  `
        <table
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
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                    align="center">

                                                                    <div
                                                                        style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                        <p
                                                                            style="font-size: 14px; line-height: 140%; align: center;">
                                                                            <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${nombre}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Se ha ingresado una solicitud de permiso laboral con numero de identificacion:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${numeroPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                El Tipo de permiso es:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${TipoPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con fecha inicial:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${fecha}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con hora:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${hora_inicial}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con fehcha de finalización:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${fecha_final}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con hora:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${hora_final}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                La solicitud del permiso esta a nombre de:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${solicitante}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Comentario de Permiso:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${comentario}</span>
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
                                                                            ${cuerpoUsuario}

                                                                            <p style="font-size: 14px; line-height: 140%;">
                                                                            <span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">
                                                                            Atte.
                                                                            Secretaría Nacional de Ciencia y Tecnología.
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
    </table>
    `
        return cuerpo;
    }

    public async getCuerpoNotificacionPermisoLaboralIngresoRH(): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Por este medio se le notifica a la dirección de recursos humanos que tiene una nueva
                    solicitud de permiso laboral pendiente de revisión.
                    Se le solicita la atencion a este pedido tan pronto sus actividades lo hagan posible.
                    !MUCHAS GRACIAS!.
                </span>
            </p>`;
    }

    public async insertarRelacionalRH( asunto: any, nombre_receptor: any, correo_origen: any, correo_receptor: any): Promise<any> {

        const idModulo = 34;
        const cuerpo = asunto + await this.getCuerpoNotificacionPermisoLaboralIngresoRH();

       const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, idModulo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(nombre_receptor, correo_receptor, respuesta.id_correo);
        console.log(respuesta1);
    }

    /* ingreso de permiso laboral correo para despacho general */
    public async sendDespachoGeneralIngresoPermisoLaboral(correo:any, nombre:any, TipoPermiso:any, numeroPermiso:any, hora_inicial:any, fecha:any, solicitante:any, fecha_final:any, hora_final:any ,comentario:any){
        const asunto = 'Notificación de Ingreso de Permiso Laboral';
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo
        const nombre_receptor = nombre;
        const cuerpo = await this.cuerpodeingresodesolicitudlaboralDespachoGeneral( nombre,  numeroPermiso,TipoPermiso, hora_inicial,fecha,solicitante,fecha_final,hora_final,comentario);

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
            html:cuerpo
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


        await this.insertarRelacionalAprovador(asunto, nombre_receptor, correo_origen, correo_receptor);
    }

    public async cuerpodeingresodesolicitudlaboralDespachoGeneral ( nombre:any,  numeroPermiso:any ,TipoPermiso:any, hora_inicial:any, fecha:any, solicitante:any, fecha_final:any, hora_final:any, comentario:any){
        const cuerpoUsuario = await this.getCuerpoNotificacionPermisoLaboralIngresoDespachoGeneral();
        // const botonInicio = await this.getBotonInicio(nombre);
        const cuerpo =  `
        <table
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
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                    align="center">

                                                                    <div
                                                                        style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                        <p
                                                                            style="font-size: 14px; line-height: 140%; align: center;">
                                                                            <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${nombre}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Se ha ingresado una solicitud de permiso laboral con numero de identificacion:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${numeroPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                El Tipo de permiso es:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${TipoPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con fecha inicial:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${fecha}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con hora:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${hora_inicial}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con fehcha de finalización:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${fecha_final}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Con hora:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${hora_final}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                La solicitud del permiso esta a nombre de:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${solicitante}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Comentario de Permiso:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${comentario}</span>
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
                                                                            ${cuerpoUsuario}

                                                                            <p style="font-size: 14px; line-height: 140%;">
                                                                            <span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">
                                                                            Atte.
                                                                            Secretaría Nacional de Ciencia y Tecnología.
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
    </table>
    `
        return cuerpo;
    }

    public async getCuerpoNotificacionPermisoLaboralIngresoDespachoGeneral(): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Por este medio se le notifica a Despacho superior que se solicitado un permiso laboral con la informacion antes expuesta.
                    !MUCHAS GRACIAS!.
                </span>
            </p>`;
    }

    public async insertarRelacionalDespachoGeneral( asunto: any, nombre_receptor: any, correo_origen: any, correo_receptor: any): Promise<any> {

        const idModulo = 34;
        const cuerpo = asunto + await this.getCuerpoNotificacionPermisoLaboralIngresoDespachoGeneral();

       const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, idModulo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(nombre_receptor, correo_receptor, respuesta.id_correo);
        console.log(respuesta1);
    }

    /* eliminacion de permiso */

    public async sendEliminacionSolicitante(correo:any,nombre:any,numeroPermiso:any){
        const asunto = 'Notificación de Ingreso de Permiso Laboral';
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo
        const nombre_receptor = nombre;
        const cuerpo = await this.cuerpoEliminacionSolicitante(nombre,numeroPermiso);

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
            html:cuerpo
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


        await this.insertarRelacionalEliminacionSolicitante(asunto, nombre_receptor, correo_origen, correo_receptor);
    }

    public async cuerpoEliminacionSolicitante(nombre:any,numeroPermiso:any){
        const cuerpoUsuario = await this.getCuerpoEliminacionSolicitante();
        // const botonInicio = await this.getBotonInicio(nombre);
        const cuerpo =  `
        <table
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
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                    align="center">

                                                                    <div
                                                                        style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                        <p
                                                                            style="font-size: 14px; line-height: 140%; align: center;">
                                                                            <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${nombre}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Se ha eliminado la solicitud de permiso laboral con el numero de identificacion:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${numeroPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
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
                                                                            ${cuerpoUsuario}

                                                                            <p style="font-size: 14px; line-height: 140%;">
                                                                            <span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">
                                                                            Atte.
                                                                            Secretaría Nacional de Ciencia y Tecnología.
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
    </table>
    `
        return cuerpo;
    }

    public async getCuerpoEliminacionSolicitante(): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Por este medio se le notifica que el permiso laboral se elimino correctamente.
                    !MUCHAS GRACIAS!.
                </span>
            </p>`;
    }

    public async insertarRelacionalEliminacionSolicitante( asunto: any, nombre_receptor: any, correo_origen: any, correo_receptor: any): Promise<any> {

        const idModulo = 34;
        const cuerpo = asunto + await this.getCuerpoEliminacionSolicitante();

       const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, idModulo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(nombre_receptor, correo_receptor, respuesta.id_correo);
        console.log(respuesta1);
    }

    /* Aprobacion de permiso solicitante */

    public async sendAprobacionSolicitante(correo:any,nombre:any,numeroPermiso:any){
        const asunto = 'Notificación de Ingreso de Permiso Laboral';
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo
        const nombre_receptor = nombre;
        const cuerpo = await this.cuerpoAprobacionSolicitante(nombre,numeroPermiso);

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
            html:cuerpo
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


        await this.insertarRelacionalAprobacionSolicitante(asunto, nombre_receptor, correo_origen, correo_receptor);
    }

    public async cuerpoAprobacionSolicitante(nombre:any,numeroPermiso:any){
        const cuerpoUsuario = await this.getCuerpoAprobacionSolicitante();
        // const botonInicio = await this.getBotonInicio(nombre);
        const cuerpo =  `
        <table
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
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                    align="center">

                                                                    <div
                                                                        style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                        <p
                                                                            style="font-size: 14px; line-height: 140%; align: center;">
                                                                            <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${nombre}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Le ha sido aprovado el permiso con numero:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${numeroPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
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
                                                                            ${cuerpoUsuario}

                                                                            <p style="font-size: 14px; line-height: 140%;">
                                                                            <span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">
                                                                            Atte.
                                                                            Secretaría Nacional de Ciencia y Tecnología.
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
    </table>
    `
        return cuerpo;
    }

    public async getCuerpoAprobacionSolicitante(): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Por este medio se le notifica que el permiso laboral le ha sido aprovado,
                    puede ver los detalles en plataforma de servicios.
                    !MUCHAS GRACIAS!.
                </span>
            </p>`;
    }

    public async insertarRelacionalAprobacionSolicitante( asunto: any, nombre_receptor: any, correo_origen: any, correo_receptor: any): Promise<any> {

        const idModulo = 34;
        const cuerpo = asunto + await this.getCuerpoAprobacionSolicitante();

       const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, idModulo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(nombre_receptor, correo_receptor, respuesta.id_correo);
        console.log(respuesta1);
    }

    /* aprobacion de permiso jefe */

    public async sendAprobacionAprovador(correo:any,nombre:any,numeroPermiso:any){
        const asunto = 'Notificación de Ingreso de Permiso Laboral';
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo
        const nombre_receptor = nombre;
        const cuerpo = await this.cuerpoAprobacionAprovador(nombre,numeroPermiso);

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
            html:cuerpo
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


        await this.insertarRelacionalAprobacionAprovador(asunto, nombre_receptor, correo_origen, correo_receptor);
    }

    public async cuerpoAprobacionAprovador(nombre:any,numeroPermiso:any){
        const cuerpoUsuario = await this.getCuerpoAprobacionAprovador();
        // const botonInicio = await this.getBotonInicio(nombre);
        const cuerpo =  `
        <table
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
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                    align="center">

                                                                    <div
                                                                        style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                        <p
                                                                            style="font-size: 14px; line-height: 140%; align: center;">
                                                                            <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${nombre}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Usted ha aprovado el permiso:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${numeroPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
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
                                                                            ${cuerpoUsuario}

                                                                            <p style="font-size: 14px; line-height: 140%;">
                                                                            <span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">
                                                                            Atte.
                                                                            Secretaría Nacional de Ciencia y Tecnología.
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
    </table>
    `
        return cuerpo;
    }

    public async getCuerpoAprobacionAprovador(): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Por este medio se le notifica que ha aprovado correctamente el permiso laboral.
                    !MUCHAS GRACIAS!.
                </span>
            </p>`;
    }

    public async insertarRelacionalAprobacionAprovador( asunto: any, nombre_receptor: any, correo_origen: any, correo_receptor: any): Promise<any> {

        const idModulo = 34;
        const cuerpo = asunto + await this.getCuerpoAprobacionAprovador();

       const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, idModulo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(nombre_receptor, correo_receptor, respuesta.id_correo);
        console.log(respuesta1);
    }
    /* negacion de permiso solicitante */

    public async sendDenegadoSolicitante(correo:any,nombre:any,numeroPermiso:any){
        const asunto = 'Notificación de Ingreso de Permiso Laboral';
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo
        const nombre_receptor = nombre;
        const cuerpo = await this.cuerpoDenegadoSolicitante(nombre,numeroPermiso);

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
            html:cuerpo
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


        await this.insertarRelacionalDenegadoSolicitante(asunto, nombre_receptor, correo_origen, correo_receptor);
    }

    public async cuerpoDenegadoSolicitante(nombre:any,numeroPermiso:any){
        const cuerpoUsuario = await this.getCuerpoDenegadoSolicitante();
        // const botonInicio = await this.getBotonInicio(nombre);
        const cuerpo =  `
        <table
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
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                    align="center">

                                                                    <div
                                                                        style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                        <p
                                                                            style="font-size: 14px; line-height: 140%; align: center;">
                                                                            <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${nombre}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Le ha sido negado el permiso con numero:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${numeroPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
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
                                                                            ${cuerpoUsuario}

                                                                            <p style="font-size: 14px; line-height: 140%;">
                                                                            <span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">
                                                                            Atte.
                                                                            Secretaría Nacional de Ciencia y Tecnología.
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
    </table>
    `
        return cuerpo;
    }

    public async getCuerpoDenegadoSolicitante(): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Por este medio se le notifica que el permiso laboral le ha sido negado,
                    puede ver los detalles en plataforma de servicios.
                    !MUCHAS GRACIAS!.
                </span>
            </p>`;
    }

    public async insertarRelacionalDenegadoSolicitante( asunto: any, nombre_receptor: any, correo_origen: any, correo_receptor: any): Promise<any> {

        const idModulo = 34;
        const cuerpo = asunto + await this.getCuerpoDenegadoSolicitante();

       const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, idModulo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(nombre_receptor, correo_receptor, respuesta.id_correo);
        console.log(respuesta1);
    }

    /* negacion ion de permiso jefe */

    public async sendDenegadoAprovador(correo:any,nombre:any,numeroPermiso:any){
        const asunto = 'Notificación de Ingreso de Permiso Laboral';
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo
        const nombre_receptor = nombre;
        const cuerpo = await this.cuerpoDenegadoAprovador(nombre,numeroPermiso);

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
            html:cuerpo
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


        await this.insertarRelacionalDenegadoSolicitante(asunto, nombre_receptor, correo_origen, correo_receptor);
    }

    public async cuerpoDenegadoAprovador(nombre:any,numeroPermiso:any){
        const cuerpoUsuario = await this.getCuerpoDenegadoAprovador();
        // const botonInicio = await this.getBotonInicio(nombre);
        const cuerpo =  `
        <table
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
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table style="font-family:'Lato',sans-serif;" role="presentation"
                                                        cellpadding="0" cellspacing="0" width="100%" border="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 30px;font-family:'Lato',sans-serif;"
                                                                    align="center">

                                                                    <div
                                                                        style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                        <p
                                                                            style="font-size: 14px; line-height: 140%; align: center;">
                                                                            <span
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${nombre}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
                                                                                <span
                                                                                style="font-size: 18px; line-height: 25.2px; color: #ffffff;align: center;">
                                                                                Usted ha negado el permiso numero:
                                                                                </span>
                                                                                </p>
                                                                                <span
                                                                                style="font-size: 18px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;align: center;">
                                                                                ${numeroPermiso}</span>
                                                                                <p style="font-size: 14px; line-height: 140%;">
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
                                                                            ${cuerpoUsuario}

                                                                            <p style="font-size: 14px; line-height: 140%;">
                                                                            <span
                                                                            style="font-size: 18px; line-height: 25.2px; color: #666666;">
                                                                            Atte.
                                                                            Secretaría Nacional de Ciencia y Tecnología.
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
    </table>
    `
        return cuerpo;
    }

    public async getCuerpoDenegadoAprovador(): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Por este medio se le notifica que la negacion del permiso laboral ha sido realizada exitosamente.
                    !MUCHAS GRACIAS!.
                </span>
            </p>`;
    }

    public async insertarRelacionalDenegadoAprovador( asunto: any, nombre_receptor: any, correo_origen: any, correo_receptor: any): Promise<any> {

        const idModulo = 34;
        const cuerpo = asunto + await this.getCuerpoDenegadoAprovador();

       const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, idModulo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(nombre_receptor, correo_receptor, respuesta.id_correo);
        console.log(respuesta1);
    }
}