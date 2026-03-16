import type { ReactElement } from 'react';

import { BackIcon, GithubIcon, LinkedInIcon } from '../../icons';
import { AppLink } from '../../navigation/AppLink';
import { Container } from '../../ui/Container';
import su from '../../../shared/styles/utilities.module.css';
import type { FooterProps } from './Footer.interfaces';
import st from './Footer.module.css';

export const Footer = ({
    actionHref,
    actionLabel,
    navigate,
    name,
    descriptor,
    githubUrl,
    linkedInUrl,
}: FooterProps): ReactElement => {
    const currentYear = new Date().getFullYear();
    const footerActionClassName = `${su.button} ${su.buttonSecondary} ${st.footerAction}`;

    return (
        <footer className={st.root}>
            <Container className={st.footerInner}>
                <div className={st.footerBrandColumn}>
                    {actionHref !== undefined &&
                        actionLabel !== undefined &&
                        navigate !== undefined && (
                            <AppLink
                                href={actionHref}
                                navigate={navigate}
                                className={footerActionClassName}
                            >
                                <BackIcon className={st.footerActionIcon} />
                                {actionLabel}
                            </AppLink>
                        )}

                    <div className={st.footerBrand}>
                        <p className={st.footerTag}>[ portfolio.system ]</p>
                        <p className={st.footerName}>{name}</p>
                        <p className={st.footerDescriptor}>{descriptor}</p>
                        <div className={st.footerMetaRow}>
                            <p className={st.footerMeta}>React + TypeScript</p>
                            <span aria-hidden="true">•</span>
                            <p className={st.footerMeta}>
                                Available for selective collaborations
                            </p>
                        </div>
                        <p className={st.footerMeta}>Copyright {currentYear}</p>
                    </div>
                </div>

                <ul className={st.footerSocialList}>
                    <li>
                        <a
                            href={githubUrl}
                            className={st.footerLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GithubIcon className={st.socialIcon} />
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a
                            href={linkedInUrl}
                            className={st.footerLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkedInIcon className={st.socialIcon} />
                            LinkedIn
                        </a>
                    </li>
                </ul>
            </Container>
        </footer>
    );
};
