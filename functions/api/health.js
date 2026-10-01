export async function onRequestGet({env}) {
  return Response.json({ok:true,service:'my-jersey-studio',version:'2.0',database:!!env.DB,ai:!!env.AI,time:new Date().toISOString()});
}
