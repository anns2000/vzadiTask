import 'reflect-metadata';
import { useContainer, useExpressServer } from 'routing-controllers';
import * as bodyParser from "body-parser";
import cors from "cors";
import { Container } from 'typedi';
import logger from './common/loggers';
import Environment from './common/config/environment';
import useragent from "express-useragent"
import express from 'express';
import { resInterceptor } from "./common/interceptors"
import { AddUserToReqMiddleware, CustomErrorHandler, morganMiddleware } from './common/middlewares/';
import { authorizationChecker } from './authorizationChecker';
import { currentUserChecker } from './currentUserChecker';
import getControllers from './api';

(async () => {
  useContainer(Container);

  const app = express();
  app.use(cors());
  app.use(useragent.express());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morganMiddleware);
  useExpressServer(app, {
    validation: true,
    authorizationChecker,
    currentUserChecker,
    defaultErrorHandler: false,
    interceptors: [
      resInterceptor
    ],
    middlewares: [
      CustomErrorHandler,
      AddUserToReqMiddleware,
    ],
    controllers: await getControllers(),
  });


  app.listen(Environment.Server.port, () => {
    logger.info(`${Environment.env} Mode`);
    logger.info("test resources: working fine");
    logger.info(`server running on http://${Environment.Server.host}:${Environment.Server.port}/`);
  });


})();
