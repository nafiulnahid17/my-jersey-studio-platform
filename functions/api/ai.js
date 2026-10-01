export async function onRequestPost({ request, env }) {
  const { prompt = '', design = {} } = await request.json().catch(() => ({}));
  if (!prompt.trim()) return Response.json({ error: 'prompt_required' }, { status: 400 });
  if (!env.AI) return Response.json({ error: 'ai_not_configured', message: 'Connect a Cloudflare Workers AI binding named AI.' }, { status: 503 });
  const system = `You are a jersey design command parser. Return ONLY valid JSON with keys message and patch. patch may contain color, accent, name, number, pattern. Allowed pattern values: slashes, chevrons, waves, none. Colors must be #RRGGBB. Never include markdown.`;
  const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {messages:[{role:'system',content:system},{role:'user',content:`Current design: ${JSON.stringify(design)}\nInstruction: ${prompt}`}],temperature:0.2,max_tokens:300});
  const raw=result.response||'{}';
  try{const parsed=JSON.parse(raw.replace(/^```json\s*|\s*```$/g,''));return Response.json({message:parsed.message||'AI instruction processed.',patch:parsed.patch||{},raw});}
  catch{return Response.json({message:'AI responded, but no structured patch was returned.',patch:{},raw});}
}
