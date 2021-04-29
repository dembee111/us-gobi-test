import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import capitalize from 'capitalize';
import MetaTags from 'react-meta-tags';
import { plusSizeList } from './PlusSizeData';
import './PlusSizePage.scss';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { renderLazyImage } from '../../../../components/shared/image';
const PlusSizePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <MetaTags key={0}>
        <title>Sustainable from the roots – Gobi Cashmere</title>
        <meta property="og:title" content="Sustainable from the roots" />
        <meta property="og:url" content={typeof window !== `undefined` && window.location.href} />
        <meta property="og:type" content="website" />
      </MetaTags>
      <section className="plusSize-page">
        <div className="plus-container">
          <div className="grid-col">
            {plusSizeList.map((list, index) => {
              return (
                <div className="grid-item" key={index}>
                  <Link to={list.handle}>
                    <div className="single-product">
                      <div className="img-box">
                        {renderLazyImage(
                          list.altText,
                          list.image.replace('.jpg', '_120x.jpg'),
                          list.image.replace('.jpg', '_600x.jpg'),
                        )}
                      </div>
                      <div className="single-product-detail">
                        <div className="title-box">
                          <div className="title">
                            <h1>{capitalize.words(list.title)}</h1>
                          </div>
                          <div className="colors">
                            <p>{list.color}</p>
                          </div>
                        </div>
                        <div className="price">
                          <p>{list.price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlusSizePage;
