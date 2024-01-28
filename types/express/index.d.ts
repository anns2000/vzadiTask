import API from "../../common/config/api.types";
import * as express from "express";

declare global {
    declare namespace Express {
        interface Request {
            user?: API.User,        
        }
    }
}