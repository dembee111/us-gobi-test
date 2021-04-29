import React, { useState, useEffect } from 'react';
import './CardModalStyle.scss';
import _ from 'lodash';
import SmallModalChange from './SmallModalChange';
import 'react-dynamic-swiper/lib/styles.css';
import { Link } from 'gatsby';
import { renderLazyImage } from '../../../components/shared/image';
export default function CardModal(props) {
  let {
    openModal,
    goToPrevSlide,
    goToNextSlide,
    lists,
    activeIndex,
    smallHandler,
    smallModal,
    setSmallModal,
    setOpenModal,
    baseProductData,
    ProductPriceHelper,
    data,
    changeColor,
    changeColorStyle,
    changeSize,
    imageChange,
    closeSignModal,
    setChangecolor,
    setHasExceededQuantity,
    hasExceededQuantity,
    variant,
    error,
  } = props;
  function closeModal() {
    setOpenModal('');
    setState({ ...state, ReadMore: false });
  }

  let colorValues = baseProductData.colorValues && baseProductData.colorValues.length;
  let clothPrice = baseProductData.variants && baseProductData.variants.edges[0].node.compareAtPriceV2.amount;
  const [state, setState] = useState({
    ReadMore: false,
  });

  const gift_slide = {
    slidesPerView: 'auto',
    spaceBetween: 0,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
  };

  return (
    <div>
      <div>
        {lists && baseProductData && (
          <div className="Shop-Modal-New">
            <div className={'tc_signModal ' + openModal} key="1">
              <div className="modal-home">
                <div className="close_btn" onClick={closeModal}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1L1 13" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 1L13 13" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="Modal-shop-content">
                  <div className="slide">
                    <div
                      onClick={() => goToPrevSlide()}
                      className="carousel-btn-left"
                      style={smallModal === 'open_modal' ? { display: 'none' } : {}}
                    >
                      <div onClick={() => goToPrevSlide()} id="goLeft">
                        <svg width="20" height="20" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 13L7 7L1 1" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    {lists.map((item, i) =>
                      item.keyIndex === activeIndex ? (
                        <div className={item.keyIndex === activeIndex ? 'active' : 'inactive'} key={i}>
                          <div className="img-box">
                            {renderLazyImage(
                              item.title,
                              item.bigImg.replace('.jpg', '_100x.jpg'),
                              item.bigImg.replace('.jpg', '_828x.jpg'),
                            )}
                            {item.originalSrc ? (
                              <div
                                className="tooltip"
                                style={{
                                  position: 'absolute',
                                  color: 'rgb(34, 34, 34)',
                                  top: item.top,
                                  left: item.left,
                                }}
                              >
                                {error === true ? (
                                  <>
                                    <div className="plus">&#x2B;</div>
                                    <span className="tooltiptext">{item.title.toLowerCase()}</span>
                                  </>
                                ) : (
                                  <Link to={'/products/' + item.handle}>
                                    <div className="plus">&#x2B;</div>
                                    <span className="tooltiptext">{item.title.toLowerCase()}</span>
                                  </Link>
                                )}
                              </div>
                            ) : (
                              item.originalImgas.map((item, i) => (
                                <Link to={'/products/' + item.handle} key={i}>
                                  <div
                                    className="tooltip"
                                    style={{
                                      position: 'absolute',
                                      color: 'rgb(34, 34, 34)',
                                      top: item.top,
                                      left: item.left,
                                    }}
                                  >
                                    <div className="plus">&#x2B;</div>
                                    <span className="tooltiptext">{item.title.toLowerCase()}</span>
                                  </div>
                                </Link>
                              ))
                            )}
                          </div>
                          <div className="description">
                            <div className="title">
                              {item.originalSrc ? (
                                <div>
                                  <div className="small-img">
                                    {renderLazyImage(
                                      item.title,
                                      item.originalSrc.replace('.jpg', '_100x.jpg'),
                                      item.originalSrc.replace('.jpg', '_120x.jpg'),
                                    )}
                                  </div>
                                  <div className="content-style">
                                    <div className="text-heigth">
                                      <p>{item.title}</p>
                                      <div className="colorPlus">
                                        {' '}
                                        <span>
                                          {error === true ? (
                                            item.colorValues === undefined ? (
                                              ''
                                            ) : (
                                              <span>
                                                {' '}
                                                &#x2B;{'   '}
                                                {item.colorValues} colors
                                              </span>
                                            )
                                          ) : (
                                            <span>
                                              {' '}
                                              &#x2B;{'   '}
                                              {colorValues} colors
                                            </span>
                                          )}
                                        </span>
                                      </div>
                                      <div className="priceStyle">
                                        {error === true ? (
                                          item.clothPrice === undefined ? (
                                            ''
                                          ) : (
                                            <span>
                                              {'$'}
                                              {item.clothPrice}
                                            </span>
                                          )
                                        ) : (
                                          <span>
                                            {'$'}
                                            {clothPrice}
                                          </span>
                                        )}
                                      </div>
                                      <div className="btn">
                                        {error === true ? '' : <a onClick={() => smallHandler(item)}> Add to cart</a>}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                item.originalImgas.map((item, i) => (
                                  <div key={i} style={{ marginRight: '10px' }}>
                                    <div className="small-img">
                                      <img
                                        alt={item.alt}
                                        data-sizes="auto"
                                        src={item.originalSrc && item.originalSrc.replace('.jpg', '_100x.jpg')}
                                        data-src={item.originalSrc && item.originalSrc.replace('.jpg', '_160x.jpg')}
                                        className="lazyload blur-up"
                                      />
                                    </div>

                                    <div className="content-style">
                                      <div className="text-heigth">
                                        <p>{item.title}</p>
                                        <div className="colorPlus">
                                          {' '}
                                          &#x2B;{'   '}
                                          <span>
                                            {colorValues}
                                            {''} colors
                                          </span>
                                        </div>
                                        <div className="priceStyle">
                                          {'$'}
                                          {''}
                                          {clothPrice}
                                        </div>
                                        <div className="btn">
                                          {' '}
                                          <a onClick={() => smallHandler(item)}> Add to cart</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>

                            <hr className="hr-line" />
                            <div className="modal-footer">
                              {item.originalSrc ? (
                                <React.Fragment>
                                  <div className="title-footer">
                                    <a href={item.instagramLink}>
                                      {renderLazyImage(
                                        item.instagramTitle,
                                        item.instagramImg.replace('.jpg', '_10x.jpg'),
                                        item.instagramImg.replace('.jpg', '_120x.jpg'),
                                      )}
                                    </a>
                                    <a href={item.instagramLink}>{item.instagramName}</a>
                                  </div>
                                  {/* <div className="text-line">{item.instagramTitle}</div> */}
                                  <div
                                    className={item.instagramTitle.length > 900 ? 'text-line text-all' : 'text-line'}
                                  >
                                    {item.instagramTitle && state.ReadMore ? (
                                      item.instagramTitle
                                    ) : (
                                      <div>
                                        {item.instagramTitle.slice(0, 150)}
                                        <div className="fadeout"></div>
                                      </div>
                                    )}
                                    <div onClick={() => setState({ ...state, ReadMore: true })}>
                                      {!state.ReadMore ? <div className="btn-read ">Read more... </div> : ''}
                                    </div>
                                  </div>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <div className="title-footer">
                                    <a href={item.instagramLink}>
                                      {renderLazyImage(
                                        item.instagramTitle,
                                        item.instagramImg.replace('.jpg', '_10x.jpg'),
                                        item.instagramImg.replace('.jpg', '_120x.jpg'),
                                      )}
                                    </a>

                                    <a href={item.instagramLink}>{item.instagramName}</a>
                                  </div>
                                  {/* <div className="text-line">{item.instagramTitle}</div> */}
                                  <div
                                    className={item.instagramTitle.length > 900 ? 'text-line text-all' : 'text-line'}
                                  >
                                    {item.instagramTitle && state.ReadMore ? (
                                      item.instagramTitle
                                    ) : (
                                      <div>
                                        {item.instagramTitle.slice(0, 150)}
                                        <div className="fadeout"></div>
                                      </div>
                                    )}
                                    <div onClick={() => setState({ ...state, ReadMore: true })}>
                                      {!state.ReadMore ? <div className="btn-read ">Read more... </div> : ''}
                                    </div>
                                  </div>
                                </React.Fragment>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={i === activeIndex ? 'active' : 'inactive'} key={i}>
                          <div className="img-box">
                            {renderLazyImage(
                              item.title,
                              item.bigImg.replace('.jpg', '_100x.jpg'),
                              item.bigImg.replace('.jpg', '_828x.jpg'),
                            )}
                            {item.originalSrc ? (
                              item.error === true ? (
                                <div
                                  className="tooltip"
                                  style={{
                                    position: 'absolute',
                                    color: 'rgb(34, 34, 34)',
                                    top: item.top,
                                    left: item.left,
                                  }}
                                >
                                  <div className="plus">&#x2B;</div>
                                  <span className="tooltiptext">{item.title.toLowerCase()}</span>
                                </div>
                              ) : (
                                <Link to={'/products/' + item.handle}>
                                  <div
                                    className="tooltip"
                                    style={{
                                      position: 'absolute',
                                      color: 'rgb(34, 34, 34)',
                                      top: item.top,
                                      left: item.left,
                                    }}
                                  >
                                    <div className="plus">&#x2B;</div>
                                    <span className="tooltiptext">{item.title.toLowerCase()}</span>
                                  </div>
                                </Link>
                              )
                            ) : (
                              item.originalImgas.map((item, i) => (
                                <Link to={'/products/' + item.handle} key={i}>
                                  <div
                                    key={i}
                                    className="tooltip"
                                    style={{
                                      position: 'absolute',
                                      color: 'rgb(34, 34, 34)',
                                      top: item.top,
                                      left: item.left,
                                    }}
                                  >
                                    <div className="plus">&#x2B;</div>
                                    <span className="tooltiptext">{item.title.toLowerCase()}</span>
                                  </div>
                                </Link>
                              ))
                            )}
                          </div>
                          <div className="description">
                            <div className="slider-grid">
                              <div className="title">
                                {item.originalSrc ? (
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="small-img">
                                      {renderLazyImage(
                                        item.title,
                                        item.originalSrc.replace('.jpg', '_50x.jpg'),
                                        item.originalSrc.replace('.jpg', '_120x.jpg'),
                                      )}
                                    </div>
                                    <div className="content-style">
                                      <div className="text-heigth">
                                        <p>{item.title}</p>
                                        <div className="colorPlus">
                                          {item.colorValues === undefined ? (
                                            ''
                                          ) : (
                                            <span>
                                              &#x2B;{'   '}
                                              {item.colorValues}
                                              {''} colors
                                            </span>
                                          )}
                                        </div>
                                        <div className="priceStyle">
                                          {item.clothPrice === undefined ? (
                                            ''
                                          ) : (
                                            <span>
                                              {'$'}
                                              {''}
                                              {item.clothPrice}
                                            </span>
                                          )}
                                        </div>
                                        <div className="btn">
                                          {item.error === true ? (
                                            ''
                                          ) : (
                                            <a onClick={() => smallHandler(item)}> Add to cart</a>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  item.originalImgas.map((item, i) => (
                                    <div key={i} style={{ marginRight: '10px' }}>
                                      <div className="small-img">
                                        {renderLazyImage(
                                          item.title,
                                          item.originalSrc.replace('.jpg', '_50x.jpg'),
                                          item.originalSrc.replace('.jpg', '_120x.jpg'),
                                        )}
                                      </div>
                                      <div className="content-style">
                                        <div className="text-heigth">
                                          <p>{item.title}</p>
                                          <div className="colorPlus">
                                            {' '}
                                            &#x2B;{'   '}
                                            <span>
                                              {item.colorValues}
                                              {''} colors
                                            </span>
                                          </div>
                                          <div className="priceStyle">
                                            {'$'}
                                            {''}
                                            {item.clothPrice}
                                          </div>
                                          <div className="btn">
                                            {' '}
                                            <a onClick={() => smallHandler(item)}> Add to cart</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                            <hr className="hr-line" />
                            <div className="modal-footer">
                              {item.originalSrc ? (
                                <React.Fragment>
                                  <div className="title-footer">
                                    <a href={item.instagramLink}>
                                      {renderLazyImage(
                                        item.instagramTitle,
                                        item.instagramImg.replace('.jpg', '_10x.jpg'),
                                        item.instagramImg.replace('.jpg', '_50x.jpg'),
                                      )}
                                    </a>
                                    <a href={item.instagramLink}>{item.instagramName}</a>
                                  </div>
                                  <div
                                    className={item.instagramTitle.length > 900 ? 'text-line text-all' : 'text-line'}
                                  >
                                    {item.instagramTitle && state.ReadMore ? (
                                      item.instagramTitle
                                    ) : (
                                      <div>
                                        {item.instagramTitle.slice(0, 150)}
                                        <div className="fadeout"></div>
                                      </div>
                                    )}
                                    <div onClick={() => setState({ ...state, ReadMore: true })}>
                                      {!state.ReadMore ? <div className="btn-read ">Read more... </div> : ''}
                                    </div>
                                  </div>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <div className="title-footer">
                                    {renderLazyImage(
                                      item.instagramTitle,
                                      item.instagramImg.replace('.jpg', '_10x.jpg'),
                                      item.instagramImg.replace('.jpg', '_90x.jpg'),
                                    )}

                                    <span>{item.instagramName}</span>
                                  </div>
                                  <div
                                    className={item.instagramTitle.length > 900 ? 'text-line text-all' : 'text-line'}
                                  >
                                    {item.instagramTitle && state.ReadMore ? (
                                      item.instagramTitle
                                    ) : (
                                      <div>
                                        {item.instagramTitle.slice(0, 150)}
                                        <div className="fadeout"></div>
                                      </div>
                                    )}
                                    <div onClick={() => setState({ ...state, ReadMore: true })}>
                                      {!state.ReadMore ? <div className="btn-read ">Read more... </div> : ''}
                                    </div>
                                  </div>
                                </React.Fragment>
                              )}
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                    <div
                      onClick={() => goToNextSlide()}
                      className="carousel-btn-right"
                      style={smallModal === 'open_modal' ? { display: 'none' } : {}}
                    >
                      <div onClick={() => goToNextSlide()} id="goRight">
                        <svg width="20" height="20" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 13L7 7L1 1" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tcBackdrop" onClick={closeModal}></div>
            </div>
            <SmallModalChange
              hasExceededQuantity={hasExceededQuantity}
              setHasExceededQuantity={setHasExceededQuantity}
              smallModal={smallModal}
              setSmallModal={setSmallModal}
              baseProductData={baseProductData}
              changeColorStyle={changeColorStyle}
              ProductPriceHelper={ProductPriceHelper}
              data={data}
              changeSize={changeSize}
              changeColor={changeColor}
              imageChange={imageChange}
              closeSignModal={closeSignModal}
              setChangecolor={setChangecolor}
              variant={variant}
              handle={props.handle}
            />
          </div>
        )}
      </div>
    </div>
  );
}
