import { serve as serve3 } from "https://deno.land/std/http/server.ts";
serve3(async (req) => {
const origin = new URL(req.url).origin;
const redirect = `${origin.replace("/functions/v1", "")}/orders?payment=failed`;
return new Response(null, { status: 302, headers: { Location: redirect } });
});