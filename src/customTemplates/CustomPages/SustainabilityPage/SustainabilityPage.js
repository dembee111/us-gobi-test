import React, { useEffect } from 'react';
import './SustainabilityPage.scss';
import MetaTags from 'react-meta-tags';

export default (function CashmereCarePage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <MetaTags key={0}>
        <title>Sustainable from the roots – Gobi Cashmere</title>
        <meta property="og:title" content="Sustainable from the roots" />
        <meta property="og:url" content={typeof window !== `undefined` && window.location.href} />
        <meta property="og:type" content="website" />
      </MetaTags>
      <div style={{ overflow: 'hidden' }}>
        <section
          id="slider"
          style={{
            backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0273/5298/9833/files/a7.jpg?v=1580272290)',
          }}
        >
          <div className="text_overlay">
            <div className="text">
              <h1 className="tt">Sustainable from the roots</h1>
              <p>
                Sustainable from the roots Nature. Harmony. Preservation. These are the essential values of Mongolian
                herders who have been living in the vast steppe for thousands of years and creating a unique tradition
                of Mongolian nomads. Inspired by such vision, Gobi corporation looked to combine traditional heritage
                with modern sustainable initiatives.
              </p>
            </div>
          </div>
          <a href="#bottom-container" className="click_bottom">
            <div>
              <span></span>
            </div>
          </a>
        </section>
        <div className="bodyContainer">
          <p>
            Gobi corporation is a member the Sustainable Fibre Alliance, a non-profit international organisation working
            with the extended cashmere value chain, from herders to retailers. Founded in 2015, SFA provides an
            independent, non-competitive platform that enables end-to-end cashmere value chain, non-government and
            government organisations to come together with a common interest in ensuring sustainability in the cashmere
            industry.
          </p>
          <p>
            The SFA’s overall aim is that internationally traded cashmere is produced, processed and marketed using
            sustainable practices, resulting in a reduced environmental footprint and equitable economic returns for
            participants throughout the value chain.
          </p>
          <div className="text-bold">
            <p>
              Our vision is that all cashmere is produced in an environmentally friendly way that safeguards the
              livelihoods of herding communities and protects the important, fragile environment in which they live.
            </p>
          </div>
          <div className="title-p">
            <h1>The Sustainable Fibre Alliance and its members have three clear goals:</h1>
          </div>

          <div className="threegrid">
            <div
              className="line"
              style={{
                backgroundImage:
                  'url(https://cdn.shopify.com/s/files/1/0273/5298/9833/files/Picture2.png?v=1580267955)',
              }}
            >
              <span className="tt">ENVIRONMENT </span>
              <span className="det">Environmental resilience in cashmere producing regions.</span>
            </div>
            <div
              className="line"
              style={{
                backgroundImage:
                  'url(https://cdn.shopify.com/s/files/1/0273/5298/9833/files/Picture3.png?v=1580267954)',
              }}
            >
              <span className="tt">COMMUNITY</span>
              <span className="det">
                Improved long-term prospects for herding communities that rely on cashmere markets.
              </span>
            </div>
            <div
              className="line"
              style={{
                backgroundImage:
                  'url(https://cdn.shopify.com/s/files/1/0273/5298/9833/files/Picture4.png?v=1580267954)',
              }}
            >
              <span className="tt">ANIMAL</span>
              <span className="det">Assurance on animal welfare within cashmere production. </span>
            </div>
          </div>

          <div className="detail">
            <h1 className="tt">Gobi corporation’s partnership with SFA:</h1>
            <h1 className="tt">Sustainable Cashmere Project</h1>
            <div className="text">
              <p>
                Gobi corporation-funded Sustainable Cashmere project aim to support sustainable cooperation to reduce
                and prevent rangeland degradation and protect wildlife in rural Mongolia. Through the comprehensive
                program that unites stakeholders in cashmere value chain, the project is improving the lives of herders
                and developing sustainable cashmere industry at two communities each in Dornogobi and Bayankhongor
                provinces. Sustainable Cashmere project is planned to be implemented from 2018 to 2021.
              </p>
            </div>
          </div>
        </div>
        <section
          id="backs"
          style={{
            backgroundImage: 'url(https://cdn.shopify.com/s/files/1/0273/5298/9833/files/a8.jpg?v=1580272316)',
          }}
        >
          <div className="mycontainer">
            <div className="back">
              <div className="det">
                Gobi corporation’s commitment to cashmere sustainability is a continuous effort and action supported by
                devoted organizations such as the SFA.
              </div>
            </div>
          </div>
        </section>
        <div className="mycontainer">
          <div className="detail">
            <h1 className="tt">More about the Sustainable</h1>
            <h1 className="tt">Cashmere Project</h1>
            <div className="text">
              <p>
                The action plan for the project consists of three interconnected packages, which will detail the
                training, capacity building and implementation stages, aimed achievements, the progress monitoring and
                the indicators for measuring improvement.
              </p>
            </div>
          </div>
        </div>

        <section id="three">
          <div className="mycontainer">
            <div className="detail">
              <h1 className="tt">Promote herders’ communities that</h1>
              <h1 className="tt">prepare sustainable cashmere</h1>
              <div className="gr3">
                <div className="line">
                  <div
                    className="img"
                    style={{
                      backgroundImage:
                        'url(https://cdn.shopify.com/s/files/1/0273/5298/9833/files/a3.jpg?v=1580271929)',
                    }}
                  ></div>
                  <div className="sm_tt">Promote sustainable animal husbandry</div>
                </div>
                <div className="line">
                  <div
                    className="img"
                    style={{
                      backgroundImage:
                        'url(https://cdn.shopify.com/s/files/1/0273/5298/9833/files/a1.jpg?v=1580271928)',
                    }}
                  ></div>
                  <div className="sm_tt">Improve cashmere/raw material quality</div>
                </div>
                <div className="line">
                  <div
                    className="img"
                    style={{
                      backgroundImage:
                        'url(https://cdn.shopify.com/s/files/1/0273/5298/9833/files/a2.jpg?v=1580271929)',
                    }}
                  ></div>
                  <div className="sm_tt">Strengthen community management</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mycontainer">
          <div className="box">
            <h1 className="tt">Meeting with local government administration and herders.</h1>
            <div className="img">
              <img
                src="https://cdn.shopify.com/s/files/1/0273/5298/9833/files/list1.png?v=1580267956"
                alt="Meeting with local government administration and herders."
              />
            </div>
          </div>

          <div className="box cus_grid">
            <h1 className="tt">Visit to herder Jigjidsuren’s campsite.</h1>
            <div className="grid">
              <div className="img">
                <img
                  src="https://cdn.shopify.com/s/files/1/0273/5298/9833/files/list2.png?v=1580267954"
                  alt="Visit to herder Jigjidsuren’s campsite."
                />
              </div>
              <div className="img">
                <img
                  src="https://cdn.shopify.com/s/files/1/0273/5298/9833/files/list3.png?v=1580267953"
                  alt="Visit to herder Jigjidsuren’s campsite."
                />
              </div>
            </div>
            <div className="img">
              <img
                src="https://cdn.shopify.com/s/files/1/0273/5298/9833/files/list4.png?v=1580267956"
                alt="Visit to herder Jigjidsuren’s campsite."
              />
            </div>
          </div>

          <div className="box cus_grid">
            <h1 className="tt">Visit to Enkhtur’s campsite /exemplary herder/</h1>
            <div className="grid">
              <div className="img">
                <img
                  src="https://cdn.shopify.com/s/files/1/0273/5298/9833/files/list6.png?v=1580267953"
                  alt="Visit to Enkhtur’s campsite /exemplary herder/"
                />
              </div>
              <div className="img">
                <img
                  src="https://cdn.shopify.com/s/files/1/0273/5298/9833/files/list7.png?v=1580267954"
                  alt="Visit to Enkhtur’s campsite /exemplary herder/"
                />
              </div>
            </div>
          </div>

          <div className="box cus_grid">
            <h1 className="tt">Visit to herder Sanjid’s campsite</h1>
            <div className="grid">
              <div className="img">
                <img
                  src="https://cdn.shopify.com/s/files/1/0273/5298/9833/files/list9.png?v=1580267953"
                  alt="Visit to herder Sanjid’s campsite"
                />
              </div>
              <div className="img">
                <img
                  src="https://cdn.shopify.com/s/files/1/0273/5298/9833/files/list10.png?v=1580267953"
                  alt="Visit to herder Sanjid’s campsite"
                />
              </div>
            </div>
          </div>
        </div>

        <section
          id="last_back"
          style={{
            backgroundImage:
              'url(https://cdn.shopify.com/s/files/1/1953/2845/files/IMG_20190315_125845ss.jpg?v=1580291265)',
          }}
        >
          <div className="mycontainer">
            <div className="back">
              <div className="det">
                While we value our traditional heritage and knowledge of our herders, we also aim to deliver knowledge
                on modern sustainable approaches through training programs.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});
