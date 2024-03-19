import { renderCustomTags } from './tags';
import { createRoot } from 'react-dom/client';
import App from './App';
import './content.scss';
import React from 'react';

const getNewElements = (mutations: MutationRecord[]): Element[] =>
  mutations.map((mutation, i) =>
    Array.from(mutation.addedNodes)
      .filter(node => node instanceof Element).flat()).flat() as Element[];

const newMessageObserver = new MutationObserver((mutations: MutationRecord[]): void => {
  renderCustomTags(getNewElements(mutations));
});

const observeNewContent = (): void => {
  console.log('Observing new content');
  console.log(document);
  if (document !== null) {
    newMessageObserver.observe(document, {
      childList: true,
      subtree: true
    });
  }
};

((observeNewContent) =>{
  const rootElement = document.createElement('div');
  rootElement.id = 'gptcat-root';
  document.body.appendChild(rootElement);
  const root = createRoot(rootElement);

  root.render(<App />);
  observeNewContent();
})(observeNewContent);
