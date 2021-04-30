import React, { useEffect } from 'react';

import './CoatsPage.scss';
import MetaTags from 'react-meta-tags';
import WomenPage from './WomenPage';
import CoatsHeader from './CoatsHeader';

const CoatsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <MetaTags key={0}>
        <title>Sustainable from the roots – Gobi Cashmere</title>
        <meta property="og:title" content="Sustainable from the roots" />
        <meta property="og:url" content={typeof window !== `undefined` && window.location.href} />
        <meta property="og:type" content="website" />
      </MetaTags>
      <div className="coats-landing-page">
        <section className="coats-page">
          <CoatsHeader />
          <div className="winter-tabs">
            <section className="look-book">
              <WomenPage />
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoatsPage;
