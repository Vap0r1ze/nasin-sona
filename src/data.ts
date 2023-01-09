import { wordsData } from "../data/words"

export const words = wordsData as Record<string, Word>
export const wordList = new Set(
  Object.keys(words).map((word) => word.toLowerCase())
)

export function isWord(word: string) {
  return wordList.has(word.toLowerCase())
}

export type UsageCategory =
  | "obscure"
  | "rare"
  | "uncommon"
  | "common"
  | "widespread"
  | "core"
export type BookName = "pu" | "ku suli" | "ku lili" | "none"
export type CoinedEra = "pre-pu" | "post-pu" | "post-ku"
export type Tag = "pre-pu ALT" | "nimi nanpa"

export interface Word {
  word: string
  /**
   * Maps from language code to definition
   */
  def: Record<string, string>
  book: BookName
  commentary?: string
  sitelen_pona?: string
  sitelen_pona_etymology?: string

  /**
   * Maps from date to string of percentage used
   *
   * @example { '2022-08': '99' }
   */
  recognition: Record<string, string>

  /**
   * Unicode
   */
  ucsur?: string
  /**
   * Image URL
   */
  sitelen_sitelen?: string
  /**
   * Emoji character
   */
  sitelen_emosi?: string
  luka_pona?: {
    mp4: string
    gif: string
  }
  /**
   * URLs to audio files from different speakers
   */
  audio?: Record<string, string>
  coined_year?: string
  coined_era?: CoinedEra
  usage_category: UsageCategory
  source_language?: string
  etymology?: string
  creator?: string
  ku_data?: string

  /**
   * Other words, separated by commas
   */
  see_also?: string

  tags?: Tag

  /**
   * Only a few language codes (en, fr, de, eo)
   */
  pu_verbatim?: Record<string, string>
}
