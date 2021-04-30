import React, { Component } from 'react';
import './OurProductionPage.scss';
import MetaTags from 'react-meta-tags';

export default class OurProductionPage extends Component {
  render() {
    return (
      <div className="our-production-section">
        <MetaTags key={0}>
          <title>THIS IS HOW WE PRODUCE YOUR CASHMERE!</title>
          <meta property="og:title" content="THIS IS HOW WE PRODUCE YOUR CASHMERE!" />
          <meta property="og:type" content="website" />
        </MetaTags>
        <div className="section-head">
          <div className="section-title">
            <h1>THIS IS HOW WE PRODUCE YOUR CASHMERE!</h1>
          </div>
          <div className="section-video">
            <div className="video-sec">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/7AwQ73PHfro"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="">
            <div className="section-body">
              <h1>What differentiates Gobi cashmere production from others?</h1>
              <div className="section-desc">
                <p>
                  Our thousands of years of nomadic heritage and beautiful co-existing way of life gives us the most
                  humane and ethical method to harvest cashmere. As the biggest vertically integrated manufacturer of
                  Mongolia, Gobi values transparency and sustainability.
                </p>
                <p>
                  From the very first stage of harvesting, we monitor the whole process until the final stage of
                  garments. That includes the well-being of animals, fair trade between herders and eliminating the use
                  of middle-men.
                </p>
                <p>
                  {` Follow Bea's journey through the vast steppe of the Land of Cashmere, for a true experience of the
                  traditional heritage of Mongolia. `}
                </p>
              </div>
              <div className="row">
                <div className="col-6">
                  <div>
                    <img src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Mask_Group_1_c783b193-77e1-44e2-9140-736f2d5aa03a.png?v=1586861500" />
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <img src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Mask_Group_2_6af08807-9841-437a-8ddb-18ac4e0ace40.png?v=1586861512" />
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <img src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Mask_Group_3_cc352f34-4760-49d4-8763-b44a7482425f.png?v=1586861519" />
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <img src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Mask_Group_4.png?v=1586861525" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
