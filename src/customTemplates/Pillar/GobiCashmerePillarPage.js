/* eslint react/no-unescaped-entities: off */
import React, { Component } from 'react';
import './GobiCashmerePillarPage.scss';
import PillarSide from './PillarSide';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import SocialWidget from './SocialWidget';
import { StickyContainer } from 'react-sticky';

export default class GobiCashmerePillarPage extends Component {
  render() {
    return (
      <div>
        <div id="shopify-section-page-pillar1-template" className="shopify-section">
          <div className="page-blocks">
            <div>
              <div>
                <div className="rte">
                  <Header activeLink="gobi-cashmere" />
                  <div className="pilla_slider">
                    <div
                      className="sl_back"
                      style={{
                        backgroundImage:
                          'url(https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_3_b1ea4079-6e85-4aa4-b47b-485508932598.png?v=1584588670)',
                      }}
                    >
                      <div className="top_center">
                        <h1>GOBI CASHMERE</h1>
                        <p>
                          Established in 1981, “Gobi” is Mongolia’s first cashmere manufacturer and one of the largest
                          vertically integrated cashmere producers in the world.
                        </p>
                      </div>
                    </div>
                  </div>
                  <StickyContainer className="pillar-container" id="containerSelecorFocus">
                    <div className="sidebar-bg">
                      <PillarSide />
                    </div>
                    <div className="pilla_main">
                      <SocialWidget />
                      <section id="our-story">
                        <div className="sec_tt">
                          <div className="top">
                            <span>1</span>
                            <h2>section</h2>
                            <ScrollToTop />
                          </div>
                          <div className="bottom">
                            <h1>OUR STORY</h1>
                          </div>
                        </div>
                        <div className="content">
                          <div className="img">
                            <img
                              src="https://cdn.shopify.com/s/files/1/1953/2845/files/dambadarjaa.jpg?v=1585118324"
                              alt="GOBI CASHMERE"
                            />
                            <div className="detail">
                              <p>Gobi’s management team meets with Japan’s ambassador to Mongolia, 1977</p>
                            </div>
                          </div>
                          <div className="text">
                            <p>
                              Established in 1981, “GOBI” is Mongolia’s first cashmere manufacturer and one of the
                              largest vertically integrated{' '}
                              <a href="https://www.gobicashmere.com/us/pages/our-history">cashmere</a> producers in the
                              world that produces 2.5 million products a year.
                            </p>
                            <p>
                              With a capacity to process 1100 tons of raw cashmere, GOBI manages its entire value chain
                              - from sourcing raw cashmere directly from nomadic herders to processing and manufacturing
                              cashmere products in their massive facilities in Ulaanbaatar, Mongolia.
                            </p>
                            <p>
                              GOBI blends innovation and creativity with the unexplored opportunities of cashmere to be
                              at the forefront of fashion design and style.
                            </p>
                            <p>
                              Over the last four decades, they have developed six different brand lines. GOBI, GOBI
                              ORGANIC, YAMA, GOYO, HERDERS and KID GOYO are all appreciated by our customers regardless
                              of season, occasion or location.
                            </p>
                          </div>
                        </div>
                      </section>
                      <section className="manufacturing">
                        <div className="sec_tt">
                          <div className="top">
                            <span>2</span>
                            <h2>section</h2>

                            <ScrollToTop />
                          </div>
                          <div className="bottom">
                            <h1>MANUFACTURING</h1>
                          </div>
                        </div>
                        <div className="content">
                          <div className="img">
                            <img
                              src="https://cdn.shopify.com/s/files/1/1953/2845/files/da2.png?v=1585115589"
                              alt="GOBI CASHMERE"
                            />
                            <div className="detail">
                              <p>Yarn spinning process in Gobi’s factory.</p>
                            </div>
                          </div>
                          <div className="text">
                            <p>
                              GOBI sources cashmere fiber with transparency by driving a vertically integrated
                              manufacturing system with no single process left unnoticed. The hand combing method
                              preserves Mongolian tradition and leads to a greater quality end-product for their
                              clients. GOBI respects “Fair Trade” practices by removing any unnecessary intermediaries
                              in{' '}
                              <a href="https://www.gobicashmere.com/us/pages/sustainability">the production process</a>.
                              This is done to preserve a fair payment for the herders. Every purchase made by our
                              beloved customers will not only be valued by the high quality of the product but also in
                              sustaining the Mongolian herding community directly. GOBI’s vision of the conscious
                              environment and sustainable value chain are the foundations for the finest cashmere in the
                              world.
                            </p>
                          </div>
                        </div>
                        <div className="content">
                          <h2 className="med_tt">FACTORY</h2>
                          <div className="img">
                            <img
                              src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_3.png?v=1584414790"
                              alt="GOBI CASHMERE"
                            />
                            <div className="detail">
                              <p>Gobi’s cashmere manufacturing factory.</p>
                            </div>
                          </div>
                          <div className="text">
                            <p>
                              GOBI's extensive line of products and collections are made with locally-sourced,
                              high-quality raw materials and processed using advanced technologies combined with years
                              of craftsmanship.
                            </p>
                            <p>
                              Starting from buying raw materials from herders to making a finished product, GOBI has
                              strict accordance with technological procedures while implementing a quality management
                              system aimed at the constant improvement of their manufacturing factories.
                            </p>
                            <p>
                              At GOBI, laboratories that test the finished end products follow the international ISO
                              9001:2015 Quality Management System Standard and the ISO/IEC 17025 standards. Moreover,
                              GOBI also implements the ISO 45001:2018 Occupational Health and Safety Management System
                              Standard and ISO 14001:2015 Environmental Management System Standard.
                            </p>
                          </div>
                        </div>
                        <div className="content">
                          <div className="img">
                            <img
                              src="https://cdn.shopify.com/s/files/1/1953/2845/files/da3.png?v=1585115589"
                              alt="GOBI CASHMERE"
                            />
                            <div className="detail">
                              <p>100% cashmere in an expansive collage of colors at Gobi.</p>
                            </div>
                          </div>
                          <div className="text">
                            {/* <p>GOBI strives to deliver the most exquisite and luxurious <a href="https://blog.gobicashmere.com/cashmere-guide-to-packing-for-a-ski-trip-for-her">experience in cashmere</a> both domestically and globally.</p> */}
                          </div>
                        </div>
                        <div className="content">
                          <div className="img">
                            <img
                              src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_6.png?v=1584414877"
                              alt="GOBI CASHMERE"
                            />
                            <div className="detail">
                              <p>Gobi’s pride of a large women workforce.</p>
                            </div>
                          </div>
                          <div className="text">
                            <p>
                              The work of 2,500 highly skilled employees on various production lines begin as soon as
                              the raw material is delivered to GOBI’s factory. As one of Mongolia’s exemplary companies
                              that is known to empower women in a workplace, GOBI puts equality as a key company value.
                              The workforce is comprised of 72% women whose craftsmanship have been the driving force
                              for every stage of the production and one of the reasons GOBI is as successful as it is.
                            </p>
                          </div>
                        </div>
                      </section>
                      <section className="sustainability">
                        <div className="sec_tt">
                          <div className="top">
                            <span>3</span>
                            <h2>section</h2>
                            <ScrollToTop />
                          </div>
                          <div className="bottom">
                            <h1>SUSTAINABILITY</h1>
                          </div>
                        </div>
                        <div className="content">
                          <div className="img">
                            <img
                              src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_19.png?v=1584613872"
                              alt="GOBI CASHMERE"
                            />
                            <div className="detail">
                              <p>Herd of cashmere goats and a visitor, Sergelen, Tuv aimag province, 2019.</p>
                            </div>
                          </div>
                          <div className="text">
                            <p>
                              Nature. Harmony. Preservation. These are the essential values of Mongolian herders who
                              have been living in the vast steppe for thousands of years and creating a unique tradition
                              of Mongolian nomads. Inspired by such vision, GOBI corporation looked to combine
                              traditional heritage with{' '}
                              <a href="https://www.gobicashmere.com/us/blogs/culture/the-die-hard-nomads">
                                modern sustainable initiatives.
                              </a>
                            </p>
                            <p>
                              GOBI corporation is a member of the Sustainable Fibre Alliance, a non-profit international
                              organization working with the extended cashmere value chain, from herders to retailers.
                              Founded in 2015, SFA provides an independent, non-competitive platform that enables
                              end-to-end cashmere value chain, non-government and government organizations to come
                              together with a common interest in ensuring sustainability in the cashmere industry.
                            </p>
                          </div>
                        </div>
                        <div className="content" style={{ marginTop: '60px' }}>
                          <h2 className="med_tt">The Sustainable Fibre Alliance and GOBI have three clear goals:</h2>
                          <div className="goal">
                            <div>
                              <div className="tt">
                                <span>ENVIRONMENT:</span>
                              </div>
                              <div className="det">
                                <p>Environmental resilience in cashmere producing regions.</p>
                              </div>
                            </div>
                            <div>
                              <div className="tt">
                                <span>COMMUNITY:</span>
                              </div>
                              <div className="det">
                                <p>
                                  Improved long-term prospects for herding communities that rely on cashmere markets.
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="tt">
                                <span>ANIMAL:</span>
                              </div>
                              <div className="det">
                                <p>Assurance on animal welfare within the varying stages of cashmere production.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content">
                          <h2 className="med_tt">GOBI’S PARTNERSHIP WITH SFA: SUSTAINABLE CASHMERE PROJECT</h2>
                          <div className="text">
                            <p>
                              The Gobi Corporation-funded “Sustainable Cashmere Project” aims to support sustainable
                              cooperation to reduce and prevent rangeland degradation and to protect wildlife in rural
                              Mongolia. Through the comprehensive program that unites stakeholders in the cashmere value
                              chain, the project is improving the lives of herders and developing sustainable cashmere
                              industry in the Dornogobi and Bayankhongor provinces. The “Sustainable Cashmere Project”
                              has been in effect since 2018.
                            </p>
                            <p>
                              GOBI’s commitment to cashmere sustainability is a continuous action and effort supported
                              by devoted organizations such as the SFA.
                            </p>
                          </div>
                        </div>
                      </section>
                      <section className="our-brand">
                        <div className="sec_tt">
                          <div className="top">
                            <span>4</span>
                            <h2>section</h2>
                            <ScrollToTop />
                          </div>
                          <div className="bottom">
                            <h1>Our brand</h1>
                          </div>
                        </div>
                        <div className="content">
                          <div className="text" style={{ marginBottom: '30px' }}>
                            <p>
                              Gobi Corporation is home to six unique brands and each of them have different elements and
                              characteristics designed to complement their increasingly diverse customers.
                            </p>
                          </div>
                          <div className="grid">
                            <div className="col_6">
                              <div className="logo">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/XMLID_4.png?v=1584419042"
                                  alt="GOBI"
                                />
                              </div>
                              <div className="det">
                                <p>
                                  GOBI is the premium cashmere brand that is affordable luxury{' '}
                                  <a href="https://www.gobicashmere.com/us/pillar/cashmere-is-for-everyone">
                                    for everyone
                                  </a>
                                  . It offers complete wardrobe solutions for all occasions and stands for enduring
                                  style and confidence. Designed for those who want to look effortlessly polished and
                                  feel their best.
                                </p>
                              </div>
                            </div>
                            <div className="col_6">
                              <div className="logo">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_227.png?v=1584615351"
                                  alt="YAMA"
                                />
                              </div>
                              <div className="det">
                                <p>
                                  Gobi has recently introduced the premium brand “YAMA” that celebrates beauty and
                                  elegance. Fine natural fibers meet Italian designs to create a trendy yet classic look
                                  using 100% Mongolian cashmere. The word “yama” means “goat” in Mongolian (which marks
                                  the origin of cashmere) while the Japanese definition is “mountain peak”, which
                                  symbolizes the top quality of our cashmere.
                                </p>
                              </div>
                            </div>
                            <div className="col_6">
                              <div className="logo">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_228.png?v=1584615357"
                                  alt="GOBI ORGANIC"
                                />
                              </div>
                              <div className="det">
                                <p>
                                  White, beige, warm grey, and brown are the naturally occurring shades in Mongolian
                                  goats. Each color has its own characteristics. Gobi does not change the organic
                                  quality of Mongolian cashmere at any stage of production. Undyed, unbleached products
                                  from the “Gobi Organic’’ collection portrays the exclusive representation of organic
                                  materials that is made without compromise.
                                </p>
                              </div>
                            </div>
                            <div className="col_6">
                              <div className="logo">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_229.png?v=1584615363"
                                  alt="GOYO"
                                />
                              </div>
                              <div className="det">
                                <p>
                                  A combination of playful colors and creative design solutions, a harmonization of
                                  traditional heritage and modern trends. These directives gave Goyo its own special
                                  feature that is appreciated by customers around the world. We collect only the finest
                                  quality raw materials and produce luxurious cashmere garments, utilizing international
                                  best practices and the most advanced technologies to reach beyond our customer
                                  expectations.
                                </p>
                              </div>
                            </div>
                            <div className="col_6">
                              <div className="logo">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Layer_1.png?v=1584615370"
                                  alt="HERDERS"
                                />
                              </div>
                              <div className="det">
                                <p>
                                  “Herders” is a sustainable cashmere initiative piloted by the Gobi company. The
                                  project’s goals are to preserve natural and nomadic heritage around the production of
                                  cashmere by introducing a sustainable business model to compensate herders. The first
                                  goal is to relieve pressure on pastureland by reducing herd sizes. Secondly, the
                                  initiative will collaborate closely with herders’ cooperatives and digitally track and
                                  target the most sustainable raw cashmere source, thus streamlining the value chain.
                                </p>
                              </div>
                            </div>
                            <div className="col_6">
                              <div className="logo">
                                <img
                                  src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Layer_4.png?v=1584615375"
                                  alt="GOBI KIDS"
                                />
                              </div>
                              <div className="det">
                                <p>
                                  We proudly recommend our light and warm Kid Goyo line to the little ones. Our yarn has
                                  been certified harmless to any skin by the OEKO TEX 100 standards. Kid Goyo consists
                                  of light, colorful, cheerful designs and each one is made with care for your kids to
                                  keep them warm and comfortable in any season.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section className="global-presence">
                        <div className="sec_tt">
                          <div className="top">
                            <span>5</span>
                            <h2>section</h2>
                            <ScrollToTop />
                          </div>
                          <div className="bottom">
                            <h1>GLOBAL PRESENCE</h1>
                          </div>
                        </div>
                        <div className="content">
                          <h2 className="med_tt">BRANCH AND FRANCHISE STORE</h2>
                          <div className="img">
                            <img
                              src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_20.png?v=1584613953"
                              alt="GOBI CASHMERE"
                            />
                            <div className="detail">
                              <p>Map of Gobi’s branch and franchise stores.</p>
                            </div>
                          </div>
                          <div className="text">
                            <p>
                              Internationally, GOBI operates two branch{' '}
                              <a href="https://www.gobicashmere.com/us/pages/flagship-store">stores</a> in Berlin and
                              Hamburg in addition to its 54 franchise stores in major cities across the world, namely
                              London, Prague, Moscow, New York, Brussels, Milan, Paris, Seoul and Hong Kong. Moreover,
                              Gobi opened its brand-new online store "Gobi Cashmere USA" in 2019. Domestically, GOBI has
                              7 branch stores including "The World's Largest Cashmere Store" with a 2,500m2 cashmere
                              shopping store in the Galleria Mall that is adjacent to the Mongolian Parliament Building
                              in Ulaanbaatar, Mongolia.
                            </p>
                          </div>
                        </div>
                        <div className="content" style={{ marginTop: '60px' }}>
                          <h2 className="med_tt">ONLINE STORE</h2>
                          <div className="text">
                            <p>
                              Now, GOBI is focusing on its four online stores in an effort to make it more accessible to
                              the world. We believe{' '}
                              <a href="https://www.gobicashmere.com/us/pillar/cashmere-is-for-everyone">everyone</a>{' '}
                              deserves to wear real luxurious cashmere products. Since Mongolia provides 48% of the
                              global cashmere needs, it allows GOBI’s products to be made out of the finest cashmere
                              fibers sourced locally from Mongolia. Therefore, GOBI is determined to reach its fullest
                              potential in order to deliver the highest quality cashmere products for customers at the
                              most affordable price - regardless of age, gender, ethnicity and location.
                            </p>
                          </div>
                          <div className="grid">
                            <div className="col-12 online-sto">
                              <ul>
                                <li>
                                  <div className="det">
                                    <p>International online store</p>
                                    <a href="https://www.gobicashmere.com">www.gobicashmere.com</a>
                                  </div>
                                </li>
                                <li>
                                  <div className="det">
                                    <p>United state online store</p>
                                    <a href="https://www.gobicashmere.com/us">www.gobicashmere.com/us</a>
                                  </div>
                                </li>
                                <li>
                                  <div className="det">
                                    <p>German online store</p>
                                    <a href="https://www.gobicashmere.com/de">www.gobicashmere.com/de</a>
                                  </div>
                                </li>
                                <li>
                                  <div className="det">
                                    <p>United Kingdom online store</p>
                                    <a href="https://www.gobicashmere.com/uk">www.gobicashmere.com/uk</a>
                                  </div>
                                </li>
                                <li>
                                  <div className="det">
                                    <p>Russia online store</p>
                                    <a href="https://www.gobicashmere.com/ru">www.gobicashmere.com/ru</a>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </StickyContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
