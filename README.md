# FernFlow website

Social media for Garden Route businesses. Live on Cloudflare Workers; every push to `main` goes live by itself.

## What's where
- `public/index.html` — the whole site. Prices, extras, founding spots and contact details are in the block marked **EDIT HERE** near the top of the script.
- `public/privacy.html`, `public/404.html` — privacy and "page not found" pages.
- `public/work/` — the AuroSmart example posts (short silent clips and their still pictures).
- `public/og.jpg` — the picture WhatsApp and Facebook show when the link is shared.
- `src/worker.js` — makes the link-preview picture work on any address.
- `wrangler.jsonc` — Cloudflare settings.

## Run it on a computer
`npx wrangler dev`, then open http://localhost:8787.
