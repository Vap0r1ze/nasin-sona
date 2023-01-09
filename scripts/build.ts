import assert from "assert"
import { buildSync } from "esbuild"
import { basename } from "path"
import { commonOptions, writeOutput } from "./buildCommon"

const {
  outputFiles: [buildOutput],
} = buildSync({
  ...commonOptions,
})

const meta = {}
const { GITHUB_JOB, GITHUB_REF_NAME, GITHUB_REPOSITORY } = process.env

if (GITHUB_JOB === "do_release") {
  assert(GITHUB_REF_NAME && GITHUB_REPOSITORY)
  meta["version"] = GITHUB_REF_NAME.slice(1)
  meta[
    "updateURL"
  ] = `https://github.com/${GITHUB_REPOSITORY}/releases/latest/download/${basename(
    commonOptions.outfile!
  )}`
}

writeOutput(buildOutput, meta)
