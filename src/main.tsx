import './compatModeShim';
import './main.scss';
import { LxBlock, render, El, latexRegex } from './elements';

const textNodesUnder = (el: Node): Node[] => {
  const children: Node[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  walker.currentNode = el;

  while (walker.nextNode() !== null) {
    children.push(walker.currentNode)
  }
  return children
}

const renderLatexBlock = (node: Node, match: string): void => {
  const textContent = node.textContent!;
  const matchStart = textContent.indexOf(match);
  const matchEnd = matchStart + match.length;
  const beforeText = textContent.substring(0, matchStart);
  const afterText = textContent.substring(matchEnd);
  const formulaText = match.replace(latexRegex, '$1').trim();

  const formulaNode = LxBlock(formulaText, true);
  const container = El('div', { content: [formulaNode], classes: ['latex-container'] });

  render(node, El('div', { content: [beforeText, container, afterText] }));
};

const renderInlineLatex = (node: Node, matches: string[]): void => {
  const textContent = node.textContent!;
  const fragments = matches.reduce<{ fragments: Node[], lastIndex: number }>((acc, match) => {
    const matchStart = textContent.indexOf(match, acc.lastIndex);
    const matchEnd = matchStart + match.length;
    const beforeText = textContent.substring(acc.lastIndex, matchStart);

    if (beforeText !== null) acc.fragments.push(document.createTextNode(beforeText));

    const formulaNode = LxBlock(match);
    acc.fragments.push(formulaNode);
    acc.lastIndex = matchEnd;

    return acc;
  }, { fragments: [], lastIndex: 0 });

  fragments.fragments.push(document.createTextNode(textContent.substring(fragments.lastIndex)));

  render(node, fragments.fragments);
};

const isMatchDisplayMode = (match: string): boolean => {
  const cleanMatch = match.replace(latexRegex, '$1').trim();
  const startSequences = ['\\display', '\\begin'];
  for (const seq of startSequences) {
    if (cleanMatch.startsWith(seq)) return true;
  }
  return (
    startSequences.some(seq => cleanMatch.startsWith(seq)) ||
    (cleanMatch.startsWith('\\[') && cleanMatch.split('\n').length > 1)
  )
};

const processNode = (node: Node): void => {
  const textContent = node.textContent!;
  const matches = textContent.match(latexRegex);

  if (matches !== null) {
    matches.length === 1 && isMatchDisplayMode(matches[0])
      ? renderLatexBlock(node, matches[0])
      : renderInlineLatex(node, matches);
  }
};

const findAndRenderLatex = (element: Node): void => {
  element.normalize();
  if (element.nodeType === Node.TEXT_NODE) {
    processNode(element);
  } else {
    textNodesUnder(element).forEach(processNode);
  }
};

const newContentObserver = new MutationObserver((mutations: MutationRecord[]): void => {
  const newContentDivs = mutations.map(({ addedNodes }) =>
    [...addedNodes].filter(
      node => node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === 'DIV'
    ).map(node => {
      if ((node as Element).classList.contains('contents')) return [node];
      return [...(node as Element).querySelectorAll('div.contents')];
    }).flat()
  ).flat().filter(node => node.textContent?.match(latexRegex));
  newContentDivs.forEach(findAndRenderLatex);
});

const observeNewContent = (): void => {
  if (document !== null) {
    newContentObserver.observe(document, {
      childList: true,
      subtree: true
    });
  }
};

observeNewContent();
