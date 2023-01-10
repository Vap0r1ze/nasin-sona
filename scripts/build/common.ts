import { BuildOptions, OutputFile } from "esbuild"
import { mkdirSync, readFileSync, writeFileSync } from "fs"
import { dirname } from "path"
import { wordsPlugin } from "./plugins/words"

export type ScriptMeta = Record<string, string | string[]>

const { userscript: scriptMeta }: { userscript: ScriptMeta } = JSON.parse(
  readFileSync("package.json", "utf-8")
)
export { scriptMeta }

export const commonOptions: BuildOptions & { write: false } = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "iife",
  minify: false,
  write: false,
  target: ["es6"],
  outfile: `dist/${scriptMeta.name}.user.js`,
  inject: ["src/jsx-shim.ts"],
  loader: {
    ".css": "text",
  },
  plugins: [wordsPlugin],
}

// Userscript Header
export function getHeaderMeta(meta: ScriptMeta) {
  const headerMeta = { ...scriptMeta, ...meta }
  const headerKeyPadding = Object.keys(headerMeta).reduce(
    (acc, key) => Math.max(acc, key.length),
    0
  )
  const fields = Object.entries(headerMeta)
    .map(([key, values]) =>
      Array.isArray(values)
        ? values.map((value) => [key, value])
        : [[key, values]]
    )
    .flat()
    .map(([key, value]) => `@${key.padEnd(headerKeyPadding, " ")} ${value}`)
  const lines = ["==UserScript==", ...fields, "==/UserScript=="].map(
    (line) => `// ${line}`
  )
  return lines.join("\n")
}

// Output
export function writeOutput(buildOutput: OutputFile, meta: ScriptMeta = {}) {
  const header = getHeaderMeta(meta)
  const output = `${header}\n\n${buildOutput.text}`
  mkdirSync(dirname(buildOutput.path), { recursive: true })
  writeFileSync(buildOutput.path, output, "utf-8")
}
