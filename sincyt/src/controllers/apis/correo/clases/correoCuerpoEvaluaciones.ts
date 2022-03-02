import { type } from 'os';
import nodemailer from 'nodemailer';
import { correoInsertarBd } from './correoInsertarBd';
import path from 'path';
import { SimpleConsoleLogger } from 'typeorm';
import { ComInformacionAcademica } from 'src/models/output/entities/ComInformacionAcademica';

export class correoCuerpoEvaluaciones{

    public async sendCorreoEvaluacion(correo : any , nombre : any, id_persona : any){
        const asunto = 'Notificación de Evaluación de Desempeño Laboral';
        const correo_origen = 'tecnologias@senacyt.gob.gt';
        const correo_receptor = correo;// correo
        const nombre_receptor = nombre;
        const cuerpo = await this.getCuerpo(nombre_receptor, id_persona);

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
            html: cuerpo
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
        await this.insertarRelacional(asunto, nombre_receptor, correo_origen, correo_receptor, id_persona);

    }

    public async sendCorreoEvaluacionEvaluador(correo_evaluador : any, nombre_evaluador : any, id_evaluador : any){
        const asunto_evaluador = 'Notificación de Evaluación de Desempeño Laboral';
        const correo_origen_evaluador = 'tecnologias@senacyt.gob.gt';
        const correo_receptor_evaluador = correo_evaluador;
        const nombre_receptor_evaluador = nombre_evaluador;
        const cuerpo = await this.getCuerpoEvaluador(nombre_receptor_evaluador, id_evaluador);

        const transporter = nodemailer.createTransport({
            host: 'correo.senacyt.gobt.gt',
            auth:{
                user : correo_origen_evaluador,
                pass: 'Tempseptiembre2021'
            },
            tls:{
                rejectUnauthorized : false
            }
        });

        const mailOptions={
            from : 'Plataforma de servicios <no-reply@senacyt.gob.gt>',
            to: correo_receptor_evaluador,
            bcc: correo_origen_evaluador,
            subject : asunto_evaluador,
            html : cuerpo
        }
        transporter.sendMail(mailOptions, function (error: any, info : any){
            if(error){
                console.log(error);
                return 0;
            }else{
                console.log('Email enviado: ' + info.response);
                return 1;
            }
        });

        // Insertamos informacion en la base de datos relacional
        await this.insertarRelacionalEvaluador(asunto_evaluador, nombre_receptor_evaluador, correo_origen_evaluador, correo_receptor_evaluador, id_evaluador);


    }

    public async getCuerpoNotificacion(): Promise<any> {
        return `<p style="font-size: 14px; line-height: 140%;">
                <span
                    style="font-size: 18px; line-height: 25.2px; color: #666666;">
                    Por este medio se le notifica que usted entró en el proceso de evaluación de desempeño laboral,
                    por favor responder su evaluación correspondiente cuando usted sea evaluado.
                    !MUCHAS GRACIAS!.
                </span>
            </p>`;
    }

    public async getCuerpoNotificacionEvaluador(): Promise <any>{
        return `
        <p style="font-size: 14px; line-height: 140%;>
        <span
            style="font-size: 18px; line-height: 25.2px; color: #666666;">
            Por este medio se le notifica que usted entró en el proceso de evaluación de desempeño laboral,
            Usted debe de evaluar a todas las personas que le fueron asignadas en su respectivo periodo de tiempo.
            !MUCHAS GRACIAS!.
        </span>
        </p>`;
    }

    public async getBotonInicio(id_persona: any): Promise<any> {
        let boton = '';
        if (id_persona == 0) {
            boton = '';
        } else {
            boton = `<a href="https://e.senacyt.gob.gt"
            target="_blank"
            data-saferedirecturl="https://www.google.com/url?q=https://e.senacyt.gob.gt&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNGMVrB_dDccplbd7mtYLBWE_GqTTg"
            style="box-sizing: border-box;display: inline-block;font-family:'Lato',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #18163a; border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;border-top-width: 3px; border-top-style: solid; border-top-color: #CCC; border-left-width: 3px; border-left-style: solid; border-left-color: #CCC; border-right-width: 3px; border-right-style: solid; border-right-color: #CCC; border-bottom-width: 3px; border-bottom-style: solid; border-bottom-color: #CCC;">
            <span
            style="display:block;padding:15px 40px;line-height:120%;"><span
            style="font-size: 18px; line-height: 21.6px;">
            Iniciar
            Sesión</span></span>
                </a>`;
        }
        return boton;
    }

