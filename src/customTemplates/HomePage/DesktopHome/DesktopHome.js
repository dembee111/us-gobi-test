import './DesktopHome.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import HomePop from '../HomePop/HomePop';
import SpinPopUp from '../RoulettePage/SpinPopUp';
import { checkSpinPop } from '../RoulettePage/rouletteHelper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
import Instagram from '../Instagram/Instagram';
import InfiniteHitsCustom from '../../CollectionPage/InfiniteHitsCustom/InfiniteHitsCustom';

import InfiniteHits from '../../SearchPage/InfiniteHits';
import { Configure, RefinementList, Panel, InstantSearch } from 'react-instantsearch-dom';
import { homeData4, homeData7, shopNowText, discoverText } from './desktopData';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { getInitDate, checkTimer, formatCountDown } from '../../../components/shared/countDown';
import SubSection from '../SubSection/SubSection';
import algoliasearch from 'algoliasearch/lite';
const searchClient = algoliasearch('TICBT2ZIIK', '09f8bd78c2ed40dcbbd19faba0051925');

gsap.registerPlugin(ScrollTrigger);
const DesktopHome = (props) => {
  const [swiper, setSwiper] = useState(null);
  const [nowDate, setNowDate] = useState();
  const [showSpinPop, setShowSpinPop] = useState(false);
  const [dataSpin, setDataSpin] = useState();

  const gift_slide = {
    slidesPerView: 'auto',
    spaceBetween: 0,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.horizontal_next',
      prevEl: '.horizontal_prev',
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // scroll animations ###############################################################

    ScrollTrigger.matchMedia({
      //Desktop
      '(min-width: 1025px)': function () {
        // Anim2
        const anim2 = gsap.timeline({
          scrollTrigger: {
            trigger: '#tc_row_anim4',
            start: 'top bottom-=200',
            end: 'top bottom-=200',
            markers: false,
            scrub: true,
          },
        });
        anim2.fromTo(
          '#img-anim4-left',
          {
            x: -100,
            duration: 1,
            transition: '0.6s',
            opacity: 0,
          },
          {
            x: 0,
            transition: '0.6s',
            opacity: 1,
          },
        );
        anim2.fromTo(
          '#img-anim4-right',
          {
            x: 100,
            duration: 1,
            transition: '0.6s',
            opacity: 0,
          },
          {
            x: 0,
            transition: '0.6s',
            opacity: 1,
          },
        );
      },
    });
    callSpinCheck('us');
    // const getNowDate = async () => {
    //   const rawDate = await getInitDate();
    //   console.log('init date --', rawDate);
    //   setNowDate(rawDate);
    // };
    // getNowDate();
  }, []);
  const callSpinCheck = async (country) => {
    const resultPop = await checkSpinPop(country);
    if (resultPop && resultPop.show == true) {
      setDataSpin(resultPop);
      setShowSpinPop(true);
    }
  };
  let dateFinish = false;

  useEffect(() => {
    if (nowDate) {
      if (dateFinish == false) {
        // console.log(rawItem.nowDate, '*******', nowDate.nowDate);

        setTimeout(() => {
          const rawItem = checkTimer(nowDate);

          if (rawItem && rawItem.nowDate) {
            dateFinish = rawItem.finish;
            setNowDate(rawItem);
          }

          if (dateFinish) {
            setNowDate({ nowDate: '0:0:0' });
          }
        }, 1000);
      }
    }
  }, [nowDate]);
  function popSpinCloseCallBack(e) {
    setShowSpinPop(false);
  }
  const [showHomePop, setShowHomePop] = useState(false);
  function popCloseCallBack(e) {
    setShowHomePop(false);
  }
  useEffect(() => {
    let rawShowPop = localStorage.getItem('show_home_pop');

    if (rawShowPop == null) {
      const timer = setTimeout(() => {
        setShowHomePop(true);
        localStorage.setItem('show_home_pop', true);
      }, 10000);
    }
  }, []);

  function DeskopTopImageSource(props) {
    return (
      <source
        media="(min-width: 960px)"
        srcSet={
          `${props.imgSrc.replace('.jpg', '_1080x.jpg')} 1080w,` +
          `${props.imgSrc.replace('.jpg', '_1280x.jpg')} 1280w,` +
          `${props.imgSrc.replace('.jpg', '_1440x.jpg')} 1440w,` +
          `${props.imgSrc.replace('.jpg', '_1680x.jpg')} 1680w,` +
          `${props.imgSrc.replace('.jpg', '_1920x.jpg')} 1920w,` +
          `${props.imgSrc.replace('.jpg', '_2560x.jpg')} 2560w,`
        }
      />
    );
  }

  function MobileTopImageSource(props) {
    return (
      <source
        media="(min-width: 260px)"
        srcSet={
          `${props.imgSrc.replace('.jpg', '_260x.jpg')} 260w,` +
          `${props.imgSrc.replace('.jpg', '_390x.jpg')} 390w,` +
          `${props.imgSrc.replace('.jpg', '_468x.jpg')} 468w,` +
          `${props.imgSrc.replace('.jpg', '_560x.jpg')} 560w,` +
          `${props.imgSrc.replace('.jpg', '_640x.jpg')} 640w,` +
          `${props.imgSrc.replace('.jpg', '_750x.jpg')} 750w,` +
          `${props.imgSrc.replace('.jpg', '_828x.jpg')} 828w,`
        }
      />
    );
  }

  return (
    <div className="new_home">
      <div className="tc_container-med">
        <div className="home_products">
          <h2 className="bg_tt">{`You'll also love`}</h2>
          <div className="product_list">
            <InfiniteHitsCustom
              source={{
                origin: 'homeCollection',
                handle: 'trending',
              }}
              currencyTable={props.currencyTable}
              currency={props.currency}
            />
          </div>
        </div>
      </div>

      <Instagram />

      <div className="tc_container-full">
        <div className="home_about-row">
          <div className="home_about">
            <div className="detail">
              <h1 className="tt">{homeData7.title}</h1>
              <p>{homeData7.description}</p>
              <Link to={homeData7.handle} className="link_btn desktop" title={homeData7.title}>
                <span>{discoverText.title}</span>
              </Link>
            </div>

            <div className="img">
              <Link to={homeData7.handle} title={homeData7.title}>
                <picture>
                  <DeskopTopImageSource imgSrc={homeData7.imgSrc} />
                  <MobileTopImageSource imgSrc={homeData7.imgSrc} />
                  <img
                    src={`${homeData7.imgSrc.replace('.jpg', '_260x.jpg')} 260w,`}
                    alt={homeData7.title}
                    loading="lazy"
                  />
                </picture>
              </Link>
            </div>
            <div className="detail mobile">
              <Link to={homeData7.handle} className="link_btn" title={homeData7.title}>
                <span>{discoverText.title}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="tc_container">
        <div className="bottom_section">
          <div className="tc_row">
            <SubSection />
          </div>
        </div>
      </div>
      {/* {props.currency && showSpinPop == true && dataSpin ? (
        <SpinPopUp callBack={popSpinCloseCallBack} currency={props.currency} data={dataSpin} />
      ) : null} */}
      {/* {showHomePop == true ? <HomePop callBack={popCloseCallBack} /> : null} */}
    </div>
  );
};
export default DesktopHome;
