import React, { type FC } from 'react';

import { createRoot } from 'react-dom/client';
import * as lx from './lx';
import * as mm from './mm';

const componentDict: Record<string, FC<any>> = {
  [lx.name]: lx.component,
  [mm.name]: mm.component
};

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
    createRoot(element, {}).render(<Component>{content}</Component>);
  }
}

const renderCustomTags = (newElements: Element[]): void => {
  const newContentDivs = extractContentDivs(newElements);

  newContentDivs.forEach(div => {
    const regex = /&lt;([/]?[a-zA-Z0-9]+)&gt;/g;
    const content = div.innerHTML.replace(regex, '<$1>');
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${content}</div>`, 'text/html');

    Array.from(doc.querySelectorAll('*')).forEach((element: Element) => {
      if (element.tagName.toLowerCase() in componentDict) {
        // if there are slashes before and after the tag, as siblings, ignore
        if (element.previousElementSibling?.textContent?.endsWith('/') && element.nextElementSibling?.textContent?.startsWith('/')) {
          return;
        }

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
};

export default renderCustomTags;
