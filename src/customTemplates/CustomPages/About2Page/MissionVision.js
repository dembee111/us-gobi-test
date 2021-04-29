import React, { useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { Link } from 'gatsby';
import LazyLoad from 'react-lazyload';
import './About2Page.scss';
import { menuList, missionList, whoList, missionListDesc } from './Data';
import AboutHeaderPage from './AboutHeaderPage';
export default (function MissionVision(props) {
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
            <h1>{`Mission & Vision`}</h1>
          </div>
          <div className="about-grid-col">
            {missionList.map((list, index) => {
              return (
                <section key={index} className="about-grid-container">
                  <div className={'about-grid-item' + list.gridStyle}>
                    <div className="item-content">
                      <h1>{list.title}</h1>
                      <p dangerouslySetInnerHTML={{ __html: list.description }} />
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
                    </div>
                  </div>
                </section>
              );
            })}
            ;
            {missionListDesc.map((list, index) => {
              return (
                <section key={index} className="about-grid-container">
                  <div className={'about-grid-item no-img-1' + list.gridStyle}>
                    <div className="item-content">
                      <h1>{list.title}</h1>
                      <p dangerouslySetInnerHTML={{ __html: list.description }} />
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
