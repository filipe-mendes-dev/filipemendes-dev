import type { ReactElement } from 'react';

import type { SectionProps } from './Section.interfaces';
import st from './Section.module.css';

export const Section = ({ children, title, subtitle, className, id }: SectionProps): ReactElement => {
  const sectionClasses = className === undefined ? st.root : `${st.root} ${className}`;

  return (
    <section id={id} className={sectionClasses}>
      {(title !== undefined || subtitle !== undefined) && (
        <header className={st.header}>
          {title !== undefined && <h2>{title}</h2>}
          {subtitle !== undefined && <p className={st.subtitle}>{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
};
