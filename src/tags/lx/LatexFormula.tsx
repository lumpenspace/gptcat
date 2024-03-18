import React, { useState, useEffect, type PropsWithChildren } from 'react';
<<<<<<< HEAD
import './katex.css';
=======
import 'katex/dist/katex.min.css';
>>>>>>> 6cdddfa1e5176ee2d02fc654b9183314c95483d0

import CustomTag, { type Tag } from '../TagContainer';

import isDisplayMode from './isDisplayMode';
import renderKatex from './renderKatex';
import './LatexFormula.scss';

const LatexFormula: Tag<PropsWithChildren> = ({ children }) => {
  const formula = children as string;
  const [isDisplay] = useState<boolean>(isDisplayMode(formula));
  const [renderedFormula, setRenderedFormula] = useState<DangerHtml>({ __html: '' });

  useEffect(() => {
    if (!formula) return;
    setRenderedFormula(renderKatex(formula.replace(/\\\s+/g, '\\\\'), isDisplay));
  }, [formula, isDisplay]);

  return (
    <CustomTag display={isDisplay} title={formula} copyContent={formula}>
      <div className="xlaude--latex-formula" dangerouslySetInnerHTML={renderedFormula} />
    </CustomTag>
  );
};

LatexFormula.tag = 'lx';
LatexFormula.description = 'Renders a LaTeX.';
LatexFormula.example = '\\frac{1}{2}';

export default LatexFormula;
