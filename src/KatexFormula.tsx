// KatexFormula.tsx
import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const KatexFormula: React.FC<{
  formula: string
  isDisplay?: boolean
}> = ({ formula, isDisplay = false }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(formula as string);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const renderKaTeX = (): { __html: string } => {
    try {
      const html = katex.renderToString(formula as string, {
        throwOnError: true,
        displayMode: isDisplay
      });
      return { __html: html };
    } catch (error: any) {
      return { __html: `<span class="error">Error: ${error.message}</span>` };
    }
  };

  return (
    <div className={`latex-formula ${isDisplay ? 'block' : 'inline-block'}`}>
      <div dangerouslySetInnerHTML={renderKaTeX()} />
      <button onClick={handleCopy}>{isCopied ? 'Copied' : 'Copy'}</button>
    </div>
  );
};

export default KatexFormula;
