import words from "~words"

export const wordLookup = new Map(
  Object.entries(words).map(([key, value]) => [key.toLowerCase(), value])
)

for (const word of Object.values(words)) {
  if (word.ucsur)
    wordLookup.set(
      // "U+F196C" -> 0xF196C -> "\uDB86\uDD6C"
      String.fromCodePoint(parseInt(word.ucsur.slice(2), 16)),
      word
    )
}
