import React from 'react';
import render from '../render';
import Button from '../components/Button';
import { createPortal } from 'react-dom';

const renderInputs = (): void => {
  const fieldset = document.querySelector('fieldset.relative');
  console.log(fieldset);
  if (fieldset) {
    const inputDiv = fieldset.querySelector('.grid')!.appendChild(document.createElement('div'));
    inputDiv.classList.add('gptcat--input');
    // Using React portal to render the Button component
    const portalRoot = document.getElementById('app-root'); // Assuming 'app-root' is the id of the root element in App.tsx
    if (portalRoot) {
      render(portalRoot, createPortal(<Button iconName="markup" label="Copy" color="primary" onClick={() => {}} />, inputDiv));
    }
  }
};

export { renderInputs };
