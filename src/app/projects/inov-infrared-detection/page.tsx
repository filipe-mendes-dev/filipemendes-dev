import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import {
  inovInfraredDetectionMetadata,
  InovInfraredDetectionPage,
} from '../../../views/ProjectPages/InovInfraredDetectionPage';

export const generateMetadata = (): Metadata => {
  return inovInfraredDetectionMetadata;
};

const InovInfraredDetectionRoute = (): ReactElement => {
  return <InovInfraredDetectionPage />;
};

export default InovInfraredDetectionRoute;
