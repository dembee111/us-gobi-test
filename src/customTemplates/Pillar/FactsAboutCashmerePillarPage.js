import React, { Component } from 'react';
import './GobiCashmerePillarPage.scss';
import { Link } from 'react-scroll';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import SocialWidget from './SocialWidget';
import { Sticky, StickyContainer } from 'react-sticky';

export default class FactsAboutCashmerePillarPage extends Component {
  render() {
    return (
      <div className="rte">
        <Header activeLink="facts-about-cashmere" />
        <div className="pilla_slider">
          <div
            className="sl_back"
            style={{
              backgroundImage:
                'url(https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_3_b1ea4079-6e85-4aa4-b47b-485508932598.png?v=1584588670)',
            }}
          >
            <div className="top_center">
              <h1>Facts about Cashmere</h1>
              <p>
                To wear cashmere, you have to know about cashmere. Guaranteed to educate and interest, we give you the
                building blocks to expand your cashmere knowledge.
              </p>
            </div>
          </div>
        </div>
        <StickyContainer className="pillar-container" id="containerSelectorFocus">
          <div className="sidebar-bg">
            <Sticky relative={true} topOffset={200} isSticky={true}>
              {() => (
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
                  <div className="sidebar" style={{}}>
                    <div
                      className="inner-wrapper-sticky"
                      style={{
                        opacity: 1,
                        transition: 'all 0.1s ease 0s',
                        position: 'relative',
                      }}
                    >
                      <div className="scroll-line" />
                      <nav className="cus_nav">
                        <ul className="side_lists">
                          <li className="pilla_side_link active">
                            <Link className="smscroll" to="natural-colors-of-cashmere" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              1. Natural colors of cashmere
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="cashmere-and-silk" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              2. Cashmere and Silk
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="cashmere-vs-hair" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              3. Cashmere vs Hair
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="cashmere-vs-wool" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              4. Cashmere vs Wool
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="free-range-cashmere" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              5. Free-range Cashmere
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="cashmere-origin" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              6. Cashmere Origin
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="breathable-cashmere" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              7. Breathable Cashmere
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="how-cashmere-is-collected" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              8. How Cashmere is Collected
                            </Link>
                          </li>
                          <li className="pilla_side_link">
                            <Link className="smscroll" to="eco%E2%80%93friendly-cashmere" spy smooth duration={1000}>
                              <span className="dot">
                                <span />
                              </span>
                              9. Eco-friendly Cashmere
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </Sticky>
          </div>
          <div className="pilla_main">
            <SocialWidget />
            <section id="natural-colors-of-cashmere">
              <div className="sec_tt">
                <div className="top">
                  <span>1</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>Natural colors of cashmere</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    Of Mongolia’s goats, 51% are beige colored, 30% are brown, 18% are white, and making up only 1% of
                    the population are the warm grey goats. Warm grey colored goats are highly scarce and can be found
                    in the Khovd Province making Mongolia the only country to have a variety of 4 different colored
                    goats.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_27.png?v=1584689777"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>Mongolia’s goats in 4 natural colors.</p>
                  </div>
                </div>
              </div>
            </section>
            <section id="cashmere-and-silk">
              <div className="sec_tt">
                <div className="top">
                  <span>2</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>CASHMERE AND SILK</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    Silk is the one of the world’s finest natural fibers that has good insulation properties. When spun
                    together with cashmere, it creates a more lustrous fabric that can be used to stay cool in the hot
                    months and warm during the colder months. Thus, this magical duo makes the perfect garment to wear
                    all year round.{' '}
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_28.png?v=1584689894"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>GOBI’s cashmere silk top for TAOBAO China, 2020.</p>
                  </div>
                </div>
              </div>
            </section>
            <section id="cashmere-vs-hair">
              <div className="sec_tt">
                <div className="top">
                  <span>3</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>CASHMERE VS HAIR</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    If you thought hair was thin, it is not! A single strand of human hair has a diameter of up to 181
                    microns, whereas the average cashmere fiber is 19 microns. More surprisingly, Mongolian cashmere can
                    range from 14 to 19 microns making it the finest and the most sought after in the cashmere market.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_17_3ae8cfc3-3fdb-4ce8-9f49-61333f6dfb98.png?v=1584676964"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>Cashmere during the de-hairing stage at GOBI.</p>
                  </div>
                </div>
              </div>
            </section>
            <section id="cashmere-vs-wool">
              <div className="sec_tt">
                <div className="top">
                  <span>4</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>Cashmere vs Wool</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    Cashmere is 8 times warmer than wool. Cashmere fibers have internal air chambers allowing it to act
                    as a natural heat regulator. This is due to cashmere strands being hollow in the inside making it
                    lofty and warm. It is also extremely useful to goats for they need warm cashmere to survive the cold
                    Mongolian winter that can lower to -40 Celsius.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_18_fb44ea55-e9be-442c-9f93-8a1fbc041693.png?v=1584677138"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>A chilly day in the Mongolian countryside.</p>
                  </div>
                </div>
              </div>
            </section>
            <section id="free-range-cashmere">
              <div className="sec_tt">
                <div className="top">
                  <span>5</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>FREE-RANGE CASHMERE</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    Happy goats make the best cashmere. Mongolian goats live free of stress. Unlike farm raised cashmere
                    goats, Mongolian goats roam freely in the open grass land from sunrise to sunset in the Mongolian
                    steppes. Without fences or walls, they are free to graze in their natural habitat. Their diet
                    consists of many medicinal and natural plants which help them grow longer and softer cashmere.{' '}
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/1953/2845/files/pillar10.jpg?v=1585034184"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>Herd of goats roaming freely in Mongolia.</p>
                  </div>
                </div>
              </div>
            </section>
            <section id="cashmere-origin">
              <div className="sec_tt">
                <div className="top">
                  <span>6</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>Cashmere Origin</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    Almost everyone thinks cashmere is from Italy. Actually, most of the world’s cashmere comes from
                    Mongolia and China. As the second largest producer of raw cashmere in terms of volume, Mongolia
                    produces 48% of the world’s cashmere creating 9,500 tons of cashmere annually. China or more
                    specifically Inner Mongolia - an autonomous region in Northern China – is the largest producer.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_30.png?v=1584690076"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>Goat to coat campaign, 2019</p>
                  </div>
                </div>
              </div>
            </section>
            <section id="breathable-cashmere">
              <div className="sec_tt">
                <div className="top">
                  <span>7</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>BREATHABLE CASHMERE</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    Cashmere is a natural fiber meaning it is very breathable. It is excellent at keeping moisture away
                    from the body and from preventing bacteria from being trapped. Unlike synthetic fibers, cashmere
                    doesn’t promote the buildup of body odors. Feel free to see a wide variety of sweaters and pants at
                    GOBI that are perfect for jogging.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_31.png?v=1584690118"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>Light breathable cashmere on a warm, sunny day.</p>
                  </div>
                </div>
              </div>
            </section>
            <section id="how-cashmere-is-collected">
              <div className="sec_tt">
                <div className="top">
                  <span>8</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>HOW CASHMERE IS COLLECTED</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    By hand – the traditional way. Hand-combing cashmere is the best practice and the most humane method
                    there can be. It is refined by the long nomadic lifestyle of herders who have kept their tradition
                    for hundreds of years.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <div className="video-wrapper">
                    <iframe
                      width="100%"
                      height="500px"
                      src="https://www.youtube.com/embed/7AwQ73PHfro"
                      frameBorder={0}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="detail">
                    <p>Mongolia - The Land of Cashmere </p>
                  </div>
                </div>
              </div>
            </section>
            <section id="eco–friendly-cashmere">
              <div className="sec_tt">
                <div className="top">
                  <span>9</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>Eco – friendly cashmere</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    Due to its natural property, cashmere products can last for many years with their original shape. It
                    is also a biodegradable fiber resulting in sustainable fashion. Compared to other petroleum based
                    fabrics, cashmere does not cause any allergies. Cashmere also lacks lanolin therefore it’s great for
                    people who have sensitive skin. Check out GOBI’s selection of{' '}
                    <a href="https://www.gobicashmere.com/us/collections/home-baby-blanket">baby blankets</a> made
                    specifically for children’s skin.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_33.png?v=1584690235"
                    alt="GOBI CASHMERE"
                  />
                  <div className="detail">
                    <p>Sunset on the wild steppes of Mongolia.</p>
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
