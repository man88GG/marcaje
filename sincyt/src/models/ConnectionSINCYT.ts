import * as typ from "typeorm";

import { ConnectionOptions, createConnection, getConnectionManager, Connection, getConnection } from "typeorm";
import { DneEntidad } from './../models/output/entities/DneEntidad';

export class ConnectionSINCYT {

    constructor(nombreServidor: string = require('os').hostname()) {
        if (!getConnectionManager().has(nombreServidor)) {
            const opcionesConexion: ConnectionOptions = {
                type: "mariadb",
                host: "sincytbd",
                port: 3306,
                username: "developer",
                password: "P$ls3rv3r",
                database: "sincyt",
                cli: {
                    "entitiesDir": "entities",
                },
                entities: [__dirname + "../dist/models/output/entities/*{.js,.ts}"],
                synchronize: true,
                name: nombreServidor
            };
            createConnection(opcionesConexion);
        }
    }

    public async retornarConexion(): Promise<Connection> {

        return getConnection(require('os').hostname());

        /*
        const conectionManager = getConnectionManager();
        console.log(conectionManager.connections);

        let conection : any ;
        if(conectionManager.has('default')){
            conection = await conectionManager.get('default');
        }else{
            conection = await conectionManager.create(this.opcionesConexion);
            await conection.connect();
        }

        return conection;
         */

    }

    /*
    public async getConexion(){
        return this.connection;
    }

    public async retornarConexion() {

        this.connection = await createConnection(
            {
                type: "mysql",
                host: "sincytbd",
                port: 3306,
                username: "developer",
                password: "s3rv1c10s..*",
                database: "sincyt",
                entities: [],
                cli: {
                    "entitiesDir": "entities",
                }
            }).catch((e) => {
            console.log(e);
            return null;
        });
        return this.connection;
    }

    public retornarConexionSync() {

        const connection =  createConnection(
            {
                type: "mysql",
                host: "sincytbd",
                port: 3306,
                username: "developer",
                password: "s3rv1c10s..*",
                database: "sincyt",
                entities: [
                ],
                cli: {
                    "entitiesDir": "entities",
                }
        });
        return connection;
    }
     */
}

