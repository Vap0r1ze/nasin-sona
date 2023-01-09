import { Plugin } from "esbuild"
import fetch from "node-fetch"
import type { LinkuWord, Word } from "../../../src/data"

export const wordsPlugin: Plugin = {
  name: "linku-words",
  setup: ({ onResolve, onLoad }) => {
    const filter = /^~words$/
    onResolve({ filter }, ({ path }) => ({
      namespace: "linku-words",
      path,
    }))
    onLoad({ filter, namespace: "linku-words" }, async () => {
      const { data: linkuData } = await fetch(
        "https://linku.la/jasima/data.json"
      ).then(
        (res) => res.json() as Promise<{ data: Record<string, LinkuWord> }>
      )

      const wordData: Record<string, Word> = {}

      for (const key of Object.keys(linkuData)) {
        const word = linkuData[key]
        wordData[key] = {
          word: word.word,
          def: word.def.en,
          usage_category: word.usage_category,
          recognition: word.recognition,
          book: word.book,
          coined_year: word.coined_year,
          sitelen_pona: word.sitelen_pona,
          ucsur: word.ucsur,
        }
      }

      return {
        contents: `const words = JSON.parse(${JSON.stringify(
          JSON.stringify(wordData)
        )})\nexport default words\n`,
      }
    })
  },
}
