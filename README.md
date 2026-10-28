# Meridian Estates

Static real-estate site — no build step, no dependencies, no backend.

## Files
- `index.html` — markup and all sections
- `assets/styles.css` — design tokens, layout, responsive rules
- `assets/app.js` — filtering, sorting, modal, saves, theme, nav
- `assets/data.js` — **edit this to change brand, currency, city and listings**

## Rebrand / new market
1. Open `assets/data.js`.
2. Change `SITE` (brand, city, currency, phone, email, address).
3. Replace `LISTINGS` — each entry needs `id, title, area, type, deal, price, beds, baths, sqft, images[], blurb, amenities[]`.
4. Types supported: `villa`, `penthouse`, `apartment`, `townhouse`. Deals: `sale`, `rent`.
5. Commit and push — GitHub Pages rebuilds in about a minute.

## Deploy
Hosted on GitHub Pages from `main` / root:
https://luluhypermarts.github.io/meridian-estates/

Any static host works the same way (Cloudflare Pages, Netlify, Vercel, S3).
