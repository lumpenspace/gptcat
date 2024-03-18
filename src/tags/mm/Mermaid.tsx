import React, { type PropsWithChildren, useEffect, useState } from 'react';
import TagContainer, { type Tag } from '../TagContainer';
import mermaidAPI from 'mermaid/dist/mermaid'
import mermaidConfig from './mermaidConfig';
import './Mermaid.scss'

mermaidAPI.initialize(mermaidConfig);

const legalStarts = ['graph', 'sequenceDiagram', 'gantt', 'classDiagram', 'gitGraph', 'journey', 'stateDiagram', 'entityRelationship', 'userJourney', 'pie', 'er', 'requirementDiagram', 'flowchart', 'info', 'git'];

const isLegalStart = (chart: string): boolean => {
  const trimmed = chart.trim();
  return legalStarts.some((start) => trimmed.startsWith(start));
}

const Mermaid: Tag<PropsWithChildren> = ({ children: chart }) => {
  const [renderedChart, setRenderedChart] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);

  console.log({ chart })
  useEffect(() => {
    if (!chart || error) return;
    (async () => {
      chart = (chart as string).replace(/\\n/g, '\n')

      // if the trimmed chart does not start with --- or with a graph name, return

      if (typeof chart !== 'string' || !isLegalStart(chart)) {
        return;
      }

      console.log({ chart })
      if (!chart) return;
      const id = `mermaid-${chart.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      try {
        const { svg } = await mermaidAPI.render(id, chart).catch((error) => {
          console.error('Mermaid error', error);
          throw error;
        });
        setRenderedChart(svg);
      } catch (error) {
        setError(error as Error);
      }
    })().catch(x => { setError(x as Error) });
  }, [chart, error]);

  return (
    <TagContainer tagName="mm" display={!!renderedChart} title="Mermaid diagram" copyContent={chart as string}>
      {
        error
          ? <div>{ error.message }</div>
          : renderedChart
            ? <div className="gptcat--mm-mermaid-container" dangerouslySetInnerHTML={{ __html: renderedChart }} />
            : <>{`<mm>${chart as string}</mm>`}</>
      }
    </TagContainer>);
}

Mermaid.displayName = 'Mermaid';
Mermaid.example = `graph TD
A[Christmas] -->|Get money| B(Go shopping)
B --> C{Let me think}
C -->|One| D[Laptop]
C -->|Two| E[iPhone]
C -->|Three| F[fa:fa-car Car]`;
Mermaid.description = 'Renders a mermaid diagram.';
Mermaid.tag = 'mm';

export default Mermaid;
