import {json,hashPassword,token} from '../../_lib.js';
export async function onRequestPost({request,env}){
  if(!env.DB)return json({error:'db_not_configured',message:'Bind a Cloudflare D1 database as DB.'},503);
  const {email='',password=''}=await request.json().catch(()=>({}));const clean=String(email).trim().toLowerCase();
  const u=await env.DB.prepare('SELECT * FROM users WHERE email=?').bind(clean).first();
  if(!u)return json({error:'invalid_credentials',message:'Invalid email or password.'},401);
  const hp=await hashPassword(password,u.password_salt);if(hp.hash!==u.password_hash)return json({error:'invalid_credentials',message:'Invalid email or password.'},401);
  const session=token();await env.DB.prepare('INSERT INTO sessions (token,user_id,expires_at,created_at) VALUES (?,?,datetime(\'now\',\'+30 days\'),datetime(\'now\'))').bind(session,u.id).run();
  return json({token:session,user:{id:u.id,name:u.name,email:u.email,role:u.role,plan:u.plan}});
}
