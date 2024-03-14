import React from 'react';
import { createRoot } from 'react-dom/client';
import LatexContainer from './LatexContainer';

import './main.scss';

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

const processNode = (node: Node): void => {
  node.normalize();
  const textContent = node.textContent!;
  const matches = textContent.match(latexRegex);

  if (matches !== null) {
    node.textContent = '';
    const reactRoot = createRoot(node.parentElement);

    reactRoot.render(
      <LatexContainer content={textContent} />
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
