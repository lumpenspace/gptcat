import React, { type FC } from 'react';
import KatexFormula from './LatexFormula';

const name = 'lx';
const component: FC<{ children: string }> = ({ children }) => {
  return <KatexFormula formula={children} />;
};

const description = 'Renders a LaTeX.';
const example = '\\frac{1}{2}';

export { component, name, description, example }
