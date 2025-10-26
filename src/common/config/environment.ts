import * as dotenv from 'dotenv';
import path from 'path';

export namespace Environment {

    dotenv.config();

    function requireEnv(name: string): string {
        const value = process.env[name];
        if (!value) {
            throw new Error(`Missing required environment variable: ${name}`);
        }
        return value;
    }

    export namespace project {
        export const logsDir: string = process.env.LOGS_DIR || path.join(__dirname, "../../../logs/");
    }

    export namespace Server {
        // bind to all interfaces by default for containers/k8s, allow override via HOST
        export const host: string = process.env.HOST || '0.0.0.0';
        // ensure port is a number; default to 3000
        export const port: number = parseInt(process.env.PORT || '3000', 10);
    }

    export const env = process.env.NODE_ENV || 'development';
    // Do not hardcode secrets. Require JWT_SECRET to be set.
    export const jwtSecret: string = requireEnv('JWT_SECRET');
}

export default Environment;
