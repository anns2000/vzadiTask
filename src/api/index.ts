import path from "path";
import { getFilesByPattern } from "../common/helpers/path.helper";
import logger from "../common/loggers";


export default async function getControllers() {
    const controllers: any[] = [];
    const controllersFiles = await getFilesByPattern(path.resolve(__dirname, "./**/*.controller.*"));
    for (let index = 0; index < controllersFiles.length; index++) {
        const controller = await import(path.resolve(__dirname, controllersFiles[index]));
        controllers.push(controller.default);
    }
    logger.info("controllers loaded");
    return controllers;
};