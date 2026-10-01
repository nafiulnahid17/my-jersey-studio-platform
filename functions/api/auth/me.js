import {json,authUser} from '../../_lib.js';
export async function onRequestGet({request,env}){if(!env.DB)return json({error:'db_not_configured'},503);const user=await authUser(request,env);return user?json({user}):json({error:'unauthorized'},401)}
