import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import './LookbookPage.scss';
import MetaTags from 'react-meta-tags';
import gsap, { TweenMax, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WomenPage from './WomenPage';
import MenPage from './MenPage';
import WinterHeader from './WinterHeader';
import WinterCollection from './WinterCollection';
const LookbookPage = () => {
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
      <div className="lookbook">
        <section className="winter-spice">
          <WinterHeader />
          <div className="winter-tabs">
            {/* <div>
            <WinterCollection />
          </div> */}

            <section className="look-book">
              <WomenPage />
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LookbookPage;
