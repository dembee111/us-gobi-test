import React, { useState, useEffect } from 'react';
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';
import ReactPlayer from 'react-player';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ProductImages.scss';
import LazyLoad from 'react-lazyload';
function ProductImages(props) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryOption, setGalleryOption] = useState({
    index: 3,
  });
  const [imageZoom, setImageZoom] = useState();
  let [videoState, setVideoState] = useState(true);
  const [zoomActive, setZoomActive] = useState('');
  const [freeTag, setFreeTag] = useState(false);
  const [zoomActiveKey, setZoomActiveKey] = useState('');
  function handleClickImg(index) {
    setGalleryOption({
      index: index,
    });
    setGalleryOpen(true);
  }

  function handleMouseMove(e, imageUrl) {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setImageZoom({ backgroundPosition: `${x}% ${y}%`, backgroundImage: `url(${imageUrl})` });
  }
  function imageLeave(imageUrl) {
    setImageZoom({ backgroundImage: `url(${imageUrl})` });
    setZoomActive('');
  }

  function zoomImage(zoomKey) {
    setZoomActive(zoomActive.length > 0 ? '' : 'activeZoom');
    setZoomActiveKey(zoomKey);
  }

  function bacZoomImage() {
    setZoomActive('');
  }

  useEffect(() => {
    if (props.baseProductData && props.baseProductData.tags) {
      props.baseProductData.tags.map((item) => {
        if (item === `2+1Free`) {
          setFreeTag(true);
        }
      });
    }
  }, [props.baseProductData]);

  return (
    <span>
      <div ref={props.imageGridElement}>
        <div className="tc_desktop">
          <div className="productImageRow">
            {props.baseProductData.images.edges.map((item, key) => (
              <div
                className="product_img_col"
                key={key}
                style={{
                  height: props.imageWidth * 1.5,
                }}
              >
                {!(item.node.altText && item.node.altText.includes('.mp4')) ? (
                  <div className={'hover_img ' + zoomActive} onClick={() => zoomImage(key)}>
                    <div
                      style={imageZoom}
                      onMouseMove={(e) => handleMouseMove(e, item.node.originalSrc)}
                      onMouseLeave={() => imageLeave(item.node.originalSrc)}
                      onClick={() => bacZoomImage()}
                      className="back"
                      onDoubleClick={() => handleClickImg(key)}
                    ></div>
                    <LazyLoad offset={200} once>
                      <img
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                        alt="Gobi Cashmere"
                        loading="lazy"
                        srcSet={
                          `${item.node.originalSrc.replace('.jpg', '_1080x.jpg')} 1080w,` +
                          `${item.node.originalSrc.replace('.jpg', '_1280x.jpg')} 1280w,` +
                          `${item.node.originalSrc.replace('.jpg', '_1440x.jpg')} 1440w,` +
                          `${item.node.originalSrc.replace('.jpg', '_1680x.jpg')} 1680w,` +
                          `${item.node.originalSrc.replace('.jpg', '_1920x.jpg')} 1920w,` +
                          `${item.node.originalSrc.replace('.jpg', '_2560x.jpg')} 2560w,`
                        }
                        width={props.imageWidth}
                      />
                    </LazyLoad>
                  </div>
                ) : (
                  <ReactPlayer
                    url={item.node.altText}
                    playing={videoState}
                    className={'mainVideoPlayer'}
                    playIcon={
                      <div className={'customPlayIconPlayer'}>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.1172 34.4631C26.506 34.4631 34.1172 26.852 34.1172 17.4631C34.1172 8.07429 26.506 0.463135 17.1172 0.463135C7.72835 0.463135 0.117188 8.07429 0.117188 17.4631C0.117188 26.852 7.72835 34.4631 17.1172 34.4631ZM13.1328 24.3643L25.0859 17.4631L13.1328 10.562L13.1328 24.3643Z"
                            fill="white"
                            fillOpacity="0.9"
                          />
                        </svg>
                      </div>
                    }
                    muted
                    loop={true}
                    // light={true}
                    width={props.imageWidth}
                    height={props.imageWidth * 1.5}
                  />
                )}
                {/* {freeTag ? <div className="free_tag">2+1 FRee</div> : null} */}
              </div>
            ))}
          </div>
        </div>

        <div className="tc_mobile mobile_img_slide">
          {/* {freeTag ? <div className="free_tag-Tablet">2+1 FRee</div> : null} */}
          <Swiper
            swiperOptions={{
              slidesPerView: '1',
            }}
            loop={true}
            navigation={false}
            pagination={true}
            paginationClickable={true}
          >
            {props.baseProductData.images.edges.map((item, index) => (
              <Slide className="Demo-swiper__slide" key={index}>
                {props.imageWidth && (
                  <div>
                    {!(item.node.altText && item.node.altText.includes('.mp4')) ? (
                      <LazyLoad offset={200} once>
                        <picture>
                          <source
                            media="(min-width: 260px)"
                            srcSet={
                              `${item.node.originalSrc.replace('.jpg', '_260x.jpg')} 260w,` +
                              `${item.node.originalSrc.replace('.jpg', '_390x.jpg')} 390w,` +
                              `${item.node.originalSrc.replace('.jpg', '_468x.jpg')} 468w,` +
                              `${item.node.originalSrc.replace('.jpg', '_560x.jpg')} 560w,` +
                              `${item.node.originalSrc.replace('.jpg', '_640x.jpg')} 640w,` +
                              `${item.node.originalSrc.replace('.jpg', '_750x.jpg')} 750w,` +
                              `${item.node.originalSrc.replace('.jpg', '_828x.jpg')} 828w,` +
                              `${item.node.originalSrc.replace('.jpg', '_1080x.jpg')} 1080w,`
                            }
                          />
                          <img
                            src={`${item.node.originalSrc.replace('.jpg', '_260x.jpg')} 260w,`}
                            alt="Gobi Cashmere"
                            width={props.imageWidth}
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                            loading="lazy"
                          />
                        </picture>
                      </LazyLoad>
                    ) : (
                      <div className="tc_custom-player">
                        <ReactPlayer
                          url={item.node.altText}
                          playing={videoState}
                          playIcon={
                            <div className={'customPlayIconPlayer'}>
                              <svg
                                width="35"
                                height="35"
                                viewBox="0 0 35 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M17.1172 34.4631C26.506 34.4631 34.1172 26.852 34.1172 17.4631C34.1172 8.07429 26.506 0.463135 17.1172 0.463135C7.72835 0.463135 0.117188 8.07429 0.117188 17.4631C0.117188 26.852 7.72835 34.4631 17.1172 34.4631ZM13.1328 24.3643L25.0859 17.4631L13.1328 10.562L13.1328 24.3643Z"
                                  fill="white"
                                  fillOpacity="0.9"
                                />
                              </svg>
                            </div>
                          }
                          muted
                          loop={true}
                          light={item.node.originalSrc.replace('.jpg', '_800x.jpg')}
                          width={'100%'}
                        />
                      </div>
                    )}
                  </div>
                )}
              </Slide>
            ))}
          </Swiper>
        </div>
      </div>

      {galleryOpen && (
        <Lightbox
          mainSrc={props.baseProductData.images.edges[galleryOption.index].node.originalSrc}
          nextSrc={
            props.baseProductData.images.edges[(galleryOption.index + 1) % props.baseProductData.images.edges.length]
              .node.originalSrc
          }
          prevSrc={
            props.baseProductData.images.edges[
              (galleryOption.index + props.baseProductData.images.edges.length - 1) %
                props.baseProductData.images.edges.length
            ].node.originalSrc
          }
          onCloseRequest={() => setGalleryOpen(false)}
          onMovePrevRequest={() => {
            setGalleryOption({
              index:
                (galleryOption.index + props.baseProductData.images.edges.length - 1) %
                props.baseProductData.images.edges.length,
            });
          }}
          onMoveNextRequest={() => {
            setGalleryOption({
              index: (galleryOption.index + 1) % props.baseProductData.images.edges.length,
            });
          }}
        />
      )}
    </span>
  );
}
export default React.memo(ProductImages);
