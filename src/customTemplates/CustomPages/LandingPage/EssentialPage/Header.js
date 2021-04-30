import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
const SeasonlessHeader = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const headList = [
    {
      image1:
        'https://cdn.shopify.com/s/files/1/0249/6551/3262/files/c1_ada11e24-1c66-4a3a-abab-6856ba6b25fe.jpg?v=1599117656',
      image2:
        'https://cdn.shopify.com/s/files/1/0249/6551/3262/files/c2_2e412643-1d6d-46fd-b5b0-0b5187e043bb.jpg?v=1599117654',
      altText: 'seasonless pieces',
    },
  ];
  return (
    <div>
      <section className="organic-header">
        <div className="bg-layout img-bg1">
          <div className="h-l-box">
            <div className="h-r-text">
              <h1>OUR ESSENTIAL PICKS</h1>
              <p>{`Investment pieces to create a timeless wardrobe. The basic building blocks of a well-rounded closet.`}</p>
              <Link to="/collections/women-cardigan">Shop Now</Link>
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
