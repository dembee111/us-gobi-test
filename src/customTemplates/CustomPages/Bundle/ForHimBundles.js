import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import './Bundle.scss';
import { bundlesList, herBundleList, himBundleList } from './bundleData';
import { connect } from 'react-redux';

function Bundles(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="bundle-page">
      <div className="tc-container">
        <div className="bundle-collection">
          <div className="b-title">
            <h1>For him bundle</h1>
          </div>
          <div className="b-grid-col">
            {himBundleList.map((bundle, index) => {
              return (
                <div key={index} className="b-col-item">
                  <Link to={'/bundles/' + bundle.handle}>
                    <div className="b-widget">
                      <div className="img-box">
                        <img src={bundle.image} alt={bundle.altText}></img>
                      </div>
                      <div className="detail-box">
                        <div className="p-title">
                          <h1>{bundle.title}</h1>
                        </div>
                        <div className="sale-title">
                          <p>
                            {"You're saving "}
                            {props.currency && props.currency.currencySymbol + ' ' + bundle.salePrice}
                          </p>
                        </div>
                        <div className="p-price">
                          <p>{props.currency && props.currency.currencySymbol + ' ' + bundle.price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default connect(mapStateToProps)(Bundles);
