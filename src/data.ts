import words from "~words"
export { words }

export const wordLookup = new Map(
  Object.entries(words).map(([key, value]) => [key.toLowerCase(), value])
)

export function isWord(word: string) {
  return wordLookup.has(word.toLowerCase())
}

// for (const [word, data] of wordLookup.entries()) {
//   data.ucsur
// }
