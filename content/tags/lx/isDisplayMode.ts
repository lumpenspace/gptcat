const isDisplayMode = (formula: string): boolean => {
  const startSequences = ['\\display', '\\begin'];
  for (const seq of startSequences) {
    if (formula.startsWith(seq)) return true;
  }
  return (
    startSequences.some(seq => formula.startsWith(seq)) ||
    (formula.startsWith('\\[') && formula.split('\n').length > 1)
  )
};

export default isDisplayMode;
