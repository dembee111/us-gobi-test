import './Xmas.scss';
import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import { xmasCover, xmasSlider, WomenMen } from './XmasData';
import { shopNowText } from '../DesktopHome/desktopData';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { Swiper, Slide } from 'react-dynamic-swiper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CyberMonday = (props) => {
  function createMarkup(data) {
    return {
      __html: data,
    };
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    Array.from(document.querySelectorAll('.watermarked')).forEach(function (el) {
      el.dataset.watermark = (el.dataset.watermark + ' ').repeat(60);
    });
  }, []);

  return (
    <div className="xmas">
      <div className="section-1">
        <div className="b_con">
          <Link to={xmasCover.handle} title={xmasCover.title}>
            <div className="cover">
              <div className="img_back desktop">
                <img
                  alt={xmasCover.title}
                  data-sizes="auto"
                  src={xmasCover.desktopImgsrc.replace('.jpg', '_120x.jpg')}
                  data-src={xmasCover.desktopImgsrc.replace('.jpg', '_1920x.jpg')}
                  className="lazyload blur-up"
                />
              </div>
              <div className="img_back mobile">
                <img
                  alt={xmasCover.title}
                  data-sizes="auto"
                  src={xmasCover.mobileImgsrc.replace('.jpg', '_120x.jpg')}
                  data-src={xmasCover.mobileImgsrc.replace('.jpg', '_1920x.jpg')}
                  className="lazyload blur-up"
                />
              </div>
              <div className="img">
                <img
                  alt={xmasCover.title}
                  data-sizes="auto"
                  src={xmasCover.desktopImgsrc.replace('.jpg', '_120x.jpg')}
                  data-src={xmasCover.desktopImgsrc.replace('.jpg', '_1920x.jpg')}
                  className="lazyload blur-up desktop"
                />
                <img
                  alt={xmasCover.title}
                  data-sizes="auto"
                  src={xmasCover.mobileImgsrc.replace('.jpg', '_120x.jpg')}
                  data-src={xmasCover.mobileImgsrc.replace('.jpg', '_1920x.jpg')}
                  className="lazyload blur-up mobile"
                />
                <div className="detail">
                  <h1 className="tt">{xmasCover.title}</h1>
                  <div className="link">
                    <span>{shopNowText.title}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="section-2">
        <div className="b_con">
          <div className="black_slider">
            <div className="cus_black-slider">
              <Swiper
                swiperOptions={{
                  slidesPerView: 3,
                  spaceBetween: 4,
                  simulateTouch: false,
                  navigation: {
                    nextEl: '.black_slide-next',
                    prevEl: '.black_slide-prev',
                  },
                  breakpoints: {
                    767: {
                      loop: false,
                      slidesPerView: 2,
                      spaceBetween: 4,
                      simulateTouch: true,
                      navigation: {
                        nextEl: '.black_slide-next',
                        prevEl: '.black_slide-prev',
                      },
                    },
                  },
                }}
                loop={false}
                navigation={false}
                pagination={false}
              >
                {xmasSlider.child.map((item, i) => (
                  <Slide className="Demo-swiper__slide" key={i}>
                    <Link to={item.handle} title={item.title}>
                      <div className="slide_box" style={{ background: `${item.backstyle}` }}>
                        <div className="img">
                          <img
                            alt={item.title}
                            data-sizes="auto"
                            src={item.imgSrc.replace('.jpg', '_120x.jpg')}
                            data-src={item.imgSrc.replace('.jpg', '_1200x.jpg')}
                            className="lazyload blur-up"
                          />
                          <div className="detail">
                            <h1 className="tt">{item.title}</h1>
                            {/* <div className="upto">{item.upto}</div> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Slide>
                ))}
              </Swiper>
              <div className="black_slide-prev">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 12.8701L1 6.87012L7 0.870117"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="black_slide-next">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 12.8701L1 6.87012L7 0.870117"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="black_con">
          <div className="black_grid">
            {WomenMen.child.map((item, i) => (
              <div className="list" key={i}>
                <Link to={item.handle} titl={item.title}>
                  <div className="box" style={{ background: `${item.backstyle}` }}>
                    <div className="img">
                      <img
                        alt={item.title}
                        data-sizes="auto"
                        src={item.imgSrc.replace('.jpg', '_120x.jpg')}
                        data-src={item.imgSrc.replace('.jpg', '_1080x.jpg')}
                        className="lazyload blur-up"
                      />
                      <div className="detail">
                        <div className="bl_link">
                          <span>{item.title}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CyberMonday;
