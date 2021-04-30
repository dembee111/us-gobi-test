import React, { useRef, useEffect, useState } from 'react';
import './AboutPage.scss';
import './AboutPageMobile.scss';
import MetaTags from 'react-meta-tags';
import gsap, { TimelineMax } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { delay } from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Timeline } from 'gsap/gsap-core';
gsap.registerPlugin(ScrollTrigger);
const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const headList = [
    {
      image: 'https://cdn.shopify.com/s/files/1/0249/6551/3262/files/coverere-1_2.jpg?v=1599452663',
      altText: 'Gobi Cashmere',
    },
  ];
  const headListm = [
    {
      image: 'https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Pisati-Beniamino-2mobile.jpg?v=1599453848',
      altText: 'Gobi Cashmere',
    },
  ];
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const pinRefs = useRef([]);
  pinRefs.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          y: '10%',
          opacity: 1,
        },
        {
          y: '-20%',
          opacity: 0,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
            // markers: true,
            scrub: 1.5,
          },
        },
      );
    });

    //Media #############################
    ScrollTrigger.matchMedia({
      // Desctop
      '(min-width: 800px)': function () {
        //Section 3 ##########
        let tl66 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec3',
            start: 'top top+=10%',
            end: 'bottom 40%',
            scrub: 1.5,
            pin: true,
            // markers: true
          },
        });

        gsap.to('.sec3-img-pin', {
          scrollTrigger: {
            trigger: '.sec3',
            scrub: 0.5,
            start: 'top bottom',
            end: 'top -10%',
            ease: 'power2',
            // markers: true
          },
          y: '-10%',
        });
        gsap.to('.desc1', {
          scrollTrigger: {
            trigger: '.sec3-right',
            scrub: 0.5,
            start: 'center center',
            end: '+=200',
            ease: 'power2',
            // markers: true
          },
          y: '-30%',
          opacity: 0,
        });
        gsap.to('.desc2 p', {
          scrollTrigger: {
            trigger: '.sec3-right',
            scrub: 0.5,
            start: 'center+=20% center',
            end: '+=200',
            ease: 'power2',
            // markers: true
          },
          y: '-50%',
          opacity: 1,
        });
        // Section 4 ############
        let sec4 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec4',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            pin: true,
            markers: false,
          },
        });
        sec4.fromTo('.sec4-img', { y: '0', duration: 2, opacity: 1 }, { opacity: 0 });

        let sec41 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec4',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            pin: true,
            // markers: false,
          },
        });
        sec41.fromTo('.sec4-desc', { yPercent: 100, opacity: 0, y: '5%' }, { opacity: 1, yPercent: 0 });

        // Section 5 ############
        let sec5 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec5',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            pin: true,
            // markers: true,
          },
        });
        sec5.to('.sec5-img', { y: '-10%', duration: 2 });
        sec5.fromTo('.sec5-img-anim', { opacity: 1 }, { opacity: 0 });

        let sec51 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec5',
            start: 'center bottom',
            end: 'bottom top',
            scrub: true,
            // markers: true,
          },
        });
        sec51.fromTo('.sec5-desc', { yPercent: 100, opacity: 0, y: '5%', duration: 1 }, { opacity: 1, yPercent: 0 });

        // Section 6 ############
        let sec666 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec6',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            pin: true,
            //markers: true,
          },
        });
        sec666.to('.sec6-img', { y: '-10%', duration: 2 });
        sec666.fromTo('.sec6-img-anim', { opacity: 1 }, { opacity: 0 });

        let sec6661 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec6',
            start: 'center bottom',
            end: 'bottom top',
            scrub: true,
            //markers: true,
          },
        });
        sec6661.fromTo('.sec6-desc', { yPercent: 100, y: '100%', duration: 1 }, { y: '0%', yPercent: 0 });
      },

      // tablet
      '(max-width: 768px)': function () {
        //Section 3 ##########
        let tl66 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec3',
            start: 'top top+=10%',
            end: 'bottom 40%',
            scrub: 1.5,
            pin: true,
            // markers: true
          },
        });

        gsap.to('.sec3-img-pin', {
          scrollTrigger: {
            trigger: '.sec3',
            scrub: 0.5,
            start: 'top bottom',
            end: 'top -10%',
            ease: 'power2',
            // markers: true
          },
          y: '-10%',
        });
        gsap.to('.desc1', {
          scrollTrigger: {
            trigger: '.sec3-right',
            scrub: 0.5,
            start: 'center center',
            end: '+=200',
            ease: 'power2',
            // markers: true
          },
          y: '-30%',
          opacity: 0,
        });
        gsap.to('.desc2 p', {
          scrollTrigger: {
            trigger: '.sec3-right',
            scrub: 0.5,
            start: 'center+=20% center',
            end: '+=200',
            ease: 'power2',
            // markers: true
          },
          y: '-100%',
          opacity: 1,
        });
        // Section 4 ############
        let sec4 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec4',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            pin: true,
            markers: false,
          },
        });
        sec4.fromTo('.sec4-img', { y: '0', duration: 2, opacity: 1 }, { opacity: 0 });

        let sec41 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec4',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            pin: true,
            // markers: false,
          },
        });
        sec41.fromTo('.sec4-desc', { yPercent: 100, opacity: 0, y: '5%' }, { opacity: 1, yPercent: 0 });

        // Section 5 ############
        let sec5 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec5',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            pin: true,
            // markers: true,
          },
        });
        sec5.to('.sec5-img', { y: '-10%', duration: 2 });
        sec5.fromTo('.sec5-img-anim', { opacity: 1 }, { opacity: 0 });

        let sec51 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec5',
            start: 'center bottom',
            end: 'bottom top',
            scrub: true,
            // markers: true,
          },
        });
        sec51.fromTo('.sec5-desc', { yPercent: 100, opacity: 0, y: '5%', duration: 1 }, { opacity: 1, yPercent: 0 });

        // Section 6 ############
        let sec666 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec6',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            pin: true,
            //markers: true,
          },
        });
        sec666.to('.sec6-img', { y: '-10%', duration: 2 });
        sec666.fromTo('.sec6-img-anim', { opacity: 1 }, { opacity: 0 });

        let sec6661 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec6',
            start: 'center bottom',
            end: 'bottom top',
            scrub: true,
            //markers: true,
          },
        });
        sec6661.fromTo('.sec6-desc', { yPercent: 100, y: '100%', duration: 1 }, { y: '0%', yPercent: 0 });
      },

      //Mobile

      '(max-width: 375px)': function () {
        // Section 5 ############
        let sec5 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec5',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            pin: true,
            // markers: true,
          },
        });
        // sec5.fromTo('.sec5', { background: '#000', opacity: 1}, {opacity: 0.4})
        sec5.to('.sec5-img', { y: '4%', duration: 2 });
        sec5.fromTo('.sec5-img-anim', { opacity: 1 }, { opacity: 0 });

        let sec51 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec5',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            // markers: true,
          },
        });
        sec51.fromTo('.sec5-desc', { yPercent: 100, opacity: 0, y: '5%', duration: 1 }, { opacity: 1, yPercent: 0 });
      },
      // all
      all: function () {
        //Footer Section ##########################
        let tl12 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec7-footer',
            start: 'bottom bottom',
            end: 'bottom bottom',
            scrub: 4,
            // markers: true
          },
        });
        tl12.fromTo(
          '.p-section',
          {
            // opacity: 0,
            scale: 1,
            // y: 100,
            delay: 1,
            // paddingBottom:300,
            scrollTrigger: {
              trigger: '.p-section',
              start: 'bottom bottom',
              end: '+=300',
              // scrub: 2,
              // markers: true
            },
          },
          {
            // opacity: 1,
            duration: 2,
            scale: 1.4,
            // y: 0
          },
        );

        let tl111 = gsap.timeline({
          scrollTrigger: {
            trigger: '.sec7-desc',
            start: 'bottom bottom',
            end: 'bottom bottom',
            scrub: 4,
            // markers: true
          },
        });
        tl111.fromTo(
          '.d-section',

          { y: '20%', opacity: 1 },
          { y: '-20%' },
        );

        let hl = gsap.timeline({
          scrollTrigger: {
            trigger: '#img-box',
            start: 'center center',
            end: 'bottom top',
            // markers: false,
            scrub: true,
          },
        });
        hl.from('.head-img-anim', { y: -100 });
        let hl2 = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-head',
            start: 'center center',
            end: 'bottom top',
            // markers: false,
            scrub: true,
          },
        });
        hl2.fromTo(
          '.head-caption',
          { opacity: 1, scale: 1, y: 0 },
          { opacity: 0.5, scale: 1.2, duration: 1, y: -100, stagger: 0.2 },
        );
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
      <div className="about-section-new">
        <div className="about-head">
          <div className="img-box" id="img-box">
            {headList.map((list, index) => {
              return (
                <div key={index} className="img-box-desk">
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
            {headListm.map((list, index) => {
              return (
                <div key={index} className="img-box-mobile">
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

          <div className="head-caption">
            <h1>Comfort & Joy</h1>
            <p>The story of Gobi Mongolian Cashmere. Sharing the joy of cashmere everyone can be proud of.</p>
          </div>
          <div className="scroll-down">
            <section id="section05" className="scroll-home">
              <a>
                <span></span>
              </a>
            </section>
          </div>
        </div>
        <div className="about-body">
          <div className="sec1" ref={addToRefs}>
            <div className="text-hide">
              <h1>Welcome to GOBI</h1>
              <p>GOBI welcomes you with our warm heart and warm gifts.</p>
              <p>
                There’s no warmer greeting than the traditional Mongolian custom - giving gifts to those who visit your
                homes. This centuries-old tradition came about as a deep-rooted practice of hospitality. When someone
                visits a family, upon the departure of the guest, the host family offers treats or gifts to express
                their feeling of gratitude for paying a visit. It creates warmth and a pleasant feeling prior to their
                journey back.
              </p>
            </div>
          </div>
          <div className="sec2" ref={addToRefs}>
            <div className="text-hide2">
              <p>Early History</p>
              <p>
                For nomadic society, paying a visit to one’s family has been considered a respectful event as it usually
                requires quite a travel and dedication through the extreme weather condition and vast lands of Mongolia.
                Hence, having visitors, specially from far away, is always joyful as the guest brings news from far off
                places and interesting conversations about their journey. Treating guests well with their best food and
                making them feel at home is an unwritten rule amongst the nomads. Even those in need of food and shelter
                during their long journey are shown hospitality by families that happen to be settled along their route.
                As the nature of nomadic culture is a shared lifestyle – same extreme weather and peaceful co-existence
                of nature and people - treating others well is a profound cultural element. Hence the Mongolian saying
                of “to make a guest stomach-full, hand-full and mind-full” as a result of good food, fine gifts and
                pleasant conversations after visiting someone’s home.
              </p>
            </div>
          </div>
          <div className="sec2-1" ref={addToRefs}>
            <div className="text-hide3">
              <p>GOBI Gifts</p>
              <p>
                At GOBI, we cherish and carry-on our beautiful Mongolian tradition of giving gifts as a sign of
                appreciation to our customers. Following the unwritten rules, we deliberately do choose the best quality
                gifts that are useful in your everyday life. Thus, GOBI especially produces our gifts items from
                scratch, using the best quality fibers found only in Mongolia. As{' '}
                <a href="https://www.gobicashmere.com/us ">www.gobicashmere.com/us</a>is our online home, we hope our
                cashmere gifts will leave you with the joy of warm comfort and a lasting piece of our nomadic cultural
                heritage.
              </p>
            </div>
          </div>
          <div className="sec3-main">
            <div className="sec3">
              <div className="sec3-left">
                <div className="img-box">
                  <img
                    className="sec3-img-pin"
                    src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Pisati-Beniamino-42.jpg?v=1595389148"
                    alt="Gobi Cashmere"
                  ></img>
                </div>
              </div>
              <div className="sec3-right">
                <div className="sec3-desc">
                  <div className="desc1">
                    <h1>It starts with nature</h1>
                    <p>
                      The climate in Mongolia is a bit “extreme”. Nestled in the heart of Asia, Mongolia has a range of
                      geographical zones such as deserts, steppes, and forests. It experiences harsh winters where the
                      temperature plummets to -40&#176; C, and intense summers where it can reach +40&#176; C. Similar
                      to how the grapes that make the finest French wine only grow in the unique climate of a few small
                      regions of France, this extreme Mongolian climate produces the world’s finest cashmere.
                    </p>
                  </div>
                  <div className="desc2">
                    <p>
                      To survive in this harsh environment, Mongolian goats have evolved over millennia to grow coats
                      with the finest hairs. Human hair on average is 50 microns, whereas Mongolian cashmere fibers are
                      14-19 microns. Just microns thin, these fine hairs create an insulating layer that provides warmth
                      on the coldest nights and breathability on the hottest days. It’s these fine hairs that make the
                      world’s softest, most comfortable cashmere fabric.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sec4">
            <div className="sec4-img">
              <img
                className="sec4-img-anim"
                src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Pisati-Beniamino-71.jpg?v=1595389148"
                alt="Gobi Cashmere"
              ></img>
            </div>

            <div className="sec4-container">
              <div className="sec4-desc">
                <div className="sec4-desc-width">
                  <h1>Our secret ingredient</h1>
                  <p>
                    There is another secret ingredient to making the world’s finest cashmere – “joy”. It turns out that
                    the best cashmere is made by the world’s happiest goats. When goats are penned in and placed in
                    factory farming conditions, they release stress hormones that produce coats of inconsistent and
                    inferior quality. True joy for a Mongolian goat is wandering the open plains of Mongolia with their
                    family.
                  </p>
                  <p>
                    Nomadic Mongolian herdsmen learned this secret thousands of years ago. They have found their joy,
                    roaming the plains of Mongolia with their goats in search of the best wild grasslands to graze.
                  </p>
                  <h1>Our commitment</h1>
                  <p>
                    GOBI is committed to preserving this unique harmony of nature and tradition, so that Mongolia can
                    continue to produce the world’s finest cashmere for another thousand years. We buy our raw cashmere
                    from nomadic families, paying fair prices that allow them to preserve their traditional way of life.
                    It’s in our best interest to treat them well, because they are some of our best customers too –
                    nobody appreciates the comfort and warmth of GOBI cashmere more than our herdsmen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="sec5">
            <div className="sec5-img">
              <div className="sec5-img-anim">
                <img src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/829A1006.jpg?v=1595389148"></img>
              </div>
            </div>
            <div className="sec5-container">
              <div className="sec5-desc">
                <div className="sec5-desc-width">
                  <h1>Our joy</h1>
                  <h2>
                    Even when you’re working with the world’s best raw cashmere, there’s still a long way left to go to
                    produce the highest quality, most comfortable cashmere garments.
                  </h2>
                  <p>
                    Some manufacturers try to save a few dollars by blending some great cashmere with inferior short
                    hair cashmere from other countries, or even wools from other animals, resulting in fabrics that pill
                    or lose their shape. And if you don’t comb the fibers in just the right way, or set the looms to
                    just the right tolerances, the fabric will be coarse and lose its magical feel.
                  </p>
                  <p>
                    GOBI’s “joy” comes from bringing the magic of 100% Mongolian Cashmere to life for the world. Our
                    apparel and accessories are made in Mongolia, in a state-of-the-art factory that has Mongolia’s vast
                    grasslands right at its doorstep. Our production process combines techniques and craftsmanship
                    learned over generations with precision manufacturing technology made in Japan and Switzerland.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="sec6">
            <div className="sec6-img">
              <div className="sec6-img-anim">
                <img
                  src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/246A9341.jpg?v=1595389149"
                  alt="Gobi Cashmere"
                ></img>
              </div>
            </div>
            <div className="sec6-container">
              <div className="sec6-desc">
                <div className="sec6-desc-width">
                  <h1>Sharing our joy with the world</h1>
                  <p>
                    Over the years GOBI became a household name worn by 9 out of 10 Mongolians and the nation’s largest
                    employer. Travelers from all over the world were visiting our flagship store in Ulaanbaatar.
                  </p>
                  <p>
                    More than half were leaving with a GOBI garment as a treasured memento of their journey. This made
                    us wonder, “what if everyone could experience the comfort and joy of 100% Mongolian Cashmere?”. It
                    was time to take GOBI to the world.
                  </p>
                  <p>
                    We knew we couldn’t just set up local e-commerce sites and distribution centers in each country and
                    begin competing with giant corporations…we had to be better.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="sec7">
            <div className="sec7-tab">
              <Tabs>
                <TabList>
                  <Tab>Accessible Prices</Tab>
                  <Tab>World Class Designs</Tab>
                  <Tab>All-Year Round Styles</Tab>
                  <Tab>Respect for People & Animals</Tab>
                </TabList>

                <TabPanel>
                  <h2>
                    We started with a powerful promise – the world’s most comfortable 100% Mongolian Cashmere at
                    accessible direct-from-the-source prices.
                  </h2>
                </TabPanel>
                <TabPanel>
                  <h2>
                    While the best cashmere may come from Mongolia, we appreciate that the world looks for style
                    inspiration from the fashion capitals of New York, Paris and Milan – so we partnered with designers
                    from Europe and America to create style choices you will be proud to wear for any occasion, from the
                    boardroom to the bedroom.
                  </h2>
                </TabPanel>
                <TabPanel>
                  <h2>
                    Where most retailers stock a few cashmere options, we have over 10,000 items, colors and size
                    combinations to choose from – so you could live 365 days of the year in the comfort of cashmere.
                  </h2>
                </TabPanel>
                <TabPanel>
                  <h2>
                    We’ve already described our commitment to the humane treatment of animals and to preserving the
                    traditional way of life of the nomadic Mongolian people – so GOBI Cashmere is not just cashmere that
                    feels good, it’s cashmere you can feel good about.
                  </h2>
                </TabPanel>
              </Tabs>
            </div>
            <div className="sec7-desc">
              <div className="d-section">
                <h1>Thank you!</h1>
                <p>
                  We are just beginning our journey to take GOBI to the world, and we are excited about what the future
                  holds. We hope that you too will have the opportunity to experience the comfort and joy of our 100%
                  Mongolian Cashmere very soon.
                </p>
              </div>
            </div>
          </div>

          {/* test  */}

          <div className="sec7-footer">
            <p className="p-section">With peace and love from GOBI Cashmere.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
