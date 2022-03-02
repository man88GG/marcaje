import { ConnectionSINCYT }  from '../../../../models/ConnectionSINCYT';

export class procesosRegistrar{

    constructor(){
    }

    public async crearConvocatoria(detalle : any, fecha_reunion : any, lugar : any, gestion :number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_convocatoria (detalle_convocatoria, fecha_convocatoria, fecha_reunion, lugar, id_gestion)' +
                    ' VALUES(\''+detalle+'\', NOW(), STR_TO_DATE(\''+fecha_reunion+'\',\'%d-%m-%Y %h%i\'), \''+lugar+'\', '+gestion+');');
                const id = rawData.insertId;
                const respuesta = { metodo: "crearConvocatoria", codigo: 1, no_convocatoria: id};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "crearConvocatoria", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async asociarUsuarios(convocatoria : number, usuarios : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                usuarios =  JSON.parse(usuarios);
                const tot = usuarios.length;
                for(let i=0; i<tot; i++){
                    const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_usuario_convocatoria (id_usuario, id_convocatoria) VALUES(' +usuarios[i]+', '+ convocatoria+');');
                    const id = rawData.insertId;
                }
                const respuesta = { metodo: "asociarUsuarios", codigo: 1, no_convocatoria: 0};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "asociarUsuarios", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async crearProceso(objetivo : string, alcance : string,  padre: any, estado : any, convocatoria : number, version:string, nombre : string){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{

                const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_proceso (objetivo_proceso, alcance_proceso, proceso_padre, fecha_creacion, estado, id_convocatoria, version, nombre) ' +
                    'VALUES(\'' +objetivo+'\', \''+ alcance+'\', '+ padre+', NOW(), '+ estado+', '+ convocatoria+', \''+ version+'\', \''+ nombre+'\');');
                const id = rawData.insertId;
                const respuesta = { metodo: "crearProceso", codigo: 1, no_proceso: id};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "crearProceso", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async crearSIPOC(id_proceso : number, estado : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_sipoc (id_proceso, estado, fecha) ' +
                    'VALUES(' +id_proceso+', '+ estado+',  NOW());');
                const id = rawData.insertId;
                const respuesta = { metodo: "crearSIPOC", codigo: 1, no_sipoc: id};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "crearSIPOC", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_sipoc : -1};
                return respuesta;
            }
        });
    }

    public async crearInfoAdicional(id_proceso : number, clave : any, valores : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                valores =  JSON.parse(valores);
                const tot = valores.length;
                for(let i=0; i<tot; i++){
                    const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_informacion_adicional (id_proceso, clave, valor) VALUES('+id_proceso+',\'' +clave+'\', \''+ valores[i].valor+'\');');
                }
                const respuesta = { metodo: "crearInfoAdicional", codigo: 1, no_convocatoria: 0};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "crearInfoAdicional", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_sipoc : -1};
                return respuesta;
            }
        });
    }

    public async asociarDireccion(proceso : number, direccion : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_direccion_proceso (id_direccion, id_proceso) VALUES(' + direccion+', '+ proceso+');');
                const respuesta = { metodo: "asociarDireccion", codigo: 1, no_convocatoria: 0};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "asociarDireccion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async asociarDuenio(proceso : number, perfil : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_duenio_proceso (id_perfil, id_proceso) VALUES(' +perfil+', '+ proceso+');');
                const respuesta = { metodo: "asociarDuenio", codigo: 1, no_convocatoria: 0};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "asociarDuenio", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async asociarResponsables(proceso : number, usuarios : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                usuarios =  JSON.parse(usuarios);
                const tot = usuarios.length;
                for(let i=0; i<tot; i++){
                    const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_responsable_proceso (id_perfil, id_proceso) VALUES(' +usuarios[i]+', '+ proceso+');');
                    const id = rawData.insertId;
                }
                const respuesta = { metodo: "asociarResponsables", codigo: 1, no_convocatoria: 0};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "asociarResponsables", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async crearTareasProceso(sipoc : number, tareas : any, proceso : number, tipo : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                tareas =  JSON.parse(tareas);
                const tot = tareas.length;

                const del = await connection.manager.query('DELETE  gdp_informacion_adicional_tarea ' +
                    ' FROM gdp_tarea' +
                    ' INNER JOIN gdp_informacion_adicional_tarea ON ' +
                    ' gdp_tarea.id_terea = gdp_informacion_adicional_tarea.id_tarea' +
                    ' WHERE' +
                    ' gdp_tarea.id_sipoc =  '+sipoc+'');
                const del2 = await connection.manager.query('DELETE FROM sincyt.gdp_tarea WHERE id_sipoc= '+sipoc);
                const del3 = await connection.manager.query('DELETE FROM sincyt.gdp_sipoc WHERE id_proceso= '+proceso+' AND estado = ' + tipo + ' AND id_sipoc <> ' + sipoc);

                for(let i=0; i<tot; i++){

                    const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_tarea (nombre, duracion, max_duracion, id_sipoc) ' +
                        'VALUES(\'' +tareas[i].sipoc_p+'\', '+ tareas[i].sipoc_t+', '+ tareas[i].sipoc_t+', '+sipoc+');');
                    const id = rawData.insertId;

                    await this.infoAdicionalTarea(id, 'suppliers', tareas[i].sipoc_s);
                    await this.infoAdicionalTarea(id, 'inputs', tareas[i].sipoc_i);
                    await this.infoAdicionalTarea(id, 'outputs', tareas[i].sipoc_o);
                    await this.infoAdicionalTarea(id, 'costumers', tareas[i].sipoc_c);
                    await this.infoAdicionalTarea(id, 'observaciones', tareas[i].sipoc_ob);

                }
                const respuesta = { metodo: "crearTareas", codigo: 1, no_convocatoria: 0};
                return await this.obntenerInfo(sipoc);
            }catch(e){
                console.log(e);
                const respuesta = { metodo: "crearTareas", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async crearTareas(sipoc : number, tareas : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                tareas =  JSON.parse(tareas);
                const tot = tareas.length;

                const del = await connection.manager.query('DELETE  gdp_informacion_adicional_tarea ' +
                    ' FROM gdp_tarea' +
                    ' INNER JOIN gdp_informacion_adicional_tarea ON ' +
                    ' gdp_tarea.id_terea = gdp_informacion_adicional_tarea.id_tarea' +
                    ' WHERE' +
                    ' gdp_tarea.id_sipoc =  '+sipoc+'');
                const del2 = await connection.manager.query('DELETE FROM sincyt.gdp_tarea WHERE id_sipoc= '+sipoc+'');
                for(let i=0; i<tot; i++){


                    const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_tarea (nombre, duracion, max_duracion, id_sipoc) ' +
                        'VALUES(\'' +tareas[i].sipoc_p+'\', '+ tareas[i].sipoc_t+', '+ tareas[i].sipoc_t+', '+sipoc+');');
                    const id = rawData.insertId;

                    await this.infoAdicionalTarea(id, 'suppliers', tareas[i].sipoc_s);
                    await this.infoAdicionalTarea(id, 'inputs', tareas[i].sipoc_i);
                    await this.infoAdicionalTarea(id, 'outputs', tareas[i].sipoc_o);
                    await this.infoAdicionalTarea(id, 'costumers', tareas[i].sipoc_c);
                    await this.infoAdicionalTarea(id, 'observaciones', tareas[i].sipoc_ob);

                }
                const respuesta = { metodo: "crearTareas", codigo: 1, no_convocatoria: 0};
                return await this.obntenerInfo(sipoc);
            }catch(e){
                console.log(e);
                const respuesta = { metodo: "crearTareas", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async crearKPI(proceso : number, kpi : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                kpi =  JSON.parse(kpi);
                const tot = kpi.length;
                const del2 = await connection.manager.query('DELETE FROM sincyt.gdp_indicador WHERE id_proceso= '+proceso+'');

                for(let i=0; i<tot; i++){
                    const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_indicador (descripcion, medida, id_proceso, calculo, meta, frecuencia, responsable) ' +
                        'VALUES(\'' +kpi[i].descripcion+'\', \''+ kpi[i].medida+'\', '+proceso+', \''+ kpi[i].calculo+'\', \''+ kpi[i].meta+'\', \''+ kpi[i].frecuencia+'\', \''+ kpi[i].responsable+'\');');
                    const id = rawData.insertId;
                }
                const respuesta = { metodo: "crearKPI", codigo: 1, no_convocatoria: 0};
                return await this.obntenerKPIs(proceso);
            }catch(e){
                const respuesta = { metodo: "crearKPI", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async obntenerKPIs(proceso : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('select * from gdp_indicador gi  where gi.id_proceso  =  ' + proceso);
                const respuesta = { metodo: "obntenerKPIs", codigo: 1, no_convocatoria: 0};
                return rawData;
            }catch(e){
                const respuesta = { metodo: "obntenerKPIs", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async obntenerInfo(sipoc : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('select t.id_terea sipoc_no, nombre sipoc_p, s.valor  sipoc_s, i.valor  sipoc_i, o.valor  sipoc_o,  c.valor  sipoc_c , ob.valor  sipoc_ob \n' +
                    'from gdp_tarea t inner join gdp_informacion_adicional_tarea s on t.id_terea = s.id_tarea \n' +
                    '\tinner join gdp_informacion_adicional_tarea i on t.id_terea = i.id_tarea\n' +
                    '\tinner join gdp_informacion_adicional_tarea o on t.id_terea = o.id_tarea\n' +
                    '\tinner join gdp_informacion_adicional_tarea c on t.id_terea = c.id_tarea\n' +
                    '\tleft join gdp_informacion_adicional_tarea ob on t.id_terea = ob.id_tarea\n' +
                    '\twhere\n' +
                    '\t\tt.id_sipoc  = '+sipoc+' AND \n' +
                    '\t\ts.clave = \'suppliers\' and \n' +
                    '\t\ti.clave = \'inputs\' and \n' +
                    '\t\to.clave = \'outputs\' AND \n' +
                    '\t\tob.clave = \'observaciones\' AND \n' +
                    '\t\tc.clave = \'costumers\' ');
                const respuesta = { metodo: "asociarDuenio", codigo: 1, no_convocatoria: 0};
                return rawData;
            }catch(e){
                const respuesta = { metodo: "asociarDuenio", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async   infoAdicionalTarea(tarea : number, clave : any, valor : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_informacion_adicional_tarea (id_tarea, clave, valor) VALUES(' +tarea+', \''+ clave+'\', \''+valor+'\');');
                const respuesta = { metodo: "asociarDuenio", codigo: 1, no_convocatoria: 0};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "asociarDuenio", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async crearRuta(tareas : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                tareas =  JSON.parse(tareas);
                const tot = tareas.length;
                for(let i=0; i<tot; i++){
                    const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_ruta_test (id_tarea_origen, id_tarea_destino, prioridad) VALUES(\'' +tareas[i].origen+'\', \''+ tareas[i].destino+'\', 1);');
                }
                // const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_ruta (id_tarea_origen, id_tarea_destino, prioridad) VALUES(' +tareaorigen+', '+ tareadestino+', '+prioridad+');');
                const respuesta = { metodo: "crearRuta", codigo: 1, no_convocatoria: 0};
                return respuesta;
            }catch(e){
                const respuesta = { metodo: "crearRuta", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async crearObservacion(usuario : number, proceso : number, comentario : any, tipo : number){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_revision_proceso (id_usuario, id_proceso, comentario, fecha, tipo_revision) VALUES(' +usuario+', '+ proceso+', \''+comentario+'\', NOW(), '+tipo+');');
                const respuesta = { metodo: "crearObservacion", codigo: 1, no_convocatoria: 0};
                return respuesta;
            }catch(e){
                console.log(e);
                const respuesta = { metodo: "crearObservacion", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }

    public async crearDocumento(proceso : number, clave : any, mongo : any){
        return new ConnectionSINCYT().retornarConexion().then(async connection => {
            try{
                const rawData = await connection.manager.query('INSERT INTO sincyt.gdp_informacion_documental (id_proceso, clave, mongo) VALUES(' +proceso+',  \''+clave+'\', \''+mongo+'\');');
                const respuesta = { metodo: "crearDocumento", codigo: 1, no_convocatoria: 0};
                return respuesta;
            }catch(e){
                console.log(e);
                const respuesta = { metodo: "crearDocumento", codigo: 0, mensaje: "Error en la consulta, revise los parametros ingresados", no_convocatoria : -1};
                return respuesta;
            }
        });
    }
}