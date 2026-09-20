# www → Codemantix

Dieser kleine Worker beantwortet ausschließlich `www.codemantix.com/*` mit einem
301 auf `https://codemantix.com`. Pfad und Query bleiben erhalten. Die bestehende
Cloudflare-Proxy-DNS-Auflösung bleibt unverändert; der alte ALL-INKL-Origin wird
für diese Route nicht mehr angefragt. Andere Subdomains erhalten keine Route.

Die Website bleibt ein statischer Pages-Export. Der Worker wird separat mit
Wrangler 4 veröffentlicht:

```sh
node --test infra/www-redirect/index.test.mjs
npx wrangler deploy --config infra/www-redirect/wrangler.jsonc --dry-run
npx wrangler deploy --config infra/www-redirect/wrangler.jsonc
```

Keine Secrets, Speicherung oder Anwendungsprotokolle. Bei einer späteren
Umstellung auf eine Cloudflare Redirect Rule zuerst dieselben HTTP-/HTTPS- und
Unterseitenfälle prüfen, danach die Worker-Route entfernen.
