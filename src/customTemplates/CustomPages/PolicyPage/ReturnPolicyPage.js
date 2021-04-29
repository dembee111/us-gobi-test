import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import './PolicyPage.scss';
import PolicyHeader from './PolicyHeader';

export default (function ReturnPolicyPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="return-policy-section">
      <PolicyHeader />
      <div className="container-fluid-policy">
        <div className="policy-head-title">
          <h1>Return Policy</h1>
        </div>
        <div className="section-body">
          <h2 className="first-h">Return Policy</h2>
          <ul>
            <li>
              Returns are eligible within 14 days, the return eligibility date will start once the customer receives the
              delivery
            </li>
            <li>
              In order to speed up the return and refund process, please follow our official return process. Returns
              that didn’t follow our official return process will take longer to be processed and refunded
            </li>
            <li>We offer free return in the United States only if it’s eligible</li>
            <li>Product sold at a deducted price during sale period cannot be returned</li>
            <li>Different sale promotion does not apply to one another</li>
            <li>
              Returns exceeding our return policy of 14 days will ONLY be entitled for exchange or for a store credit.
              Items will be exchanged, or store credit will be issued within 14 days after the eligible return date has
              passed. All delivery costs incurred in relation to the exchange or store credit being issued will be
              covered by the customer
            </li>
          </ul>
          <p>
            Notice : The return process may be extended due to Covid-19 situation and seasonal sale days (between 11th
            of November until 30th of November). In case of return process delay during this period contact us for
            further information.
          </p>
          <h2>Return Eligibility</h2>
          <ul>
            <li>
              Products must be returned undamaged in its original condition and packaging (includes tag). If the goods
              are returned worn, damaged or used (does not apply to trying on without causing any damage to the
              product), a refund is not possible
            </li>
            <li>
              Not qualified returns will be sent back to the customer and the delivery cost will be covered by the
              customer
            </li>
          </ul>

          <h2>Gift with Purchase</h2>
          <ul>
            <li>
              Returning an order that included a free gift? Please be sure to include the free gift with your return, or
              your refund will be adjusted to deduct the retail value of the gift.
            </li>
          </ul>

          <h2>Return Process</h2>

          <ol>
            <li>
              <strong>Visit our return portal (link below)</strong>
            </li>
            <li>
              <strong>Put in your order number and the email address you’ve used</strong>
            </li>
            <li>
              <strong>Select which product(s) you want to return and the reason for the return</strong>
            </li>
            <li>
              <strong>Select whether you want to exchange a product or for a money refund</strong>
            </li>
            <li>
              <strong>
                Print out the Label and place it on the shipping box (please make sure to remove any other labels and
                stickers from the box)
              </strong>
            </li>
            <li>
              <strong>Products are inspected, either approved or disapproved for return</strong>
            </li>
            <li>
              <strong>If approved, product will be exchanged and re-shipped within 14 working days</strong>
            </li>
            <li>
              <strong>
                If approved, refund will be made within 3 workings days to our financial intermediary (bank) and they
                will refund the money which will take on average 3 working days
              </strong>
            </li>
          </ol>
          <p>
            Return Portal: <a href="https://us.gobicashmere.com/a/returns">https://gobicashmere.com/us/a/returns</a>
          </p>

          <h2>Refunds</h2>
          <ul>
            <li>
              Once returned product is inspected and accepted, the full refund will be issued in the form of the
              original payment method customer has used to proceed the purchase.
            </li>
            <li>In case of a return of the complete order, the shipping cost (if charged) will be refunded as well.</li>
          </ul>
          <h2>Exchanges</h2>
          <ul>
            <li>
              If you would like to exchange one or more products, you can do so within 14 working days by indicating in
              the return portal what you would like in exchange.
            </li>
            <li>Once product has been exchanged it follows the same delivery process of as mentioned above</li>
          </ul>

          <h2>Prices & Expenses</h2>
          <ul>
            <li>The payment amount will reflect the price stated at the time of purchase on our website</li>
            <li>The prices quoted are final prices, that is, they include the respectively sales tax</li>
            <li>Order delivery process will start once payment has been fully accepted</li>
          </ul>

          <h2>Lost Parcel</h2>
          <ul>
            <li>In case of a lost parcel, Gobi Cashmere will conduct an investigation process to USPS.</li>
          </ul>
        </div>
      </div>
    </div>
  );
});
