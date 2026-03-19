import type { ReactElement } from 'react';

import type { ProjectNarrativeListProps } from './ProjectNarrativeList.interfaces';
import st from './ProjectNarrativeList.module.css';

interface ProjectNarrativeRow {
  label: string;
  value: string;
}

const toNarrativeRows = (narrative: ProjectNarrativeListProps['narrative']): ProjectNarrativeRow[] => {
  return [
    { label: 'Problem', value: narrative.problem },
    { label: 'Approach', value: narrative.approach },
    { label: 'Stack', value: narrative.stack },
    { label: 'Outcome', value: narrative.outcome },
  ];
};

export const ProjectNarrativeList = ({ narrative }: ProjectNarrativeListProps): ReactElement => {
  const rows = toNarrativeRows(narrative);

  return (
    <dl className={st.root}>
      {rows.map((row) => (
        <div className={st.item} key={row.label}>
          <dt className={st.label}>{row.label}</dt>
          <dd className={st.value}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
};
