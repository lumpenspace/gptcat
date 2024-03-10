"use strict";
const katex = window['katex'] || require('katex');
function textNodesUnder(el) {
    const children = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
        children.push(walker.currentNode);
    }
    return children;
}
function renderLatex(node) {
    var _a;
    const latexRegex = /<latex>(.*?)<\/latex>/g;
    const matches = node.textContent.match(latexRegex);
    if (!matches)
        return;
    console.log('matches', matches);
    for (const match of matches) {
        const formulaText = match[1];
        const spanElement = document.createElement('span');
        katex.render(formulaText, spanElement, {
            throwOnError: false
        });
        (_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(spanElement, node);
    }
}
function renderKatexFormulas(element) {
    element.normalize();
    console.log('checking', element);
    const nodes = textNodesUnder(element);
    nodes.forEach(node => {
        var _a;
        console.log('node', node);
        if ((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.includes('<latex>')) {
            console.log('node', node);
            renderLatex(node);
        }
    });
}
function transformNewContent(mutations) {
    mutations.forEach(mutation => {
        getElementNodesFromMutation(mutation).forEach(node => {
            if (node.classList.contains('contents')) {
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
const getMainContainer = (node) => node.querySelector('body > div.relative > div.w-full > div.h-full > div.flex-col');
const getElementNodesFromMutation = (mutation) => [...mutation.addedNodes].filter(node => node.nodeType === Node.ELEMENT_NODE);
const outerObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type !== 'childList')
            return;
        getElementNodesFromMutation(mutation).forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE)
                return;
            const container = getMainContainer(node);
            if (!container)
                return;
            console.log('outer observer', container);
            renderInitialFormulas();
            outerObserver.disconnect();
        });
    });
});
outerObserver.observe(document.body, {
    childList: true,
    subtree: true
});
//# sourceMappingURL=content.js.map