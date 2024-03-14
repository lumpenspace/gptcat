import React from 'react';
import KatexFormula from './KatexFormula';

interface ComponentPart {
  type: 'text' | 'formula'
  value: string
  display?: boolean
};
const latexRegex = /<lx>([\s\S]*?)<\/lx>/gs;

// Utility function to parse content and identify formulas
const parseContent = (content): ComponentPart[] => {
  const matches = content.match(latexRegex);
  const parts: ComponentPart[] = [];
  let lastIndex = 0;

  if (matches) {
    matches.forEach(match => {
      const index = content.indexOf(match);
      const text = content.slice(lastIndex, index);
      if (text) parts.push({ type: 'text', value: text });
      const formula = match.replace(latexRegex, '$1')
      const display = isMatchDisplayMode(formula as string);
      parts.push({ type: 'formula', value: formula, display });
      lastIndex = index + match.length;
    });
  }
  parts.push({ type: 'text', value: content.slice(lastIndex) });

  return parts;
};

const isMatchDisplayMode = (formula: string): boolean => {
  const startSequences = ['\\display', '\\begin'];
  for (const seq of startSequences) {
    if (formula.startsWith(seq)) return true;
  }
  return (
    startSequences.some(seq => formula.startsWith(seq)) ||
    (formula.startsWith('\\[') && formula.split('\n').length > 1)
  )
};

const LatexContainer: React.FC<{ content: string }> = ({ content }) => {
  const parts = parseContent(content);
  return (
    <div>
      {parts.map((part, index) => {
        switch (part.type) {
          case 'text':
            return <span key={index}>{part.value}</span>;
          case 'formula':
            return (
              <KatexFormula key={index} formula={part.value} isDisplay={part.display} />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default LatexContainer;
