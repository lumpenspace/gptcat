import React from 'react';
import KatexFormula from './KatexFormula';
import Button from './button';

interface ComponentPart {
  type: 'text' | 'formula'
  value: string
};

// Utility function to parse content and identify formulas
const parseContent = (content): ComponentPart[] => {
  const latexRegex = /<lx>([\s\S]*?)<\/lx>/g;
  const matches = content.match(latexRegex);
  const parts: ComponentPart[] = [];
  let lastIndex = 0;

  if (matches) {
    matches.forEach(match => {
      const index = content.indexOf(match);
      const text = content.slice(lastIndex, index);
      if (text) parts.push({ type: 'text', value: text });
      parts.push({ type: 'formula', value: match.replace(latexRegex, '$1') });
      lastIndex = index + match.length;
    });
  }
  parts.push({ type: 'text', value: content.slice(lastIndex) });

  return parts;
};

const LatexContainer: React.FC<{ content: string }> = ({ content }) => {
  const parts = parseContent(content);
  return (
    <>
      {content}
      {parts.map((part, index) => {
        switch (part.type) {
          case 'text':
            return <span key={index}>{part.value}</span>;
          case 'formula':
            return (
              <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KatexFormula formula={part.value} />
                <Button done={false} /> {/* Assuming `done` state needs to be managed */}
              </span>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default LatexContainer;
