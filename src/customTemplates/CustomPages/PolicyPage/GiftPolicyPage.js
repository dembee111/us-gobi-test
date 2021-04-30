import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import './PolicyPage.scss';
import PolicyHeader from './PolicyHeader';

export default (function GiftPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="return-policy-section">
      <PolicyHeader />
      <div className="container-fluid-policy">
        <div className="policy-head-title">
          <h1>Gift Policy</h1>
        </div>
        <div className="section-body">
          <p>
            From time to time we run “Free Gift” offers and promotions when you purchase qualifying items or place a
            qualifying order. These are the terms and conditions that govern those promotions:
          </p>
          <ul>
            <li>The free gift cannot be substituted for any other item, cash or credit.</li>
            <li>This offer is only available on orders placed here on our website, www.gobicashmere.com/us</li>
            <li>
              The&nbsp;free gift offer may not be used in conjunction with any other offer or promotion that we run on
              our website, unless otherwise stated.
            </li>
            <li>The free gift will be dispatched with the relevant items from your qualifying order.</li>
            <li>
              If a customer wishes to return an order that included a free gift, please be sure to include the gift with
              your return or your refund will be adjusted to deduct the retail value of the gift.
            </li>
            <li>This promotion or offer is valid within the dates as stated on the relevant page.</li>
            <li>In the event of any dispute, the decision of Gobi Cashmere is final.</li>
            <li>
              We reserve the right to amend these terms and conditions at any time. If we do this we will publish the
              amended terms and conditions on this page.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
