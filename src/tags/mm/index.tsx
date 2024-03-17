import React, { type FC } from 'react';
import Mermaid from './Mermaid';

const name = 'mm';
const component: FC<{ children: string }> = ({ children }) => {
  return <Mermaid chart={children} />;
};

const description = 'Renders a mermaid diagram.';
const example = 'graph TD\nA[Christmas] -->|Get money| B(Go shopping)\nB --> C{Let me think}\nC -->|One| D[Laptop]\nC -->|Two| E[iPhone]\nC -->|Three| F[fa:fa-car Car]';

export { component, name, description, example }
