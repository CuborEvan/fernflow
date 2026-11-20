// FernFlow Worker: serves the site from /public.
// It only runs first for the home page (see run_worker_first in wrangler.jsonc), where it makes the
// link-preview tags (og:image, og:url) point at whatever address the site is on, so WhatsApp and
// Facebook show the picture on pages.dev, workers.dev or a custom domain alike.
export default {
  async fetch(request, env) {
    const res = await env.ASSETS.fetch(request);
    const type = res.headers.get("content-type") || "";
    if (!res.ok || !type.includes("text/html")) return res;
    const origin = new URL(request.url).origin;
    const abs = v => (v && v.startsWith("/") ? origin + v : v);
    const out = new HTMLRewriter()
      .on('meta[property="og:image"], meta[name="twitter:image"], meta[property="og:url"]', {
        element(el) { el.setAttribute("content", abs(el.getAttribute("content"))); }
      })
      .transform(res);
    const headers = new Headers(out.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("X-Frame-Options", "SAMEORIGIN");
    headers.set("Cache-Control", "public, max-age=300");
    return new Response(out.body, { status: out.status, headers });
  }
};
