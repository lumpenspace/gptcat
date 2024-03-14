import React, { useState, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

import Button from './Button';

const parseBlock = (blockText: string): string =>
  blockText.replace('<lx>', '')
    .replace('</lx>', '')
    .trim()
    .replace(/\\\s+/g, '\\\\')

const renderKaTeX = (formula: string, isDisplay: boolean): { __html: string } => {
  const container = document.createElement('div');
  container.className = 'mathml-container';
  const math = (isDisplay ? parseBlock(formula) : formula).trim();
  try {
    katex.render(math, container, {
      displayMode: isDisplay,
      output: 'mathml',
      throwOnError: true
    });
    return { __html: container.innerHTML };
  } catch (error: any) {
    return { __html: `<span class="error">Error: ${error.message}</span>` };
  }
};

const KatexFormula: React.FC<{
  formula: string
  isDisplay?: boolean
}> = ({ formula, isDisplay = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [renderedFormula, setRenderedFormula] = useState<{ __html: string }>({ __html: '' });

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(formula as string);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  useEffect(() => {
    if (!formula) return;
    setRenderedFormula(renderKaTeX(formula as string, isDisplay));
  }, [formula, isDisplay]);

  return (
    <div className={`latex-formula ${isDisplay ? 'block' : 'inline-block'}`} title={formula}>
      <div dangerouslySetInnerHTML={renderedFormula} />
      <Button onClick={handleCopy} done={isCopied} />
    </div>
  );
};

export default KatexFormula;
