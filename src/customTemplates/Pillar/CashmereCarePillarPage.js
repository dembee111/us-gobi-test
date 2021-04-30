import React, { Component } from 'react';
import './GobiCashmerePillarPage.scss';
import { Link } from 'react-scroll';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import SocialWidget from './SocialWidget';
import { Sticky, StickyContainer } from 'react-sticky';

export default class CashmereCarePillarPage extends Component {
  render() {
    return (
      <div className="rte">
        <Header activeLink="cashmere-care" />
        <div className="pilla_slider">
          <div
            className="sl_back"
            style={{
              backgroundImage:
                'url(https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_3_b1ea4079-6e85-4aa4-b47b-485508932598.png?v=1584588670)',
            }}
          >
            <div className="top_center">
              <h1>Cashmere Care</h1>
              <p>
                Taking care of your cashmere garments is easier than you think. Follow the guide and keep your cashmere
                for the years to come.
              </p>
            </div>
          </div>
        </div>
        <StickyContainer className="pillar-container">
          <Sticky relative={true}>
            {() => (
              <div className="sidebar-bg">
                <div className="pilla_sidebar">
                  <div className="custom_scroll_line" />
                  <div className="tt">
                    <div className="svg">
                      <svg width={47} height={47} viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24.4019" cy="24.2551" r="23.5" stroke="#DFE2E3" />
                        <path d="M12.8724 17.2551H35.9313" stroke="#6D6D6D" strokeWidth={2} />
                        <path d="M12.8724 24.2551H35.9313" stroke="#6D6D6D" strokeWidth={2} />
                        <path d="M12.8724 31.2551H35.9313" stroke="#6D6D6D" strokeWidth={2} />
                      </svg>
                    </div>
                    <h2>FEATURED ARTICLES</h2>
                  </div>
                  <div className="sidebar">
                    <div className="inner-wrapper-sticky" style={{ opacity: 1, transition: 'all 0.1s ease 0s' }}>
                      <div className="scroll-line" />
                      <nav className="cus_nav">
                        <ul className="side_lists">
                          <li className="pilla_side_link active">
                            <Link className="smscroll" to="dry-cleaning" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              1. Dry Cleaning
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="handwashing" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              2. Handwashing
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="machine-washing" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              3. Machine washing
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="ironing" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              4. Ironing
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="storing" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              5. Storing
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Sticky>

          <div className="pilla_main">
            <SocialWidget />
            <section id="dry-cleaning">
              <div className="sec_tt">
                <div className="top">
                  <span>1</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>DRY CLEANING</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    Dry cleaning cashmere is the best way to preserve and keep your cashmere clean. It is ideal to dry
                    clean your cashmere every two or three months after regular use. We recommend this as our first
                    choice for when cashmere is taken care of properly, it gets even more softer and lustrous.
                  </p>
                </div>
              </div>
            </section>
            <section id="handwashing">
              <div className="sec_tt">
                <div className="top">
                  <span>2</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>HANDWASHING</h1>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_15.png?v=1584611940"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>Cashmere hand washing guide</p>
                  </div>
                </div>
                <div className="text" style={{ marginBottom: '30px' }}>
                  <p>
                    How do you hand wash cashmere? Handwashing cashmere is the second-best way to care for your product.
                    By using this method, you can save by avoiding dry cleaning fees and when done properly, your
                    favorite cashmere can last longer and age better.
                  </p>
                </div>
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_16.png?v=1584612117"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>Step-by-step guide on handwashing cashmere.</p>
                  </div>
                </div>
                <div className="text">
                  <p>
                    Follow these easy steps to{' '}
                    <a href="https://www.gobicashmere.com/us/pages/cashmere-care">washing your cashmere by hand.</a>
                  </p>
                </div>
                <div className="list">
                  <ul>
                    <li>1. The temperature of the water should be between 20°C - 25°C (warm water).</li>
                    <li>
                      2. For a single sweater, 4-5 liters of water is recommended. Washing cashmere in too little water
                      will damage the product.
                    </li>
                    <li>3. Add detergent or cashmere soap in water and swirl to disperse the soap evenly.</li>
                    <li>4. Place the cashmere in the water for five minutes until soaked.</li>
                    <li>5. Gently squeeze the cashmere with soapy water.</li>
                    <li>6. Do not wring or rub the cashmere while handwashing.</li>
                    <li>7. Carefully squeeze the cashmere without wringing the water out. </li>
                    <li>8. Rinse thoroughly but carefully in clean lukewarm water.</li>
                    <li>
                      9. Lay the item flat in its natural shape on a thick drying rack or a towel to prevent the
                      cashmere from wrinkling and losing its shape and elasticity.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <section id="machine-washing">
              <div className="sec_tt">
                <div className="top">
                  <span>3</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>MACHINE WASHING</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    Can you wash cashmere in the washing machine? This is the most frequently asked question by GOBI
                    customers. Yes, you may wash cashmere in the washing machine, however, it is never suggested by
                    experts due to washing machine cycles being too harsh on the fiber resulting in the cashmere being
                    stretched and losing its form. Machine washing cashmere should always be your last resort. So if
                    that is where you stand, here is how to wash your cashmere in the washing machine.
                  </p>
                </div>
                <div className="list">
                  <ul>
                    <li>1. Put your washing machine cycle on “Gentle”.</li>
                    <li>2. Put the cashmere product in a mesh-washing bag.</li>
                    <li>3. Use detergent for delicate fabrics. Cashmere shampoo is recommended.</li>
                    <li>
                      4. If the machine setting can only be set on hot water or cold water, choose cold water for both
                      washing and rinsing cycles. If the water temperature settings are available, 20° Celsius (70°
                      Fahrenheit) is recommended.
                    </li>
                    <li>
                      5. Lay the item flat in its natural shape on a thick drying rack or a towel to prevent the
                      cashmere from wrinkling and losing its shape and elasticity.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="content">
                <div className="img med">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_17.png?v=1584612565"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>A cashmere washing machine at Gobi.</p>
                  </div>
                </div>
              </div>
            </section>
            <section id="ironing">
              <div className="sec_tt">
                <div className="top">
                  <span>4</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>IRONING</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    How to iron cashmere? Ironing cashmere is not like other fabrics. Cashmere itself is very sensitive
                    when compared to other materials, so don’t iron your cashmere like you are ironing cotton.
                  </p>
                </div>
                <div className="text">
                  <p>There are two main ways of ironing cashmere:</p>
                </div>
                <div className="list">
                  <ul>
                    <li>• Steam ironing is the best recommended way to iron cashmere.</li>
                    <li>
                      • Soleplate irons are not recommended. However, if there is no steam iron around, try dampening a
                      towel and iron the cashmere from the inside out.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <section id="storing">
              <div className="sec_tt">
                <div className="top">
                  <span>5</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>Storing</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    Storing cashmere is the most important part of cashmere care because sometimes you just don’t get
                    the chance to wear cashmere every day. In order to keep your cashmere nice and fresh whenever you
                    need them, you need the correct storing method.
                  </p>
                  <p>
                    Storing your cashmere inside your closet wardrobe for a long time is a bad idea for moths and other
                    insects could easily eat through cashmere and create holes in your loved garment. If you do store it
                    inside a wardrobe or a drawer, neatly fold it and place it inside a mesh bag in order for it to
                    breathe and keep your cashmere in shape. Always place a nontoxic insect deterrent beside your
                    cashmere, such as a cedar wood ball to keep the moths away.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_18.png?v=1584613018"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>A mesh bag perfect for storing cashmere.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </StickyContainer>
      </div>
    );
  }
}
