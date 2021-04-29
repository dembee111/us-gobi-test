import React from 'react';
import { Link } from 'gatsby';
import { Configure, connectHits } from 'react-instantsearch-dom';
import { connect } from 'react-redux';
const mapStateToProps = (state) => ({
  algoliaUserToken: state.algoliaUserToken,
});
const ProductHits = ({ hits }) => (
  <ul>
    <Configure hitsPerPage={4} />
    {hits.map((hit) => (
      <li key={hit.objectID}>
        <Link to={'/products/' + hit.handle} title={hit.title}>
          <div className="box">
            <div className="img">
              <img src={hit.product_image} alt={hit.title} />
            </div>
            <div className="det">
              <h1>{hit.title}</h1>
              {hit.compare_at_price != null && hit.compare_at_price > 0 && hit.compare_at_price != hit.price ? (
                <div className={'price on_sale'}>
                  <span className="current__price">{'$' + hit.compare_at_price}</span>
                  <span className="sale__price">{'$' + hit.price}</span>
                </div>
              ) : (
                <div className={'price'}>
                  <span className="current__price">{'$' + hit.price}</span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);

const CustomHits = connect(mapStateToProps)(connectHits(ProductHits));
export default CustomHits;
