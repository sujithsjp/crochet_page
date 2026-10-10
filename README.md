# Crochet, every loop handmade

A dependency-free static photo gallery for Cloudflare Pages. Original photos stay in `Photos/`; the gallery reads the manifest generated from that folder during build.
The title image changes to another collection photo each local calendar day.

## Run locally

```sh
node build.mjs
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. Re-run `node build.mjs` after adding or removing photos.

## Deploy to Cloudflare Pages

Connect this folder's Git repository to Cloudflare Pages and use:

- Build command: `node build.mjs`
- Build output directory: `.`

The build has no package dependencies. Cloudflare Pages' free plan can host the static HTML, CSS, JavaScript, and photos together.