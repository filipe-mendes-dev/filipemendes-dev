import type { ReactElement } from 'react';

const Page = (): ReactElement => {
  return (
    <main>
      <section>
        <p>Phase 1 placeholder</p>
        <h1>Next.js App Router foundation is active.</h1>
        <p>
          This server-rendered page confirms the repository can host a Next.js application inside the existing codebase.
        </p>
        <p>The current Vite SPA remains in place and will be migrated incrementally in later phases.</p>
      </section>
    </main>
  );
};

export default Page;
