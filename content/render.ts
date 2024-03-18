import { createRoot } from 'react-dom/client';

const render = (element: Element, component: React.JSX.Element): void => {
  createRoot(element, {}).render(component);
};

export default render;
