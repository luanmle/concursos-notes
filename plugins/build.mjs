// Build script para os plugins locais (note-actions, sidebar-toggle, dataview-lite).
// Usa o esbuild/sass do repositório raiz — mesmo pipeline do plugin-template (tsup),
// gerando dist/ pré-compilado que o loader do Quartz usa sem npm install.
//
// Uso: node plugins/build.mjs
import * as esbuild from "esbuild"
import * as sass from "sass"
import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))

const textLoaders = {
  name: "text-loaders",
  setup(build) {
    build.onLoad({ filter: /\.scss$/ }, (args) => ({
      contents: sass.compile(args.path).css,
      loader: "text",
    }))
    build.onLoad({ filter: /\.inline\.ts$/ }, async (args) => {
      const text = await fs.promises.readFile(args.path, "utf8")
      const result = await esbuild.build({
        stdin: {
          contents: text,
          loader: "ts",
          resolveDir: path.dirname(args.path),
          sourcefile: args.path,
        },
        write: false,
        bundle: true,
        minify: true,
        platform: "browser",
        format: "iife",
      })
      return { contents: result.outputFiles[0].text, loader: "text" }
    })
  },
}

const plugins = ["note-actions", "sidebar-toggle", "dataview-lite"]

for (const name of plugins) {
  const base = path.join(here, name)
  const targets = [{ entry: "src/index.tsx", out: "dist/index.js" }]
  if (fs.existsSync(path.join(base, "src/components/index.ts"))) {
    targets.push({ entry: "src/components/index.ts", out: "dist/components/index.js" })
  }
  for (const t of targets) {
    const entry = path.join(base, t.entry)
    const entryTs = entry.replace(/\.tsx$/, ".ts")
    const finalEntry = fs.existsSync(entry) ? entry : entryTs
    await esbuild.build({
      entryPoints: [finalEntry],
      outfile: path.join(base, t.out),
      bundle: true,
      format: "esm",
      platform: "node",
      jsx: "automatic",
      jsxImportSource: "preact",
      plugins: [textLoaders],
    })
  }
  console.log(`✓ built ${name}`)
}
