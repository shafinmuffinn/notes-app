import { serve } from "https://deno.land/std/http/server.ts";


const STORE_ID = Deno.env.get("SSLCZ_STORE_ID")!;
const STORE_PASS = Deno.env.get("SSLCZ_STORE_PASS")!;
const BASE = Deno.env.get("SSLCZ_BASE") || "https://sandbox.sslcommerz.com"; // sandbox by default


// Helper to build application/x-www-form-urlencoded body
function form(data: Record<string, string | number | boolean>) {
const b = new URLSearchParams();
Object.entries(data).forEach(([k, v]) => b.append(k, String(v)));
return b;
}
serve(async (req) => {
if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
try {
const { orderId, table, amount, successRedirect } = await req.json();
if (!amount || amount <= 0) {
return new Response(JSON.stringify({ message: "Amount must be > 0" }), { status: 400 });
}


// Make a unique tran_id you can later parse to identify the order/table
const tran_id = `${table || 'deliveries'}-${orderId || 'unknown'}-${Date.now()}`;


// Edge Function public base URL derived from request origin
const origin = new URL(req.url).origin;


const body = form({
store_id: STORE_ID,
store_passwd: STORE_PASS,
total_amount: amount,
currency: "BDT",
tran_id,
// SSLCOMMERZ will POST to these URLs
success_url: `${origin}/functions/v1/ssl-success`,
fail_url: `${origin}/functions/v1/ssl-fail`,
cancel_url: `${origin}/functions/v1/ssl-cancel`,
// Optional: receive asynchronous notifications too
ipn_url: `${origin}/functions/v1/ssl-ipn`,


// Required customer + product fields (use real data if available)
shipping_method: "Courier",
product_name: "Delivery Service",
product_category: "Service",
product_profile: "general",


cus_name: "Sandbox Customer",
cus_email: "sandbox@example.com",
cus_add1: "Dhaka",
cus_city: "Dhaka",
cus_country: "Bangladesh",
cus_phone: "01700000000",
});


// NOTE: You received v3 init URL in email; use it here
const initUrl = `${BASE}/gwprocess/v3/api.php`;
const resp = await fetch(initUrl, {
method: "POST",
headers: { "Content-Type": "application/x-www-form-urlencoded" },
body,
});


const data = await resp.json();
if (!resp.ok || data.status !== "SUCCESS" || !data.GatewayPageURL) {
return new Response(JSON.stringify({ message: "Failed to create session", data }), { status: 400 });
}


// Return the hosted checkout URL to the client
return new Response(JSON.stringify({ GatewayPageURL: data.GatewayPageURL, tran_id }), { status: 200 });
} catch (e) {
return new Response(JSON.stringify({ message: e.message }), { status: 500 });
}
});