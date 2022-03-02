import { fileURLToPath } from 'url';
import { ConnectionSINCYT }  from '../../../../models/ConnectionSINCYT';

export class red{
    constructor(){
	}

	public async isPostulacion(persona : any, convocatoria : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select * from red_postulacion where '+
				'id_convocatoria = '+convocatoria+' and '+
				'no_registro_persona = '+persona);
				if(rawData.length > 0){
					return true;
				}
				return false;
			}catch(e){
				console.log(e);
				return true;
			}
		});
    }

	public async getNoRegistroPersona(dni : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select no_registro_persona from rpe_persona where no_registro_oficial = '+dni);

				return rawData[0].no_registro_persona;
			}catch(e){
				console.log(e);
				return -1;
			}
		});
    }

	public async createDatosRed(dni : any, data : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('DELETE FROM red_datos where no_registro_persona = '+dni);
				const rawData2 = await connection.manager.query('INSERT INTO red_datos(no_registro_persona, data) values(' +dni + ',\''+data+'\')');
				return 1;
			}catch(e){
				console.log(e);
				return -1;
			}
		});
    }

	public async  errorHandler(error : any) {
        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors.map(function (error: any) {
                return error.properties.explanation;
            }).join("\n");
            console.log('errorMessages', errorMessages);
        }
        throw error;
    }

	public async createDocRed(persona : any, data: any){
        const fs = require("fs");
        const PDFDocument = require("pdfkit");
        const doc = new PDFDocument({ margin: 50, layout : 'landscape' });
        const  file = await this.generarDoc(doc, persona, data);
        doc.end();
        return file;
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
                '   where p.no_registro_persona = ' + expendiente + ' group by 1,2,3,4,5,6');
                return rawData[0];

            }catch(e){
                console.log(e);
                const respuesta = { metodo: "getInfoDNI", codigo: 0, no_gestion: -1};
                return respuesta;
            }
        });
    }

	PizZip = require('pizzip');
    Docxtemplater = require('docxtemplater');

    fs = require('fs');
    path = require('path');


	public async generarDoc(doc:any, persona : any, data :any) {

        const informacion = await this.getInfoDNI(persona);
        const content = this.fs
            .readFileSync(this.path.resolve(__dirname, 'carta_red.docx'), 'binary');


            let profesion = "";
            let grado = "";
            if(informacion.titulo_pre !== null || informacion.titulo_pre != null){
                profesion = informacion.titulo_pre;
            }else{
                informacion.titulo_pre = "";
            }

            if(informacion.titulo_maestria !== null && informacion.titulo_doctorado !== null){
                grado = informacion.titulo_maestria;
            }else if(informacion.titulo_maestria !== null && (informacion.titulo_pre !== null && informacion.titulo_pre !== "" )){
                grado = informacion.titulo_maestria;
            }else if(informacion.titulo_maestria !== null  && (informacion.titulo_pre === null || informacion.titulo_pre == null || informacion.titulo_pre === "" )){
                grado = informacion.titulo_maestria;
            }else{
            }

            if(informacion.titulo_doctorado !== null && (informacion.titulo_maestria === "" && informacion.titulo_pre === "")){
                grado = informacion.titulo_doctorado;
            }else  if(informacion.titulo_doctorado !== null && (informacion.titulo_maestria !== "" || informacion.titulo_pre !== "")){
                grado = informacion.titulo_doctorado;
            }else{
                informacion.titulo_doctorado = "";
            }

        const zip = new this.PizZip(content);
        try {
            doc = new this.Docxtemplater(zip, {linebreaks: true});
        } catch(error) {
            this.errorHandler(error);
        }

        const meses = new Array ("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
        const f=new Date();
        const fecha_ =(f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
		data = JSON.parse(data);
        doc.setData({
            fecha: fecha_,
            nombre: informacion.nombre,
            cui : informacion.cui,
            laboral : informacion.laboral,
            intereses : data.intereses,
            experto : data.especialidad,
            profesion,
            estudio : grado,
            areas : data.area,
            actividades : data.actividades
        });

        try {
            doc.render()
        }
        catch (error) {
            this.errorHandler(error);
        }
        const buf = doc.getZip()
            .generate({type: 'nodebuffer'});
        this.fs.writeFileSync(this.path.resolve(__dirname, 'Solicitud_Red_'+persona+'.docx'), buf);



        const mongo = await this.putFile(this.path.resolve(__dirname, 'Solicitud_Red_'+persona+'.docx'), 'Solicitud_Red_'+persona+'.docx', persona);
        console.log(mongo);
        return 'Solicitud_Red_'+persona+'.docx';
    }

     mongoose = require("mongoose");
     Grid = require('gridfs-stream');
     GridFS = this.Grid(this.mongoose.connection.db, this.mongoose.mongo);

    public async putFile(path : any , name : any, persona : any  ) {
        const id_mongo = "";
        const writestream = this.GridFS.createWriteStream({
            filename: name,
            metadata :  {
                usuario: persona,
                nombre_documento_original: 'Solicitud_Red_'+persona+'.docx',
                modulo: "CD"
            }
        });
        writestream.on('close', function (file: any) {
            const axios = require('axios');

            axios.post('http://localhost:5000/apis/carpeta/registrar/documentoadminSinGestion', {
                nombre: 'Solicitud_Red_'+persona+'.docx',
                ref_mongodb: file._id,
                usuario : persona
              })
              .then(function (response : any) {
                axios.post('http://localhost:5000/apis/correo/enviar/red/investigador', {
                    no_registro_persona : persona
                  })
                  .then(function (response : any) {

                  })
                  .catch(function (error : any) {

                  });
                  axios.post('http://localhost:5000/apis/correo/enviar/red/admin', {
                    no_registro_persona : persona
                  })
                  .then(function (response : any) {

                  })
                  .catch(function (error : any) {

                  });
              })
              .catch(function (error : any) {

              });
              updateMongoDatos(persona, file._id);
          // callback(null, file);
        });
        this.fs.createReadStream(path).pipe(writestream);
        console.log(id_mongo);
        return id_mongo;
    }

    public async updateMongoDatos(dni : any, idmongo : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('UPDATE red_datos SET id_mongo =\''+idmongo+'\' WHERE no_registro_persona = '+dni);
				return 1;
			}catch(e){
				console.log(e);
				return -1;
			}
		});
    }

    public async postulacion(persona : any, convocatoria : any, data : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{

				persona = await this.getNoRegistroPersona(persona);
				let respuesta = { metodo: "postulacion", codigo: 0};
				const isPostulado = await this.isPostulacion(persona, convocatoria);
				const datos = await this.createDatosRed(persona, data);
                const documento = await this.createDocRed(persona, data);
				if(isPostulado){
					respuesta = { metodo: "postulacion", codigo: 2};
				}else{
					const rawData = await connection.manager.query('insert into red_postulacion (id_convocatoria, no_registro_persona, fecha_postulacion) values('+convocatoria+','+persona+', now())');
					respuesta = { metodo: "postulacion", codigo: 1};
				}
				return respuesta;
			}catch(e){
				console.log(e);
				const respuesta = { metodo: "postulacion", codigo: -1};
				return respuesta;
			}
		});
    }

    public async guardarDatos(persona : any, data : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{

				persona = await this.getNoRegistroPersona(persona);
				const respuesta = { metodo: "guardarDatos", codigo: 1};
				const datos = await this.createDatosRed(persona, data);

				return respuesta;
			}catch(e){
				console.log(e);
				const respuesta = { metodo: "guardarDatos", codigo: -1};
				return respuesta;
			}
		});
    }

    public async getPostulacion(persona : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
                persona = await this.getNoRegistroPersona(persona);
                const rawData = await connection.manager.query('select data from red_datos where no_registro_persona = '+ persona);
                return rawData[0].data;
			}catch(e){
				console.log(e);
				const respuesta = { metodo: "getPostulacion", codigo: -1};
				return respuesta;
			}
		});
    }

    public async getFotografia(persona : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
                persona = await this.getNoRegistroPersona(persona);
                const rawData = await connection.manager.query('select d.id_mongo from rpe_documento d inner join rpe_persona_bloque_documento b on '+
                ' d.no_documento = b.no_documento '+
                ' inner join rpe_persona rp on '+
                '    rp.no_registro_persona = b.no_registro_persona '+
                ' where '+
                '    rp.no_registro_persona = '+persona+' and '+
                '    d.no_bloque = 1001 and '+
                '   d.no_tipo_documento = 1');
                return rawData[0];
			}catch(e){
				console.log(e);
				const respuesta = { metodo: "getFotografia", codigo: -1};
				return respuesta;
			}
		});
    }

    public async getHabilitado(persona : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
                persona = await this.getNoRegistroPersona(persona);
                const rawData = await connection.manager.query('select * from red_convocatoria where now() BETWEEN fecha_inicio  and fecha_fin and activo = 1');

                if(rawData.length == 0){
                    const respuesta = { metodo: "getHabilitado", codigo: 2, mensaje : "No existe convocatoria habilitada para la postulación."};
                    return respuesta;
                }else{
                    const rawData = await connection.manager.query('select * from rpe_persona where no_registro_persona  = ' + persona + ' and is_red_ct=1');
                    if(rawData.length == 1){
                        const respuesta = { metodo: "getHabilitado", codigo: 4, mensaje: "Usted ya es miembro de la red."};
                        return respuesta;
                    }else{
                        const rawData = await connection.manager.query('select * from red_postulacion where no_registro_persona  = ' + persona);
                        if(rawData.length == 0){
                            const respuesta = { metodo: "getHabilitado", codigo: 1, mensaje : "ok"};
                            return respuesta;
                        }else{
                            const respuesta = { metodo: "getHabilitado", codigo: 3, mensaje: "Usted ya se postuló a la red, su solicitud está en evaluación."};
                            return respuesta;
                        }
                    }
                }
			}catch(e){
				console.log(e);
				const respuesta = { metodo: "getHabilitado", codigo: 4, mensaje : "Error en el servicio de consulta."};
				return respuesta;
			}
		});
    }
}

function updateMongoDatos(dni: any, idmongo: any) {
    return new ConnectionSINCYT().retornarConexion().then(async connection => {
        try{
            const rawData = await connection.manager.query('UPDATE red_datos SET id_mongo =\''+idmongo+'\' WHERE no_registro_persona = '+dni);
            return 1;
        }catch(e){
            console.log(e);
            return -1;
        }
    });
}
