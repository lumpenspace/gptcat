import React from 'react';
import render from '../render';
import Button from '../components/Button';

const renderInputs = (): void => {
  const fieldset = document.querySelector('fieldset.relative');
  console.log(fieldset);
  if (fieldset) {
    const inputDiv = fieldset.querySelector('.grid')!.appendChild(document.createElement('div'));
    inputDiv.classList.add('gptcat--input');
    render(inputDiv, <Button iconName="markup" label="Copy" color="primary" onClick={() => {}} />);
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
