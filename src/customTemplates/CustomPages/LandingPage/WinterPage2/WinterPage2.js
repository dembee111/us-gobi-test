import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import './WinterPage2.scss';
import MetaTags from 'react-meta-tags';
import gsap, { TweenMax, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WomenPage from './WomenPage';
import MenPage from './MenPage';
import WinterHeader from './WinterHeader';
import WinterCollection from './WinterCollection';
import { Configure, InstantSearch } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
const searchClient = algoliasearch('TICBT2ZIIK', '09f8bd78c2ed40dcbbd19faba0051925');

const WinterPage2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const pinRefs = useRef([]);
  pinRefs.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.matchMedia({
      // desktop
      '(min-width: 800px)': function () {},

      // mobile
      '(max-width: 799px)': function () {},

      // all
      all: function () {
        revealRefs.current.forEach((el, index) => {
          gsap.fromTo(
            el,
            {
              y: '0%',
              scale: 1.2,
            },
            {
              y: '0%',
              scale: 1,
              ease: 'none',
              duration: 1,
              scrollTrigger: {
                id: `section-${index + 1}`,
                trigger: el,
                start: 'top bottom',
                toggleActions: 'play none none reverse',
                markers: false,
                scrub: 1.5,
              },
            },
          );
        });
      },
    });
    TweenMax.from('.img-effect', 1.5, {
      scale: 0.8,
      opacity: 0,
    });
  }, []);
  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  return (
    <div>
      <MetaTags key={0}>
        <title>Sustainable from the roots – Gobi Cashmere</title>
        <meta property="og:title" content="Sustainable from the roots" />
        <meta property="og:url" content={typeof window !== `undefined` && window.location.href} />
        <meta property="og:type" content="website" />
      </MetaTags>
      <div className="yel-color">
        <section className="winter-spice">
          <WinterHeader />
          <div className="winter-tabs">
            <InstantSearch searchClient={searchClient} indexName="us_products">
              <Configure hitsPerPage={16} ruleContexts={['collection_winter-spice']} />

              <Tabs>
                <TabList>
                  <Tab>LOOKBOOK</Tab>
                  <Tab>COLLECTION</Tab>
                </TabList>
                <TabPanel>
                  <section className="look-book">
                    <WomenPage />
                    <MenPage />
                  </section>
                </TabPanel>
                <TabPanel>
                  <div>
                    <WinterCollection />
                  </div>
                </TabPanel>
              </Tabs>
            </InstantSearch>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WinterPage2;
