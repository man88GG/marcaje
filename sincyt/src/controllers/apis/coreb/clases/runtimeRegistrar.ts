import { ConnectionSINCYT }  from '../../../../models/ConnectionSINCYT';
import { Request, Response } from 'express-serve-static-core';
import { runtimeObtener } from './runtimeObtener';

// tslint:disable-next-line: class-name
export class runtimeRegistrar{
	// tslint:disable-next-line: no-empty
	constructor(){
	}

	public async actualizar_etapa(idEtapa : number, idEstado : number, tipoFecha : number){
		switch (tipoFecha) {
			case 1:
				return new ConnectionSINCYT().retornarConexion().then(async connection => {
					try{
						const rawData = await connection.manager.query('UPDATE sincyt.corb_etapa' +
							'        SET id_estado_etapa='+idEstado+', fecha_asignacion=NOW()' +
							'        WHERE id_etapa='+idEtapa+' AND fecha_asignacion IS NULL;');

						const respuesta = { metodo: "actualizar_etapa", codigo: 1, mensaje: "Fecha actualizada"};
						return respuesta;
					}catch(e){

						const respuesta = { metodo: "actualizar_etapa", codigo: 0, mensaje: "Error en actualizacion de la fecha"};
						return respuesta;
					}
				});
			case 2:
				return new ConnectionSINCYT().retornarConexion().then(async connection => {
					try{
						const rawData = await connection.manager.query('UPDATE sincyt.corb_etapa' +
							'        SET id_estado_etapa='+idEstado+', fecha_ejecucion=NOW()' +
							'        WHERE id_etapa='+idEtapa+' AND fecha_ejecucion IS NULL;');

						const respuesta = { metodo: "actualizar_etapa", codigo: 1, mensaje: "Fecha actualizada"};
						return respuesta;
					}catch(e){

						const respuesta = { metodo: "actualizar_etapa", codigo: 0, mensaje: "Error en actualizacion de la fecha"};
						return respuesta;
					}
				});
			case 3:
				return new ConnectionSINCYT().retornarConexion().then(async connection => {
					try{
						const rawData = await connection.manager.query('UPDATE sincyt.corb_etapa' +
							'        SET id_estado_etapa='+idEstado+', fecha_fin=NOW()' +
							'        WHERE id_etapa='+idEtapa+' AND fecha_fin IS NULL;');

						const respuesta = { metodo: "actualizar_etapa", codigo: 1, mensaje: "Fecha actualizada"};
						return respuesta;
					}catch(e){

						const respuesta = { metodo: "actualizar_etapa", codigo: 0, mensaje: "Error en actualizacion de la fecha"};
						return respuesta;
					}
				});
		}
	}


	public async actualizarAsignación (idEtapa : number, idEstado : number, tipoFecha : number, idUsuario : number){
		switch (tipoFecha) {
			case 1:
				return new ConnectionSINCYT().retornarConexion().then(async connection => {
					try{
						const rawData = await connection.manager.query('UPDATE sincyt.corb_etapa' +
							'        SET id_estado_etapa='+idEstado+', fecha_asignacion=NOW(), id_usuario = ' +idUsuario +
							'        WHERE id_etapa='+idEtapa+' AND fecha_asignacion IS NULL;');

						const respuesta = { metodo: "actualizar_etapa", codigo: 1, mensaje: "Fecha actualizada"};
						return respuesta;
					}catch(e){

						const respuesta = { metodo: "actualizar_etapa", codigo: 0, mensaje: "Error en actualizacion de la fecha"};
						return respuesta;
					}
				});
			case 2:
				return new ConnectionSINCYT().retornarConexion().then(async connection => {
					try{
						const rawData = await connection.manager.query('UPDATE sincyt.corb_etapa' +
							'        SET id_estado_etapa='+idEstado+', fecha_ejecucion=NOW(), id_usuario = ' +idUsuario +
							'        WHERE id_etapa='+idEtapa+' AND fecha_ejecucion IS NULL;');

						const respuesta = { metodo: "actualizar_etapa", codigo: 1, mensaje: "Fecha actualizada"};
						return respuesta;
					}catch(e){
						console.log(e);
						const respuesta = { metodo: "actualizar_etapa", codigo: 0, mensaje: "Error en actualizacion de la fecha"};
						return respuesta;
					}
				});
			case 3:
				return new ConnectionSINCYT().retornarConexion().then(async connection => {
					try{
						const rawData = await connection.manager.query('UPDATE sincyt.corb_etapa' +
							'        SET id_estado_etapa='+idEstado+', fecha_fin=NOW(), id_usuario = ' +idUsuario +
							'        WHERE id_etapa='+idEtapa+' AND fecha_fin IS NULL;');

						const respuesta = { metodo: "actualizar_etapa", codigo: 1, mensaje: "Fecha actualizada"};
						return respuesta;
					}catch(e){

						const respuesta = { metodo: "actualizar_etapa", codigo: 0, mensaje: "Error en actualizacion de la fecha"};
						return respuesta;
					}
				});
		}
	}


