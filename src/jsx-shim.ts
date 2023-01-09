type ElementAttributes = {
  [name: string]: string
}
type ElementChild = HTMLElement | string | null

const svgNS = "http://www.w3.org/2000/svg"
const svgElems = ["svg", "path"]

export const createElement = <K extends string>(
  tagName: K,
  attributes: ElementAttributes | null,
  ...children: ElementChild[]
) => {
  const elem = svgElems.includes(tagName)
    ? document.createElementNS(svgNS, tagName)
    : document.createElement(tagName)

  // Set attributes
  for (let [name, value] of Object.entries(attributes || {})) {
    if (name === "class")
      value = value
        .split(/\s+/)
        .map((cl) => `tpt-${cl}`)
        .join(" ")
    elem.setAttribute(name, value)
  }

  // Append children
  children.forEach((child) => {
    if (!child) return
    if (typeof child === "string")
      return elem.appendChild(document.createTextNode(child))
    elem.appendChild(child)
  })

  return elem
}

type JSXFactory = typeof createElement
declare global {
  const createElement: JSXFactory

  namespace JSX {
    type IntrinsicElements = {
      [K in
        | keyof HTMLElementTagNameMap
        | keyof SVGElementTagNameMap]: ElementAttributes
    }
    type Element = HTMLElement
  }
}
