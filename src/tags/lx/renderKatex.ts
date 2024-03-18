import katex from 'katex';

const renderKaTeX = (formula: string, isDisplay: boolean): DangerHtml => {
  const container = document.createElement('div');
  container.className = 'mathml-container';
  const math = formula.trim();
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

export default renderKaTeX;
