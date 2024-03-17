import React, { useEffect, useState } from 'react';
import CustomTag from '../components/CustomTag';
import mermaidAPI from 'mermaid/dist/mermaid'

interface MermaidProps {
  chart: string
}

mermaidAPI.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'default',
  flowchart: {
    htmlLabels: true,
    curve: 'asis'
  },
  xyChart: {
    width: 400,
    height: 400
  },
  gantt: {
    titleTopMargin: 25
  },
  sequence: {
    actorMargin: 50
  },
  journey: {

  },
  quadrantChart: {
  },
  mindmap: {
  },
  sankey: {
  },
  er: {
  },
  gitGraph: {
  }

});

const legalStarts = ['graph', 'sequenceDiagram', 'gantt', 'classDiagram', 'gitGraph', 'journey', 'stateDiagram', 'entityRelationship', 'userJourney', 'pie', 'er', 'requirementDiagram', 'flowchart', 'info', 'git'];

const isLegalStart = (chart: string): boolean => {
  const trimmed = chart.trim();
  return legalStarts.some((start) => trimmed.startsWith(start));
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const [renderedChart, setRenderedChart] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!chart || error) return;
    (async () => {
      chart = chart.replace(/\\n/g, '\n')

      // if the trimmed chart does not start with --- or with a graph name, return

      if (!isLegalStart(chart)) {
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
    <CustomTag display={!!renderedChart} title="Mermaid diagram" copyContent={chart}>
      {
        error
          ? <div>{ error.message }</div>
          : renderedChart
            ? <div dangerouslySetInnerHTML={{ __html: renderedChart }} />
            : <>{`<mm>${chart}</mm>`}</>
      }
    </CustomTag>);
}

export default Mermaid;
