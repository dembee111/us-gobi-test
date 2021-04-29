import React, { useEffect, useRef } from 'react';
import MetaTags from 'react-meta-tags';
import './HomePop.scss';
import LazyLoad from 'react-lazyload';
import { Link } from 'gatsby';
import HubspotForm from 'react-hubspot-form';
export default (function HomePop({ callBack, ...props }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          callBack();
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const imgList = [
    {
      image: 'https://cdn.shopify.com/s/files/1/0249/6551/3262/files/CWS1366-Edit_1605249044.jpg?v=1605254879',
    },
  ];
  return (
    <section className="home-popup-sec">
      <div className="home-popup" aria-disabled={true} ref={wrapperRef}>
        {imgList.map((list, index) => {
          return (
            <div key={index} className="img-box">
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
          );
        })}

        <div className="description">
          <div className="title">
            <h1>{`DON’T MISS OUT ON ANYTHING`}</h1>
          </div>
          <div className="content">
            <p>{`Sign up to get inspiration, news and inside information before everyone else.`}</p>
            <HubspotForm
              portalId="5629226"
              formId="d4d2c652-6952-4391-994c-926b618e0bef"
              onSubmit={() => console.log('Submit!')}
              onReady={() => console.log('Form ready!')}
              loading={<div>Loading...</div>}
            />
          </div>
          {/* <div className="btn">
            <Link to="/pages/about">Read More</Link>
          </div> */}
        </div>
        <div className="close-btn" onClick={callBack}>
          <h1>Close</h1>
        </div>
      </div>
    </section>
  );
});
