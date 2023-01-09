import { mkdirSync, writeFileSync } from "fs"
import fetch from "node-fetch"

fetch("https://linku.la/jasima/data.json")
  .then((res) => res.json() as Promise<{ data: any }>)
  .then(({ data }) => {
    mkdirSync("data", { recursive: true })
    for (const key of Object.keys(data)) {
      const word = data[key]
      data[key] = {
        word: word.word,
        def: { en: word.def.en },
        usage_category: word.usage_category,
        recognition: word.recognition,
        book: word.book,
        coined_year: word.coined_year,
        sitelen_pona: word.sitelen_pona,
      }
    }
    writeFileSync(
      "data/words.ts",
      `export const wordsData = JSON.parse(${JSON.stringify(
        JSON.stringify(data)
      )})`
    )
  })
