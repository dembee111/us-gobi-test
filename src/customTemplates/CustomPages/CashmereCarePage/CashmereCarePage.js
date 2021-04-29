import React, { useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import './CashmereCarePage.scss';
import { careCover, threeType, twoGrid, careList } from './CashmereCareData';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

export default (function CashmereCarePage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="cashmere-care-section">
      <MetaTags key={0}>
        <title>THIS IS HOW WE PRODUCE YOUR CASHMERE!</title>
        <meta property="og:title" content="Premium Cashmere Brand - Gobi Cashmere " />
        <meta property="og:type" content="website" />
      </MetaTags>

      <div className="new_cashmere-care">
        <div className="cover">
          <div className="box">
            <h1 className="tt">{careCover.title}</h1>
            <p className="text">{careCover.description}</p>
            <div className="video">
              <iframe
                src={careCover.videoSrc}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="three_type">
          <div className="three_box">
            <h1 className="tt">{threeType.title}</h1>
            <div className="list">
              {threeType.child.map((item, key) => (
                <div className="card" key={key}>
                  <div className="img">
                    <img src={item.svg} alt="Gobi Cashmere" />
                  </div>
                  <div className="text">
                    <p>{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="two_grid">
          <div className="grid_con">
            {twoGrid.child.map((item, key) => (
              <div className="imgBox" key={key}>
                <img
                  alt="Gobi Cashmere"
                  data-sizes="auto"
                  src={item.imgSrc.replace('.jpg', '_120x.jpg')}
                  data-src={item.imgSrc.replace('.jpg', '_1200x.jpg')}
                  className="lazyload blur-up"
                />
              </div>
            ))}
            <div className="text">
              <p>{twoGrid.description}</p>
            </div>
          </div>
        </div>
        <div className="care_list">
          <h1 className="bg_tt">{careList.title}</h1>
          {careList.child.map((item, key) => (
            <div className="list" key={key}>
              <div className="box">
                <div className="img">
                  <img
                    alt={careList.title}
                    data-sizes="auto"
                    src={item.imgSrc.replace('.jpg', '_120x.jpg')}
                    data-src={item.imgSrc.replace('.jpg', '_1200x.jpg')}
                    className="lazyload blur-up"
                  />
                </div>
                <div className="detail">
                  <h1 className="title">{item.title}</h1>
                  <div className="text">
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
