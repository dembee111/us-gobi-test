import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
const SeasonlessHeader = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const headList = [
    {
      image1:
        'https://cdn.shopify.com/s/files/1/0249/6551/3262/files/c1_9e659a1f-5323-4809-a6de-b6bd8f1f1705.jpg?v=1599099162',
      image2:
        'https://cdn.shopify.com/s/files/1/0249/6551/3262/files/c2_736549c5-01a1-411d-80db-b148a066e076.jpg?v=1599099157',
      altText: 'OUR ESSENTIAL PICKS',
    },
  ];
  return (
    <div>
      <section className="organic-header">
        <div className="bg-layout img-bg2">
          <div className="h-l-box">
            <div className="h-r-text">
              <h1>SEASONLESS PIECES</h1>
              <p>
                {`Cashmere at GOBI doesn't conform to a specific season. It's perfect for both warm and cold weather!`}
              </p>
              <Link to="/products/striped-fringe-poncho-beige">Shop Now</Link>
            </div>

            {headList.map((list, index) => {
              return (
                <div key={index} className="img-cont">
                  <div className="h-l-hide1 mobile-v1">
                    <img
                      srcSet={
                        '' +
                        list.image1.replace('.jpg', '_260x.jpg') +
                        ' 260w,' +
                        '' +
                        list.image1.replace('.jpg', '_390x.jpg') +
                        ' 390w,' +
                        '' +
                        list.image1.replace('.jpg', '_468x.jpg') +
                        ' 468w,' +
                        '' +
                        list.image1.replace('.jpg', '_560x.jpg') +
                        ' 560w,' +
                        '' +
                        list.image1.replace('.jpg', '_640x.jpg') +
                        ' 640w,' +
                        '' +
                        list.image1.replace('.jpg', '_750x.jpg') +
                        ' 750w,' +
                        '' +
                        list.image1.replace('.jpg', '_828x.jpg') +
                        ' 828w,' +
                        '' +
                        list.image1.replace('.jpg', '_1080x.jpg') +
                        ' 1080w,' +
                        '' +
                        list.image1.replace('.jpg', '_1280x.jpg') +
                        ' 1280w,' +
                        '' +
                        list.image1.replace('.jpg', '_1440x.jpg') +
                        ' 1440w,' +
                        '' +
                        list.image1.replace('.jpg', '_1680x.jpg') +
                        ' 1680w,' +
                        '' +
                        list.image1.replace('.jpg', '_1920x.jpg') +
                        ' 1920w,'
                      }
                      alt={list.altText}
                    ></img>
                  </div>
                  <div className="h-l-hide1 mobile-v2">
                    <img
                      srcSet={
                        '' +
                        list.image2.replace('.jpg', '_260x.jpg') +
                        ' 260w,' +
                        '' +
                        list.image2.replace('.jpg', '_390x.jpg') +
                        ' 390w,' +
                        '' +
                        list.image2.replace('.jpg', '_468x.jpg') +
                        ' 468w,' +
                        '' +
                        list.image2.replace('.jpg', '_560x.jpg') +
                        ' 560w,' +
                        '' +
                        list.image2.replace('.jpg', '_640x.jpg') +
                        ' 640w,' +
                        '' +
                        list.image2.replace('.jpg', '_750x.jpg') +
                        ' 750w,' +
                        '' +
                        list.image2.replace('.jpg', '_828x.jpg') +
                        ' 828w,' +
                        '' +
                        list.image2.replace('.jpg', '_1080x.jpg') +
                        ' 1080w,' +
                        '' +
                        list.image2.replace('.jpg', '_1280x.jpg') +
                        ' 1280w,' +
                        '' +
                        list.image2.replace('.jpg', '_1440x.jpg') +
                        ' 1440w,' +
                        '' +
                        list.image2.replace('.jpg', '_1680x.jpg') +
                        ' 1680w,' +
                        '' +
                        list.image2.replace('.jpg', '_1920x.jpg') +
                        ' 1920w,'
                      }
                      alt={list.altText}
                    ></img>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeasonlessHeader;
