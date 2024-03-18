import React from 'react';
import render from '../render';
import Button from '../components/Button';

const renderInputs = (): void => {
  const input = document.createElement('div');
  input.classList.add('gptcat--input');
  render(input, <Button icon="📋" label="Copy" color="primary" onClick={() => {}} />);
  const fieldset = document.querySelector('fieldset.relative');
  if (fieldset) {
    fieldset.appendChild(input);
  }
};

const getFieldSet = (mutation: MutationRecord): Element | null => {
  const fieldset = mutation.target.parentElement?.querySelector('fieldset.relative');
  if (fieldset) {
    fieldObserver.disconnect();
  }
  return fieldset ?? null;
};

const fieldObserver = new MutationObserver((mutations: MutationRecord[]): void => {
  let fieldset: Element | null = null;
  mutations.forEach((mutation: MutationRecord) => {
    if (fieldset) {
      return;
    }
    fieldset = getFieldSet(mutation);
    if (fieldset) {
      fieldObserver.disconnect();
      renderInputs();
    }
  });
})

export { renderInputs, fieldObserver };
