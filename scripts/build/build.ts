import assert from "assert"
import { build } from "esbuild"
import { basename } from "path"
import { commonOptions, writeOutput } from "./common"

build({
  ...commonOptions,
}).then(({ outputFiles: [buildOutput] }) => {
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
})
