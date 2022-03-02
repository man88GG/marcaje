// @ts-ignore
import {modelingRegistrar} from "./clases/modelingRegistrar";

// tslint:disable-next-line:class-name
export class factory{
    constructor() {
    }

    public async factory(tipoObjeto : any){
        switch (tipoObjeto) {
            case 2:
                return new modelingRegistrar();
        }
    }
}