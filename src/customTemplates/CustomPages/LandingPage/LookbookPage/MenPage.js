import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import MetaTags from 'react-meta-tags';
import gsap, { TweenMax, Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LazyLoad from 'react-lazyload';
import { m4Data, m5Data, m6Data, m7Data } from './Data';
import CoolTabs from 'react-cool-tabs';
const MenPage = () => {
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
      <div id="menSection">
        <section className="w4-section">
          {m5Data.map((list, index) => {
            return (
              <div key={index} className="grid-1">
                <div className="l-sec">
                  <div className="single-img">
                    <div className="img-box">
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
                      <div className={'coming-soon' + list.style}>
                        <h1>Coming Soon</h1>
                      </div>
                      <div className="btn-bg"></div>
                      <div className="btn-hover">
                        <Link to={list.handle}>{list.btn}</Link>
                      </div>
                    </div>
                  </div>
                  <div className="description black">
                    <p>{list.description}</p>
                  </div>
                  <div className="grid-img">
                    {list.m5Child.map((list, index) => {
                      return (
                        <div key={index} className="double-img">
                          <div className="img-box">
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
                            <div className={'coming-soon' + list.style}>
                              <h1>Coming Soon</h1>
                            </div>
                            <div className="btn-bg"></div>
                            <div className="btn-hover">
                              <Link to={list.handle}>{list.btn}</Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="r-sec">
                  {list.m5Child3.map((list, index) => {
                    return (
                      <div key={index} className="single-img img-bg1">
                        <div className="img-box">
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
                          <div className={'coming-soon' + list.style}>
                            <h1>Coming Soon</h1>
                          </div>
                          <div className="btn-bg"></div>
                          <div className="btn-hover">
                            <Link to={list.handle}>{list.btn}</Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="position-abs2">
                    <div className="grid-img">
                      {list.m5Child2.map((list, index) => {
                        return (
                          <div key={index} className="double-img">
                            <div className="img-box">
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
                              <div className={'coming-soon' + list.style}>
                                <h1>Coming Soon</h1>
                              </div>
                              <div className="btn-bg"></div>
                              <div className="btn-hover">
                                <Link to={list.handle}>{list.btn}</Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="w3-section">
          <div className="title-pos">
            <h1>FALL IN LOVE </h1>
            <h1 style={{ color: '#fff' }}>WITH KNITS</h1>
          </div>
          {m4Data.map((list, index) => {
            return (
              <div key={index}>
                <div className="grid-1">
                  {list.m4Child.map((list, index) => {
                    return (
                      <div key={index} className={'single-img' + list.style2}>
                        <div className="img-box">
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
                          <div className={'coming-soon' + list.style}>
                            <h1>Coming Soon</h1>
                          </div>
                          <div className="btn-bg"></div>
                          <div className="btn-hover">
                            <Link to={list.handle}>{list.btn}</Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="sub-title">
                  <h1>{list.title}</h1>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default MenPage;
