export function generarInsert(json: any, tabla: string){
    let campos = '';
    let valores = "";
    for (const key of Object.keys(json)) {
        campos += key + ','
        valores += typeof json[key] === 'string' ? `'${json[key] }',` : String(json[key]) + ',';
    }
    campos = `(${campos.substring(0, campos.length-1)})`;
    valores = `(${valores.substring(0, valores.length-1)})`;
    return `INSERT INTO ${tabla} ${campos} VALUES ${valores}`
}

// Posteriormente se implementara una forma de generar multiples condicionales, por el momento todo se hace con ands
export function generarUpdate(tabla: string, jsonCambios: any, jsonCondicion: any){
    let cambios = '';
    let condiciones = '';
    for (const key of Object.keys(jsonCambios)){
        cambios += `${key} = ${typeof jsonCambios[key] === 'string' ? `'${jsonCambios[key] }',` : String(jsonCambios[key]) + ','}`
    };
    for (const key of Object.keys(jsonCondicion)){
        condiciones += `${key} = ${typeof jsonCondicion[key] === 'string' ? `'${jsonCondicion[key] }' and ` : String(jsonCondicion[key]) + ' and '}`
    };
    return `UPDATE ${tabla} SET ${cambios.substring(0, cambios.length-1)} WHERE ${condiciones.substring(0, condiciones.length-5)}`
};

// Posteriormente se implementara una forma de generar multiples condicionales, por el momento todo se hace con ands
export function generarSelect(tabla: string, elementos: string[], jsonCondicion: any){
    let seleccion = '';
    let condiciones = '';
    for (const elemento of elementos){
        seleccion += elemento + ','
    };
    for (const key of Object.keys(jsonCondicion)){
        condiciones += `${key} = ${typeof jsonCondicion[key] === 'string' ? `'${jsonCondicion[key] }' and ` : String(jsonCondicion[key]) + ' and '}`
    };
    return `SELECT ${seleccion.substring(0, seleccion.length-1)} FROM ${tabla} WHERE ${condiciones.substring(0, condiciones.length-5)}`
};