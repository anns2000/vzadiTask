import {  Action } from 'routing-controllers';
import API from './common/config/api.types';

export async function authorizationChecker(action: Action, roles: API.Role[]) {
    const higherRole =  roles[0];
    const {user} = action.request;
    if(user){

        if(!user.loggedin){
            return false;
        }

        if(user.expired || user.banned){
            const err401 = new API.err(401);
            const err: API.Response = Object.assign(err401, {
                msg: !(user.expired)? (user.banned?  "user is banned" : "user is logged out"): err401.msg
            });

            throw err;
            
        }
        if(user.role >= higherRole){
            return true; 
        }
        else
        {
           return false;
        }
    }
    
    return false;
         
}