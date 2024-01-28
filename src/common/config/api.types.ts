
export namespace API {

    export enum Role {
        user = 1,
        system = 2,
        admin = 3,
    }

    export type User = {
        id: number,
        sessionId: number,
        role: Role,
        expired: boolean,
        banned: boolean,
        loggedin: boolean
    }

    export type Token = {
        sessionId: number,
        token: string,
    }

   

    export type DatabaseResponse = {
        data?: string | string[] | number | number[] | any | any[],
        error: boolean
    }


    export interface APIResponse {
        msg: string,
        status: number,
        data: any
        error: boolean,
        // type: string
    }

    export class Response implements APIResponse {
        declare msg: string;
        declare status: number;
        declare error: boolean;
        declare data: any;

        // declare type: string;

        constructor(_status: number, _msg: string | any, _data: any) {
            this.msg = _msg;
            this.status = _status;
            this.data = _data;
            // this.type = (Array.isArray(_msg)? "array" : false) || typeof _msg;
        }
    }

    export class err extends Response {
        constructor(_status: number = 404, _msg: string | any = 'Error', _data : any = {}) {
            super(_status, _msg, _data);
            this.error = true;
        }
    }

    export class res extends Response {
        constructor( _data: any, _msg: string | any = "ok",  _status: number = 200 ) {
            super(_status, _msg, _data);
            this.error = false;
        }
    }



}

export default API;