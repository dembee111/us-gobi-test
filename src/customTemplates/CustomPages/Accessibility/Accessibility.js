import React, { useEffect } from 'react';
import './Accessibility.scss';

export default (function Accessibility(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="accessibility-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-body">
              <h1>Accessibility</h1>
              <p>
                Gobi Cashmere has an ongoing commitment to its customers around the world in providing an excellent
                costumer experience to all. As part of these efforts, we are committed to providing a website that is
                accessible to the widest possible audience, regardless of technology or ability. Gobi Cashmere is
                committed to aligning its website and its operations in substantial conformance with
                generally-recognized and accepted guidelines and/or standards for website accessibility (as these may
                change from time to time). To assist in these efforts, Gobi Cashmere has partnered with experienced
                internationally reputable consultants and is working to increase the accessibility and usability of our
                website.
              </p>
              <p>
                As these efforts are ongoing, if at any time you have any questions or if you encounter an accessibility
                issue, please contact our Customer Service team for assistance by phone at 1-2133256431 by email at
                gobiusoffice@gobi.mn. We will make all reasonable efforts to address your concerns. Thank you for
                choosing to shop with us!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
