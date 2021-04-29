import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import './GiftPage.scss';
import MetaTags from 'react-meta-tags';
import { delay } from 'lodash';
import LazyLoad from 'react-lazyload';
import { giftList, giftProduct } from './GiftData';
import gsap, { TimelineMax } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
gsap.registerPlugin(ScrollTrigger);
const GiftPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const headList = [
    {
      image:
        'https://cdn.shopify.com/s/files/1/0249/6551/3262/files/20_38da20cc-7b36-479b-9e0e-ebe8b61095ce.jpg?v=1599440147',
      altText: 'FREE CASHMERE GIFTS',
    },
  ];

  const revealRefs = useRef([]);
  revealRefs.current = [];

  const pinRefs = useRef([]);
  pinRefs.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    //Media #############################
    ScrollTrigger.matchMedia({
      '(max-width: 1025px)': function () {
        // revealRefs.current.forEach((el, index) => {
        //   gsap.fromTo(
        //     el,
        //     {
        //       x: '-5%',
        //       opacity: 1,
        //     },
        //     {
        //       x: '5%',
        //       duration: 1,
        //       ease: 'none',
        //       scrollTrigger: {
        //         id: `section-${index + 1}`,
        //         trigger: el,
        //         start: 'top center',
        //         toggleActions: 'play none none reverse',
        //         markers: false,
        //         scrub: 1,
        //       },
        //     },
        //   );
        // });
      },
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
      <section className="gift-page">
        <div className="gift-page-header">
          <div className="g-container">
            <div className="p-title">
              <h1>GOBI APPRECIATES YOU!</h1>
              <p>SPECIAL COMPLIMENTARY GIFTS</p>
            </div>
            <div className="bg-box">
              <div className="img-bg"></div>
              {headList.map((list, index) => {
                return (
                  <div key={index} className="p-img-box">
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="gift-page-body">
          <div className="body-desc">
            <div className="body-desc-icon">
              <div className="icon-svg">
                <img src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_6.svg?v=1598861461"></img>
              </div>
              <div className="icon-line"> </div>
            </div>
            <div className="body-desc-1">
              <p>
                Behind every gift is a warm long-lasting tradition of hospitality. We love to share Mongolia’s gift
                giving culture and express our gratitude to those who support us and our mission to “make cashmere a
                lifestyle”!
              </p>
            </div>
          </div>

          {giftList.map((list, index) => {
            return (
              <div key={index} className="gift-section-1">
                <div className="gift-box">
                  <div className="box-title">
                    <h1>{list.title}</h1>
                  </div>

                  <div className="box-desc">
                    <div className="box-left" ref={addToRefs}>
                      <div className="gift-num">
                        <h1>{list.num}</h1>
                      </div>
                      <LazyLoad>
                        <img
                          srcSet={
                            '' +
                            list.imageLeft.replace('.jpg', '_260x.jpg') +
                            ' 260w,' +
                            '' +
                            list.imageLeft.replace('.jpg', '_390x.jpg') +
                            ' 390w,' +
                            '' +
                            list.imageLeft.replace('.jpg', '_468x.jpg') +
                            ' 468w,' +
                            '' +
                            list.imageLeft.replace('.jpg', '_560x.jpg') +
                            ' 560w,' +
                            '' +
                            list.imageLeft.replace('.jpg', '_640x.jpg') +
                            ' 640w,' +
                            '' +
                            list.imageLeft.replace('.jpg', '_750x.jpg') +
                            ' 750w,' +
                            '' +
                            list.imageLeft.replace('.jpg', '_828x.jpg') +
                            ' 828w,' +
                            '' +
                            list.imageLeft.replace('.jpg', '_1080x.jpg') +
                            ' 1080w,' +
                            '' +
                            list.imageLeft.replace('.jpg', '_1280x.jpg') +
                            ' 1280w,' +
                            '' +
                            list.imageLeft.replace('.jpg', '_1440x.jpg') +
                            ' 1440w,' +
                            '' +
                            list.imageLeft.replace('.jpg', '_1680x.jpg') +
                            ' 1680w,' +
                            '' +
                            list.imageLeft.replace('.jpg', '_1920x.jpg') +
                            ' 1920w,'
                          }
                          alt={list.altText}
                        ></img>
                      </LazyLoad>
                    </div>
                    <div className="box-right">
                      <h1>{list.titleRight}</h1>

                      <div className="gift-col">
                        <Tabs>
                          <TabList>
                            {list.child.map((list, index) => {
                              return (
                                <Tab key={index}>
                                  <div className="col-box">
                                    <LazyLoad>
                                      <img
                                        srcSet={
                                          '' +
                                          list.imageRight.replace('.jpg', '_260x.jpg') +
                                          ' 260w,' +
                                          '' +
                                          list.imageRight.replace('.jpg', '_390x.jpg') +
                                          ' 390w,' +
                                          '' +
                                          list.imageRight.replace('.jpg', '_468x.jpg') +
                                          ' 468w,' +
                                          '' +
                                          list.imageRight.replace('.jpg', '_560x.jpg') +
                                          ' 560w,' +
                                          '' +
                                          list.imageRight.replace('.jpg', '_640x.jpg') +
                                          ' 640w,' +
                                          '' +
                                          list.imageRight.replace('.jpg', '_750x.jpg') +
                                          ' 750w,' +
                                          '' +
                                          list.imageRight.replace('.jpg', '_828x.jpg') +
                                          ' 828w,' +
                                          '' +
                                          list.imageRight.replace('.jpg', '_1080x.jpg') +
                                          ' 1080w,' +
                                          '' +
                                          list.imageRight.replace('.jpg', '_1280x.jpg') +
                                          ' 1280w,' +
                                          '' +
                                          list.imageRight.replace('.jpg', '_1440x.jpg') +
                                          ' 1440w,' +
                                          '' +
                                          list.imageRight.replace('.jpg', '_1680x.jpg') +
                                          ' 1680w,' +
                                          '' +
                                          list.imageRight.replace('.jpg', '_1920x.jpg') +
                                          ' 1920w,'
                                        }
                                        alt="FREE CASHMERE GIFTS"
                                      ></img>
                                    </LazyLoad>
                                    <div className="title-h">
                                      <h1>{list.pName}</h1>
                                    </div>
                                  </div>
                                </Tab>
                              );
                            })}
                          </TabList>
                          {list.child2.map((list, index) => {
                            return (
                              <TabPanel key={index}>
                                <div className="description-h">
                                  <p>{list.description}</p>
                                </div>
                                <Link to="/collections/all" className="l-btn">
                                  Shop Now
                                </Link>
                              </TabPanel>
                            );
                          })}
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default GiftPage;
