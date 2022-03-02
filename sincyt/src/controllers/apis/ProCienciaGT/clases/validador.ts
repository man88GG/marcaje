import { ConnectionSINCYT }  from '../../../../models/ConnectionSINCYT';
import { Request, Response } from 'express-serve-static-core';
import { raw } from 'body-parser';
import { readSync } from 'fs';
import { UV_FS_O_FILEMAP } from 'constants';

// tslint:disable-next-line: class-name
export class validador{

    constructor(){
	}
    public async getCategorias(){

        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('select nombre_categoria id, nombre_categoria text from rpe_categoria where padre_no_categoria is not null order by 1');
                return rawData;

            }catch(e){
                console.log(e);
                const respuesta = { metodo: "getCategorias", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async validarMontos(fonacyt : number, contrapartida: number, linea :number){

        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query("select monto_maximo from sgp_linea where id_linea = " + linea);
                let respuesta;
                if (fonacyt > rawData[0].monto_maximo){
                    console.log(rawData[0].monto_maximo);
                    respuesta = { metodo: "validarMontos", codigo: -1, mensaje : "El monto solicitado al FONACYT es mayor al monto máximo a otorgar, el monto máximo a solicitar no debe de superar Q." + rawData[0].monto_maximo};
                    return respuesta;
                }else if((rawData[0].monto_maximo )){

                }else{
                    respuesta = { metodo: "validarMontos", codigo: 11, mensaje : "Monto validado."};
                    return respuesta;
                }

            }catch(e){

                const respuesta = { metodo: "validarMontos", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }


    public async getInfoDNI(expendiente :any){

        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('select CONCAT(p.nombres,  " ", p.apellidos) nombre, p.cui, l.no_colegiado colegiado, '+
                ' l.carrera_titulo titulo_pre,m.carrera_titulo titulo_maestria,d.carrera_titulo titulo_doctorado, GROUP_CONCAT(il.nombre_entidad SEPARATOR \' & \') laboral  '+
                ' from rpe_solicitud r inner join rpe_persona p on '+
                '    r.no_registro_persona = p.no_registro_persona '+
                '    left  join rpe_academico l on '+
                '        r.no_registro_persona = l.no_registro_persona and l.no_tipo_academico = 3'+
                '    left  join rpe_academico m on '+
                '        r.no_registro_persona = m.no_registro_persona and m.no_tipo_academico = 4'+
                '    left join rpe_academico d on '+
                '       r.no_registro_persona = d.no_registro_persona and d.no_tipo_academico = 5'+
                '   	left join rpe_informacion_laboral il on '+
                '   il.no_registro_persona = p.no_registro_persona  and il.es_trabajo_actual = 1'+
                '   where no_solicitud_investigador = ' + expendiente + ' group by 1,2,3,4,5,6');
                return rawData[0];

            }catch(e){
                console.log(e);
                const respuesta = { metodo: "getInfoDNI", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async getCategoria(categoria :any){

        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('select nombre_categoria, descripcion from rpe_categoria where nombre_categoria= \'' + categoria+'\'');

                return rawData[0];

            }catch(e){
                console.log(e);
                const respuesta = { metodo: "getCategoria", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async getFirmas(usuario : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('select nombre_completo nombre,gd.nombre direccion, gp.nombre puesto from gtu_usuario u '+
                'inner join gtu_departamento_puesto p on '+
                    'u.id_departamento_puesto = p.id '+
                    'inner join gtu_departamento gd on '+
                        'gd.id = p.id_departamento '+
                        'inner join gtu_puesto gp on '+
                            'gp.id = p.id_puesto '+
                'where usuario =\''+usuario+'\'');

                return rawData[0];

            }catch(e){
                const respuesta = { metodo: "getFirmas", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public  async  getCorrelativo(solicitud : any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('select rd.correlativo from rpe_dictamen rd inner join rpe_persona rp on '+
                'rd.no_registro_persona = rp.no_registro_persona '+
                'inner join rpe_solicitud rs on '+
                    'rs.no_registro_persona = rp.no_registro_persona '+
                'where '+
                    'rs.no_solicitud_investigador = ' + solicitud);

                if(rawData.length > 0){
                    console.log(rawData[0].correlativo);
                    return rawData[0].correlativo;
                }else{
                    const rawData = await connection.manager.query('insert into rpe_dictamen (correlativo, anio, no_registro_persona, fecha) '+
                    'select (select correlativo from rpe_dictamen order by 1 desc limit 1) +1 '+
                        ', YEAR(NOW()) '+
                        ', (select no_registro_persona from rpe_solicitud where no_solicitud_investigador = '+solicitud+') '+
                        ',NOW() ');
                        const res : any = await this.getCorrelativo(solicitud);
                        return res;
                }

            }catch(e){
                const respuesta = { metodo: "getFirmas", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

    public async dictamenDNI(solicitud : any, categoria :any){
        const fs = require("fs");
        const PDFDocument = require("pdfkit");
        const doc = new PDFDocument({ margin: 50, layout : 'landscape' });
        const  file = await this.generarDoc(doc, solicitud, categoria);
        // await this.generateCustomerInformation(doc, invoice, proceso);
    //        await this.generateFooter(doc);
        doc.end();
        return file;
    }

    PizZip = require('pizzip');
    Docxtemplater = require('docxtemplater');

    fs = require('fs');
    path = require('path');

    public async generarDoc(doc:any, solicitud : any, categoria : any) {

        const data = await this.getInfoDNI(solicitud);
        const data2 = await this.getCategoria(categoria);
        let nivel = "Estudiante";
        const firma1 = await this.getFirmas('morozco');
        const firma2 = await this.getFirmas('epaiz');
        const correlativo = await this.getCorrelativo(solicitud);

        const content = this.fs
            .readFileSync(this.path.resolve(__dirname, 'DNI.docx'), 'binary');
        const zip = new this.PizZip(content);
        try {
            doc = new this.Docxtemplater(zip, {linebreaks: true});
        } catch(error) {
            this.errorHandler(error);
        }

        if(data.cui === undefined || data.cui === null || data.cui == null){
            data.cui = "N/A";
        }
        if(data.titulo_pre !== null || data.titulo_pre != null){
            data.titulo_pre = "título en el grado de Licenciatura de " + data.titulo_pre;

            if(  data.titulo_pre.includes("ing") || data.titulo_pre.includes("Ing")){
                nivel = "Ing(a).";
            }else{
                nivel = "Lic(da).";
            }
        }else{
            data.titulo_pre = "";
        }

        if(data.titulo_maestria !== null && data.titulo_doctorado !== null){
            data.titulo_maestria = ", título en el grado de Maestría de " + data.titulo_maestria;
            nivel = "Mtro(a).";
        }else if(data.titulo_maestria !== null && (data.titulo_pre !== null && data.titulo_pre !== "" )){
            data.titulo_maestria = " y título en el grado de Maestría de " + data.titulo_maestria;
            nivel = "Mtro(a).";
        }else if(data.titulo_maestria !== null  && (data.titulo_pre === null || data.titulo_pre == null || data.titulo_pre === "" )){
            data.titulo_maestria = "título en el grado de Maestría de " + data.titulo_maestria;
            nivel = "Mtro(a).";
        }else{
            data.titulo_maestria = "";
        }

        if(data.titulo_doctorado !== null && (data.titulo_maestria === "" && data.titulo_pre === "")){
            data.titulo_doctorado = "título en el grado de Doctorado de " + data.titulo_doctorado;
            nivel = "Dr(a).";
        }else  if(data.titulo_doctorado !== null && (data.titulo_maestria !== "" || data.titulo_pre !== "")){
            data.titulo_doctorado = " y título en el grado de Doctorado de " + data.titulo_doctorado;
            nivel = "Dr(a).";
        }else{
            data.titulo_doctorado = "";
        }

        if((data.colegiado !== null  || data.colegiado != null) && data.colegiado > 0){
            data.colegiado = ", colegiado activo vigente No. " + data.colegiado ;
        }else{
            data.colegiado = "";
        }

        if(data.titulo_pre === "" && data.titulo_maestria === "" && data.titulo_doctorado === ""){
            data.titulo_pre ="Estudiante";
        }

        if(data.laboral !== null  || data.laboral != null){
            data.laboral = "Se tuvo a la vista la documentación laboral que respalda su experiencia profesional en las instituciones: " + data.laboral ;
        }else{
            data.laboral = "";
        }

        const meses = new Array ("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
        const f=new Date();
        const fecha_ =(f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
        doc.setData({
            expediente: solicitud,
            nombre: data.nombre,
            cui: data.cui,
            titulo_pre: data.titulo_pre,
            titulo_maestria: data.titulo_maestria,
            titulo_doctorado: data.titulo_doctorado,
            colegiado: data.colegiado,
            fecha: fecha_,
            categoria : categoria.substring(0,1),
            subcategoria : categoria,
            descripcion_categoria : data2.descripcion,
            nivel,
            firma2: firma2.nombre,
            puesto2: firma2.puesto,
            direccion2: firma2.direccion,
            firma1: firma1.nombre,
            puesto1: firma1.puesto,
            direccion1: firma1.direccion,
            punto_3: data.laboral,
            correlativo
        });

        try {
            doc.render()
        }
        catch (error) {
            this.errorHandler(error);
        }
        const buf = doc.getZip()
            .generate({type: 'nodebuffer'});
        this.fs.writeFileSync(this.path.resolve(__dirname, 'Dictamen_'+solicitud+'.docx'), buf);
        return 'Dictamen_'+solicitud+'.docx';
    }

    public async  errorHandler(error : any) {
        // console.log(JSON.stringify({error: error}, replaceErrors ));

        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors.map(function (error: any) {
                return error.properties.explanation;
            }).join("\n");
            console.log('errorMessages', errorMessages);
        }
        throw error;
    }
}