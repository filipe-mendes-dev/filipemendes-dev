import type { ReactElement } from 'react';

import { Container } from '../Container';
import type { SectionProps } from './Section.interfaces';
import st from './Section.module.css';

export const Section = ({ children, title, subtitle, className, id, contained = true, containerClassName }: SectionProps): ReactElement => {
  const sectionClasses = className === undefined ? st.root : `${st.root} ${className}`;
  const content =
    contained
      ? containerClassName === undefined
        ? <Container>{children}</Container>
        : <Container className={containerClassName}>{children}</Container>
      : children;

  return (
    <section id={id} className={sectionClasses}>
      {(title !== undefined || subtitle !== undefined) && (
        <header className={st.header}>
          {title !== undefined && <h2>{title}</h2>}
          {subtitle !== undefined && <p className={st.subtitle}>{subtitle}</p>}
        </header>
      )}
      {content}
    </section>
  );
};
