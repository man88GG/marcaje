import { AdvancedConsoleLogger } from 'typeorm';
import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';

export class procesosObtener {
    constructor() {

    }

    public async getCorreo() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select gu.correo_electronico from gtu_perfil gp inner join gtu_usuario_perfil gup on ' +
                    'gp.id = gup.id_perfil ' +
                    'inner join gtu_usuario gu on ' +
                    'gu.id  = gup.id_usuario ' +
                    'where ' +
                    'gp.id in(60,61,62,63,64,65,66,67,68,69,70,71,72)'
                );
                const respuesta = { metodo: "obtenerGestion", codigo: 1, usuarios: rawData[0] };
                const tot = rawData.length;
                const arr = [];
                for (let i = 0; i < tot; i++) {
                    arr.push(rawData[i].correo_electronico);
                    // console.log(rawData[i].correo_electronico);
                }
                return arr;
            } catch (e) {
                const respuesta = { metodo: "obtenerGestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async getCuerpo(proceso: any) {
        const fecha = new Date();
        const dias = 5;
        fecha.setDate(fecha.getDate() + dias);

        return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
            '<html xmlns="http://www.w3.org/1999/xhtml">' +
            '<head>' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
            '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +

            '<style type="text/css" rel="stylesheet" media="all">/* Base ------------------------------ */ *:not(br):not(tr):not(html) { font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif; box-sizing: border-box; } body { width: 100% !important; height: 100%; margin: 0; line-height: 1.4; background-color: #F2F4F6; color: #74787E; -webkit-text-size-adjust: none; } p, ul, ol, blockquote { line-height: 1.4; text-align: left; } a { color: #3869D4; } a img { border: none; } /* Layout ------------------------------ */ .email-wrapper { width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #F2F4F6; } .email-content { width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; } /* Masthead ----------------------- */ .email-masthead { padding: 25px 0; text-align: center; } .email-masthead_logo { width: 94px; } .email-masthead_name { font-size: 16px; font-weight: bold; color: #bbbfc3; text-decoration: none; text-shadow: 0 1px 0 white; } /* Body ------------------------------ */ .email-body { width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; border-top: 1px solid #EDEFF2; border-bottom: 1px solid #EDEFF2; background-color: #FFFFFF; } .email-body_inner { width: 570px; margin: 0 auto; padding: 0; -premailer-width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #FFFFFF; } .email-footer { width: 570px; margin: 0 auto; padding: 0; -premailer-width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; text-align: center; } .email-footer p { color: #AEAEAE; } .body-action { width: 100%; margin: 30px auto; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; text-align: center; } .body-sub { margin-top: 25px; padding-top: 25px; border-top: 1px solid #EDEFF2; } .content-cell { padding: 35px; } .preheader { display: none !important; } /* Attribute list ------------------------------ */ .attributes { margin: 0 0 21px; } .attributes_content { background-color: #EDEFF2; padding: 16px; } .attributes_item { padding: 0; } /* Related Items ------------------------------ */ .related { width: 100%; margin: 0; padding: 25px 0 0 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; } .related_item { padding: 10px 0; color: #74787E; font-size: 15px; line-height: 18px; } .related_item-title { display: block; margin: .5em 0 0; } .related_item-thumb { display: block; padding-bottom: 10px; } .related_heading { border-top: 1px solid #EDEFF2; text-align: center; padding: 25px 0 10px; } /* Discount Code ------------------------------ */ .discount { width: 100%; margin: 0; padding: 24px; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #EDEFF2; border: 2px dashed #9BA2AB; } .discount_heading { text-align: center; } .discount_body { text-align: center; font-size: 15px; } /* Social Icons ------------------------------ */ .social { width: auto; } .social td { padding: 0; width: auto; } .social_icon { height: 20px; margin: 0 8px 10px 8px; padding: 0; } /* Data table ------------------------------ */ .purchase { width: 100%; margin: 0; padding: 35px 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; } .purchase_content { width: 100%; margin: 0; padding: 25px 0 0 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; } .purchase_item { padding: 10px 0; color: #74787E; font-size: 15px; line-height: 18px; } .purchase_heading { padding-bottom: 8px; border-bottom: 1px solid #EDEFF2; } .purchase_heading p { margin: 0; color: #9BA2AB; font-size: 12px; } .purchase_footer { padding-top: 15px; border-top: 1px solid #EDEFF2; } .purchase_total { margin: 0; text-align: right; font-weight: bold; color: #2F3133; } .purchase_total--label { padding: 0 15px 0 0; } /* Utilities ------------------------------ */ .align-right { text-align: right; } .align-left { text-align: left; } .align-center { text-align: center; } /*Media Queries ------------------------------ */ @media only screen and (max-width: 600px) { .email-body_inner, .email-footer { width: 100% !important; } } @media only screen and (max-width: 500px) { .button { width: 100% !important; } } /* Buttons ------------------------------ */ .button { background-color: #3869D4; border-top: 10px solid #3869D4; border-right: 18px solid #3869D4; border-bottom: 10px solid #3869D4; border-left: 18px solid #3869D4; display: inline-block; color: #FFF; text-decoration: none; border-radius: 3px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16); -webkit-text-size-adjust: none; } .button--green { background-color: #22BC66; border-top: 10px solid #22BC66; border-right: 18px solid #22BC66; border-bottom: 10px solid #22BC66; border-left: 18px solid #22BC66; } .button--red { background-color: #FF6136; border-top: 10px solid #FF6136; border-right: 18px solid #FF6136; border-bottom: 10px solid #FF6136; border-left: 18px solid #FF6136; } /* Type ------------------------------ */ h1 { margin-top: 0; color: #2F3133; font-size: 19px; font-weight: bold; text-align: left; } h2 { margin-top: 0; color: #2F3133; font-size: 16px; font-weight: bold; text-align: left; } h3 { margin-top: 0; color: #2F3133; font-size: 14px; font-weight: bold; text-align: left; } p { margin-top: 0; color: #74787E; font-size: 16px; line-height: 1.5em; text-align: left; } p.sub { font-size: 12px; } p.center { text-align: center; }</style>' +
            '</head>' +
            '<body>' +
            '<span class="preheader">Secretaria Nacional de Ciencia y Tecnología</span>' +
            '<table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">' +
            '   <tr>' +
            '      <td align="center">' +
            '          <table class="email-content" width="100%" cellpadding="0" cellspacing="0">' +
            '             <tr>' +
            '                <td class="email-masthead">' +
            '                   <a href="https://senacyt.gob.gt" class="email-masthead_name"><img src="https://www.senacyt.gob.gt/portal/images/yootheme/senacyt/logos/logo.png" alt="SENACYT" width="320" height="100"></a>' +
            '              </td>' +
            '         </tr>' +
            '<tr>' +
            '<td class="email-body" width="100%" cellpadding="0" cellspacing="0">' +
            '<table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">' +
            '<tr>' +
            '           <td class="content-cell">' +
            '               <h1>Estimado(a) </h1>' +
            '                   <p>' +
            'Por este medio les informamos que el siguiente documento <strong>' + proceso + '</strong> ha sido revisado por la Unidad de Gestión de Calidad.  Por lo cual le solicitamos, analizar el contenido para determinar si impacta alguno de sus procesos relacionados e informar la observación al Dueño del Proceso y posteriormente notificar los acuerdos alcanzados a la Unidad de Gestión de Calidad.  \n' +
            '\n' +
            '<br>Esta solicitud debe ser atendida en un plazo no mayor de 5 días hábiles <strong>(' + fecha + ')</strong>.  De no recibir respuesta durante el plazo establecido, el documento continuará con el proceso de aprobación por Despacho Superior. \n' +
            '\n' +
            '<br>Muchas gracias por la atención al presente.\n' +
            '\n' +
            '\n' +
            '<br><br>Saludos cordiales\n' +
            '<br>Unidad de Gestión de Calidad.\n' +
            '<tr>' +
            '<td>' +
            '</p>' +

            '<table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">' +
            '<tr>' +
            '<td align="center">' +
            '                       <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
            '<tr>' +
            '<td align="center">' +
            '   <table border="0" cellspacing="0" cellpadding="0">' +
            '        <tr>' +
            '             <td>' +
            '                  <a href="https://e.senacyt.gob.gt" class="button button--green" target="_blank">Iniciar sesión</a>' +
            '               </td>' +
            '            </tr>' +
            '         </table>' +
            '      </td>' +
            '   </tr>' +
            '</table>' +
            '       </td>' +
            '                        </tr>' +
            '  </td>' +
            '           </tr>' +
            '</table>' +
            '    </td>' +
            '</tr>' +
            '   <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0">' +
            '<tr>' +
            '   <td class="content-cell" align="center">' +
            '<p class="sub align-center">&copy;  Secretaría Nacional de Ciencia y Tecnología.</p>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '<table align="center" width="100" cellpadding="0" cellspacing="0">' +
            '<tr>' +
            '<td width="33%" align="left" valign="middle"><a href="https://www.facebook.com/senacyt"><img src="https://e.senacyt.gob.gt/public/img/facebook.png" width="48" height="48"></a></td>' +
            '              <td width="34%" align="left" valign="middle"><a href="https://twitter.com/senacytgt"><img src="https://e.senacyt.gob.gt/public/img/twitter.png" width="48" height="48"></a></td>' +
            '               <td width="33%" align="left" valign="middle"><a href="http://www.linkedin.com/company/senacyt_2"><img src="https://e.senacyt.gob.gt/public/img/linkedin.png" width="48" height="48"></a></td>' +
            '                <td width="33%" align="left" valign="middle"><a href="https://www.youtube.com/user/senacytconcyt"><img src="https://e.senacyt.gob.gt/public/img/youtube.png" width="48" height="48"></a></td>' +
            '             </tr>' +
            '          </table>' +
            '       </td>' +
            '    </tr>' +
            '</table>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</body>' +
            '</html>';
    }

    public async sendMail(to: any, proceso: any, cuerpo: any) {
        const proc = await this.obtenerProcesoByPro(proceso);
        const info = proc.nombre + " P-" + proceso;
        const nodemailer = require('nodemailer');
        const mail = await this.getCorreo();

        const transporter = nodemailer.createTransport({
            host: 'correo.senacyt.gob.gt',
            auth: {
                user: 'tecnologias@senacyt.gob.gt',
                pass: 'Tempseptiembre2021'
            }
        });
        const mailOptions = {
            from: 'tecnologias@senacyt.gob.gt',
            to: mail,
            subject: "Revisión de proceso",
            html: await this.getCuerpo(info)
        };
        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    public async obtenerduenioproceso(proceso: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select gup.id_usuario from gdp_duenio_proceso gdp inner join gtu_usuario_perfil gup on gdp.id_perfil =gup.id_perfil  where id_proceso = ' + proceso);
                const respuesta = { metodo: "obtenerduenioproceso", codigo: 1, usuarios: rawData };
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerduenioproceso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerduenioproceso2(proceso: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select u.* from gdp_duenio_proceso gdp inner join gtu_usuario_perfil gup' +
                    ' on gdp.id_perfil =gup.id_perfil  inner join gtu_usuario u on u.id = gup.id_usuario ' +
                    'where id_proceso = ' + proceso);
                const respuesta = { metodo: "obtenerduenioproceso", codigo: 1, usuarios: rawData };
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerduenioproceso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerUsuarios() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select id, nombre_completo from gtu_usuario gu where id_tipo_usuario = 1 AND id_estado = 1');
                const respuesta = { metodo: "obtenerUsuarios", codigo: 1, usuarios: rawData };
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuarios", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerDirecciones() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select id, nombre from gtu_departamento gd where id >1');
                const respuesta = { metodo: "obtenerUsuarios", codigo: 1, usuarios: rawData };
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuarios", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerPerfiles() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select * from gtu_perfil gp where tipo_perfil = 1');
                const respuesta = { metodo: "obtenerUsuarios", codigo: 1, usuarios: rawData };
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuarios", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerPerfilesNoGestion() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select gp.* from gtu_puesto gp inner join gtu_departamento_puesto gdp on ' +
                    'gp.id = gdp.id_puesto ' +
                    'where nombre not in (\'Servicios Técnicos\',  \'Servicios Profesionales\') and gp.id not in(0,1,18)');
                const respuesta = { metodo: "obtenerUsuarios", codigo: 1, usuarios: rawData };
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerUsuarios", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerGestion(gestion: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select id_convocatoria  from gdp_convocatoria gc where id_gestion = ' + gestion);
                const respuesta = { metodo: "obtenerGestion", codigo: 1, usuarios: rawData[0] };
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerGestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerProceso(convocatoria: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select * from gdp_proceso gp where id_convocatoria = ' + convocatoria);
                const respuesta = { metodo: "obtenerGestion", codigo: 1, usuarios: rawData[0] };
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerGestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerProcesoByPro(proceso: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select * from gdp_proceso gp where id_proceso = ' + proceso);
                const respuesta = { metodo: "obtenerGestion", codigo: 1, usuarios: rawData[0] };
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerGestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }


    public async obtenerSIPOC(proceso: number, clave: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select gia.valor id, valor from gdp_informacion_adicional gia \n' +
                    '\tinner join gdp_proceso p on gia.id_proceso = p.id_proceso  \n' +
                    '\tinner join gdp_convocatoria c on p.id_convocatoria = c.id_convocatoria \n' +
                    '\tWHERE \n' +
                    '\t\tc.id_gestion  = ' + proceso + ' and \n' +
                    '\t\tgia.clave = \'' + clave + '\'');
                const respuesta = { metodo: "obtenerSIPOC", codigo: 1, usuarios: rawData };
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerSIPOC", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerIdSIPOC(proceso: number, estado: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select id_sipoc from gdp_sipoc gs  where gs.id_proceso =' + proceso + ' and  gs.estado = ' + estado);
                // const respuesta = { metodo: "obtenerSIPOC", codigo: 1, usuarios: rawData};
                return rawData[0];
            } catch (e) {
                const respuesta = { metodo: "obtenerSIPOC", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerTareasSIPOC(sipoc: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select t.id_terea sipoc_no, t.duracion sipoc_t, nombre sipoc_p, s.valor  sipoc_s, i.valor  sipoc_i, o.valor  sipoc_o, c.valor  sipoc_c, ob.valor  sipoc_ob\n' +
                    'from gdp_tarea t inner join gdp_informacion_adicional_tarea s on t.id_terea = s.id_tarea \n' +
                    '\tinner join gdp_informacion_adicional_tarea i on t.id_terea = i.id_tarea\n' +
                    '\tinner join gdp_informacion_adicional_tarea o on t.id_terea = o.id_tarea\n' +
                    '\tinner join gdp_informacion_adicional_tarea c on t.id_terea = c.id_tarea\n' +
                    '\tinner join gdp_informacion_adicional_tarea ob on t.id_terea = ob.id_tarea\n' +

                    '\n' +
                    '\twhere\n' +
                    '\t\tt.id_sipoc  = ' + sipoc + ' AND \n' +
                    '\t\ts.clave = \'suppliers\' and \n' +
                    '\t\ti.clave = \'inputs\' and \n' +
                    '\t\to.clave = \'outputs\'AND \n' +
                    '\t\tob.clave = \'observaciones\' AND \n' +
                    '\t\tc.clave = \'costumers\' ');
                // const respuesta = { metodo: "obtenerSIPOC", codigo: 1, usuarios: rawData};
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerSIPOC", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerTareasListadoSIPOC(gestion: number, estado: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select gia.id_terea id, gia.nombre valor from gdp_tarea gia \n' +
                    '\tinner join gdp_sipoc s on gia.id_sipoc  = s.id_sipoc \n' +
                    '\tinner join gdp_proceso p on p.id_proceso = s.id_proceso \n' +
                    '\tinner join gdp_convocatoria c on p.id_convocatoria = c.id_convocatoria \n' +
                    '\tWHERE \n' +
                    '\t\tc.id_gestion  = ' + gestion + ' ' +
                    ' and s.estado = ' + estado);
                // const respuesta = { metodo: "obtenerSIPOC", codigo: 1, usuarios: rawData};
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerSIPOC", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerRutasSIPOC(sipoc: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('\tselect r.id_tarea_origen  origen,r.id_tarea_destino  destino from gdp_tarea gt inner join gdp_ruta_test r on  \n' +
                    '\t\tgt.nombre  = r.id_tarea_origen \n' +
                    '\t\tWHERE \n' +
                    '\t\t\tgt.id_sipoc = ' + sipoc + ' group by 1, 2');
                // const respuesta = { metodo: "obtenerSIPOC", codigo: 1, usuarios: rawData};
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerSIPOC", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerComentario(proceso: number, tipo: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select comentario from gdp_revision_proceso where id_proceso = ' + proceso + ' and tipo_revision = ' + tipo +
                    '   limit 1');
                const respuesta = { metodo: "obtenerComentario", codigo: 1, comentario: rawData[0] };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "obtenerComentario", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerArchivos(proceso: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select * from gdp_informacion_documental where id_proceso = ' + proceso);
                const respuesta = { metodo: "obtenerArchivos", codigo: 1, comentario: rawData };
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerArchivos", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerInfoProceso(proceso: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const retorno = [];
                let rawData = await connection.manager.query('select * from gdp_direccion_proceso where id_proceso = ' + proceso);
                retorno[0] = rawData[0];
                rawData = await connection.manager.query('select * from gdp_duenio_proceso where id_proceso = ' + proceso);
                retorno[1] = rawData[0];
                rawData = await connection.manager.query('select * from gdp_responsable_proceso where id_proceso = ' + proceso);
                retorno[2] = rawData;
                rawData = await connection.manager.query('select * from gdp_informacion_adicional where id_proceso = ' + proceso);
                retorno[3] = rawData;
                const respuesta = { metodo: "obtenerInfoProceso", codigo: 1, infoProceso: retorno };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "obtenerInfoProceso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerProcesosGDC() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select gp.* from gdc_proceso gp where id_estado = 1 and padre is not null order by 1');
                return await this.crearArbolGDC(rawData, 0);
            } catch (e) {
                const respuesta = { metodo: "obtenerSIPOC", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerKPI(proceso: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select * from gdp_indicador where id_proceso = ' + proceso);

                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerKPI", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    public async obtenerResponsables(proceso: number) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select gu.nombre_completo from gdp_responsable_proceso grp inner join gtu_usuario_perfil gup  on ' +
                    'grp.id_perfil = gup.id_perfil ' +
                    'inner join gtu_usuario gu on ' +
                    'gu.id = gup.id_usuario ' +
                    'where ' +
                    'grp.id_proceso  = ' + proceso);

                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerResponsables", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }

    private async crearArbolGDC(data: any, idpadre: number) {
        const tot = data.length;
        const array = [];
        for (let i = 0; i < tot; i++) {
            if (data[i].padre == idpadre) {
                data[i].children = await this.crearArbolGDC(data, data[i].id);
                array.push(data[i]);
            }
        }
        return array;
    }

    public async obtenerCostumers() {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query('select nombre_completo nombre  from gtu_usuario gu\n' +
                    'union all\n' +
                    'select denomiacion_razon_social nombre from dne_entidad de \n' +
                    'union all\n' +
                    'select valor nombre from gdp_informacion_adicional gia where clave =\'costumers\'\n' +
                    'group by 1');

                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerCostumers", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", usuarios: -1 };
                return respuesta;
            }
        });
    }
    // The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
    public async replaceErrors(key: any, value: { [x: string]: any; }) {
        if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (error, key) {
                // error[key] = value[key];
                return error;
            }, {});
        }
        return value;
    }

    public async errorHandler(error: any) {
        // console.log(JSON.stringify({error: error}, replaceErrors ));

        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors.map(function (error: any) {
                return error.properties.explanation;
            }).join("\n");
            console.log('errorMessages', errorMessages);
        }
        throw error;
    }

    public async difundir(proceso: any) {
        const fs = require("fs");
        const PDFDocument = require("pdfkit");
        const doc = new PDFDocument({ margin: 50, layout: 'landscape' });
        await this.generateHeader(doc, proceso);
        // await this.generateCustomerInformation(doc, invoice, proceso);
        //        await this.generateFooter(doc);
        doc.end();
        doc.pipe(fs.createWriteStream(proceso + ".pdf"));
    }

    PizZip = require('pizzip');
    Docxtemplater = require('docxtemplater');

    fs = require('fs');
    path = require('path');

    public async generateHeader(doc: any, proceso: any) {
        const proc: any = await this.obtenerInfoProceso(proceso);
        const procinfo = await this.obtenerProcesoByPro(proceso);
        const responsable = await this.obtenerResponsables(proceso);

        const tot = responsable.length;
        let i = 0;
        let res = "";
        for (i = 0; i < tot; i++) {
            res += responsable[i].nombre_completo + "\n";
        }

        const content = this.fs
            .readFileSync(this.path.resolve(__dirname, 'input.docx'), 'binary');
        const zip = new this.PizZip(content);
        const datos = await this.obtenerduenioproceso2(proceso);
        try {
            doc = new this.Docxtemplater(zip, { linebreaks: true });
        } catch (error) {
            this.errorHandler(error);
        }

        //  console.log(proc.infoProceso[3]);
        const tot2 = proc.infoProceso[3].length;
        let cost = "";
        let sup = "";
        let inp = "";
        let out = "";
        for (i = 0; i < tot2; i++) {
            switch (proc.infoProceso[3][i].clave) {
                case 'costumers':
                    cost += proc.infoProceso[3][i].valor + "\n";
                    break;
                case 'supplieres':
                    sup += proc.infoProceso[3][i].valor + "\n";
                    break;
                case 'inputs':
                    inp += proc.infoProceso[3][i].valor + "\n";
                    break;
                case 'outputs':
                    out += proc.infoProceso[3][i].valor + "\n";
                    break;
            }
        }

        const sipoc = await this.obtenerIdSIPOC(proceso, 1);
        const tareas = await this.obtenerTareasSIPOC(sipoc.id_sipoc);
        const sipoctobe = [];
        const tot3 = tareas.length;
        for (i = 0; i < tot3; i++) {
            sipoctobe.push({ no: i + 1, proveedor: tareas[i].sipoc_s, entrada: tareas[i].sipoc_i, proceso: tareas[i].sipoc_p, salida: tareas[i].sipoc_o, cliente: tareas[i].sipoc_c, tiempo: tareas[i].sipoc_t, observaciones: tareas[i].sipoc_ob });
        }

        let proceso2 = proceso.toString();
        switch (proceso2.length) {
            case 1:
                proceso2 = "00" + proceso2;
                break;
            case 2:
                proceso2 = "0" + proceso2;
                break;
        }

        doc.setData({
            nombre_proceso: procinfo.nombre,
            objetivo_process: procinfo.objetivo_proceso,
            alcance_proceso: procinfo.alcance_proceso,
            cod_proceso: proceso2,
            duenio_proceso: datos[0].nombre_completo,
            responsable_proces: res,
            clientes_proceso: cost,
            proveedores_proceso: sup,
            entradas_proceso: inp,
            salidas_proceso: out,
            sipoc: sipoctobe
        });

        try {
            doc.render()
        }
        catch (error) {
            this.errorHandler(error);
        }
        const buf = doc.getZip()
            .generate({ type: 'nodebuffer' });
        this.fs.writeFileSync(this.path.resolve(__dirname, 'P-' + proceso + '.docx'), buf);
    }

    public async generateCustomerInformation(doc: any, invoice: any, proceso: any) {
        const proc = await this.obtenerInfoProceso(proceso);
        const procinfo = await this.obtenerProcesoByPro(proceso);
        doc
            .fillColor("#444444")
            .fontSize(20)
            .text("Caracterización de procesos", 50, 160)
            .moveDown();
        await this.generateHr(doc, doc.y);

        doc.moveDown();
        doc
            .fontSize(10)
            .font("Helvetica-Bold")
            .text("Numero:", 50)
            .text(procinfo.id_proceso, 150)
            .moveDown();
        doc
            .font("Helvetica")
            .text("Nombre:", 50)
            .text(procinfo.nombre, 150)
            .moveDown();
        doc
            .text("Objetivo del proceso:", 50)
            .text(procinfo.objetivo_proceso, 150)
            .moveDown();
        doc
            .text("Alcance del proceso:", 50)
            .text(procinfo.alcance_proceso, 150)
            .moveDown();
        doc.moveDown(); doc.moveDown();
        doc
            .text("Entradas:", 50)
            .moveDown();

        await this.generateHr(doc, doc.y);

        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }
        let info = await this.obtenerInfoProceso(proceso);
        await this.generateInvoiceTable(doc, info, 'inputs');
        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }
        doc.moveDown(); doc.moveDown();
        doc
            .text("Salidas:", 50)
            .moveDown();
        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }
        info = await this.obtenerInfoProceso(proceso);
        await this.generateInvoiceTable(doc, info, 'outputs');
        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }
        doc.moveDown(); doc.moveDown();
        doc
            .text("Clientes:", 50)
            .moveDown();
        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }
        info = await this.obtenerInfoProceso(proceso);
        await this.generateInvoiceTable(doc, info, 'costumers');
        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }

        doc.moveDown(); doc.moveDown();
        doc
            .text("Proveedores:", 50)
            .moveDown();

        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }

        info = await this.obtenerInfoProceso(proceso);
        await this.generateInvoiceTable(doc, info, 'supplieres');
        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }

        doc.moveDown(); doc.moveDown();
        doc
            .text("Sub-Procesos:", 50)
            .moveDown();

        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }

        info = await this.obtenerInfoProceso(proceso);
        await this.generateInvoiceTable(doc, info, 'subprocess');
        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }

        doc
            .fillColor("#444444")
            .fontSize(20)
            .text("SIPOC As Is ", 50, doc.y + 100)
            .moveDown();
        await this.generateHr(doc, doc.y);

        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }
        let sipoc = await this.obtenerIdSIPOC(proceso, 0);
        let tareas = await this.obtenerTareasSIPOC(sipoc.id_sipoc);
        await this.generateInvoiceTableSIPOCS(doc, tareas, 1);

        doc
            .fillColor("#444444")
            .fontSize(20)
            .text("SIPOC To Be ", 50, doc.y + 100)
            .moveDown();
        await this.generateHr(doc, doc.y);

        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }
        sipoc = await this.obtenerIdSIPOC(proceso, 1);
        tareas = await this.obtenerTareasSIPOC(sipoc.id_sipoc);
        await this.generateInvoiceTableSIPOCS(doc, tareas, 1);

        doc
            .fillColor("#444444")
            .fontSize(20)
            .text("KPIs ", 50, doc.y + 100)
            .moveDown();
        await this.generateHr(doc, doc.y);
        if (doc.y > 600) {
            doc.addPage({
                margin: 50
            });
        }

        const kpi = await this.obtenerKPI(proceso);
        await this.generateInvoiceTableKPI(doc, kpi, 1);
    }

    public async generateInvoiceTable(doc: any, invoice: any, type: any) {
        let i;
        const invoiceTableTop = doc.y;
        doc.font("Helvetica-Bold");
        await this.generateTableRow(
            doc,
            invoiceTableTop,
            "Número",
            "Entrada",
            "Unit Cost",
            "Quantity",
            "Line Total"
        );
        await this.generateHr(doc, invoiceTableTop + 20);
        doc.font("Helvetica");
        const tot = invoice.infoProceso[3].length;
        let aux = 0;
        for (i = 0; i < tot; i++) {
            switch (invoice.infoProceso[3][i].clave) {
                case type:
                    const position = invoiceTableTop + (aux + 1) * 30;
                    await this.generateTableRow(
                        doc,
                        position,
                        aux + 1,
                        invoice.infoProceso[3][i].valor,
                        await this.formatCurrency(0),
                        invoice.infoProceso[3][i].valor,
                        await this.formatCurrency(0)
                    );
                    await this.generateHr(doc, position + 20);
                    ++aux;
                    break;
            }
        }
    }

    public async generateInvoiceTableSIPOCS(doc: any, invoice: any, type: any) {
        let i;
        const invoiceTableTop = doc.y;
        doc.font("Helvetica-Bold");
        await this.generateTableRowSIPOC(
            doc,
            invoiceTableTop,
            "Número",
            "Suppliers",
            "Inputs",
            "Process",
            "Outputs",
            "Costumers",
            "Observation"
        );
        await this.generateHr(doc, invoiceTableTop + 20);
        doc.font("Helvetica");
        const tot = invoice.length;
        let aux = 0;
        for (i = 0; i < tot; i++) {
            const position = invoiceTableTop + (aux + 1) * 30;
            await this.generateTableRowSIPOC(
                doc,
                position,
                invoice[i].sipoc_t,
                invoice[i].sipoc_s,
                invoice[i].sipoc_i,
                invoice[i].sipoc_p,
                invoice[i].sipoc_o,
                invoice[i].sipoc_c,
                invoice[i].sipoc_ob
            );
            // await this.generateHr(doc, doc.y);
            ++aux;
        }
    }


    public async generateInvoiceTableKPI(doc: any, invoice: any, type: any) {
        let i;
        const invoiceTableTop = doc.y;
        doc.font("Helvetica-Bold");
        await this.generateTableRowKPI(
            doc,
            invoiceTableTop,
            "Descripción",
            "Medida",
            "Cálculo",
            "Meta",
            "Frecuencia",
            "Responsable"
        );
        await this.generateHr(doc, invoiceTableTop + 20);
        doc.font("Helvetica");
        const tot = invoice.length;
        let aux = 0;
        for (i = 0; i < tot; i++) {
            const position = invoiceTableTop + (aux + 1) * 30;
            await this.generateTableRowKPI(
                doc,
                position,
                invoice[i].descripcion,
                invoice[i].medida,
                invoice[i].calculo,
                invoice[i].meta,
                invoice[i].frecuencia,
                invoice[i].responsable
            );
            // await this.generateHr(doc, doc.y);
            ++aux;
        }
    }

    public async generateFooter(doc: any) {
        doc
            .fontSize(10)
            .text(
                "Payment is due within 15 days. Thank you for your business.",
                50,
                780,
                { align: "center", width: 500 }
            );
    }

    public async generateTableRow(
        doc: any,
        y: any,
        item: any,
        description: any,
        unitCost: any,
        quantity: any,
        lineTotal: any
    ) {
        doc
            .fontSize(10)
            .text(item, 150, y)
            .text(description, 250, y);
    }

    public async generateTableRowSIPOC(
        doc: any,
        y: any,
        numero: any,
        suppliers: any,
        inputs: any,
        process: any,
        outputs: any,
        costumers: any,
        observation: any
    ) {
        doc
            .fontSize(10)
            .text(numero, 50, y)
            .text(suppliers, 100, y, {
                width: 50,
                align: 'left'
            })
            .text(inputs, 170, y, {
                width: 60,
                align: 'left'
            })
            .text(process, 240, y, {
                width: 60,
                align: 'left'
            })
            .text(outputs, 310, y, {
                width: 60,
                align: 'left'
            })
            .text(costumers, 380, y, {
                width: 60,
                align: 'left'
            })
            .text(observation, 450, y, {
                width: 60,
                align: 'left'
            });
    }


    public async generateTableRowKPI(
        doc: any,
        y: any,
        descripcion: any,
        medida: any,
        calculo: any,
        meta: any,
        frecuencia: any,
        responsable: any
    ) {
        doc
            .fontSize(10)
            .text(descripcion, 70, y, {
                width: 70,
                align: 'left'
            })
            .text(medida, 170, y, {
                width: 70,
                align: 'left'
            })
            .text(calculo, 250, y, {
                width: 70,
                align: 'left'
            })
            .text(meta, 310, y, {
                width: 70,
                align: 'left'
            })
            .text(frecuencia, 380, y, {
                width: 70,
                align: 'left'
            })
            .text(responsable, 450, y, {
                width: 70,
                align: 'left'
            });
    }
    public async generateHr(doc: any, y: any) {
        doc
            .strokeColor("#aaaaaa")
            .lineWidth(1)
            .moveTo(50, y)
            .lineTo(550, y)
            .stroke();
    }

    public async formatCurrency(cents: any) {
        return "$" + (cents / 100).toFixed(2);
    }
}

