import { renderCustomTags } from './tags/index';
import { fieldObserver } from './inputUI';
import './content.scss';

const getNewElements = (mutations: MutationRecord[]): Element[] =>
  mutations.map((mutation, i) =>
    Array.from(mutation.addedNodes)
      .filter(node => node instanceof Element).flat()).flat() as Element[];

const newContentObserver = new MutationObserver((mutations: MutationRecord[]): void => {
  renderCustomTags(getNewElements(mutations));
});

const observeNewContent = (): void => {
  if (document !== null) {
    newContentObserver.observe(document, {
      childList: true,
      subtree: true
    });
    fieldObserver.observe(document, {
      childList: true,
      subtree: true
    });
  }
};

observeNewContent();
