import React from 'react';
import { createRoot } from 'react-dom/client';
import componentDict from './tags';

import './main.scss';

const getNewElements = (mutations: MutationRecord[]): Element[] =>
  mutations.map((mutation, i) =>
    Array.from(mutation.addedNodes)
      .filter(node => node instanceof Element).flat()).flat() as Element[];

const extractContentDivs = (elements: Element[]): Element[] =>
  elements.map(node =>
    node.classList.contains('contents')
      ? [node]
      : Array.from(node.querySelectorAll('.contents')).flat()
  ).flat().flat();

const renderRoot = (element: Element): void => {
  const tag = element.getAttribute('data-tag');
  if (tag !== null) {
    const Component = componentDict[tag];
    const content = element.getAttribute('data-content')!.trim();
    if (content === '') {
      element.innerHTML = `<${tag}></${tag}>`;
    }
    createRoot(element, {}).render(<Component>{content}</Component>);
  }
}

const newContentObserver = new MutationObserver((mutations: MutationRecord[]): void => {
  const newElements = getNewElements(mutations);
  const newContentDivs = extractContentDivs(newElements);

  newContentDivs.forEach(div => {
    const regex = /&lt;([/]?[a-zA-Z0-9]+)&gt;/g;
    const content = div.innerHTML.replace(regex, '<$1>');
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${content}</div>`, 'text/html');

    Array.from(doc.querySelectorAll('*')).forEach((element: Element) => {
      if (element.tagName.toLowerCase() in componentDict) {
        const newElement = document.createElement('div');
        newElement.setAttribute('data-tag', element.tagName.toLowerCase());
        newElement.classList.add('xlaude--component');
        newElement.setAttribute('data-content', element.textContent!);
        element.replaceWith(newElement);
      }
    });
    div.innerHTML = doc.body.innerHTML;
    const elements = div.querySelectorAll('.xlaude--component');
    for (const element of elements) {
      renderRoot(element);
    };
  });
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
