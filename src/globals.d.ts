declare module "*.css" {
  const source: string
  export default source
}

declare module "~words" {
  const words: Record<string, import("./types").Word>
  export default words
}
