import { wordLookup } from "data"
import { clearWord, container, setWord, stylesheet } from "display"
import { getWordAtPoint } from "dom"

let prevWord: string | null = null

window.addEventListener("dblclick", (evt) => {
  if (!(evt.target instanceof Node)) return
  const wordText = getWordAtPoint(evt.target, evt.x, evt.y)

  if (!wordText || wordText === prevWord) return

  const word = wordLookup.get(wordText)
  if (!word) return

  document.getSelection()?.removeAllRanges()
  if (wordText) setWord(word)
  else clearWord()

  prevWord = wordText
})

window.addEventListener("click", (evt) => {
  if (!(evt.target instanceof Node)) return
  if (container.contains(evt.target)) return
  const word = getWordAtPoint(evt.target, evt.x, evt.y)

  if (word) return
  clearWord()
  prevWord = null
})

document.body.appendChild(container)
document.head.appendChild(stylesheet)
