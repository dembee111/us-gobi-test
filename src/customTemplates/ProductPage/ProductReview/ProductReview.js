import React, { useState, useEffect } from 'react';
import { getProductsByQuery } from '../../../components/shared/query/query';
import { useLazyQuery } from '@apollo/client';
import Image from '../../../components/shared/image';
import ReactStars from 'react-stars';
import Pagination from 'react-js-pagination';
import './ProductReview.scss';
import { func } from 'prop-types';

const ProductReview = (props) => {
  const [data, setData] = useState();
  const [getProductsByQueryQuery, { data: getProductsByQueryData }] = useLazyQuery(getProductsByQuery, {
    errorPolicy: 'all',
  });
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [userReview, setUserReview] = useState();
  const [userRating, setUserRating] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userReviewError, setUserReviewError] = useState();
  const [userRatingError, setUserRatingError] = useState();
  const [userNameError, setUserNameError] = useState();
  const [userEmailError, setUserEmailError] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [skus, setSkus] = useState();
  const [openColor, setOpenColor] = useState();
  const [openSize, setOpenSize] = useState();
  const [products, setProducts] = useState();
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedProductIndex, setSelectedProductIndex] = useState();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState();
  const [writeReviewSuccess, setWriteReviewSuccess] = useState();
  const [isLoading, setIsLoading] = useState();
  const itemsPerPage = 4;

  useEffect(() => {
    if (props.tags) {
      for (let tag of props.tags) {
        if (tag.includes('uniqueTag-')) {
          getProductsByQueryQuery({
            variables: {
              query: tag,
            },
          });
        }
      }
    }
  }, [props.tags]);

  useEffect(() => {
    if (getProductsByQueryData) {
      let productSkus = '';

      if (getProductsByQueryData.products && getProductsByQueryData.products.edges) {
        setProducts(getProductsByQueryData.products.edges);
        if (
          getProductsByQueryData.products.edges[0] &&
          getProductsByQueryData.products.edges[0].node &&
          getProductsByQueryData.products.edges[0].node.variants &&
          getProductsByQueryData.products.edges[0].node.variants.edges &&
          getProductsByQueryData.products.edges[0].node.variants.edges[0] &&
          getProductsByQueryData.products.edges[0].node.variants.edges[0].node &&
          getProductsByQueryData.products.edges[0].node.variants.edges[0].node.selectedOptions
        ) {
          let variant;
          if (getProductsByQueryData.products.edges[0].node.variants.edges[0].node) {
            variant = { ...getProductsByQueryData.products.edges[0].node.variants.edges[0].node };
          }
          setSelectedVariant(variant);
          setSelectedVariantIndex(0);
          setSelectedProductIndex(0);
        }
        for (let product of getProductsByQueryData.products.edges) {
          if (product && product.node && product.node.variants && product.node.variants.edges) {
            for (let variant of product.node.variants.edges) {
              productSkus += variant.node.sku + ';';
            }
          }
        }
      }
      setSkus(productSkus);
      setReviewData(productSkus, currentPage);
    }
  }, [getProductsByQueryData]);

  useEffect(() => {
    if (
      selectedProductIndex !== undefined &&
      selectedVariantIndex !== undefined &&
      products &&
      products[selectedProductIndex] &&
      products[selectedProductIndex] &&
      products[selectedProductIndex].node &&
      products[selectedProductIndex].node.variants &&
      products[selectedProductIndex].node.variants.edges &&
      products[selectedProductIndex].node.variants.edges[selectedVariantIndex] &&
      products[selectedProductIndex].node.variants.edges[selectedVariantIndex].node
    ) {
      setSelectedVariant(products[selectedProductIndex].node.variants.edges[selectedVariantIndex].node);
    }
  }, [selectedProductIndex, selectedVariantIndex, products]);

  useEffect(() => {
    if (writeReviewSuccess) {
      setTimeout(() => {
        setWriteReviewSuccess(false);
      }, 5000);
    }
  }, [writeReviewSuccess]);

  async function setReviewData(pSku, pageNumber) {
    const rawdata = await getReviews(pSku, pageNumber);

    setData(rawdata);
  }

  function getReviews(productSkus, pageNumber) {
    return new Promise((resolve) => {
      //send req to reviews.io
      const Http = new XMLHttpRequest();
      const url = `https://api.reviews.io/product/review?store=www.gobicashmere.com&sku=${productSkus}&per_page=4&page=${pageNumber}`;
      //const url = `https://api.reviews.io/product/review?store=banners-on-the-cheap&sku=10007&per_page=4&page=${pageNumber}`;
      Http.open('GET', url);
      Http.send();

      Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
          if (Http.status === 200 && Http.status < 300) {
            if (Http.responseText && JSON.parse(Http.responseText)) {
              resolve(JSON.parse(Http.responseText));
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      };
    });
  }

  function writeReview() {
    //send req to reviews.io
    if (selectedVariant && selectedVariant.sku && userName && userEmail && userReview && userRating) {
      setIsLoading(true);
      const Http = new XMLHttpRequest();
      const url = `https://api.reviews.io/product/review/new`;
      Http.open('POST', url);
      Http.setRequestHeader('Content-Type', 'application/json');
      Http.send(
        JSON.stringify({
          store: 'www.gobicashmere.com',
          apikey: 'c1baf18d6f2f04863fbd2fa0a3be63b8',
          sku: selectedVariant.sku,
          name: userName,
          email: userEmail,
          review: userReview,
          rating: userRating + '',
        }),
      );
      Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
          setIsLoading(false);
          if (Http.status === 200 && Http.status < 300) {
            JSON.parse(Http.responseText);
            if (Http.responseText && JSON.parse(Http.responseText)) {
              setWriteReviewSuccess(true);
            }
          }
        }
      };
    } else {
      if (!userName) {
        setUserNameError(true);
      }
      if (!userEmail) {
        setUserEmailError(true);
      }
      if (!userReview || userReview.length < 10) {
        setUserReviewError(true);
      }
      if (!userRating) {
        setUserRatingError(true);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    writeReview();
  }

  function handleReviewChange(event) {
    setUserReviewError(false);
    setUserReview(event.target.value);
  }

  function handleNameChange(event) {
    setUserNameError(false);
    setUserEmailError(false);
    setUserName(event.target.value);
  }

  function handleEmailChange(event) {
    setUserEmailError(false);
    setUserNameError(false);
    setUserEmail(event.target.value);
  }

  const handleRatingChange = (newRating) => {
    setUserRatingError(false);
    setUserRating(newRating);
  };

  function toggleOpenColor() {
    setOpenColor(!openColor);
  }

  function toggleOpenSize() {
    setOpenSize(!openSize);
  }

  function selectColor(variant, productIndex) {
    if (variant) {
      setSelectedVariant(variant);
      setSelectedProductIndex(productIndex);
      setOpenColor(false);
    }
  }

  function selectSize(variant, variantIndex) {
    if (variant) {
      setSelectedVariant(variant);
      setSelectedVariantIndex(variantIndex);
      setOpenSize(false);
    }
  }

  function getSizeAndColor(variant) {
    let size = '';
    let color = '';
    for (let option of variant.selectedOptions) {
      if (option.name === 'Size') {
        size = option.value;
      } else if (option.name === 'Color') {
        color = option.value;
      }
    }
    return [size, color];
  }

  function handlePageChange(pageNumber) {
    setReviewData(skus, pageNumber);
    setCurrentPage(pageNumber);
  }

  return (
    <div className="review-section">
      <div className="rev_tt">
        <h1>Ratings & Review</h1>
      </div>
      <div className={!isWriteOpen ? 'review_write' : 'review_write open_wr'}>
        <div className="write_btn">
          <div className="review_result">
            <div className="left">
              <span>
                {data && data.stats && data.stats.average && (Math.round(data.stats.average * 10) / 10).toFixed(1)}
              </span>
            </div>
            <div className="right">
              <ReactStars
                count={5}
                size={18}
                color1={'#BDBDBD'}
                color2={'#EE7727'}
                value={data && data.stats && data.stats.average ? Number(data.stats.average) : 0}
                half={true}
                edit={false}
              />
              <span>{data && data.stats && data.stats.count} Review(s)</span>
            </div>
          </div>
          <div className="review_btn">
            <button onClick={() => setIsWriteOpen(true)} className="open_btns">
              Write Review
            </button>
          </div>
        </div>
        {isWriteOpen ? (
          <div className="review_form open_review" style={isLoading ? { opacity: '0.6' } : null}>
            <div className="write_form">
              <form onSubmit={handleSubmit}>
                <h1 className="tt">Write Your Review</h1>
                <div className="img_rate">
                  {products &&
                  selectedProductIndex !== undefined &&
                  products[selectedProductIndex] &&
                  products[selectedProductIndex].node &&
                  products[selectedProductIndex].node.images &&
                  products[selectedProductIndex].node.images.edges &&
                  products[selectedProductIndex].node.images.edges &&
                  products[selectedProductIndex].node.images.edges[0] &&
                  products[selectedProductIndex].node.images.edges[0].node ? (
                    <div className="img">
                      <Image
                        src={products[selectedProductIndex].node.images.edges[0].node.originalSrc}
                        alt={products[selectedProductIndex].node.images.edges[0].node.altText}
                      />
                    </div>
                  ) : null}
                  <div className="rating">
                    <div>
                      <span>Product</span>
                      <h5>{props.title}</h5>
                    </div>
                    <div className="desktop_rating">
                      <span>Rate This Product</span>
                      <div className="rate_icon">
                        <ReactStars
                          count={5}
                          size={18}
                          color2={'#EE7727'}
                          half={false}
                          onChange={handleRatingChange}
                          value={userRating}
                        />
                      </div>
                      {userRatingError ? <div className="error_text">Please enter your rating.</div> : null}
                    </div>
                  </div>
                  <div className="mobile_rating">
                    <div>
                      <span>Rate This Product</span>
                      <div className="rate_icon">
                        <ReactStars
                          count={5}
                          size={14}
                          color2={'#EE7727'}
                          half={false}
                          onChange={handleRatingChange}
                          value={userRating}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group_form">
                  <div className="tc_6">
                    <div className="review_select">
                      {selectedVariant && getSizeAndColor(selectedVariant) && getSizeAndColor(selectedVariant)[1] ? (
                        <div className="select_color" onClick={() => toggleOpenColor()}>
                          <p>
                            Colour <span>- {getSizeAndColor(selectedVariant)[1]}</span>
                          </p>
                          <div
                            className="color_round"
                            style={{
                              backgroundImage: `url(https://cdn.shopify.com/s/files/1/1953/2845/t/95/assets/${getSizeAndColor(
                                selectedVariant,
                              )[1].replace(' ', '-')}_15x.png?v=)`,
                            }}
                          ></div>

                          <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M1.1875 1.49463L5.6875 5.99463L10.1875 1.49463"
                              stroke="black"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      ) : null}
                      {openColor ? (
                        <div className="review_color-list">
                          <h2 className="tt">Select colour</h2>
                          <ul>
                            {products &&
                              products.map((product, index) => {
                                if (product) {
                                  let color = '';
                                  if (
                                    product.node &&
                                    product.node.variants &&
                                    product.node.variants.edges &&
                                    product.node.variants.edges[0] &&
                                    product.node.variants.edges[0].node &&
                                    product.node.variants.edges[0].node.selectedOptions
                                  ) {
                                    for (let option of product.node.variants.edges[0].node.selectedOptions) {
                                      if (option.name === 'Color') {
                                        color = option.value;
                                      }
                                    }
                                  }
                                  return (
                                    <li
                                      key={index}
                                      onClick={() => {
                                        selectColor(
                                          product &&
                                            product.node &&
                                            product.node.variants &&
                                            product.node.variants.edges &&
                                            product.node.variants.edges[0] &&
                                            product.node.variants.edges &&
                                            product.node.variants.edges[0].node,
                                          index,
                                        );
                                      }}
                                    >
                                      <div
                                        className="colors"
                                        style={{
                                          backgroundImage: `url(https://cdn.shopify.com/s/files/1/1953/2845/t/95/assets/${color.replace(
                                            ' ',
                                            '-',
                                          )}_15x.png?v=)`,
                                        }}
                                      ></div>
                                      <span> - {color}</span>
                                    </li>
                                  );
                                }
                              })}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="tc_6">
                    <div className="review_select">
                      {selectedVariant && getSizeAndColor(selectedVariant) && getSizeAndColor(selectedVariant)[0] ? (
                        <div className="select_size" onClick={() => toggleOpenSize()}>
                          <p>
                            Size <span>- {getSizeAndColor(selectedVariant)[0]}</span>
                          </p>
                          <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M1.1875 1.49463L5.6875 5.99463L10.1875 1.49463"
                              stroke="black"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      ) : null}
                      {openSize ? (
                        <div className="review_color-list">
                          <h2 className="tt">Select size</h2>
                          <ul>
                            {products &&
                              products[selectedProductIndex] &&
                              products[selectedProductIndex].node &&
                              products[selectedProductIndex].node.variants &&
                              products[selectedProductIndex].node.variants.edges.map((variant, index) => {
                                if (variant) {
                                  let size = '';
                                  if (variant.node && variant.node.selectedOptions) {
                                    for (let option of variant.node.selectedOptions) {
                                      if (option.name === 'Size') {
                                        size = option.value;
                                      }
                                    }
                                  }
                                  return (
                                    <li
                                      key={index}
                                      onClick={() => {
                                        selectSize(variant.node, index);
                                      }}
                                    >
                                      <span>{size}</span>
                                    </li>
                                  );
                                }
                              })}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="tc_12">
                    <label htmlFor="review_text">Review:</label>
                    <textarea
                      className={userReviewError ? 'error' : ''}
                      onChange={handleReviewChange}
                      id="review_text"
                      cols="30"
                      rows="3"
                      placeholder="Write your review here"
                    ></textarea>
                    {userReviewError ? (
                      <span className="error_text">Review must be at least 10 characters.</span>
                    ) : null}
                  </div>
                  <div className="tc_6">
                    <label htmlFor="name">name</label>
                    <input
                      className={userNameError ? 'error' : ''}
                      onChange={handleNameChange}
                      type="text"
                      id="name"
                      placeholder="Name"
                    />
                    {userNameError ? <span className="error_text">Please enter your name.</span> : null}
                  </div>
                  <div className="tc_6">
                    <label htmlFor="email">email</label>
                    <input
                      className={userEmailError ? 'error' : ''}
                      onChange={handleEmailChange}
                      type="email"
                      id="email"
                      placeholder="Email address"
                    />
                    {userEmailError ? <span className="error_text">Please enter a valid email address.</span> : null}
                  </div>
                </div>
                {/* <div className="upload_img">
                                    <h5>Upload Photos</h5>
                                    <div className="img_list">
                                        <div>
                                            <img src="https://cdn.shopify.com/s/files/1/1953/2845/files/2-18-037E-2-362.png?v=1596417001" alt="" />
                                        </div>
                                        <div>
                                            <img src="https://cdn.shopify.com/s/files/1/1953/2845/files/2-18-037E-2-362.png?v=1596417001" alt="" />
                                        </div>
                                        <div>
                                            <img src="https://cdn.shopify.com/s/files/1/1953/2845/files/2-18-037E-2-362.png?v=1596417001" alt="" />
                                        </div>
                                    </div>
                                    <div className="btn-file">
                                        <label htmlFor="file">Upload Photos</label>
                                        <span>Choose file</span>
                                        <input type="file" id="file" />
                                    </div>
                                    <p>Add up to 3 photos; 5 MB maximum per image.</p>
                                </div> */}
                <div className="form_btns">
                  <input type="submit" value="Submit Review" />
                  <button className="close_btn" onClick={() => setIsWriteOpen(false)}>
                    Close
                  </button>
                </div>
                {writeReviewSuccess ? (
                  <div className="form_success">
                    <div className="thankyou_text">Thank you for your review!</div>
                    <button className="close_btn" onClick={() => setWriteReviewSuccess(false)}>
                      Close
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        ) : null}
        <div className="review_posts">
          {data &&
            data.reviews &&
            data.reviews.data &&
            data.reviews.data.map((review, index) => {
              if (review) {
                return (
                  <div key={index}>
                    <div className="post_list">
                      <div className="img_title">
                        <div className="user_img">
                          <div className="default_img">
                            <div className="circle"></div>
                            <div className="avatar_check">
                              <svg
                                width="9"
                                height="6"
                                viewBox="0 0 9 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.802734 3.02636L3.06629 5.28991L7.69629 0.659912"
                                  stroke="white"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="user_detail">
                          <h1 className="tt">
                            {review.reviewer && review.reviewer.first_name}{' '}
                            {review.reviewer && review.reviewer.last_name}
                          </h1>
                          <span className="verify">
                            Verified Buyer: {review.reviewer && review.reviewer.verified_buyer}
                          </span>
                          <ReactStars
                            count={5}
                            size={18}
                            color2={'#EE7727'}
                            half={true}
                            edit={false}
                            value={review.rating}
                          />
                        </div>
                      </div>
                      <div className="detail">
                        <p>{review.review}</p>
                        <div className="img_list">
                          {review.images &&
                            Array.isArray(review.images) &&
                            review.images.map((image, index) => {
                              <div key={index}>
                                <Image src={image} alt="User uploaded product review photo" />
                              </div>;
                            })}
                        </div>
                        <span className="date">Posted {review.timeago}</span>
                      </div>
                    </div>
                    {review.replies &&
                      review.replies.map((reply, i) => {
                        return (
                          <div key={i} className="post_list reply">
                            <div className="reply_icon">
                              <svg
                                width="23"
                                height="28"
                                viewBox="0 0 23 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M1.375 0.974365V20.9744H21.375" stroke="#6F788F" />
                                <path d="M15.125 14.7244L21.375 20.9744L15.125 27.2244" stroke="#6F788F" />
                              </svg>
                              <span>reply</span>
                            </div>
                            <div className="img_title">
                              <div className="user_img">
                                <div className="img">
                                  <Image src={data.store && data.store.logo} alt="Gobi Cashmere" />
                                </div>
                              </div>
                              <div className="user_detail">
                                <h1 className="tt">{data.store && data.store.name}</h1>
                              </div>
                            </div>
                            <div className="detail">
                              <p>{reply.comments}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              }
            })}
        </div>
        {data && data.reviews.data && data.reviews.data.length > itemsPerPage ? (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={data && data.reviews && data.reviews.total}
            pageRangeDisplayed={10}
            onChange={handlePageChange}
            innerClass="review_pagination"
            itemClass="pagi_item"
            prevPageText="prev"
            firstPageText="first"
            lastPageText="last"
            nextPageText="next"
            linkClass="pagi_link"
            activeLinkClass="pagi_active"
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductReview;
