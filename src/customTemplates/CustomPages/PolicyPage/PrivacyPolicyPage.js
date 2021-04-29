/* eslint react/no-unescaped-entities: off */
import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import './PolicyPage.scss';
import PolicyHeader from './PolicyHeader';

export default (function PrivacyPolicyPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="return-policy-section">
      <PolicyHeader />
      <div className="container-fluid-policy">
        <div className="policy-head-title">
          <h1>Privacy Policy</h1>
        </div>
        <div className="section-body">
          <p>
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit or
            make a purchase from gobicashmere.com/us (the “Site”).
          </p>

          <h2>Personal information we collect</h2>
          <p>
            When you visit the Site, we automatically collect certain information about your device, including
            information about your web browser, IP address, time zone, and some of the cookies that are installed on
            your device. Additionally, as you browse the Site, we collect information about the individual web pages or
            products that you view, what websites or search terms referred you to the Site, and information about how
            you interact with the Site. We refer to this automatically-collected information as “Device Information”.
          </p>

          <p>
            We collect Device Information using the following technologies: - “Cookies” are data files that are placed
            on your device or computer and often include an anonymous unique identifier. For more information about
            cookies, and how to disable cookies, visit http://www.allaboutcookies.org. - “Log files” track actions
            occurring on the Site, and collect data including your IP address, browser type, Internet service provider,
            referring/exit pages, and date/time stamps. - “Web beacons”, “tags”, and “pixels” are electronic files used
            to record information about how you browse the Site.
          </p>

          <p>
            Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain
            information from you, including your name, billing address, shipping address, payment information (including
            credit card numbers [[
          </p>
          <p>
            VISA, MASTERCARD, APPLE PAY, GOOGLE PAY, SHOPIFY PAY]]), email address, and phone number. We refer to this
            information as “Order Information”.
          </p>

          <p>
            When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device
            Information and Order Information.
          </p>

          <h2>How do we use your personal information? </h2>

          <p>
            We use the Order Information that we collect generally to fulfill any orders placed through the Site
            (including processing your payment information, arranging for shipping, and providing you with invoices
            and/or order confirmations). Additionally, we use this Order Information to:<br></br>- Communicate with you;{' '}
            <br></br>- Screen our orders for potential risk or fraud; and <br></br>- When in line with the preferences
            you have shared with us, provide you with information or advertising relating to our products or services.
          </p>

          <p>
            We use the Device Information that we collect to help us screen for potential risk and fraud (in particular,
            your IP address), and more generally to improve and optimize our Site (for example, by generating analytics
            about how our customers browse and interact with the Site, and to assess the success of our marketing and
            advertising campaigns).
          </p>

          <h2>Sharing your personal Information</h2>
          <p>
            We share your Personal Information with third parties to help us use your Personal Information, as described
            above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your
            Personal Information here: https://www.shopify.com/legal/privacy. We also use Google Analytics to help us
            understand how our customers use the Site -- you can read more about how Google uses your Personal
            Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics
            here: https://tools.google.com/dlpage/gaoptout.
          </p>

          <p>
            Finally, we may also share your Personal Information to comply with applicable laws and regulations, to
            respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise
            protect our rights.
          </p>

          <h2>Behavioural advertising </h2>
          <p>
            As described above, we use your Personal Information to provide you with targeted advertisements or
            marketing communications we believe may be of interest to you. For more information about how targeted
            advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at
            http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
          </p>

          <p>
            You can opt out of targeted advertising by using the links below: <br></br>- Facebook:
            https://www.facebook.com/settings/?tab=ads <br></br>- Google: https://www.google.com/settings/ads/anonymous{' '}
            <br></br>- Bing: https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
          </p>

          <p>
            Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s
            opt-out portal at: http://optout.aboutads.info/.
          </p>

          <h2>Rakuten Marketing</h2>
          <p>
            We use Rakuten Marketing to analyze your behavior, determine with precision your interests so we can provide
            you with relevant advertisements. For more information on how Rakuten Marketing uses your data, please refer
            to:{' '}
            <a href="https://rakutenmarketing.com/en-uk/legal-notices/website-privacy-policy">
              https://rakutenmarketing.com/en-uk/legal-notices/website-privacy-policy
            </a>
            .
          </p>

          <p>
            <h2>Do not track </h2>
          </p>
          <p>
            Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track
            signal from your browser.{' '}
          </p>

          <p>
            <h2>Your rights </h2>
          </p>
          <p>
            If you are a European resident, you have the right to access personal information we hold about you and to
            ask that your personal information be corrected, updated, or deleted. If you would like to exercise this
            right, please contact us through the contact information below.
          </p>

          <p>
            Additionally, if you are a European resident we note that we are processing your information in order to
            fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise
            to pursue our legitimate business interests listed above. Additionally, please note that your information
            will be transferred outside of Europe, including to Canada and the United States.
          </p>

          <h2>Data retention </h2>
          <p>
            When you place an order through the Site, we will maintain your Order Information for our records unless and
            until you ask us to delete this information.{' '}
          </p>

          <h2>Changes </h2>
          <p>
            We may update this privacy policy from time to time in order to reflect, for example, changes to our
            practices or for other operational, legal or regulatory reasons.
          </p>

          <h2>Minors </h2>
          <p>The Site is not intended for individuals under the age of [[18]] .</p>

          <h2>Contact us</h2>

          <p>
            For more information about our privacy practices, if you have questions, or if you would like to make a
            complaint, please contact us by e‑mail at gobiusoffice@gobi.mn or by mail using the details provided below:
          </p>

          <p>
            Gobi Cashmere USA <br></br>
            15605 Broadway Center St, Gardena, CA 90248, USA
          </p>
        </div>
      </div>
    </div>
  );
});
