import React, { useEffect } from 'react';
import '../PolicyPage/PolicyPage.scss';

export default (function ImprintPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="return-policy-section">
      <div className="container">
        <div className="section-head">
          <h1>Imprint</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-body">
              <h1>Imprint</h1>
              <h2>Responsible for content</h2>
              <p>
                Gobi Cashmere Europe GmbH
                <br />
                Am Airport 1, Schonefeld
                <br />
                12529
                <br />
                Germany
                <br />
                Tel: +49 (0) 33 7934 189 32
                <br />
                E-Mail: support-1@gobicashmere.com
              </p>

              <p>
                Managing Director: Amarsaikhan Baatarsaikhan
                <br />
                Court of First Instance Cottbus
                <br />
                Register number HRB 12839 CB
                <br />
                VAT identification number according to §27a UStG
                <br />
                DE815655506
              </p>

              <h2>Legal notice</h2>
              <p>
                The EU Commission offers the possibility of online dispute settlement on an online platform operated by
                it.
                <br />
                This platform can be accessed via the external link http://ec.europa.eu/consumers/odr/.
                <br />
                We are not obligated or unwilling to participate in a dispute settlement procedure before a
                consumer-enforcement agency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
