import Link from 'next/link';
import type { ReactElement } from 'react';

import { NotFoundPage } from '../pages/NotFoundPage';
import su from '../shared/styles/utilities.module.css';

const NotFound = (): ReactElement => {
  return (
    <NotFoundPage
      primaryAction={
        <Link href="/" className={`${su.button} ${su.buttonPrimary}`}>
          Return Home
        </Link>
      }
    />
  );
};

export default NotFound;
