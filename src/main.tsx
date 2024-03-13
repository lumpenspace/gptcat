import React from 'react';
import { createRoot } from 'react-dom/client';
import LatexContainer from './LatexContainer';

const hash = (str: string): number => {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

const latexRegex = /<lx>([\s\S]*?)<\/lx>/gs;

const textNodesUnder = (el: Node): Node[] => {
  const children: Node[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  walker.currentNode = el;

  while (walker.nextNode() !== null) {
    children.push(walker.currentNode)
  }
  return children
}

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
  node.normalize();
  const textContent = node.textContent!;
  const matches = textContent.match(latexRegex);

  if (matches !== null) {
    node.textContent = '';
    const reactRoot = createRoot(node.parentElement);

    reactRoot.render(
      matches.length === 1 && isMatchDisplayMode(matches[0])
        ? <LatexContainer content={textContent} />
        : <LatexContainer content={textContent} />
    );
  }
};

const newContentObserver = new MutationObserver((mutations: MutationRecord[]): void => {
  const newContentDivs = mutations.map(({ addedNodes }) =>
    [...addedNodes].filter(
      node => node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === 'DIV'
    ).map(node => {
      node.normalize();
      if ((node as Element).classList.contains('contents')) return [node as Element];
      return [...(node as Element).querySelectorAll('div.contents')]
    }).flat()).flat();

  const interestingDivs = newContentDivs.filter(node => node.textContent?.match(latexRegex));

  if (interestingDivs.length === 0) return;

  console.log('interestingDivs', interestingDivs);
  newContentDivs.forEach(x => {
    // hash the content and set it as the id
    x.id = `latex-${hash(x.textContent!)}`;
    textNodesUnder(x).forEach(processNode);
  })
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
