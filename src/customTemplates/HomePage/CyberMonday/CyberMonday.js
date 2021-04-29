import './CyberMonday.scss';
import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import { cyberCover, cyberSlider, sale_list, WomenMen } from './CyberMondayData';
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

    ScrollTrigger.matchMedia({
      //Desktop
      '(max-width: 767px)': function () {
        const cover_anim1 = gsap.timeline({
          scrollTrigger: {
            trigger: '.black_week .section-1 .b_con .cover',
            start: 'top+=0',
            end: 'bottom',
            markers: false,
            scrub: true,
          },
        });
        cover_anim1.fromTo(
          '.black_week .section-1 .cover .right.mobile .img img',
          {
            scale: 1,
            y: 0,
          },
          {
            scale: 1,
            duration: 0.6,
            y: +150,
          },
        );
      },
    });

    Array.from(document.querySelectorAll('.watermarked')).forEach(function (el) {
      el.dataset.watermark = (el.dataset.watermark + ' ').repeat(60);
    });
  }, []);

  return (
    <div className="black_week">
      <div className="section-1">
        <div className="b_con">
          <Link to={cyberCover.handle} title={cyberCover.title}>
            <div className="cover">
              <div className="right mobile">
                <div className="img">
                  <img
                    alt={cyberCover.title}
                    data-sizes="auto"
                    src={cyberCover.mobileImgSrc.replace('.jpg', '_120x.jpg')}
                    data-src={cyberCover.mobileImgSrc.replace('.jpg', '_767x.jpg')}
                    className="lazyload blur-up"
                  />
                </div>
              </div>
              <div className="left">
                <div className="detail">
                  <span className="tag">{cyberCover.tag}</span>
                  <div className="sale_logo" dangerouslySetInnerHTML={createMarkup(cyberCover.svg)}></div>
                  <div className="upto">
                    <span className="left_txt">{cyberCover.upto_txt}</span>
                  </div>
                  <h2 className="sub_tt">{cyberCover.sub_tt}</h2>
                  <div className="black_link">
                    <span>{shopNowText.title}</span>
                  </div>
                </div>
              </div>
              <div className="right desktop">
                <div className="img">
                  <img
                    alt={cyberCover.title}
                    data-sizes="auto"
                    src={cyberCover.desktopImgSrc.replace('.jpg', '_120x.jpg')}
                    data-src={cyberCover.desktopImgSrc.replace('.jpg', '_2400x.jpg')}
                    className="lazyload blur-up"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="section-2">
        <div className="black_slider">
          <h1 className="bg_tt">{cyberSlider.title}</h1>
          <p className="description">{cyberSlider.description}</p>
          <div className="cus_black-slider">
            <Swiper
              swiperOptions={{
                slidesPerView: 3,
                spaceBetween: 16,
                simulateTouch: false,
                navigation: {
                  nextEl: '.black_slide-next',
                  prevEl: '.black_slide-prev',
                },
                breakpoints: {
                  767: {
                    loop: true,
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
              {cyberSlider.child.map((item, i) => (
                <Slide className="Demo-swiper__slide" key={i}>
                  <Link to={item.handle} title={item.title}>
                    <div className="slide_box">
                      <div className="img">
                        <img
                          alt={item.title}
                          data-sizes="auto"
                          src={item.imgSrc.replace('.jpg', '_120x.jpg')}
                          data-src={item.imgSrc.replace('.jpg', '_1200x.jpg')}
                          className="lazyload blur-up"
                        />
                      </div>
                      <div className="detail">
                        <h1 className="tt">{item.title}</h1>
                        <span className="upto">{item.upTo}</span>
                        <div className="link">
                          <span>{shopNowText.title}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Slide>
              ))}
            </Swiper>
            <div className="black_slide-prev">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 12.8701L1 6.87012L7 0.870117" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="black_slide-next">
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 12.8701L1 6.87012L7 0.870117" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="sale_list">
            {sale_list.map((item, i) => (
              <div className="list" key={i}>
                <Link to={item.handle} title="Black Week">
                  <div className="box">
                    <div className="back">
                      <div className="watermarked" data-watermark="sale"></div>
                    </div>
                    <div className="det">
                      <div className="icon" dangerouslySetInnerHTML={createMarkup(item.svg)}></div>
                      <div className="text">
                        <span className="upto">{item.upto_txt}</span>
                        <div className="percent">{item.percent}</div>
                        <div className="symbol">
                          <span>%</span>
                          <svg
                            width="36"
                            height="37"
                            viewBox="0 0 36 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.42715 36.6201C0.846098 36.6201 0.555571 36.5205 0.555571 36.3213C0.555571 36.1221 0.709135 35.8481 1.01626 35.4995L31.671 2.80273C28.5334 4.37158 24.8935 5.15601 20.7514 5.15601C20.0707 5.15601 18.8463 5.05225 17.0783 4.84473C17.7257 5.87402 18.0495 7.09839 18.0495 8.51782C18.0495 9.93726 17.7465 11.2986 17.1405 12.6018C16.5429 13.8967 15.7585 15.0049 14.7873 15.9263C13.8244 16.8477 12.7079 17.5864 11.4379 18.1426C10.1679 18.6987 8.96011 18.9768 7.8146 18.9768C6.6774 18.9768 5.71866 18.8149 4.93838 18.4912C4.16641 18.1675 3.54385 17.7275 3.07071 17.1714C2.10782 16.0425 1.62637 14.7725 1.62637 13.3613C1.62637 11.9419 1.85879 10.6843 2.32364 9.58862C2.78848 8.48462 3.39859 7.52173 4.15396 6.69995C4.91763 5.87817 5.76846 5.16016 6.70645 4.5459C8.61563 3.28418 10.5082 2.65332 12.3842 2.65332C13.1728 2.65332 13.9364 2.74463 14.6752 2.92725C16.0697 3.28418 17.8502 3.46265 20.0168 3.46265C22.1833 3.46265 24.1671 3.31323 25.9684 3.0144C27.778 2.71558 29.2638 2.39185 30.4259 2.04321C31.588 1.68628 32.6547 1.3584 33.6259 1.05957C34.5971 0.760742 35.2196 0.611328 35.4936 0.611328C35.7675 0.611328 35.9044 0.698486 35.9044 0.872803C35.9044 1.13843 35.5973 1.61157 34.9831 2.29224L3.00845 36.6201H1.42715ZM6.10879 9.3645C5.41983 10.1946 4.86368 11.0579 4.44034 11.9543C4.0253 12.8425 3.81778 13.6436 3.81778 14.3574C3.81778 15.063 4.0336 15.6606 4.46524 16.1504C4.90518 16.6401 5.56094 16.885 6.43252 16.885C7.31241 16.885 8.21719 16.6526 9.14688 16.1877C10.0766 15.7229 10.9149 15.1211 11.662 14.3823C12.4174 13.6353 13.0981 12.8218 13.704 11.9419C14.974 10.1074 15.609 8.43896 15.609 6.93652C15.609 6.28076 15.3725 5.74536 14.8993 5.33032C14.4262 4.90698 13.841 4.69531 13.1437 4.69531C12.4547 4.69531 11.6828 4.91113 10.8278 5.34277C9.98111 5.77441 9.15518 6.34717 8.35 7.06104C7.54483 7.7666 6.79776 8.53442 6.10879 9.3645ZM18.174 31.4031C17.925 30.6892 17.8004 29.8342 17.8004 28.8381C17.8004 27.842 18.0329 26.792 18.4977 25.688C18.9626 24.584 19.5727 23.6211 20.328 22.7993C21.0834 21.9775 21.9301 21.2554 22.8681 20.6328C24.7773 19.3877 26.674 18.7651 28.5583 18.7651C30.1852 18.7651 31.5175 19.23 32.5551 20.1597C33.6674 21.1641 34.2235 22.6873 34.2235 24.7292C34.2235 26.1155 33.9247 27.4602 33.3271 28.7634C32.7377 30.0583 31.9574 31.1665 30.9862 32.0879C28.8529 34.1216 26.4623 35.1384 23.8144 35.1384C20.9257 35.1384 19.0456 33.8933 18.174 31.4031ZM21.6354 26.3354C21.1457 27.0327 20.7472 27.7466 20.4401 28.4771C20.1413 29.1992 19.9918 29.8882 19.9918 30.5439C19.9918 31.1997 20.216 31.7808 20.6642 32.2871C21.1208 32.7935 21.7848 33.0466 22.6564 33.0466C23.5363 33.0466 24.4411 32.8142 25.3708 32.3494C26.3004 31.8762 27.1388 31.2661 27.8859 30.519C28.6413 29.772 29.3178 28.9585 29.9154 28.0786C31.1855 26.2109 31.8205 24.5342 31.8205 23.0483C31.8205 22.3926 31.5756 21.8572 31.0858 21.4421C30.5961 21.0188 30.0316 20.8071 29.3925 20.8071C28.7533 20.8071 28.0851 20.9648 27.3878 21.2803C26.6989 21.5874 26.0141 21.9941 25.3334 22.5005C24.661 23.0068 23.997 23.5962 23.3412 24.2686C22.6938 24.9409 22.1252 25.6299 21.6354 26.3354Z"
                              fill="white"
                            />
                          </svg>
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
      <div className="section-3">
        <div className="black_con">
          <h1 className="bg_tt">{WomenMen.title}</h1>
          <div className="black_grid">
            {WomenMen.child.map((item, i) => (
              <div className="list" key={i}>
                <Link to={item.handle} titl={item.title}>
                  <div className="box">
                    <div className="img">
                      <img
                        alt={item.title}
                        data-sizes="auto"
                        src={item.imgSrc.replace('.jpg', '_120x.jpg')}
                        data-src={item.imgSrc.replace('.jpg', '_1080x.jpg')}
                        className="lazyload blur-up"
                      />
                    </div>
                    <div className="detail">
                      <div className="bl_link">
                        <span>{item.title}</span>
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
