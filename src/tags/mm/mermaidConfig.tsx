import { type MermaidConfig } from 'mermaid';
import { style } from '../../clients/claude/claude';

const settings: MermaidConfig = {
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'neutral',
  themeVariables: {
    primaryTextColor: style.text100,
    primaryColor: style.bg100,
    secondaryColor: style.accentSecondary200,
    tertiaryColor: style.accentMain200,
    backgroundColor: style.bg300,
    borderColor: style.border100,
    lineColor: style.border100,
    width: '100%',
    useWidth: true,
    maxHeight: '500px',
    useMaxHeight: true,
    height: '100%',
    edgeLabelBackground: style.bg300,
    noteTextColor: style.text100,
    textColor: style.text000,
    arrowheadColor: style.border100,
    classTitle: style.accentSecondary200
  },
  flowchart: {
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

};

export default settings;
