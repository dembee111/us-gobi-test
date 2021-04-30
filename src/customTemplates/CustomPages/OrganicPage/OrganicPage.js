import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import './OrganicPage.scss';
import './OrganicPageMobile.scss';
import MetaTags from 'react-meta-tags';
import gsap, { TweenMax, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { organicList, organicList3 } from './OrganicData';
import OrganicVideoPage from './OrganicVideoPage';
import LazyLoad from 'react-lazyload';
const OrganicPage = () => {
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
      <section className="organic-page-main">
        <section className="organic-header">
          <div className="img-bg">
            <LazyLoad>
              <img
                src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/cover_2.jpg?v=1597113887"
                alt="Gobi Organic"
              ></img>
            </LazyLoad>
          </div>
          <div className="bg-layout">
            <div className="container-fluid">
              <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <div className="h-r-text">
                    <h1>GOBI ORGANIC</h1>
                    <h2>2020 collection</h2>
                    <p>
                      Deepen your relationship with nature and experience cashmere in its purest form. Unearth noble
                      fiber that is undyed, unbleached and directly sourced from nature.
                    </p>
                    <Link to="/collections/organic-all">Shop Now</Link>
                  </div>
                </div>
                <div className="col-6 desktop-m">
                  <div className="h-l-box ">
                    <div className="h-l-hide1">
                      <LazyLoad>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/c1_4d18f89f-cfa5-46e9-8e0c-dfe006efab24.jpg?v=1597110689"
                          alt="Gobi Organic"
                        ></img>
                      </LazyLoad>
                    </div>
                    <div className="h-l-hide2">
                      <LazyLoad>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/c2_009a2941-3fdd-46d6-888d-3aab196dfa93.jpg?v=1597110689"
                          alt="Gobi Organic"
                        ></img>
                      </LazyLoad>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-1">
            <div className="sec1">
              <LazyLoad>
                <img
                  src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/c2_009a2941-3fdd-46d6-888d-3aab196dfa93.jpg?v=1597110689"
                  alt="Gobi Organic"
                ></img>
              </LazyLoad>
            </div>
          </div>
          <div className="mobile-2">
            <div className="sec1">
              <LazyLoad>
                <img
                  src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/c1_4d18f89f-cfa5-46e9-8e0c-dfe006efab24.jpg?v=1597110689"
                  alt="Gobi Organic"
                ></img>
              </LazyLoad>
            </div>
          </div>
        </section>
        <section className="section-1">
          <div className="container">
            <div className="row">
              {organicList.map((list, index) => {
                return (
                  <div key={index} className={list.style}>
                    <div className="bgg">
                      <div className="img-box" ref={addToRefs}>
                        <Link to={list.handle}>
                          <LazyLoad>
                            <img src={list.image} alt={list.altText}></img>
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
        <section className="section-video">
          <OrganicVideoPage />
        </section>

        <section className="section-1">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="bgg">
                  <div className="img-box" ref={addToRefs}>
                    <Link to="/products/straight-leg-jogger-off-white">
                      <LazyLoad>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/c15_f93430b3-4518-42ef-a11a-92f0a9a4086c.jpg?v=1597110690"
                          alt="straight-leg-jogger-off-white"
                        ></img>
                      </LazyLoad>
                    </Link>
                  </div>
                  <div className="btn-bg"></div>
                  <div className="btn-hover">
                    <Link to="/products/straight-leg-jogger-off-white">Shop Now</Link>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="bgg">
                  <div className="img-box" ref={addToRefs}>
                    <Link to="/products/womens-full-zip-hoodie-off-taupe">
                      <LazyLoad>
                        <img
                          src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/c16_879dc5f1-86c5-49f5-9812-245cff822a26.jpg?v=1597110689"
                          alt="womens-full-zip-hoodie-off-taupe"
                        ></img>
                      </LazyLoad>
                    </Link>
                  </div>
                  <div className="btn-bg"></div>
                  <div className="btn-hover">
                    <Link to="/products/womens-full-zip-hoodie-off-taupe">Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-banner">
          <div className="banner-box">
            <div className="img-box">
              <LazyLoad>
                <img
                  src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/c24_f4e103b2-6c95-4ffd-a3b0-7d4ae374197b.jpg?v=1597110690"
                  alt="Gobi Organic"
                ></img>
              </LazyLoad>
            </div>
            <div className="text-caption">
              <div className="container">
                <div className="row">
                  <div className="col-6"></div>
                  <div className="col-6">
                    <p>GOBI Cashmere uses 30% less water to make an organic colored sweater than a dyed sweater.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-1">
          <div className="container">
            <div className="row">
              {organicList3.map((list, index) => {
                return (
                  <div key={index} className={list.style}>
                    <div className="bgg">
                      <div className="img-box" ref={addToRefs}>
                        <Link to={list.handle}>
                          <LazyLoad>
                            <img src={list.image} alt={list.altText}></img>
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

export default OrganicPage;
