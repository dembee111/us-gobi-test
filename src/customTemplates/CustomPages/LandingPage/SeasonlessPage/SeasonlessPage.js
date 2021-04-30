import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import '../LandingMain.scss';
import MetaTags from 'react-meta-tags';
import gsap, { TweenMax, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { essentialList, essentialList3, essentialList2, banner1, banner2 } from './Data';
import LazyLoad from 'react-lazyload';
import Header from './Header';
const SeasonlessPage = () => {
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
      <section className="seasonless-page-main">
        <Header />
        <section className="section-1">
          <div className="container">
            <div className="row">
              {essentialList.map((list, index) => {
                return (
                  <div key={index} className={list.style}>
                    <div className="bgg">
                      <div className="img-box" ref={addToRefs}>
                        <Link to={list.handle}>
                          <LazyLoad>
                            <img
                              srcSet={
                                '' +
                                list.image.replace('.jpg', '_260x.jpg') +
                                ' 260w,' +
                                '' +
                                list.image.replace('.jpg', '_390x.jpg') +
                                ' 390w,' +
                                '' +
                                list.image.replace('.jpg', '_468x.jpg') +
                                ' 468w,' +
                                '' +
                                list.image.replace('.jpg', '_560x.jpg') +
                                ' 560w,' +
                                '' +
                                list.image.replace('.jpg', '_640x.jpg') +
                                ' 640w,' +
                                '' +
                                list.image.replace('.jpg', '_750x.jpg') +
                                ' 750w,' +
                                '' +
                                list.image.replace('.jpg', '_828x.jpg') +
                                ' 828w,' +
                                '' +
                                list.image.replace('.jpg', '_1080x.jpg') +
                                ' 1080w,' +
                                '' +
                                list.image.replace('.jpg', '_1280x.jpg') +
                                ' 1280w,' +
                                '' +
                                list.image.replace('.jpg', '_1440x.jpg') +
                                ' 1440w,' +
                                '' +
                                list.image.replace('.jpg', '_1680x.jpg') +
                                ' 1680w,' +
                                '' +
                                list.image.replace('.jpg', '_1920x.jpg') +
                                ' 1920w,'
                              }
                              alt={list.altText}
                            ></img>
                          </LazyLoad>
                        </Link>
                      </div>
                      <div className="btn-bg"></div>
                      <div className="btn-hover">
                        <Link to={list.handle}>Shop Now</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* <section className="section-video">
          <OrganicVideoPage />
        </section> */}

        <section className="section-banner">
          {banner1.map((list, index) => {
            return (
              <div key={index} className="banner-box">
                <div className="img-box">
                  <LazyLoad>
                    <img
                      srcSet={
                        '' +
                        list.image.replace('.jpg', '_260x.jpg') +
                        ' 260w,' +
                        '' +
                        list.image.replace('.jpg', '_390x.jpg') +
                        ' 390w,' +
                        '' +
                        list.image.replace('.jpg', '_468x.jpg') +
                        ' 468w,' +
                        '' +
                        list.image.replace('.jpg', '_560x.jpg') +
                        ' 560w,' +
                        '' +
                        list.image.replace('.jpg', '_640x.jpg') +
                        ' 640w,' +
                        '' +
                        list.image.replace('.jpg', '_750x.jpg') +
                        ' 750w,' +
                        '' +
                        list.image.replace('.jpg', '_828x.jpg') +
                        ' 828w,' +
                        '' +
                        list.image.replace('.jpg', '_1080x.jpg') +
                        ' 1080w,' +
                        '' +
                        list.image.replace('.jpg', '_1280x.jpg') +
                        ' 1280w,' +
                        '' +
                        list.image.replace('.jpg', '_1440x.jpg') +
                        ' 1440w,' +
                        '' +
                        list.image.replace('.jpg', '_1680x.jpg') +
                        ' 1680w,' +
                        '' +
                        list.image.replace('.jpg', '_1920x.jpg') +
                        ' 1920w,'
                      }
                      alt={list.altText}
                    ></img>
                  </LazyLoad>
                </div>
                <div className="text-caption">
                  <div className="container">
                    <div className="row">
                      <div className="col-6"></div>
                      <div className="col-6">
                        <p>{list.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <div className="section-1">
          <div className="container">
            <div className="row">
              {essentialList2.map((list, index) => {
                return (
                  <div key={index} className={list.style}>
                    <div className="bgg">
                      <div className="img-box" ref={addToRefs}>
                        <Link to={list.handle}>
                          <LazyLoad>
                            <img
                              srcSet={
                                '' +
                                list.image.replace('.jpg', '_260x.jpg') +
                                ' 260w,' +
                                '' +
                                list.image.replace('.jpg', '_390x.jpg') +
                                ' 390w,' +
                                '' +
                                list.image.replace('.jpg', '_468x.jpg') +
                                ' 468w,' +
                                '' +
                                list.image.replace('.jpg', '_560x.jpg') +
                                ' 560w,' +
                                '' +
                                list.image.replace('.jpg', '_640x.jpg') +
                                ' 640w,' +
                                '' +
                                list.image.replace('.jpg', '_750x.jpg') +
                                ' 750w,' +
                                '' +
                                list.image.replace('.jpg', '_828x.jpg') +
                                ' 828w,' +
                                '' +
                                list.image.replace('.jpg', '_1080x.jpg') +
                                ' 1080w,' +
                                '' +
                                list.image.replace('.jpg', '_1280x.jpg') +
                                ' 1280w,' +
                                '' +
                                list.image.replace('.jpg', '_1440x.jpg') +
                                ' 1440w,' +
                                '' +
                                list.image.replace('.jpg', '_1680x.jpg') +
                                ' 1680w,' +
                                '' +
                                list.image.replace('.jpg', '_1920x.jpg') +
                                ' 1920w,'
                              }
                              alt={list.altText}
                            ></img>
                          </LazyLoad>
                        </Link>
                      </div>
                      <div className="btn-bg"></div>
                      <div className="btn-hover">
                        <Link to={list.handle}>Shop Now</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <section className="section-banner">
          {banner2.map((list, index) => {
            return (
              <div key={index} className="banner-box">
                <div className="img-box">
                  <LazyLoad>
                    <img
                      srcSet={
                        '' +
                        list.image.replace('.jpg', '_260x.jpg') +
                        ' 260w,' +
                        '' +
                        list.image.replace('.jpg', '_390x.jpg') +
                        ' 390w,' +
                        '' +
                        list.image.replace('.jpg', '_468x.jpg') +
                        ' 468w,' +
                        '' +
                        list.image.replace('.jpg', '_560x.jpg') +
                        ' 560w,' +
                        '' +
                        list.image.replace('.jpg', '_640x.jpg') +
                        ' 640w,' +
                        '' +
                        list.image.replace('.jpg', '_750x.jpg') +
                        ' 750w,' +
                        '' +
                        list.image.replace('.jpg', '_828x.jpg') +
                        ' 828w,' +
                        '' +
                        list.image.replace('.jpg', '_1080x.jpg') +
                        ' 1080w,' +
                        '' +
                        list.image.replace('.jpg', '_1280x.jpg') +
                        ' 1280w,' +
                        '' +
                        list.image.replace('.jpg', '_1440x.jpg') +
                        ' 1440w,' +
                        '' +
                        list.image.replace('.jpg', '_1680x.jpg') +
                        ' 1680w,' +
                        '' +
                        list.image.replace('.jpg', '_1920x.jpg') +
                        ' 1920w,'
                      }
                      alt={list.altText}
                    ></img>
                  </LazyLoad>
                </div>
                <div className="text-caption">
                  <div className="container">
                    <div className="row">
                      <div className="col-6"></div>
                      <div className="col-6">
                        <p> {list.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div className="section-1">
          <div className="container">
            <div className="row">
              {essentialList3.map((list, index) => {
                return (
                  <div key={index} className={list.style}>
                    <div className="bgg">
                      <div className="img-box" ref={addToRefs}>
                        <Link to={list.handle}>
                          <LazyLoad>
                            <img
                              srcSet={
                                '' +
                                list.image.replace('.jpg', '_260x.jpg') +
                                ' 260w,' +
                                '' +
                                list.image.replace('.jpg', '_390x.jpg') +
                                ' 390w,' +
                                '' +
                                list.image.replace('.jpg', '_468x.jpg') +
                                ' 468w,' +
                                '' +
                                list.image.replace('.jpg', '_560x.jpg') +
                                ' 560w,' +
                                '' +
                                list.image.replace('.jpg', '_640x.jpg') +
                                ' 640w,' +
                                '' +
                                list.image.replace('.jpg', '_750x.jpg') +
                                ' 750w,' +
                                '' +
                                list.image.replace('.jpg', '_828x.jpg') +
                                ' 828w,' +
                                '' +
                                list.image.replace('.jpg', '_1080x.jpg') +
                                ' 1080w,' +
                                '' +
                                list.image.replace('.jpg', '_1280x.jpg') +
                                ' 1280w,' +
                                '' +
                                list.image.replace('.jpg', '_1440x.jpg') +
                                ' 1440w,' +
                                '' +
                                list.image.replace('.jpg', '_1680x.jpg') +
                                ' 1680w,' +
                                '' +
                                list.image.replace('.jpg', '_1920x.jpg') +
                                ' 1920w,'
                              }
                              alt={list.altText}
                            ></img>
                          </LazyLoad>
                        </Link>
                      </div>
                      <div className="btn-bg"></div>
                      <div className="btn-hover">
                        <Link to={list.handle}>Shop Now</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeasonlessPage;
