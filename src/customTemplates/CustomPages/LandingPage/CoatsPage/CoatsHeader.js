import React from 'react';
import './CoatsPage.scss';
import LazyLoad from 'react-lazyload';
import { headerData } from './coatData';
const CoatsHeader = () => {
  return (
    <div>
      {headerData.map((list, index) => {
        return (
          <section key={index} className="w-header">
            <div className="bg">
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
              <div className="title">
                <h1>{list.title}</h1>
              </div>
            </div>
            <div className="caption">
              <div className="img-box">
                <LazyLoad>
                  <img
                    srcSet={
                      '' +
                      list.cap_image.replace('.jpg', '_260x.jpg') +
                      ' 260w,' +
                      '' +
                      list.cap_image.replace('.jpg', '_390x.jpg') +
                      ' 390w,' +
                      '' +
                      list.cap_image.replace('.jpg', '_468x.jpg') +
                      ' 468w,' +
                      '' +
                      list.cap_image.replace('.jpg', '_560x.jpg') +
                      ' 560w,' +
                      '' +
                      list.cap_image.replace('.jpg', '_640x.jpg') +
                      ' 640w,' +
                      '' +
                      list.cap_image.replace('.jpg', '_750x.jpg') +
                      ' 750w,' +
                      '' +
                      list.cap_image.replace('.jpg', '_828x.jpg') +
                      ' 828w,' +
                      '' +
                      list.cap_image.replace('.jpg', '_1080x.jpg') +
                      ' 1080w,' +
                      '' +
                      list.cap_image.replace('.jpg', '_1280x.jpg') +
                      ' 1280w,' +
                      '' +
                      list.cap_image.replace('.jpg', '_1440x.jpg') +
                      ' 1440w,' +
                      '' +
                      list.cap_image.replace('.jpg', '_1680x.jpg') +
                      ' 1680w,' +
                      '' +
                      list.cap_image.replace('.jpg', '_1920x.jpg') +
                      ' 1920w,'
                    }
                    alt={list.altText}
                  ></img>
                </LazyLoad>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CoatsHeader;
