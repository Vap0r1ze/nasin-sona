import type { Word } from "types"
import css from "./style.css"

let wordDisplay: HTMLElement | null = null

export const container = <div class="container"></div>
export const stylesheet = <style>{css}</style>

export function setWord(word: Word) {
  clearWord()
  wordDisplay = WordDisplay(word)
  container.appendChild(wordDisplay)
}

export function clearWord() {
  if (!wordDisplay) return
  wordDisplay.remove()
  wordDisplay = null
}

function WordDisplay(word: Word) {
  const image = <div class="image" />
  GM_addElement(image, "img", { src: `https://sitelen.nimi.li/img/64/${word.word}.png` })

  return (
    <div class="word">
      <div class="info">
        <div class="name">
          <span>{word.word}</span>
          <div class={`rarity ${word.usage_category}`} />
          <a
            href={`https://nimi.li/${word.word}`}
            target="_blank"
            title="Open in nimi.li"
          >
            {OPEN_ICON}
          </a>
        </div>
        <div class="details">
          {[
            word.usage_category,
            word.recognition["2022-08"] + "%",
            word.book === "none" ? null : word.book,
            word.coined_year,
          ]
            .filter(Boolean)
            .join(" · ")}
        </div>
        <div class="desc">{word.def}</div>
      </div>
      {word.sitelen_pona && image}
    </div>
  )
}

const OPEN_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    class="open-icon"
  >
    <path
      fill-rule="evenodd"
      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
      clip-rule="evenodd"
    />
    <path
      fill-rule="evenodd"
      d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
      clip-rule="evenodd"
    />
  </svg>
)
