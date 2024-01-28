import { comparePassword, jwtSign } from "../../common/helpers/hashing.helper";
import UserService from "../user/user.service"
import SessionService from "../session/session.service";
import { BadRequestError, ForbiddenError, HttpError, InternalServerError, UnauthorizedError } from "routing-controllers";
import { v4 as uuid } from 'uuid';
import API from "../../common/config/api.types";
import { Service } from 'typedi';

@Service()
export default class AuthService {

    private userService = new UserService();
    private sessionService = new SessionService();

    public async adminLogin(emailOrPhone: string, password: string, identifier: string, source: string) {

        const user = await this.userService.getUserByEmailorPhone(emailOrPhone);
        if (!user) throw new HttpError(200, "user not found");

        if(user.banned){
            throw new UnauthorizedError("user is banned");
        }
     
        if (API.Role[user.role] < API.Role.admin) {
            throw new ForbiddenError();
        }

        const compare = await comparePassword(password, user.password);
        if (!compare) throw new HttpError(200, "password is wrong");

        const newToken = uuid();

        let sessionId = 0;
        const oldSession = await this.sessionService.findUserOldSession(user.id, identifier, source);
        sessionId = oldSession?.id ? oldSession.id : 0;

        if (sessionId !== 0) {
            await this.sessionService.updateSession(sessionId, {
                token: newToken,
                expired: false,
                expired_since: null,
            });

        } else {
            const newSession = await this.sessionService.createSession(user.id, newToken, identifier, source);
            sessionId = newSession.id;
        }

        const API_Token: API.Token = {
            sessionId: sessionId,
            token: newToken
        };
        return {
            login: true,
            token: await jwtSign(API_Token)
        }
    }
    public async userLogin(emailorPhone: string, password: string, identifier: string, source: string) {
        
        const user = await this.userService.getUserByEmailorPhone(emailorPhone);
        if (!user) throw new BadRequestError("user not found");

        if(user.banned){
            throw new UnauthorizedError("user is banned");
        }

        const compare = await comparePassword(password, user.password);
        if (!compare) throw new HttpError(200, "password is wrong");

        const newToken = uuid();

        let sessionId = 0;
        const oldSession = await this.sessionService.findUserOldSession(user.id, identifier, source);
        sessionId = oldSession?.id ? oldSession.id : 0;

        if (sessionId !== 0) {
            await this.sessionService.updateSession(sessionId, {
                token: newToken,
                expired: false,
                expired_since: null,
            });

        } else {
            const newSession = await this.sessionService.createSession(user.id, newToken, identifier, source);
            sessionId = newSession.id;
        }

        const API_Token: API.Token = {
            sessionId: sessionId,
            token: newToken
        };


        return {
            login: true,
            token: await jwtSign(API_Token)
        }
        
    }
    public async systemLogin(emailorPhone: string, password: string, identifier: string, source: string) {  
        const user = await this.userService.getUserByEmailorPhone(emailorPhone);
        if (!user) throw new BadRequestError("user not found");

        if(user.banned){
            throw new UnauthorizedError("user is banned");
        }

        if (API.Role[user.role] < API.Role.system) {
            throw new ForbiddenError();
        }

        const compare = await comparePassword(password, user.password);
        if (!compare) throw new HttpError(200, "password is wrong");

        const newToken = uuid();

        let sessionId = 0;
        const oldSession = await this.sessionService.findUserOldSession(user.id, identifier, source);
        sessionId = oldSession?.id ? oldSession.id : 0;

        if (sessionId !== 0) {
            await this.sessionService.updateSession(sessionId, {
                token: newToken,
                expired: false,
                expired_since: null,
            });

        } else {
            const newSession = await this.sessionService.createSession(user.id, newToken, identifier, source);
            sessionId = newSession.id;
        }

        const API_Token: API.Token = {
            sessionId: sessionId,
            token: newToken
        };
        
        return {
            login: true,
            token: await jwtSign(API_Token)
        }
    }

}
