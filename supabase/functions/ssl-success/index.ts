import { serve as serve2 } from "https://deno.land/std/http/server.ts";
const STORE_ID_2 = Deno.env.get("SSLCZ_STORE_ID")!;
const STORE_PASS_2 = Deno.env.get("SSLCZ_STORE_PASS")!;


serve2(async (req) => {
if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
try {
const formData = await req.formData();
const val_id = String(formData.get("val_id") || "");
const tran_id = String(formData.get("tran_id") || "");


if (!val_id) return new Response("Missing val_id", { status: 400 });


const vUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php` +
`?val_id=${encodeURIComponent(val_id)}` +
`&store_id=${encodeURIComponent(STORE_ID_2)}` +
`&store_passwd=${encodeURIComponent(STORE_PASS_2)}` +
`&v=1&format=json`;


const vRes = await fetch(vUrl);
const vJson = await vRes.json();


const ok = vJson?.status === "VALID" || vJson?.status === "VALIDATED";


// TODO: update your order row to paid using tran_id → [table, id]
// Example parsing: deliveries-123-1693434343
// const [table, orderId] = tran_id.split("-");
// await supabaseAdmin.from(table).update({ payment_status: 'paid', payment_tran_id: vJson.bank_tran_id, payment_val_id: val_id }).eq('id', orderId);


// Redirect user back to your app (optional)
const origin = new URL(req.url).origin;
const redirect = `${origin.replace("/functions/v1", "")}/orders?payment=${ok ? "success" : "invalid"}`;
return new Response(null, { status: 302, headers: { Location: redirect } });
} catch (e) {
return new Response(JSON.stringify({ message: e.message }), { status: 500 });
}
});