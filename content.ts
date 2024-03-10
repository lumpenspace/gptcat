const katex = window['katex'] || require('katex');

function textNodesUnder(el) {
  const children:Node[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  while(walker.nextNode()) {
    children.push(walker.currentNode)
  }
  return children
}


function renderLatex(node) {
  console.log('renderLatex', node);
  const latexRegex = /<latex>(.*?)<\/latex>/g;
  const matches = node.textContent.match(latexRegex);
  
  if (!matches) return;

  for (const match of matches) {
    const formulaText = match[1];
    const spanElement = document.createElement('span');
    katex.render(formulaText, spanElement, {
      throwOnError: false
    });
    node.parentNode?.replaceChild(spanElement, node);
  }
}

function renderKatexFormulas(element) {
  element.normalize();
  const nodes = textNodesUnder(element);
  nodes.forEach(node => {
    if (node.textContent?.includes('<latex>')) {
      renderLatex(node);
    }
  });
}

function transformNewContent(mutations: MutationRecord[]) {
  mutations.forEach(mutation => {
    getElementNodesFromMutation(mutation).forEach(node => {
      if ((node as Element).classList.contains('contents')) {
        renderKatexFormulas(node);
      }
    });
  });
}


function observeNewContent() {
  const observer = new MutationObserver(mutations => {
    transformNewContent(mutations);
  });

  observer.observe(document.body, {
    childList: true,
  });
}

const renderInitialFormulas = () => {
  const contents = document.querySelectorAll('.contents');
  if (contents) {
    [...contents].forEach(content => {
      renderKatexFormulas(content);
    });
    observeNewContent();
  }
};

const getMainContainer = (node) =>
  (node as Element).querySelector('body > div.relative > div.w-full > div.h-full > div.flex-col')

const getElementNodesFromMutation = (mutation) =>
  [...mutation.addedNodes].filter(node => node.nodeType === Node.ELEMENT_NODE)

const outerObserver = new MutationObserver(mutations => {

  mutations.forEach(mutation => {

    if (mutation.type !== 'childList') return;

    getElementNodesFromMutation(mutation).forEach(node => { 

      if (node.nodeType !== Node.ELEMENT_NODE) return;
    
      const container = getMainContainer(node);
      if (!container) return;

      console.log('outer observer', container);

      renderInitialFormulas();
      outerObserver.disconnect();
    });
  })
});


outerObserver.observe(document.body, {
  childList: true,
  subtree: true
});