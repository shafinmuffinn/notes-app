import { serve as serve4 } from "https://deno.land/std/http/server.ts";
serve4(async (req) => {
const origin = new URL(req.url).origin;
const redirect = `${origin.replace("/functions/v1", "")}/orders?payment=cancelled`;
return new Response(null, { status: 302, headers: { Location: redirect } });
});