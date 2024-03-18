import React from 'react';

import { createRoot } from 'react-dom/client';

import tags from './tags';

const extractContentDivs = (elements: Element[]): Element[] =>
  elements.map(node =>
    node.classList.contains('contents')
      ? [node]
      : Array.from(node.querySelectorAll('.contents')).flat()
  ).flat().flat();

const renderRoot = (element: Element): void => {
  const tag = element.getAttribute('data-tag');
  console.log('renderRoot', element, tag);
  const Tag = tags.find((t) => t.tag === tag);
  if (tag && Tag) {
    console.log('renderRoot', element, tag, Tag);
    const content = element.getAttribute('data-content')!.trim();
    createRoot(element, {}).render(<Tag>{content}</Tag>);
  }
}

const renderCustomTags = (newElements: Element[]): void => {
  const newContentDivs = extractContentDivs(newElements);

  newContentDivs.forEach(div => {
    const regex = /&lt;([/]?[a-zA-Z0-9]+)&gt;/g;
    const content = div.innerHTML.replace(regex, '<$1>');
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${content}</div>`, 'text/html');
    const tagStrings = tags.map((t) => t.tag);
    console.log('tagStrings', tagStrings);
    Array.from(doc.querySelectorAll('*')).forEach((element: Element) => {
      console.log('element', element.tagName.toLowerCase() in tagStrings, element.tagName.toLowerCase());
      if (tagStrings.includes(element.tagName.toLowerCase())) {
        // if there are slashes before and after the tag, as siblings, ignore
        if (element.previousElementSibling?.textContent?.endsWith('/') && element.nextElementSibling?.textContent?.startsWith('/')) {
          return;
        }
        console.log('element', element);
        const newElement = document.createElement('div');
        newElement.setAttribute('data-tag', element.tagName.toLocaleLowerCase());
        newElement.classList.add('xlaude--component');
        newElement.setAttribute('data-content', element.textContent!);
        console.log('newElement', newElement);
        element.replaceWith(newElement);
        console.log('element', element);
        console.log('newElement', newElement);
      }
    });
    div.innerHTML = doc.body.innerHTML;
    const elements = div.querySelectorAll('.xlaude--component');
    console.log('elements', elements);
    for (const element of elements) {
      renderRoot(element);
    };
  });
};

export default renderCustomTags;
