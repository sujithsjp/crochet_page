import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const photoDirectory = path.join(root, "Photos");
const filenames = (await readdir(photoDirectory))
  .filter((filename) => /\.(avif|gif|jpe?g|png|webp)$/i.test(filename))
  .sort((first, second) => first.localeCompare(second, undefined, { numeric: true, sensitivity: "base" }));

const photos = filenames.map((filename) => ({ url: `Photos/${encodeURIComponent(filename)}` }));
await writeFile(path.join(root, "photos.js"), `window.CROCHET_PHOTOS = ${JSON.stringify(photos)};\n`);
console.log(`Built photo manifest with ${photos.length} images.`);