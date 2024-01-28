import {Request, Response, NextFunction} from 'express';
import API from '../../common/config/api.types';
import { jwtVerify } from '../../common/helpers/hashing.helper';
import logger from '../../common/loggers';
import SessionService from '../session/session.service';
import { HttpError } from 'routing-controllers';

export const AddUserToReq = async (req: Request, res: Response, next: NextFunction)  => {
    try {
        const token = req.headers['authorization']; 
        
        if (token) {
            const sessionService = new SessionService();
            const API_Token : API.Token = await jwtVerify(token);
            const session = await sessionService.getUserBySession(API_Token.sessionId);
            
            if(session){
                
                const right = (session.token === API_Token.token);
                req.user = {
                    id: session.user.id,
                    sessionId: API_Token.sessionId,
                    role: API.Role[session.user.role],
                    expired: session.expired,
                    banned: session.user.banned,
                    loggedin: right
                }
            }
        }      
        
        next();
    } catch (err) {
        logger.error(err);
        throw new HttpError(401, "Unauthorized")
    }
}
