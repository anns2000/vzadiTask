import {  Action } from 'routing-controllers';
import API from './common/config/api.types';
import { ro } from 'date-fns/locale';

export async function authorizationChecker(action: Action,permission?: any) {
   
    
    
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
        if(permission[0]){
            console.log(permission[0]);
            console.log(user.permission);
            
            if(user.permission.includes(permission[0])){
                return true;
            }
            const err403 = new API.err(403);
            const err: API.Response = Object.assign(err403, {
                msg: "permission denied"
            });
            throw err;
        }
        
    }

    
    return false;
         
}