import {Request, Response, NextFunction} from 'express';
import API from '../../common/config/api.types';
import { jwtVerify } from '../../common/helpers/hashing.helper';
import logger from '../../common/loggers';
import SessionService from '../session/session.service';
import { HttpError } from 'routing-controllers';
import prisma from '../../common/prisma/client';
import userRoleService from '../userRoles/userRole.service';

export const AddUserToReq = async (req: Request, res: Response, next: NextFunction)  => {
    try {
        console.log("AddUserToReqMiddleware");

        const token = req.headers['authorization']; 
        
        if (token) {
            const sessionService = new SessionService();
            const rolesService = new userRoleService();
            const API_Token : API.Token = await jwtVerify(token);
            const session = await sessionService.getUserBySession(API_Token.sessionId);
            
            if(session){
                
                const right = (session.token === API_Token.token);
                const premissions = await rolesService.getRolePermission(session.user.roleId);
                const permission = premissions.map(permission => permission.permission.name);
                
                req.user = {
                    id: session.user.id,
                    sessionId: API_Token.sessionId,
                    expired: session.expired,
                    banned: session.user.banned,
                    loggedin: right,
                    role: session.user.roleId,
                    permission: permission

                }
            }
        }      
        
        next();
    } catch (err) {
        logger.error(err);
        throw new HttpError(401, "Unauthorized")
    }
}
