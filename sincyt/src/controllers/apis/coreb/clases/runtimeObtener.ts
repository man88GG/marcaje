import { ConnectionSINCYT }  from '../../../../models/ConnectionSINCYT';
import { Request, Response } from 'express-serve-static-core';
import {runtimeRegistrar} from "./runtimeRegistrar";
import { raw } from 'body-parser';
import { readSync } from 'fs';

// tslint:disable-next-line: class-name
export class runtimeObtener{

	// tslint:disable-next-line: no-empty
	constructor(){
	}

	// tslint:disable-next-line:variable-name
	public async buscar_tarea_inicio(id_proceso : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('SELECT * FROM corb_tarea WHERE id_proceso = '+id_proceso+' AND id_tipo_tarea = 1;');
				const retorno =  +rawData[0].id_tarea;
				return await retorno;
			}catch(e){
				return -1;
			}
		});
	}

	public async getEvidencias(id_detapa : number, id_funcion_criterio : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('SELECT ce.id_criterio, ce.valor, cc.nombre From corb_evidencia ce INNER JOIN corb_criterio cc ON ce.id_criterio = cc.id_criterio ' +
					'WHERE ' +
					'ce.id_etapa = ' + id_detapa);
				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async getCondiciones(id_tarea : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('SELECT cc.id_criterio, cc.nombre from corb_tarea_criterio tc INNER JOIN ' +
					'corb_criterio cc on tc.id_criterio = cc.id_criterio where tc.id_tarea = ' + id_tarea);
				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async getRutas(id_tarea : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('SELECT * from corb_ruta WHERE id_tarea_origen = '+ id_tarea +' ORDER BY prioridad desc');
				return await rawData;
			}catch(e){
				return e;
			}
		});
	}

	public async getReglas(id_ruta : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('SELECT cr.id_criterio, cc.nombre, cr.operador, cr.valor FROM corb_ruta r INNER JOIN corb_regla cr on r.id_ruta = cr.id_ruta ' +
					' INNER JOIN corb_criterio cc on cr.id_criterio = cc.id_criterio ' +
					'	WHERE  r.id_ruta = '+ id_ruta);
				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async existeEvidencia(criterio : number, etapa : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select e.*, tc.* from corb_evidencia e inner join corb_criterio c on e.id_criterio = c.id_criterio '
				+' inner join corb_tipo_criterio tc on c.id_tipo_criterio = tc.id_tipo_criterio'
				+' where e.id_criterio = '+criterio+' and e.id_etapa = '+etapa+';');

				let respuesta = null;

				if(rawData.length>0){
					respuesta = { metodo: "existeEvidencia", codigo: 1, tipo_criterio: rawData[0].id_tipo_criterio, mensaje: "Existen "+rawData.length+" evidencias registradas"};
				}else{
					respuesta = { metodo: "existeEvidencia", codigo: 0, tipo_criterio: criterio, mensaje: "No existen evidencias registradas"};
				}
				return await respuesta;
			}catch(e){

				return -1;
			}
		});
	}

	public async validarCondiciones(evidenciasCondiciones : any, condiciones : any){
		try{
			const evidencias = JSON.parse(evidenciasCondiciones);
			const cond  = JSON.parse(condiciones);
			const retorno = JSON.parse(condiciones);
			console.log(retorno);
			if(cond.length === 0){
				const respuesta = { metodo: "validarCondiciones", codigo: 1, mensaje: "Condiciones validadas con éxito."};
				return respuesta;
			}else{
				Object.keys(cond).forEach(key => {
					Object.keys(evidencias).forEach(key2 => {
						if(cond[key].id_criterio === evidencias[key2].id_criterio){
							delete retorno[key];
						}
					});
				});

				const filtered = retorno.filter(function (el : any) {
					return el != null;
				});

				if(filtered.length === cond.length || filtered.length >0){
					const respuesta = { metodo: "validarCondiciones", codigo: 0, mensaje: "Condiciones faltantes", anexo: filtered};
					return respuesta;
				}else{
					const respuesta = { metodo: "validarCondiciones", codigo: 1, mensaje: "Condiciones validadas con éxito."};
					return respuesta;
				}
			}
		}catch (e) {
			console.log(e);
		}
	}

	public async validarReglas(evidenciasReglas : any, reglas : any){
			let evidencias : any = null;
			let reg : any = null;
			let retorno : any = null;
		try{
			evidencias = JSON.parse(evidenciasReglas);
			reg  = JSON.parse(reglas);
			retorno  = Object.assign([], JSON.parse(reglas));
		}catch (e) {
			reg = reglas;
			retorno  = Object.assign([], reglas);
			evidencias = evidenciasReglas;
		}
		if(reg.length === 0){
			const respuesta = { metodo: "validarCondiciones", codigo: 1, mensaje: "Reglas validadas con éxito."};
			return respuesta;
		}else{
			Object.keys(reg).forEach(key => {
					Object.keys(evidencias).forEach(key2 => {
						switch (reg[key].operador) {
							case "==":
								if(reg[key].valor === "NULL" && (evidencias[key2].valor === "NULL" || evidencias[key2].valor === null || evidencias[key2].valor === undefined)  && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								} else if(reg[key].valor === evidencias[key2].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
							case ">":
								if(evidencias[key2].valor > reg[key].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
							case "<":
								if(evidencias[key2].valor < reg[key].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
							case ">=":
								if(evidencias[key2].valor >= reg[key].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
							case "<=":
								if(evidencias[key2].valor <= reg[key].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
							case "!=":
								if(reg[key].valor === "NULL" && (evidencias[key2].valor != null|| evidencias[key2].valor != undefined)  && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}else if(reg[key].valor != evidencias[key2].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
						}
				});
			});

			const filtered = retorno.filter(function (el : any) {
				return el != null;
			});

			if(filtered.length === reg.length || filtered.length > 0){
				const respuesta = { metodo: "validarReglas", codigo: 0, mensaje: "Reglas faltantes", anexo: filtered};
				return respuesta;
			}else{
				const respuesta = { metodo: "validarReglas", codigo: 1, mensaje: "Reglas validadas con éxito."};
				return respuesta;
			}
		}
	}

	public async get_usuarios_etapa(id_etapa : any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select * from corb_etapa_usuario where id_etapa = '+id_etapa);
				console.log(id_etapa);
				return await rawData;
			}catch(e){

				return -1;
			}
		});
	}

	public async get_evidencia_usuario_etapa(usuario : any, id_etapa: any){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select  ce.id_criterio, ce.valor, cc.nombre from corb_evidencia_usuario ceu inner join corb_evidencia ce on '+
				'ceu.id_evidencia  = ce.id_evidencia '+
				'INNER JOIN corb_criterio cc ON ce.id_criterio = cc.id_criterio ' +
				'where '+
					'ceu.id_usuario =' +usuario+ ' and '+
					'ce.id_etapa =' +id_etapa);
				return await rawData;
			}catch(e){

				return -1;
			}
		});
	}

	public async validarReglas_multiple(evidenciasReglas : any, reglas : any, id_etapa : any){
		let evidencias : any = null;
		let reg : any = null;
		let retorno : any = null;
		let usuarios : any = null;
		const retorno2 = [];
	try{
		// evidencias = JSON.parse(evidenciasReglas);
		reg  = JSON.parse(reglas);
		retorno  = Object.assign([], JSON.parse(reglas));
	}catch (e) {
		reg = reglas;
		retorno  = Object.assign([], reglas);
		// evidencias = evidenciasReglas;
	}
	usuarios = await this.get_usuarios_etapa(id_etapa);
	if(reg.length === 0){
		const respuesta = { metodo: "validarCondiciones", codigo: 1, mensaje: "Reglas validadas con éxito."};
		return respuesta;
	}else{
		for (const user of usuarios) {
			evidencias = await this.get_evidencia_usuario_etapa(user.id_usuario, id_etapa);
			try{
				retorno  = Object.assign([], JSON.parse(reglas));
			}catch (e) {
				retorno  = Object.assign([], reglas);
			}
				Object.keys(reg).forEach(key => {
					Object.keys(evidencias).forEach(key2 => {
						switch (reg[key].operador) {
							case "==":
								if(reg[key].valor === "NULL" && (evidencias[key2].valor === "NULL" || evidencias[key2].valor === null || evidencias[key2].valor === undefined)  && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								} else if(reg[key].valor === evidencias[key2].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
							case ">":
								if(evidencias[key2].valor > reg[key].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
							case "<":
								if(evidencias[key2].valor < reg[key].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
							case ">=":
								if(evidencias[key2].valor >= reg[key].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
							case "<=":
								if(evidencias[key2].valor <= reg[key].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
							case "!=":
								if(reg[key].valor === "NULL" && (evidencias[key2].valor != null|| evidencias[key2].valor != undefined)  && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}else if(reg[key].valor != evidencias[key2].valor && reg[key].id_criterio === evidencias[key2].id_criterio){
									delete retorno[key];
								}
								break;
						}
				});
			});
			if(retorno.length > 0){
				const usr = {id_usuario : user.id_usuario, evidencias_faltan: retorno}
				retorno2.push(usr);
			}
		}
	}



	if(retorno2.length > 0 ){
		const respuesta = { metodo: "validarReglas", codigo: 0, mensaje: "Reglas faltantes", anexo: retorno2};
		return respuesta;
	}else{
		const respuesta = { metodo: "validarReglas", codigo: 1, mensaje: "Reglas validadas con éxito."};
		return respuesta;

	}
}

	public async decidirRuta(id_tarea : number, id_etapa : number, rutas : any){
		let destino : any = -1;
		const evidencias : any = await this.getEvidencias(id_etapa,3);
		const rutas2 : any = JSON.parse(rutas);
		for (const key of Object.keys(rutas2)) {
			const reglas = await this.getReglas(+rutas2[key].id_ruta);
			const validacion = await this.validarReglas(evidencias, reglas);
			if(validacion.codigo === 1){
				destino = { metodo: "decidirRuta", codigo : 1 , destino : rutas2[key].id_tarea_destino};
				return destino;
			}else{
				destino = { metodo: "decidirRuta", codigo : 0 , destino : validacion};
			}
		}
		return destino;
	}

	public async decidirRuta_multiple(id_tarea : number, id_etapa : number, rutas : any){
		let destino : any = -1;
		const evidencias : any = await this.getEvidencias(id_etapa,3);
		const rutas2 : any = JSON.parse(rutas);
		for (const key of Object.keys(rutas2)) {
			const reglas = await this.getReglas(+rutas2[key].id_ruta);
			const validacion = await this.validarReglas_multiple(evidencias, reglas, id_etapa);
			if(validacion.codigo === 1){
				destino = { metodo: "decidirRuta", codigo : 1 , destino : rutas2[key].id_tarea_destino};
				return destino;
			}else{
				destino = { metodo: "decidirRuta", codigo : 0 , destino : validacion};
			}
		}
		return destino;
	}

	public async verificarTareaFinal(idTarea : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select * from corb_tarea where  id_tarea = '+idTarea+' and id_tipo_tarea = 2;');

				return await rawData;
			}catch(e){

				return -1;
			}
		});
	}

	public async getUsuarioDestino(idTareaDestino : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select gu.id, gu.nombre_completo, gu.id_tipo_usuario from corb_perfil_tarea pt' +
					'    inner join gtu_perfil on pt.id_perfil = gtu_perfil.id' +
					'        inner join gtu_usuario_perfil gup on gtu_perfil.id = gup.id_perfil' +
					'            inner join gtu_usuario gu on gup.id_usuario = gu.id' +
					'    where' +
					'        pt.id_tarea = '+idTareaDestino+';');

				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async getPerfilDestino(idTareaDestino : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select pt.id_perfil, gp.nombre, gp.id from corb_perfil_tarea pt inner join gtu_perfil gp ON ' +
					'    pt.id_perfil = gp.id where' +
					'        pt.id_tarea = '+idTareaDestino+';');
				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async getInvestigadorEnvia(idGestion : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select id From corb_etapa e inner join gtu_usuario gu on '+
				' e.id_usuario  = gu.id '+
			' where e.id_gestion = ' + idGestion+' and gu.id_tipo_usuario = 2' +
			' group by 1');
				return await rawData[0].id;
			}catch(e){
				return -1;
			}
		});
	}
	public async getEtapa(idGestion : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select id_etapa, id_tarea from corb_etapa ce' +
					' where id_gestion =' + idGestion +
					' order by 1 desc limit 1');
				return await rawData[0];
			}catch(e){
				return -1;
			}
		});
	}

	public async getTareaGestion(idEtapa : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select id_gestion, id_tarea from corb_etapa ce' +
					' where id_etapa =' + idEtapa +
					' order by 1 desc limit 1');
				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async getUsuariosRuta(idEtapa : number){
		const result = await this.getTareaGestion(idEtapa);
		const idGestion = +result[0].id_gestion;
		const idTarea = +result[0].id_tarea;
		const evidencias = await this.getEvidencias(idEtapa, 2);
		const condiciones = await this.getCondiciones(idTarea);
		const validacion = await this.validarCondiciones(JSON.stringify(evidencias), JSON.stringify(condiciones));
		const invs = await this.getInvestigadorEnvia(idGestion);

		const retorno: any []= [];
		if(validacion.codigo === 1 || validacion.codigo === 0){
			const rutas  = await this.getRutas(idTarea);
			const destino = await this.decidirRuta(idTarea, idEtapa, JSON.stringify(rutas));

			if(destino.codigo === 1 && destino.destino > 0){
				const perfilDest  = await this.getPerfilDestino(destino.destino);
				const usuarioDest = await this.getUsuarioDestino(destino.destino);
				let bandera = 0;
				const final = await this.verificarTareaFinal(destino.destino);
				if(final.length == 0){
					Object.keys(usuarioDest).forEach(key => {
						if(usuarioDest[key].id == invs){
							const obj ={tipo : "usuario", id :  usuarioDest[key].id, text: usuarioDest[key].nombre_completo};
							retorno.push(obj);
							bandera = 1;
						}
					});

					if(bandera==0){
						Object.keys(usuarioDest).forEach(key => {
							const obj ={tipo : "usuario", id :  usuarioDest[key].id, text: usuarioDest[key].nombre_completo};
							retorno.push(obj);
						});
					}

					Object.keys(perfilDest).forEach(key => {
						const obj ={tipo : "perfil", id :  perfilDest[key].id_perfil, text : perfilDest[key].nombre};

						retorno.push(obj);
					});
				}else{

				}

			}
		}
		return retorno;
	}

	public async calcularProximaEtapa2(idEtapa : number, usuarioPerfil : any = null){
		const result = await this.getTareaGestion(idEtapa);
		const idGestion = +result[0].id_gestion;
		const idTarea = +result[0].id_tarea;
		const evidencias = await this.getEvidencias(idEtapa, 2);
		const condiciones = await this.getCondiciones(idTarea);
		const validacion = await this.validarCondiciones(JSON.stringify(evidencias), JSON.stringify(condiciones));
		if(validacion.codigo === 1){
			const rutas  = await this.getRutas(idTarea);
			const destino = await this.decidirRuta(idTarea, idEtapa, JSON.stringify(rutas));
			if(destino.codigo === 1 && destino.destino > 0){
				const registro = new runtimeRegistrar();
				const update = await registro.actualizar_etapa(idEtapa,3,3);
				if(update.codigo === 1){
					const final = await this.verificarTareaFinal(destino.destino);
					if(final.length === 0){
						if(usuarioPerfil == null){
							const usuarioDest = await this.getPerfilDestino(destino.destino);
							const resultadoReg = await 	registro.registrar_etapa(idGestion, destino.destino, 1, "NULL", usuarioDest[0].id_perfil, "NOW()", "NULL", "NULL");
							return resultadoReg;
						}else if (usuarioPerfil[0].tipo == "perfil"){
							const resultadoReg = await 	registro.registrar_etapa(idGestion, destino.destino, 1, "NULL", usuarioPerfil[0].id, "NOW()", "NULL", "NULL");
							return resultadoReg;
						}else if (usuarioPerfil[0].tipo == "usuario"){
							const resultadoReg = await 	registro.registrar_etapa(idGestion, destino.destino, 1, usuarioPerfil[0].id, "NULL", "NOW()", "NULL", "NULL");
							return resultadoReg;
						}

					}else{
						const registro = new runtimeRegistrar();
						await registro.registrar_etapa(idGestion, destino.destino, 3, "NULL","NULL","NOW()", "NOW()", "NOW()");
						return registro.finalizarGestion(idGestion);
					}
				}else{
					return update;
				}
			}else{
				return destino;
			}
		}else{
			return validacion;
		}
	}

	public async calcularProximaEtapa3(idEtapa : number, usuarioPerfil : any = null){
		const result = await this.getTareaGestion(idEtapa);
		const idGestion = +result[0].id_gestion;
		const idTarea = +result[0].id_tarea;
		const evidencias = await this.getEvidencias(idEtapa, 2);
		const condiciones = await this.getCondiciones(idTarea);
		const validacion = await this.validarCondiciones(JSON.stringify(evidencias), JSON.stringify(condiciones));
		const invs = await this.getInvestigadorEnvia(idGestion);

		if(validacion.codigo === 1){
			const rutas  = await this.getRutas(idTarea);
			const destino = await this.decidirRuta(idTarea, idEtapa, JSON.stringify(rutas));
			if(destino.codigo === 1 && destino.destino > 0){
				const registro = new runtimeRegistrar();
				const update = await registro.actualizar_etapa(idEtapa,3,3);
				if(update.codigo === 1){
					const final = await this.verificarTareaFinal(destino.destino);
					if(final.length === 0){

						let bandera = 0;
						const usuarios = await this.getUsuarioDestino(destino.destino);
						Object.keys(usuarios).forEach(key => {
							if(usuarios[key].id == invs){
								bandera = 1;
							}
						});

						if(bandera == 1){
							const resultadoReg = await 	registro.registrar_etapa(idGestion, destino.destino, 1, invs, "NULL", "NOW()", "NULL", "NULL");
							return resultadoReg;
						}
						else{
							const usuarioDest = await this.getPerfilDestino(destino.destino);
							const resultadoReg = await 	registro.registrar_etapa(idGestion, destino.destino, 1, "NULL", usuarioDest[0].id_perfil, "NOW()", "NULL", "NULL");
							return resultadoReg;
						}
					}else{
						const registro = new runtimeRegistrar();
						await registro.registrar_etapa(idGestion, destino.destino, 3, "NULL","NULL","NOW()", "NOW()", "NOW()");
						return registro.finalizarGestion(idGestion);
					}
				}else{
					return update;
				}
			}else{
				return destino;
			}
		}else{
			return validacion;
		}
	}

	public async calcularProximaEtapa(idGestion : number, idTarea : number, idEtapa : number){
		const evidencias = await this.getEvidencias(idEtapa, 2);
		const condiciones = await this.getCondiciones(idTarea);
		const validacion = await this.validarCondiciones(JSON.stringify(evidencias), JSON.stringify(condiciones));
		if(validacion.codigo === 1){
			const rutas  = await this.getRutas(idTarea);
			const destino = await this.decidirRuta(idTarea, idEtapa, JSON.stringify(rutas));
			if(destino.codigo === 1 && destino.destino > 0){
				const registro = new runtimeRegistrar();
				const update = await registro.actualizar_etapa(idEtapa,3,3);
				if(update.codigo === 1){
					const final = await this.verificarTareaFinal(destino.destino);
					if(final.length === 0){
						const usuarioDest = await this.getPerfilDestino(destino.destino);
						const resultadoReg = await 	registro.registrar_etapa(idGestion, destino.destino, 1, "NULL", usuarioDest[0].id_perfil, "NOW()", "NULL", "NULL");
						return resultadoReg;
					}else{
						const registro = new runtimeRegistrar();
						await registro.registrar_etapa(idGestion, destino.destino, 3, "NULL", "NULL", "NOW()", "NOW()", "NOW()");
						return registro.finalizarGestion(idGestion);
					}
				}else{
					return update;
				}
			}else{
				return destino;
			}
		}else{
			return validacion;
		}
	}

	public async calcularProximaEtapaUsuario(idEtapa : number, usuarioDest : number){

		const result = await this.getTareaGestion(idEtapa);
		const idGestion = +result[0].id_gestion;
		const idTarea = +result[0].id_tarea;
		const evidencias = await this.getEvidencias(idEtapa, 2);
		const condiciones = await this.getCondiciones(idTarea);
		const validacion = await this.validarCondiciones(JSON.stringify(evidencias), JSON.stringify(condiciones));
		if(validacion.codigo === 1){
			const rutas  = await this.getRutas(idTarea);
			const destino = await this.decidirRuta(idTarea, idEtapa, JSON.stringify(rutas));
			if(destino.codigo === 1 && destino.destino > 0){
				const registro = new runtimeRegistrar();
				const update = await registro.actualizar_etapa(idEtapa,3,3);
				if(update.codigo === 1){
					const final = await this.verificarTareaFinal(destino.destino);
					if(final.length === 0){
						const dest  = await this.getPerfilDestino(destino.destino);
						const resultadoReg = await 	registro.registrar_etapa(idGestion, destino.destino, 1, usuarioDest, dest[0].id_perfil, "NOW()", "NULL", "NULL");
						return resultadoReg;
					}else{
						const registro = new runtimeRegistrar();
						await registro.registrar_etapa(idGestion, destino.destino, 3, "NULL","NULL", "NOW()", "NOW()", "NOW()");
						return registro.finalizarGestion(idGestion);
					}
				}else{
					return update;
				}
			}else{
				return destino;
			}
		}else{
			return validacion;
		}
	}

	public async calcularProximaEtapaUsuarios(idEtapa : number, usuarioDest : any){


		const result = await this.getTareaGestion(idEtapa);
		const idGestion = +result[0].id_gestion;
		const idTarea = +result[0].id_tarea;
		const evidencias = await this.getEvidencias(idEtapa, 2);
		const condiciones = await this.getCondiciones(idTarea);
		const validacion = await this.validarCondiciones(JSON.stringify(evidencias), JSON.stringify(condiciones));
		if(validacion.codigo === 1){
			const rutas  = await this.getRutas(idTarea);
			const destino = await this.decidirRuta_multiple(idTarea, idEtapa, JSON.stringify(rutas));
			if(destino.codigo === 1 && destino.destino > 0){
				const registro = new runtimeRegistrar();
				const update = await registro.actualizar_etapa(idEtapa,3,3);
				if(update.codigo === 1){
					const final = await this.verificarTareaFinal(destino.destino);
					if(final.length === 0){
						// const dest  = await this.getPerfilDestino(destino.destino);
						const resultadoReg = await 	registro.registrar_etapa(idGestion, destino.destino, 1, "NULL", "NULL", "NOW()", "NULL", "NULL");
						const etapa_actual = await this.getEtapa(idGestion);
						Object.keys(usuarioDest).forEach(key => {
							registro.AsociarUsuarioEtapa(usuarioDest[key], etapa_actual.id_etapa);
						});
						return resultadoReg;
					}else{
						const registro = new runtimeRegistrar();
						await registro.registrar_etapa(idGestion, destino.destino, 3, "NULL","NULL", "NOW()", "NOW()", "NOW()");
						return registro.finalizarGestion(idGestion);
					}
				}else{
					return update;
				}
			}else{
				return destino;
			}
		}else{
			return validacion;
		}
	}

	public async asignar_usuarios(etapa: number){

	}

	public async getDashboard(idUsuario : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('SELECT e.id_gestion idGestion,p.id_proceso idProceso, p.nombre proceso,t.id_tarea idTarea, e.id_etapa idEtapa, t.nombre Tarea,ee.descripcion Estado,t.url, 0 abierto '+
			' FROM ' +
				' corb_etapa e INNER JOIN corb_gestion g ON'+
				'	e.id_gestion = g.id_gestion '+
				'	INNER JOIN corb_proceso p ON '+
				'	g.id_proceso = p.id_proceso '+
				'		INNER JOIN corb_tarea t ON '+
				'			e.id_tarea = t.id_tarea '+
				'		INNER JOIN corb_estado_etapa ee ON '+
				'			e.id_estado_etapa = ee.id_estado_etapa ' +
				'	WHERE       '+
				'	e.id_usuario='+idUsuario+' AND '+
				'	e.id_estado_etapa <3 AND '+
				'	g.id_estado_gestion <> 4'+
				' UNION ALL '+
				'SELECT e.id_gestion idGestion,p.id_proceso idProceso, p.nombre proceso,t.id_tarea idTarea, e.id_etapa idEtapa, t.nombre Tarea,ee.descripcion Estado,t.url, 0 abierto  '+
				' FROM'+
				' corb_etapa e INNER JOIN corb_gestion g ON'+
				'	e.id_gestion = g.id_gestion '+
				'	INNER JOIN corb_proceso p ON '+
				'	g.id_proceso = p.id_proceso '+
				'		INNER JOIN corb_tarea t ON '+
				'			e.id_tarea = t.id_tarea '+
				'		INNER JOIN corb_estado_etapa ee ON'+
				'			e.id_estado_etapa = ee.id_estado_etapa'+
				'			INNER JOIN gtu_usuario_perfil gup ON'+
				'				gup.id_perfil = e.id_perfil '+
				'	WHERE   '+
				'	gup.id_usuario='+idUsuario+' AND '+
				'	e.id_usuario IS NULL AND '+
				'	e.id_estado_etapa <3 AND '+
				'	g.id_estado_gestion <> 4;');

				return await rawData;
			}catch(e){
				console.log(e);
				return -1;
			}
		});
	}

	public async estapaSiguiente(tarea : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select ct.id_tarea id, ct.nombre from corb_tarea ct \n' +
					'\tinner join corb_ruta cr \n' +
					'\t\ton ct.id_tarea  = cr.id_tarea_destino \n' +
					'\twhere \n' +
					'\t\tcr.id_tarea_origen = '+ tarea);

				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async existeCriterioEtapa(criterio : number, etapa : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select case when t.id_criterio is not null then true else false end existe, tt.* from \n' +
					'(select cc.* from corb_etapa ce inner join corb_evidencia ce2 on \n' +
					'\t\tce.id_etapa =ce2.id_etapa \n' +
					'\t\tinner join corb_criterio cc on \n' +
					'\t\t\tce2.id_criterio =cc.id_criterio \n' +
					'\twhere \n' +
					'\t\tce.id_etapa = '+etapa+' \n' +
					') t right join (select * from corb_criterio cc2 \n) tt on \n' +
					'\tt.id_criterio = tt.id_criterio\n' +
					'where \n' +
					'\ttt.id_criterio = '+criterio+'\n' +
					' ' );
				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}


	public async deleteCriterioEtapa(evidencia : number, etapa: number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select * from corb_evidencia where id_evidencia = ' + evidencia + ' and id_etapa = '+etapa);
				if(rawData.length == 0){
					const respuesta = { metodo: "deleteCriterioEtapa", codigo: -1, mensaje: "Las evidencias no pertenecen a la etapa."};
					return respuesta;
				}else{
					const rawData = await connection.manager.query('delete from corb_evidencia where id_evidencia = ' + evidencia + ' and id_etapa = '+etapa);

					const respuesta = { metodo: "deleteCriterioEtapa", codigo: 1, mensaje: "Evidencias eliminadas con éxito."};
					return respuesta;
				}

			}catch(e){
				console.log(e);
				return -1;
			}
		});
	}

	public async getCatalogoDocumentosEtapa(idTarea : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('select c.id_criterio id_criterio, nombre\n' +
					'from corb_tarea_criterio tc\n' +
					'         inner join corb_criterio c on tc.id_criterio = c.id_criterio and tc.id_tarea = ' + idTarea +' and c.id_tipo_criterio in (1,5)\n' +
					'union\n' +
					'select cc.id_criterio id_criterio, cc.nombre\n' +
					'from corb_tarea t\n' +
					'         inner join corb_ruta r on t.id_tarea = r.id_tarea_origen\n' +
					'         inner join corb_regla cr on r.id_ruta = cr.id_ruta\n' +
					'         inner join corb_criterio cc on cr.id_criterio = cc.id_criterio\n' +
					'    and t.id_tarea = ' + idTarea +' and cc.id_tipo_criterio in (1,5)\n' +
					'union\n' +
					'select c.id_criterio id_criterio, nombre\n' +
					'from corb_complemento cm\n' +
					'         inner join corb_criterio c on cm.id_criterio = c.id_criterio and cm.id_tarea = ' + idTarea +
					' and c.id_tipo_criterio in (1,5);\n' );
				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async getEvidenciasAutorizadas(idGestion : number, idPerfil : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('SELECT sq2.id_criterio,\n' +
					'       sq2.id_etapa,\n' +
					'       sq2.id_tarea,\n' +
					'       sq2.valor,\n' +
					'       sq2.metadata,\n' +
					'       sq2.fecha\n,' +
					'       sq2.id_evidencia\n' +
					'FROM (SELECT  ve.id_criterio, t.id_tarea\n' +
					'      FROM corb_gestion g\n' +
					'               INNER JOIN corb_proceso p\n' +
					'                          ON g.id_proceso = p.id_proceso\n' +
					'               INNER JOIN corb_tarea t\n' +
					'                          ON p.id_proceso = t.id_proceso\n' +
					'               INNER JOIN corb_ver_evidencia ve\n' +
					'                          ON t.id_tarea = ve.id_tarea\n' +
					'               INNER JOIN corb_criterio c\n' +
					'                          ON ve.id_criterio = c.id_criterio\n' +
					'                              AND t.id_tipo_tarea > 2\n' +
					'                              AND c.id_tipo_criterio  in (1,5)\n' +
					'                              AND g.id_gestion = ' + idGestion +
					'                              AND ve.id_perfil = '+idPerfil+') AS sq1\n' +
					'         INNER JOIN\n' +
					'         (SELECT c.id_criterio, et.id_tarea, et.id_etapa, e.id_evidencia, e.valor, e.metadata, e.fecha\n' +
					'          FROM corb_evidencia e\n' +
					'                   INNER JOIN corb_etapa et\n' +
					'                              ON e.id_etapa = et.id_etapa\n' +
					'                   INNER JOIN corb_criterio c\n' +
					'                              ON e.id_criterio = c.id_criterio\n' +
					'                                  AND c.id_tipo_criterio in (1,5)\n' +
					'                                  AND et.id_gestion = '+idGestion+') AS sq2\n' +
					'     ON sq1.id_tarea = sq2.id_tarea AND sq1.id_criterio = sq2.id_criterio;\n' );
				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async get_perfil_by_etapa(idEtapa : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('\n' +
					'SELECT pt.id_perfil FROM sincyt.corb_etapa e, corb_perfil_tarea pt WHERE e.id_tarea=pt.id_tarea and e.id_etapa = '+ idEtapa );
				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async get_tarea_by_etapa(idEtapa : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('\n' +
					'SELECT pt.id_tarea FROM sincyt.corb_etapa e, corb_perfil_tarea pt WHERE e.id_tarea=pt.id_tarea and e.id_etapa = '+ idEtapa );
				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async get_proceso_by_perfil(idPerfil : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('\n' +
					'select id_proceso from corb_perfil_proceso cpp where id_perfil =  '+ idPerfil );
				return await rawData;
			}catch(e){
				return -1;
			}
		});
	}


	public async getAsignado(idEtapa : number, usuario : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('\n' +
					'select * from corb_etapa ce where (id_usuario is null or id_usuario = ' + usuario +') and id_etapa  =  '+ idEtapa );
				if(await rawData.length == 1){
						return true;
					}
				return false;
			}catch(e){
				return -1;
			}
		});
	}

	public async getEvidenciasConsulta(idPerfil : number,idGestion  : number){
		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				const rawData = await connection.manager.query('SELECT c.id_criterio,e.id_etapa,e.id_tarea,ce.valor,ce.metadata,ce.fecha '+
				'FROM corb_ver_evidencia ve'+
				'		 inner join corb_criterio c on ve.id_criterio = c.id_criterio'+
				'		 inner join corb_evidencia ce on c.id_criterio = ce.id_criterio'+
				'		 inner join corb_etapa e on ce.id_etapa = e.id_etapa'+
				' WHERE c.id_tipo_criterio in (1,5) '+
				'  and ve.id_perfil = ' + idPerfil +
				'  and e.id_gestion =  '+ idGestion +
				' order by c.id_criterio, e.id_tarea;');
				return rawData;
			}catch(e){
				return -1;
			}
		});
	}

	public async getDashboardConsulta(idUsuario : number, fecha_inicio : any, fecha_fin : any ){

		return new ConnectionSINCYT().retornarConexion().then(async connection => {
			try{
				let consulta = 'select g.id_proceso, '+
				'cp.nombre nombreProceso, '+
				'g.id_gestion, '+
				't.id_tarea, '+
				't.nombre  nombreTarea, '+
				'e.id_etapa, '+
				'cee.descripcion, '+
				'p.id      idPerfil, '+
				'g.fecha_inicio, '+
				't1.url url2, '+
				'\'\'        fecha_fin, '+
				'datediff(now(), g.fecha_inicio) tiempo '+
		 'from gtu_usuario u ' +
				  'inner join gtu_usuario_perfil up on u.id = up.id_usuario '+
				  'inner join gtu_perfil p on up.id_perfil = p.id '+
				  'inner join corb_responsable r on p.id = r.id_perfil '+
				  'inner join corb_gestion g on r.id_proceso = g.id_proceso '+
				  'inner join corb_etapa e on g.id_gestion = e.id_gestion '+
				  'inner join corb_tarea t on e.id_tarea = t.id_tarea '+
				  'inner join corb_tarea t1 on t1.id_proceso = g.id_proceso and t1.id_tipo_tarea = 10 '+
				  'inner join corb_proceso cp on g.id_proceso = cp.id_proceso '+
				  'inner join corb_estado_etapa cee on e.id_estado_etapa = cee.id_estado_etapa '+
		 'where u.id =  '+idUsuario+
		   ' and p.tipo_perfil = 1 '+
		   'and r.tipo_responsable = 2 '+
		   'and g.id_estado_gestion = 1 '+
		   'and e.id_estado_etapa <= 2  ';
			if(fecha_fin !== undefined && fecha_inicio !== undefined){
				consulta+='  and g.fecha_inicio BETWEEN \''+fecha_inicio+'\' and \''+fecha_fin+'\'';
			}

		consulta+= 'union		'+
		 'select g.id_proceso, '+
				'cp.nombre nombreProceso, '+
				'g.id_gestion, '+
				'\'\'        id_tarea, '+
				'\'\'        nombreTarea, '+
				'\'\'        id_etapa, '+
				'ceg.descripcion, '+
				'p.id      idPerfil, '+
				'g.fecha_inicio, '+
				't2.url url2, '+
				'g.fecha_fin, '+
				'datediff(g.fecha_fin, g.fecha_inicio) tiempo '+
		 'from gtu_usuario u '+
				  'inner join gtu_usuario_perfil up on u.id = up.id_usuario '+
				  'inner join gtu_perfil p on up.id_perfil = p.id '+
				  'inner join corb_responsable r on p.id = r.id_perfil '+
				  'inner join corb_gestion g on r.id_proceso = g.id_proceso '+
				  'inner join corb_proceso cp on g.id_proceso = cp.id_proceso '+
				  'inner join corb_tarea t2 on t2.id_proceso = g.id_proceso and t2.id_tipo_tarea = 10 '+
				  'inner join corb_estado_gestion ceg on g.id_estado_gestion = ceg.id_estado_gestion '+
		 'where u.id = ' + idUsuario+
		   ' and p.tipo_perfil = 1 '+
		   'and r.tipo_responsable = 2 '+
		   'and g.id_estado_gestion = 2';
		   if(fecha_fin !== undefined && fecha_inicio !== undefined){
			consulta+='  and g.fecha_inicio BETWEEN \''+fecha_inicio+'\' and \''+fecha_fin+'\'';
			}

				const rawData = await connection.manager.query(consulta);
				return rawData;
			}catch(e){
				console.log(e);
				return false;
			}
		});
	}
}