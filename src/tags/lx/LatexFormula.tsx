import React, { useState, useEffect, type PropsWithChildren } from 'react';
import 'katex/dist/katex.min.css';

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
