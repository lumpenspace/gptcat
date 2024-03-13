import katex from 'katex'
import Browser from 'katex/dist/contrib/auto-render.mjs'
type TagContent = string | Node | Array<Node | string> | null | undefined
type Tag = keyof HTMLElementTagNameMap
type ClassList = string []

const latexRegex = /<lx>([\s\S]*?)<\/lx>/gs

type ElType = (
  tag: Tag,
  { content, isHtml, classes }: {
    content: TagContent
    isHtml?: boolean
    classes?: ClassList
  }
) => HTMLElement

const El: ElType = (tag: Tag, { content, isHtml = false, classes = [] }) => {
  const element = document.createElement(tag)
  if (typeof content === 'string') {
    if (isHtml) {
      element.innerHTML = content
    } else {
      element.textContent = content
    }
  } else if (Array.isArray(content)) {
    content.forEach(child => {
      element.appendChild(typeof child === 'string' ? document.createTextNode(child) : child)
    })
  } else if (content instanceof Node) {
    element.appendChild(content)
  }
  element.classList.add(...classes)
  return element
}
const MathMlEl = (formula: string, block: boolean): Element => {
  const element = El('div', { content: '', classes: [] })

  katex.render(formula, element, { throwOnError: true, output: 'mathml', displayMode: block })
  return element
}

const parseBlock = (blockText: string): string =>
  blockText.replace('<lx>', '')
    .replace('</lx>', '')
    .trim()
    .replace(/\\\s+/g, '\\\\')

const render = (node: Node, newContent: Node | Node[]): void => {
  const content = (Array.isArray(newContent)) ? newContent : [newContent]
  node.parentNode?.replaceChild(El('div', { content }), node)
}

const LxBlock = (formula: string, isDisplay: boolean = false): Node => {
  const formulaText = parseBlock(formula)
    .replace(latexRegex, '$1') // Extract content within <lx> tags
    .trim();

  if (formulaText.length === 0) return document.createTextNode(formula);

  const classes = ['latex-formula', isDisplay ? 'block' : 'inline-block']

  const displayEl = MathMlEl(formulaText, isDisplay);
  console.log('formulaText', formulaText);
  console.log('displayEl', displayEl);
  const mainNode = El('div', { content: displayEl, classes, isHtml: true });

  return mainNode;
};

export { El, type TagContent, type Tag, type ClassList, LxBlock, render, parseBlock, katex, Browser, latexRegex }
