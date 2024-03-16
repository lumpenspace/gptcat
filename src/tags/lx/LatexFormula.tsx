import React, { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import './LatexFormula.scss';

import isDisplayMode from './isDisplayMode';
import renderKatex from './renderKatex';

import Button from './Button';

interface LatexFormulaProps {
  formula: string
}

const LatexFormula: React.FC<LatexFormulaProps> = ({ formula }) => {
  const [isDisplay] = useState<boolean>(isDisplayMode(formula));
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [renderedFormula, setRenderedFormula] = useState<DangerHtml>({ __html: '' });

  const handleCopy = (): void => {
    try {
      navigator.clipboard.writeText(formula).then(() => {
        console.log('Copied to clipboard');
        setIsCopied(true);
        setTimeout(() => { setIsCopied(false) }, 800);
      }).catch((error) => {
        console.error('Copy failed', error);
      });
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  useEffect(() => {
    if (!formula) return;
    setRenderedFormula(renderKatex(formula.replace(/\\\s+/g, '\\\\'), isDisplay));
  }, [formula, isDisplay]);

  return (
    <div className={`latex-formula ${isDisplay ? 'block' : 'inline-block'}`} title={formula}>
      <div dangerouslySetInnerHTML={renderedFormula} />
      <Button onClick={handleCopy} done={isCopied} />
    </div>
  );
};

export default LatexFormula;
export type { LatexFormulaProps };
