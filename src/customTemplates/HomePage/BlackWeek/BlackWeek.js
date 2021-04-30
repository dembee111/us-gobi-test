import './BlackWeek.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { blackCover, bwSlider, WomenMen, giftCardBanner, coverSaleBanner, scoopBanner } from './BlackWeekData';
import CustomProgressBar from './../../../components/shared/customProgessBar/CustomProgressBar';
import { shopNowText } from '../DesktopHome/desktopData';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { Swiper, Slide } from 'react-dynamic-swiper';
import { connect } from 'react-redux';
import { getInitFullDate, checkFullTimer, formatFullCountDown } from '../../../components/shared/countDown';

const BlackWeek = (props) => {
  const [nowDate, setNowDate] = useState();

  function createMarkup(data) {
    return {
      __html: data,
    };
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    const getNowDate = async () => {
      const rawDate = await getInitFullDate();

      setNowDate(rawDate);
    };
    getNowDate();
  }, []);

  useEffect(() => {
    if (nowDate) {
      if (nowDate.finish == false) {
        setTimeout(() => {
          const rawItem = checkFullTimer(nowDate);
          setNowDate(rawItem);
        }, 1000);
      }
    }
  }, [nowDate]);

  return (
    <div className="black_week">
      <div className="section-1">
        <div className="b_con">
          <div className="cover">
            <div className="big_box">
              <div className="left">
                <Link to={blackCover.handle} title={blackCover.title}>
                  <div className="img desktop">
                    <img
                      alt={blackCover.title}
                      data-sizes="auto"
                      src={blackCover.imgDesktop.replace('.jpg', '_120x.jpg')}
                      data-src={blackCover.imgDesktop.replace('.jpg', '_1788x.jpg')}
                      className="lazyload blur-up"
                    />
                  </div>
                  <div className="img mobile">
                    <img
                      alt={blackCover.title}
                      data-sizes="auto"
                      src={blackCover.imgMobile.replace('.jpg', '_120x.jpg')}
                      data-src={blackCover.imgMobile.replace('.jpg', '_984x.jpg')}
                      className="lazyload blur-up"
                    />
                  </div>
                </Link>
              </div>
              <div className="right">
                <div className="link_box">
                  <Link to={blackCover.handle} title={blackCover.title} className="center">
                    <div className="detail">
                      <h1 className="tt">{blackCover.title}</h1>
                      <p className="text">{blackCover.text}</p>
                      <p className="bot_text">{blackCover.bot_text}</p>
                      <div className="link">
                        <span>{shopNowText.title}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home_banner">
          <CustomProgressBar />
        </div>
        <div className="cover_sale_banner">
          <div className="cover_row">
            {coverSaleBanner.child.map((item, key) => (
              <div className="list" key={key}>
                <Link to={item.handle} title={item.title}>
                  <div className="img">
                    <img
                      alt={item.title}
                      data-sizes="auto"
                      src={item.imgSrc.replace('.jpg', '_120x.jpg')}
                      data-src={item.imgSrc.replace('.jpg', '_1088x.jpg')}
                      className="lazyload blur-up"
                    />
                  </div>
                  <div className="box">
                    <p className="top_text">
                      {`ends in `} {nowDate && nowDate.nowDate && formatFullCountDown(nowDate.nowDate)[0]}
                      {` days`}
                    </p>
                    <h2 className="tt">{item.title}</h2>
                    <p className="bot_text">{item.bot_text}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-2">
        <div className="black_slider">
          <div className="none_slider-grid">
            {bwSlider.child.map((item, key) => (
              <div className="list" key={key}>
                <Link to={item.handle} area-label={item.title}>
                  <div className="link_box">
                    <div className="img desktop">
                      <img
                        alt={item.title}
                        data-sizes="auto"
                        src={item.imgSrc.replace('.jpg', '_120x.jpg')}
                        data-src={item.imgSrc.replace('.jpg', '_1200x.jpg')}
                        className="lazyload blur-up"
                      />
                    </div>
                    <div className="img mobile">
                      <img
                        alt={item.title}
                        data-sizes="auto"
                        src={item.mobImgSrc.replace('.jpg', '_120x.jpg')}
                        data-src={item.mobImgSrc.replace('.jpg', '_768x.jpg')}
                        className="lazyload blur-up"
                      />
                    </div>
                    {item.center_text ? (
                      <div className="center_text">
                        <p className="top_text">{bwSlider.top_text}</p>
                        <p className="tt">{bwSlider.title}</p>
                        <div className="link">
                          <span>{shopNowText.title}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="gift_card-banner">
        <div className="banner-row">
          <div className="left">
            <Link to={giftCardBanner.handle} title={giftCardBanner.title}>
              <img
                alt={giftCardBanner.title}
                data-sizes="auto"
                src={giftCardBanner.imgSrc.replace('.jpg', '_120x.jpg')}
                data-src={giftCardBanner.imgSrc.replace('.jpg', '_1200x.jpg')}
                className="lazyload blur-up"
              />
            </Link>
          </div>
          <div className="right">
            <p className="top_text">{giftCardBanner.top_text}</p>
            <p className="tt"><Link to={giftCardBanner.handle} title={giftCardBanner.title}>{giftCardBanner.title}</Link></p>
            <p className="bot_text">{giftCardBanner.bot_text}</p>
            <p className="span_text">{giftCardBanner.span_text}</p>
          </div>
        </div>
      </div>
      <div className="scoop_banner">
        <div className="scoop_row">
          <div className="img_row">
            <div className="img left">
              <img src={scoopBanner.imgLeftSrc} alt={scoopBanner.title} />
            </div>
            <div className="center_img">
              <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.1494 1.85655C21.5629 1.26797 20.8667 0.801067 20.1003 0.482513C19.334 0.16396 18.5126 0 17.6831 0C16.8535 0 16.0321 0.16396 15.2658 0.482513C14.4994 0.801067 13.8032 1.26797 13.2167 1.85655L11.9997 3.07749L10.7826 1.85655C9.59811 0.668216 7.99152 0.000615956 6.31633 0.000615968C4.64114 0.000615981 3.03455 0.668216 1.85001 1.85655C0.665469 3.04489 1.24812e-08 4.65662 0 6.33718C-1.24812e-08 8.01774 0.665469 9.62947 1.85001 10.8178L3.06705 12.0387L11.9997 21L20.9323 12.0387L22.1494 10.8178C22.7361 10.2295 23.2015 9.53099 23.519 8.76219C23.8366 7.99339 24 7.16936 24 6.33718C24 5.50499 23.8366 4.68096 23.519 3.91216C23.2015 3.14336 22.7361 2.44486 22.1494 1.85655Z"
                  fill="#FF8D7A"
                />
              </svg>
            </div>
            <div className="img">
              <img src={scoopBanner.imgSrc} alt={scoopBanner.title} />
            </div>
          </div>
          <div className="detail">
            <Link to={scoopBanner.handle} title={scoopBanner.title}>
              <div className="link_box">
                <p className="tt">{scoopBanner.title}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="black_con">
          <h2 className="bg_tt">{WomenMen.title}</h2>
          <div className="description">{WomenMen.description}</div>
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

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default connect(mapStateToProps)(BlackWeek);
