import React from 'react';
import { Link } from 'gatsby';
import './CoatsPage.scss';
import LazyLoad from 'react-lazyload';
import { w1Data, w3Data, w8Data } from './coatData';
const WomenPage = () => {
  return (
    <div>
      <div id="womenSection">
        <section className="w1-section">
          {w1Data.map((list, index) => {
            return (
              <div key={index} className="grid-main">
                <div className="l-sec">
                  <div className="single-img">
                    <div className="img-box">
                      <Link to={list.handle}>
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
                      </Link>
                    </div>
                    <div className="btn-bg"></div>
                    <div className="btn-hover">
                      <Link to={list.handle}>{list.btn}</Link>
                    </div>
                  </div>
                </div>
                <div className="r-sec">
                  <div className="grid-img">
                    {list.w1Child.map((list, index) => {
                      return (
                        <div key={index} className="double-img">
                          <div className="img-box">
                            <Link to={list.handle}>
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
                            </Link>
                            <div className="btn-bg"></div>
                            <div className="btn-hover">
                              <Link to={list.handle}>{list.btn}</Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="description white">
                    <p>{list.description}</p>
                  </div>

                  <div className="grid-img">
                    {list.w1Child2.map((list, index) => {
                      return (
                        <div key={index} className="double-img">
                          <div className="img-box">
                            <Link to={list.handle}>
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
                            </Link>
                            <div className="btn-bg"></div>
                            <div className="btn-hover">
                              <Link to={list.handle}>{list.btn}</Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="description black">
                    <p>{list.description2}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="w21-section">
          <div className="grid-3">
            {w3Data.map((list, index) => {
              return (
                <div key={index} className={'single-img' + list.style2}>
                  <div className="img-box">
                    <Link to={list.handle}>
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
                    </Link>
                    <div className="btn-bg"></div>
                    <div className="btn-hover">
                      <Link to={list.handle}>{list.btn}</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="w3-section">
          {w8Data.map((list, index) => {
            return (
              <div key={index}>
                <div className="grid-1">
                  {list.w8Child.map((list, index) => {
                    return (
                      <div key={index} className={'single-img' + list.style2}>
                        <div className="img-box">
                          <Link to={list.handle}>
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
                          </Link>

                          <div className="btn-bg"></div>
                          <div className="btn-hover">
                            <Link to={list.handle}>{list.btn}</Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="sub-title">
                  <h1>{list.title}</h1>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default WomenPage;
