import React, { type FC } from 'react';
import KatexFormula from './LatexFormula';

const name = 'lx';
const component: FC<{ children: string }> = ({ children }) => {
  return <KatexFormula formula={children} />;
};

export { component, name }
