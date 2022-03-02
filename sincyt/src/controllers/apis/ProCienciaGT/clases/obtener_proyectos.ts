import { ConnectionSINCYT } from '../../../../models/ConnectionSINCYT';

// tslint:disable-next-line: class-name
export class obtener_proyectos {

    constructor() {
    }

    public async obtenerProyectos(id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`
                SELECT
                r.no_registro_oficial as DNI,
                concat(r.nombres, ' ',r.apellidos) as NombreInvestigador,
                c.no_proyecto_ingreso as NumeroProyecto,
                c.año as AñoProyecto,
                c.nombre_proyecto as NombreProyecto,
                c.unidad_ejecutora as NombreEntidad,
                c.dne as DNE,
                l.id_linea as IdLinea,
                l.acronimo as NombreLinea,
                '' dne_id,
                r.no_registro_persona dni_id
                FROM rhpl_catalogo c
                inner join rpe_persona r on r.no_registro_oficial=c.no_registro_oficial
                inner join sgp_linea l on l.id_linea=c.id_linea
                where r.no_registro_oficial=${id_usuario} and c.id_estatus in (6,11)
                union
                SELECT
                rp.no_registro_oficial,
                concat(rp.nombres, ' ',rp.apellidos),
                spp.id_perfil_proyecto,
                EXTRACT(YEAR FROM spp.fecha_creacion),
                sdf.valor nombre,
                sdf2.valor entidad,
                sdf3.valor dne,
                sl.id_linea,
                sl.acronimo,
                de.no_entidad, rp.no_registro_persona
                from app_detalle_proceso adp inner join
                    asgp_solicitud as2 on
                        as2.cod_proceso = adp.cod_proceso
                        inner join sgp_perfil_proyecto spp on
                            spp.id_perfil_proyecto = as2.id_perfil_proyecto
                            inner join sgp_linea sl on
                                spp.id_linea = sl.id_linea
                                inner join rpe_persona rp on
                                    spp.no_registro_persona =rp.no_registro_persona
                                    inner join sgp_detalle_formulario sdf on
                                        sdf.id_perfil_proyecto = spp.id_perfil_proyecto
                                        inner join sgp_detalle_formulario sdf2 on
                                            sdf2.id_perfil_proyecto = spp.id_perfil_proyecto and
                                            (sdf2.id_seccion_formulario in (46,128,271) or sdf2.id_perfil_proyecto is null)
                                            inner join sgp_detalle_formulario sdf3 on
                                                sdf3.id_perfil_proyecto = spp.id_perfil_proyecto and
                                                (sdf3.id_seccion_formulario in (45,130,273) or sdf3.id_seccion_formulario is null)
                                                left join dne_entidad de on
                                	                de.codigo_real =  sdf3.valor
                where adp.id_actividad in (25,36) and rp.no_registro_oficial = ${id_usuario} and
                sdf.id_seccion_formulario in (23,135,278);`);

                const respuesta = { metodo: "obtenerProyectos", codigo: 1, proyectos: rawData };
                return respuesta;
            } catch (e) {
                const respuesta = { metodo: "obtenerProyectos", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", proyectos: -1 };
                return respuesta;
            }
        });
    }


    public async obtenerProyectos_admin(id_usuario: any) {
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try {
                const rawData = await connection.manager.query(`select distinct asgp_solicitud.nuevo_estado_temporal formEnProcesoNuevoEstadoId,
                aa2.descripcion as formEnProcesoNuevoEstado,
                asgp_solicitud.comentario_temporal formEnProcesoComentarioTemporal,
                asgp_solicitud.monto_recomendado formEnProcesoMontoRecomendado,
                rpe_estado.nombre_estado formEnProcesoResultadoTecnico,
                asgp_solicitud.no_solicitud formEnProcesoNoSolicitud,
                asgp_solicitud.cod_proceso formEnProcesoCodProceso,
                asgp_solicitud.cod_proceso formEnProcesoCodigoProceso,
                asgp_solicitud.id_perfil_proyecto formEnProcesoIdPerfilProyecto,
                DATE_FORMAT(asgp_solicitud.fecha_creacion,'%d/%m/%Y') as formEnProcesoFechaCreacion,
                app_actividad.id_actividad formEnProcesoIdActividad,
                app_actividad.descripcion formEnProcesoNombreActividad,
                sgp_perfil_proyecto.no_registro_persona formEnProcesoNumeroRegistro,
                rpe_persona.nombres formEnProcesoNombresInvestigador,
                rpe_persona.apellidos formEnProcesoApellidosInvestigador,
                sgp_linea.acronimo as formEnProcesoNombreLinea,
                app_actividad.url formEnProcesoURL,
                rpe_persona.correo_electronico formEnProcesoCorreo,
                rpe_persona.no_registro_persona formEnProcesoNoRegistroPersona,
                sgp_perfil_proyecto.numero_convocatoria formEnProcesoNumeroConvocatoria,
                sgp_linea.id_linea formEnProcesoIdLinea,
                if( (select count(id_usuario) from asgp_asigna_usuario_solicitud where asgp_asigna_usuario_solicitud.no_solicitud = asgp_solicitud.no_solicitud and asgp_asigna_usuario_solicitud.id_tipo_usuario_asignacion = 1 ) > 0, 'Si','No') evaluadorAsignado
                from
                asgp_solicitud
                join app_proceso_ejecucion on asgp_solicitud.cod_proceso = app_proceso_ejecucion.cod_proceso
                join app_detalle_proceso on app_proceso_ejecucion.cod_proceso = app_detalle_proceso.cod_proceso
                join app_actividad on app_detalle_proceso.id_actividad = app_actividad.id_actividad
                join sgp_perfil_proyecto  on asgp_solicitud.id_perfil_proyecto = sgp_perfil_proyecto.id_perfil_proyecto
                join rpe_persona on sgp_perfil_proyecto.no_registro_persona = rpe_persona.no_registro_persona
                join sgp_linea on sgp_perfil_proyecto.id_linea = sgp_linea.id_linea
                join app_rol_actividad on app_actividad.id_actividad = app_rol_actividad.id_actividad
                left join asgp_resultados_solicitud on asgp_solicitud.no_solicitud = asgp_resultados_solicitud.no_solicitud
                left join rpe_estado on asgp_resultados_solicitud.no_estado = rpe_estado.no_estado and asgp_resultados_solicitud.no_tipo_estado = rpe_estado.no_tipo_estado
                left join app_actividad as aa2 on asgp_solicitud.nuevo_estado_temporal = aa2.id_actividad
                where app_detalle_proceso.id_accion = 4
                and app_detalle_proceso.id_actividad in (select id_actividad from app_actividad where app_actividad.id_proceso in (3,4))
                and app_rol_actividad.id_rol in ( select gtu_usuario_perfil.id_perfil from gtu_usuario_perfil where id_usuario = "${id_usuario}"
            )order by asgp_solicitud.cod_proceso desc;`);

                Object.keys(rawData).forEach(key => {
                    // console.log(rawData[key]);
                });
                return rawData;
            } catch (e) {
                const respuesta = { metodo: "obtenerProyectos", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", proyectos: -1 };
                return respuesta;
            }
        });
    }
}