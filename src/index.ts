import { isWord, words } from "data"
import { clearWord, container, setWord, stylesheet } from "display"
import { getWordAtPoint } from "dom"

let prevWord: string | null = null

window.addEventListener("dblclick", (evt) => {
  if (!(evt.target instanceof Node)) return
  const word = getWordAtPoint(evt.target, evt.x, evt.y)

  if (!word || word === prevWord) return
  if (!isWord(word)) return

  document.getSelection()?.removeAllRanges()
  if (word) setWord(words[word])
  else clearWord()

  prevWord = word
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