	public async crear_gestion(usuario : number, proceso : number){
		const noGestion = await this.iniciar_gestion(proceso, usuario);
		if(noGestion.codigo === 1){
			const inicio = await this.set_inicio(proceso, noGestion.no_gestion);
			if(inicio.codigo === 1){
				const primeraEtapa = await this.set_primera_etapa(noGestion.no_gestion, await new runtimeObtener().buscar_tarea_inicio(proceso), usuario);
				const respuesta = { metodo: "crear_gestion", codigo: 1, no_gestion: noGestion.no_gestion};
				return respuesta;
			}else{
				return inicio;
			}
		}else{
			return noGestion;
		}
	}

	public async iniciar_gestion(proceso : any, usuario : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('INSERT INTO sincyt.corb_gestion (id_proceso, fecha_inicio, fecha_fin, id_estado_gestion, id_solicitante)' +
				' VALUES('+proceso+', NOW(), NULL, 1, '+usuario+');');

				const id = rawData.insertId;
				const respuesta = { metodo: "iniciar_gestion", codigo: 1, no_gestion: id};
				return respuesta;
			}catch(e){
				console.log(e);
				const respuesta = { metodo: "iniciar_gestion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_gestion : -1};
				return respuesta;
			}
        });
	}

	public async insertar_evidencia(id_criterio : number, id_etapa : number, valor : any, metadata : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData1 = await connection.manager.query('DELETE FROM sincyt.corb_evidencia WHERE id_criterio = '+id_criterio+' AND id_etapa = '+id_etapa);
				if(valor !== "NULL"){
					const rawData = await connection.manager.query('INSERT INTO sincyt.corb_evidencia (id_criterio, id_etapa, valor, fecha , metadata)	VALUES(' + id_criterio +',' +id_etapa+ ',\''+ valor+'\', NOW(), \''+ metadata+'\');');
				}
				const respuesta = { metodo: "insertar_evidencia", codigo: 1, mensaje: "Evidencia insertada con éxito."};
				return respuesta;
			}catch(e){
				console.log(e);
				const respuesta = { metodo: "insertar_evidencia", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados"};
				return respuesta;
			}
		});
	}

	public async super_insertar_evidencia(id_criterio : number, id_etapa : number, valor : any, metadata : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData1 = await connection.manager.query('select * from corb_criterio where id_tipo_criterio = 5 and id_criterio = ' +id_criterio);

				if(rawData1.length == 0){
					const rawData1 = await connection.manager.query('DELETE FROM sincyt.corb_evidencia WHERE id_criterio = '+id_criterio+' AND id_etapa = '+id_etapa);
				}

				if(valor !== "NULL"){
					const rawData = await connection.manager.query('INSERT INTO sincyt.corb_evidencia (id_criterio, id_etapa, valor, fecha , metadata)	VALUES(' + id_criterio +',' +id_etapa+ ',\''+ valor+'\', NOW(), \''+ metadata+'\');');
					const respuesta = { metodo: "insertar_evidencia", codigo: 1, mensaje: "Evidencia insertada con éxito."};
					return respuesta;
				}else{
					const respuesta = { metodo: "insertar_evidencia", codigo: 1, mensaje: "Evidencia insertada con éxito."};
					return respuesta;
				}
			}catch(e){
				console.log(e);
				const respuesta = { metodo: "insertar_evidencia", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados"};
				return respuesta;
			}
		});
	}


	public async super_insertar_evidencia_multipe(id_criterio : number, id_etapa : number, valor : any, metadata : any, usuario : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				if(valor !== "NULL"){
					const rawData = await connection.manager.query('INSERT INTO sincyt.corb_evidencia (id_criterio, id_etapa, valor, fecha , metadata)	VALUES(' + id_criterio +',' +id_etapa+ ',\''+ valor+'\', NOW(), \''+ metadata+'\');');
					console.log(rawData.insertId);
					const respuesta = { metodo: "insertar_evidencia", codigo: 1, mensaje: "Evidencia insertada con éxito."};

					const rawData2 = await connection.manager.query('INSERT INTO sincyt.corb_evidencia_usuario (id_evidencia, id_usuario)	VALUES(' + rawData.insertId +',' +usuario+ ');');

					return respuesta;
				}else{
					const respuesta = { metodo: "insertar_evidencia", codigo: 1, mensaje: "Evidencia insertada con éxito."};
					return respuesta;
				}
			}catch(e){
				console.log(e);
				const respuesta = { metodo: "insertar_evidencia", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados"};
				return respuesta;
			}
		});
	}
	public async finalizarGestion(idGestion : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('UPDATE sincyt.corb_gestion' +
					'    SET fecha_fin=NOW(), id_estado_gestion=2' +
					'    WHERE id_gestion= '+idGestion+';');

				const respuesta = { metodo: "finalizarGestion", codigo: 1, mensaje: "Gestión finalizada con éxito."};
				return respuesta;
			}catch(e){

				const respuesta = { metodo: "finalizarGestion", codigo: 0, mensaje: "No se logró el fin de la gestión."};
				return respuesta;
			}
		});
	}

	public async set_inicio(proceso : number, gestion : number){
		try{
			const tarea =  await new runtimeObtener().buscar_tarea_inicio(+proceso);
			if(tarea !== -1){
				const etapa = await this.registrar_etapa(+gestion,tarea,3, null, "NULL", "NOW()", "NOW()", "NOW()");
				if(etapa.codigo === 1){
					const respuesta = { metodo: "set_inicio", codigo: 1, mensaje: "Registro de etapta de inicio con �xito."};
					return respuesta;
				}else{
					const respuesta = { metodo: "set_inicio", codigo: 0, mensaje: etapa.mensaje};
					return respuesta;
				}
			}
		}catch(e){
				const respuesta = { metodo: "set_inicio", codigo: 0, mensaje:  "No se pudo iniciar la gestión, revise los parametros ingresados"};
				return respuesta;
		}
	}

	public async set_primera_etapa(gestion : number, tarea : number, usuario : number){
		const tareaDestino = await new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select id_tarea_destino from corb_ruta where id_tarea_origen = '+tarea+';');
				return rawData[0].id_tarea_destino;
			}catch(e){

				return -1;
			}
		});
		const resultado = await this.registrar_etapa(+gestion, tareaDestino, 2,+usuario, "NULL", "NOW()", "NULL", "NULL");
		return resultado;
	}

	// tslint:disable-next-line:variable-name
	public async registrar_etapa(id_gestion : number, id_tarea : number, id_estado : number, id_usuario : any, id_perfil : any, fecha_asignacion : any, fecha_ejecucion : any, fecha_fin : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('INSERT INTO sincyt.corb_etapa (id_gestion, id_tarea, id_estado_etapa, id_usuario, id_perfil, fecha_asignacion, fecha_ejecucion, fecha_fin)'+
					'VALUES('+id_gestion+','+ id_tarea +',' +id_estado+ ','+ id_usuario+ ','+ id_perfil+ ','+ fecha_asignacion+ ',' +  fecha_ejecucion +','+ fecha_fin+');');

				const respuesta = { metodo: "registrar_etapa", codigo: 1, mensaje: "Registro de etapa con éxito."};
				return respuesta;
			}catch(e){
				console.log(e);
				const respuesta = { metodo: "registrar_etapa", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados"};
				return respuesta;
			}
        });
	}


    public async AsociarUsuarioEtapa(usuario : number, etapa : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO corb_etapa_usuario (id_etapa, id_usuario)' +
                    ' VALUES(' + etapa + ', ' + usuario + ');');

                const respuesta = { metodo: "AsociarUsuarioEtapa", codigo: 1};
                return await respuesta;
            }catch(e){

                const respuesta = { metodo: "AsociarUsuarioEtapa", codigo: 0};
                return respuesta;
            }
        });
    }
}

