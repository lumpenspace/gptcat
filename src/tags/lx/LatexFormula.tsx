import React, { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import './LatexFormula.scss';
import CustomTag from '../components/CustomTag';

import isDisplayMode from './isDisplayMode';
import renderKatex from './renderKatex';

interface LatexFormulaProps {
  formula: string
}

const LatexFormula: React.FC<LatexFormulaProps> = ({ formula }) => {
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

export default LatexFormula;
export type { LatexFormulaProps };
