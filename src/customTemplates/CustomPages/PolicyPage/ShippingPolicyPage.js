/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import './PolicyPage.scss';
import PolicyHeader from './PolicyHeader';

export default (function ShippingPolicyPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="return-policy-section">
      <PolicyHeader />
      <div className="container-fluid-policy">
        <div className="policy-head-title">
          <h1>Shipping Policy</h1>
        </div>
        <div className="section-body">
          <h2 className="first-h">Order Processing:</h2>
          <p>
            Upon ordering, orders will be processed and will be shipped out between 1-2 business days (Monday-Friday).
            Upon processing, the delivery of the product will depend on the shipping option and courier service of
            choosing
          </p>
          <p>
            Notice: Due to Covid-19 situation, delivery of products may be delayed depending on the courier service of
            choosing. Our team is working hard to deliver products on time.
          </p>
          {/* <p>Normal order processing can take between 1-3 business days (Monday – Friday).</p> */}
          <h2>Shipping Delivery</h2>

          <table>
            <tbody>
              <tr>
                <td>
                  <p>
                    <strong>Shipping Service</strong>
                  </p>
                </td>
                <td>
                  <p>
                    <strong>Delivery Timeline</strong>
                  </p>
                </td>
                <td>
                  <p>
                    <strong>Price</strong>
                  </p>
                </td>
                <td>
                  <p>
                    <strong>Description</strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>USPS</p>
                  <p>
                    <a href="https://www.usps.com/ship/priority-mail.htm">Priority Mail</a>
                  </p>
                </td>
                <td>
                  <p>1-3 business days</p>
                </td>
                <td>
                  <p>$7.90-$19.95</p>
                </td>
                <td>
                  <p>Ship orders within the U.S.</p>
                </td>
                <td>
                  <p>The fastest way to ship orders within the U.S.</p>
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            You can track your order by <a href="https://m.usps.com/m/TrackConfirmAction">clicking here.</a>
          </p>
          <h2>Customs and regulations:</h2>
          <p>
            Shipping cost to a destination outside of USA may include customs tax depending on the country's laws and
            regulations. These fees shall be handled by the customers and the company will not be responsible for
            customs and duty taxes.
          </p>
          <h2>Standard Ground:</h2>
          <p>
            Orders delivered within the 48 contiguous states should arrive in 5– 7 business days depending on delivery
            location. Orders shipped to Alaska and Hawaii will take an additional 2 – 5 days for delivery and are
            subject to an additional $15 delivery fee.
          </p>
          <p>
            <strong>2-Day Shipping:&nbsp;</strong>We offer USPS Priority Mail shipping for $7.90 to $19.95 depending on
            the size of your order. Deliveries will be made by 8 p.m. in 2 business days to most U.S. addresses.
            Disclaimer: USPS Priority Mail will be delivered within 2 business days however delay may occur due to force
            major.&nbsp;
          </p>
          <p>
            <strong>Overnight Shipping:&nbsp;</strong>We offer<strong>&nbsp;</strong>USPS Express shipping to be
            delivered on the next business day. Shipping fee will be determined by your order. Deliveries will be made
            by 8:00 p.m. on the next business day to most U.S. addresses.
          </p>
          <p>
            *All orders will be shipped within 48 hours of the order date, Monday through Friday, excluding Federal
            holidays. For expedited shipping, orders must be made before 2:00 p.m. PST. We are unable to ship to P.O.
            boxes or third party shipping services.&nbsp; Gobi Cashmere USA is not responsible for delays due to
            weather.
          </p>
          <p>&nbsp;</p>
          <h2>What is the "Oversized Shipping" charge?</h2>
          <p>
            For some items shipping within the U.S. an incremental shipping charge may be incurred due to an item’s size
            and weight. The incremental charge is charged for total quantity ordered. Note: The incremental charge, if
            applicable, is displayed on product detail pages and throughout checkout.
          </p>
          <h2>Shipping Promotion Exclusions</h2>
          <p>
            The following items are excluded from shipping promotions: Oversized Shipping Charges, Gift Cards, Custom
            Invitations, Custom Canvas and Photo Center purchases.
          </p>
          <h2>Signature Confirmation</h2>
          <p>
            Some orders may require a signature at time of delivery. If signature is required, carrier will make three
            delivery attempts, excluding weekends and holidays. Carrier will not deliver unless they acquire a
            signature.
          </p>
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
  );
});
