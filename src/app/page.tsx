import type { ReactElement } from 'react';

import { portfolio } from '../data/portfolio';
import { LandingPage } from '../pages/LandingPage';

const Page = (): ReactElement => {
  return <LandingPage content={portfolio} />;
};

export default Page;
