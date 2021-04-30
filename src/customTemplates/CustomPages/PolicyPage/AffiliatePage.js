import React, { useEffect } from 'react';
import './PolicyPage.scss';

export default (function AffiliatePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="return-policy-section">
      <div className="policy-head-title">
        <div className="affiliate_h1">
          <h1>Join us</h1>
        </div>
      </div>
      <div className="affiliate-body">
        <span className="affiliate_text">
          Gobi Cashmere first established in 1981 employing over 2000 with over 72% female workers. One of the largest
          vertically integrated cashmere company with 51 franchise stores operating in 37 cities in 12 countries. We
          have online stores through our website www.gobicashmere.com to USA, Canada, Germany, Russia, China, UK,
          France, Sweden, Norway, Poland, Ukraine, Belarus, Australia, Austria and Khazakstan. We offer womens, mens
          clothing, accessories and home-cashmere high quality products straight from Mongolia.
        </span>

        <img
          src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Rectangle_205.png?v=1614755669"
          alt="GOBI GERMANY"
        />
        <div className="affiliate_text_footer_title">
          <span className="affiliate_text_footer">
            Commission 20%+ every order (last click)
            <br /> Average order value 200$+ <br />
            Superb promotions, sales, holiday deals, coupons
            <br /> Requestable creatives, banners, videos
            <br /> Cooperative, friendly staff and team members
          </span>

          <h2>Join us on</h2>
          <p>
            Shareasale: Merchant ID 94633 (USA market only)
            <br /> Rakuten Advertising: Merchant ID:46387 (Germany market only)
          </p>
        </div>
      </div>
    </div>
  );
});
