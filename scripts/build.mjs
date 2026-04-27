import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const vitePackagePath = require.resolve("vite/package.json");
const viteEntryPath = path.join(path.dirname(vitePackagePath), "index.cjs");
const vite = require(viteEntryPath);

await vite.build();
