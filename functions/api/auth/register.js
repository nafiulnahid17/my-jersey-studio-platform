import {json,hashPassword,token} from '../../_lib.js';
export async function onRequestPost({request,env}){
  if(!env.DB)return json({error:'db_not_configured',message:'Bind a Cloudflare D1 database as DB.'},503);
  const {name='',email='',password='',role='Designer'}=await request.json().catch(()=>({}));
  const cleanEmail=String(email).trim().toLowerCase();
  if(!name.trim()||!/^\S+@\S+\.\S+$/.test(cleanEmail)||String(password).length<6)return json({error:'invalid_input',message:'Name, valid email and 6+ character password are required.'},400);
  const existing=await env.DB.prepare('SELECT id FROM users WHERE email=?').bind(cleanEmail).first();
  if(existing)return json({error:'email_exists',message:'An account with this email already exists.'},409);
  const hp=await hashPassword(password);const id=crypto.randomUUID();const session=token();
  await env.DB.batch([
    env.DB.prepare('INSERT INTO users (id,name,email,password_hash,password_salt,role,plan,created_at) VALUES (?,?,?,?,?,?,?,datetime(\'now\'))').bind(id,name.trim(),cleanEmail,hp.hash,hp.salt,role,'Workspace'),
    env.DB.prepare('INSERT INTO sessions (token,user_id,expires_at,created_at) VALUES (?,?,datetime(\'now\',\'+30 days\'),datetime(\'now\'))').bind(session,id)
  ]);
  return json({token:session,user:{id,name:name.trim(),email:cleanEmail,role,plan:'Workspace'}},201);
}