    public async getBotonInicioEvaluador(id_evaluador: any ) : Promise <any>{
        let boton = '';
        if (id_evaluador == 0) {
            boton = '';
        } else {
            boton = `<a href="https://e.senacyt.gob.gt"
            target="_blank"
            data-saferedirecturl="https://www.google.com/url?q=https://e.senacyt.gob.gt&amp;source=gmail&amp;ust=1621535075164000&amp;usg=AFQjCNGMVrB_dDccplbd7mtYLBWE_GqTTg"
            style="box-sizing: border-box;display: inline-block;font-family:'Lato',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #18163a; border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;border-top-width: 3px; border-top-style: solid; border-top-color: #CCC; border-left-width: 3px; border-left-style: solid; border-left-color: #CCC; border-right-width: 3px; border-right-style: solid; border-right-color: #CCC; border-bottom-width: 3px; border-bottom-style: solid; border-bottom-color: #CCC;">
            <span
            style="display:block;padding:15px 40px;line-height:120%;"><span
            style="font-size: 18px; line-height: 21.6px;">
            Iniciar
            Sesión</span></span>
                </a>`;
        }
        return boton;
    }

    public async getCuerpo(nombre_receptor : any, id_persona: any){
        const cuerpoUsuario = await this.getCuerpoNotificacion();
        const botonInicio = await this.getBotonInicio(id_persona);
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

                                                                                    <img align="center" border="0"
                                                                                    src="https://www.bumeran.com.mx/noticias/wp-content/uploads/2019/12/evaluaci%C3%B3n-del-desempe%C3%B1o-laboral.jpg"
                                                                                    alt="Image" title="Image"
                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;width: 200px; height: 100px;"
                                                                                    width="150">

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
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;">
                                                                                ${nombre_receptor}</span>
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

                                                                        <div align="center">
                                                                            `+ botonInicio + `
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
    </table>
    `
        return cuerpo;
    }

    public async getCuerpoEvaluador(nombre_receptor_evaluador : any, id_evaluador : any){
        const cuerpoUsuario = await this.getCuerpoNotificacion();
        const botonInicio = await this.getBotonInicio(id_evaluador);
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

                                                                                    <img align="center" border="0"
                                                                                    src="https://www.bumeran.com.mx/noticias/wp-content/uploads/2019/12/evaluaci%C3%B3n-del-desempe%C3%B1o-laboral.jpg"
                                                                                    alt="Image" title="Image"
                                                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 25%;width: 200px; height: 100px;"
                                                                                    width="150">

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
                                                                                style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;">
                                                                                ${nombre_receptor_evaluador}</span>
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

                                                                        <div align="center">

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
    </table>
    `
        return cuerpo;
    }

    public async insertarRelacional( asunto: any, nombre_receptor: any, correo_origen: any, correo_receptor: any, id_persona: any): Promise<any> {

        const idModulo = 33;
        const cuerpo = asunto + await this.getCuerpoNotificacion();

       const respuesta = await new correoInsertarBd().insertarCorreo(correo_origen, asunto, cuerpo, idModulo);
        console.log(respuesta);

        const respuesta1 = await new correoInsertarBd().insertarDestinatario(nombre_receptor, correo_receptor, respuesta.id_correo);
        console.log(respuesta1);
    }

    public async insertarRelacionalEvaluador( asunto_evaluador : any, nombre_receptor_evaluador: any, correo_origen_evaluador : any, correo_receptor_evaluador : any , id_evaluador: any){
        const idModulo_evaluador = 33;
        const cuerpo_evaluador = asunto_evaluador + await this.getCuerpoNotificacionEvaluador();

        const respuesta3 = await new correoInsertarBd().insertarCorreo(correo_origen_evaluador, asunto_evaluador, cuerpo_evaluador, idModulo_evaluador)
        console.log(respuesta3);

        const respuesta4 = await new  correoInsertarBd().insertarDestinatario(nombre_receptor_evaluador, correo_receptor_evaluador, respuesta3.id_correo);
        console.log(respuesta4);
    }


}


