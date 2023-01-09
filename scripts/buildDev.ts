import assert from "assert"
import { build, BuildResult } from "esbuild"
import { writeFileSync } from "fs"
import { pathToFileURL } from "url"
import {
  commonOptions,
  getHeaderMeta,
  scriptMeta,
  writeOutput,
} from "./buildCommon"

function onBuild(result: BuildResult) {
  assert(result.outputFiles, "no output files")
  const [buildOutput] = result.outputFiles

  console.log("changes detected, rebuilt")
  writeOutput(buildOutput)
  writeFileSync(
    `dist/${scriptMeta.name}.dev.user.js`,
    getHeaderMeta({
      name: `${scriptMeta.name} (dev)`,
      require: pathToFileURL(buildOutput.path).href,
    })
  )
}

build({
  ...commonOptions,
  watch: {
    onRebuild(error, result) {
      if (error || !result) return console.error("watch build failed:", error)
      onBuild(result)
    },
  },
})
  .then((result) => {
    onBuild(result)
    console.log(
      'To use the dev version, install the ".dev.user.js" userscript from the dist folder.'
    )
    console.log("watching for changes...")
  })
  .catch(() => {})
