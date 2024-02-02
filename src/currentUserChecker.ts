import { Action } from "routing-controllers";

export async function currentUserChecker(action: Action){
    console.log("currentUserChecker");
    
    return action.request.user;
}