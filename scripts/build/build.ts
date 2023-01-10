import assert from "assert"
import { build } from "esbuild"
import { basename } from "path"
import { commonOptions, ScriptMeta, writeOutput } from "./common"

build({
  ...commonOptions,
}).then(({ outputFiles: [buildOutput] }) => {
  const meta: ScriptMeta = {}
  const { GITHUB_JOB, GITHUB_REF_NAME, GITHUB_REPOSITORY } = process.env

  if (GITHUB_JOB === "do_release") {
    assert(GITHUB_REF_NAME && GITHUB_REPOSITORY)
    Object.assign(meta, {
      version: GITHUB_REF_NAME.slice(1),
      updateURL: `https://github.com/${GITHUB_REPOSITORY}/releases/latest/download/${basename(
        commonOptions.outfile!
      )}`,
      downloadURL: `https://github.com/${GITHUB_REPOSITORY}/releases/latest/download/${basename(
        commonOptions.outfile!
      )}`,
    })
  }

  writeOutput(buildOutput, meta)
})
