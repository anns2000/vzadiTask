import * as dotenv from 'dotenv';
import path from 'path';

export namespace Environment {

    dotenv.config();

    export namespace project {
        export const logsDir: string =  process.env.LOGS_DIR || path.join(__dirname, "../../../logs/");
    }

    export namespace Server {
        export const host: string = "127.0.0.1";
        export const port: string = "3000";
    }

   

    export const env = process.env.NODE_ENV || "development";
    export const jwtSecret = "AnasSecretKey";
}

export default Environment;
