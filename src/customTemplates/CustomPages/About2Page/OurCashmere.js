import React, { useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { Link } from 'gatsby';
import './About2Page.scss';
import LazyLoad from 'react-lazyload';
import { menuList, ourCashmereList, whoList } from './Data';
import AboutHeaderPage from './AboutHeaderPage';
export default (function OurCashmere(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="about-page">
      <MetaTags key={0}>
        <title>THIS IS HOW WE PRODUCE YOUR CASHMERE!</title>
        <meta property="og:title" content="Premium Cashmere Brand - Gobi Cashmere " />
        <meta property="og:type" content="website" />
      </MetaTags>
      <div className="about-page-section">
        <AboutHeaderPage />
        <section className="about-page-container">
          <div className="about-page-title">
            <h1>Why Our Cashmere</h1>
          </div>
          <div className="about-grid-col">
            {ourCashmereList.map((list, index) => {
              return (
                <section key={index} className="about-grid-container">
                  <div className={'about-grid-item' + list.gridStyle}>
                    <div className="item-content">
                      <h1>{list.title}</h1>
                      <p>{list.description}</p>
                      <Link className={'about-link_btn' + list.style2} to={list.handle}>
                        <span>Learn more</span>
                      </Link>
                    </div>
                    <div className="item-img-box">
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
                      <div className={'img-box-pos' + list.style}>
                        <img src={list.image2} alt={list.altText}></img>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
});
