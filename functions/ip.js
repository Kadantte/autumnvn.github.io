export async function onRequest(context) {
    return new Response(context.request.headers.get("cf-connecting-ip"));
}