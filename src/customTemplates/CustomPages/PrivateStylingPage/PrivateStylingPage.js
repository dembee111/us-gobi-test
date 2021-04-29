import React, { useEffect } from 'react';
import HubspotForm from 'react-hubspot-form';
import './PrivateStylingPage.scss';

const PrivateStylingPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="new-form">
      <div className="container">
        <div className="form">
          <div className="row">
            <div className="img desktop">
              <img
                src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/GOBI_Cashmere_PARIS-10Bzassan_f6a245f7-0d75-4447-b958-da7c65853662.jpg?v=1602811717"
                alt="Gobi Cashmere"
              />
            </div>
            <div className="content">
              <div className="text">
                <h2>{`DON’T MISS OUT ON ANYTHING`}</h2>
                <div className="text-second">
                  <p>{`Sign up to receive a $10 coupon and get inspiration, news and information before everyone else.`}</p>
                </div>
                <HubspotForm
                  portalId="5629226"
                  formId="d4d2c652-6952-4391-994c-926b618e0bef"
                  onSubmit={() => console.log('Submit!')}
                  onReady={() => console.log('Form ready!')}
                  loading={<div>Loading...</div>}
                />
              </div>
            </div>
            <div className="img mobile">
              <img
                src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/GOBI_Cashmere_PARIS-10Bzassan.jpg?v=1602810533"
                alt="Gobi Cashmere"
              />
            </div>
          </div>
        </div>
        <div className="form-footer">
          <div className="form-footer-social">
            <ul>
              <li>
                <a href="https://www.facebook.com/GobiCashmereUSOfficial/">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Group_801.png?v=1585644495"
                    alt="Gobi Cashmere"
                  ></img>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/gobicashmere.usa/">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Group_703.png?v=1585644467"
                    alt="Gobi Cashmere"
                  ></img>
                </a>
              </li>
              <li>
                <a href="https://www.pinterest.de/gobicashmereinternational/">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Group_800_830d9e4c-6c63-4adc-bf6e-9829926cab82.png?v=1590481858"
                    alt="Gobi Cashmere"
                  ></img>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCzUZQnPw4XdIw3_IHq6xywA">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Group_704.png?v=1585644495"
                    alt="Gobi Cashmere"
                  ></img>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PrivateStylingPage;
