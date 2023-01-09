export function isTextNode(node: Node): node is Text {
  return node.nodeType === Node.TEXT_NODE
}

export function rectContains(rect: Range | Element, x: number, y: number) {
  return (
    rect.getBoundingClientRect().left <= x &&
    rect.getBoundingClientRect().right >= x &&
    rect.getBoundingClientRect().top <= y &&
    rect.getBoundingClientRect().bottom >= y
  )
}

export function getWord(text: string, index: number): string | null {
  // UCSUR
  const codePoint = text.codePointAt(index) || 0
  if (codePoint >= 0xf1900 && codePoint <= 0xf19ff)
    return String.fromCodePoint(codePoint)

  // Alpha word
  const preIndex = text.slice(0, index).match(/[a-z]*$/i)![0]
  const postIndex = text.slice(index).match(/^[a-z]*/i)![0]
  return preIndex + postIndex || null
}

/** https://stackoverflow.com/a/3710561/6719456 */
export function getWordAtPoint(
  node: Node,
  x: number,
  y: number
): string | null {
  if (isTextNode(node)) {
    const range = node.ownerDocument.createRange()
    range.selectNodeContents(node)

    let currentPos = 0
    const endPos = range.endOffset
    while (currentPos + 1 < endPos) {
      range.setStart(node, currentPos)
      range.setEnd(node, currentPos + 1)

      if (rectContains(range, x, y)) {
        const word = getWord(node.textContent || "", currentPos)
        range.detach()

        return word
      }

      currentPos += 1
    }
  } else {
    for (var i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i]
      if (!childNode.ownerDocument) continue

      const range = childNode.ownerDocument.createRange()
      range.selectNodeContents(childNode)
      const isInside = rectContains(range, x, y)
      range.detach()

      if (isInside) return getWordAtPoint(childNode, x, y)
    }
  }

  return null
}
