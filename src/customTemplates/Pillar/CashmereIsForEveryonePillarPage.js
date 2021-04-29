import React, { Component } from 'react';
import './GobiCashmerePillarPage.scss';
import { Link } from 'react-scroll';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import SocialWidget from './SocialWidget';
import { Sticky, StickyContainer } from 'react-sticky';

export default class CashmereIsForEveryonePillarPage extends Component {
  render() {
    return (
      <>
        <div className="rte">
          <Header activeLink="cashmere-is-for-everyone" />
          <div className="pilla_slider">
            <div
              className="sl_back"
              style={{
                backgroundImage:
                  'url(https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_3_b1ea4079-6e85-4aa4-b47b-485508932598.png?v=1584588670)',
              }}
            >
              <div className="top_center">
                <h1>Cashmere is for Everyone</h1>
                <p>
                  Cashmere brings everyone together. You’ll find that GOBI delivers the perfect cashmere to suit every
                  individual’s unique needs no matter where they are in the world.
                </p>
              </div>
            </div>
          </div>
          <StickyContainer className="pillar-container">
            <div className="sidebar-bg">
              <Sticky relative={true}>
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
                              <Link className="smscroll" to="international-e-commerce" spy smooth duration={1000}>
                                <span className="dot">
                                  <span />
                                </span>
                                1. International E-commerce
                              </Link>
                            </li>
                            <li className="pilla_side_link">
                              <Link className="smscroll" to="local-shoppers" spy smooth duration={1000}>
                                <span className="dot">
                                  <span />
                                </span>
                                2. Local Shoppers
                              </Link>
                            </li>
                            <li className="pilla_side_link">
                              <Link className="smscroll" to="local-herders" spy smooth duration={1000}>
                                <span className="dot">
                                  <span />
                                </span>
                                3. Local Herders
                              </Link>
                            </li>
                            <li className="pilla_side_link">
                              <Link className="smscroll" to="organic-cashmere" spy smooth duration={1000}>
                                <span className="dot">
                                  <span />
                                </span>
                                4. Organic Cashmere
                              </Link>
                            </li>
                            <li className="pilla_side_link">
                              <Link className="smscroll" to="unisex-free-size" spy smooth duration={1000}>
                                <span className="dot">
                                  <span />
                                </span>
                                5. Unisex, Free Size
                              </Link>
                            </li>
                            <li className="pilla_side_link">
                              <Link className="smscroll" to="versatility" spy smooth duration={1000}>
                                <span className="dot">
                                  <span />
                                </span>
                                6. Versatility
                              </Link>
                            </li>
                            <li className="pilla_side_link">
                              <Link className="smscroll" to="cashmere-gifts" spy smooth duration={1000}>
                                <span className="dot">
                                  <span />
                                </span>
                                7. Cashmere Gifts
                              </Link>
                            </li>
                            <li className="pilla_side_link">
                              <Link className="smscroll" to="younger-generations" spy smooth duration={1000}>
                                <span className="dot">
                                  <span />
                                </span>
                                8. Younger Generations
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
              <section id="international-e-commerce">
                <div className="sec_tt">
                  <div className="top">
                    <span>1</span>
                    <h2>section</h2>
                    <ScrollToTop />
                  </div>
                  <div className="bottom">
                    <h1>INTERNATIONAL E-COMMERCE</h1>
                  </div>
                </div>
                <div className="content">
                  <div className="text">
                    <p>
                      The rapid growth of digital online shopping presents an opportunity for brands to reach a wide
                      range of consumers worldwide. GOBI is the first Mongolian cashmere brand to go{' '}
                      <a href="http://gobi.mn/">completely online</a> for its venture into the worldwide market. This
                      significant move to go international is motivated by the drive to make high-quality, affordable
                      Mongolian cashmere readily available to everyone on a global scale.
                    </p>
                  </div>
                </div>
                <div className="content">
                  <div className="img">
                    <img
                      className=" lazyloaded"
                      srcSet="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_b40c66ee-22f7-4fd3-8de5-1a0d68170c3a_100x.png?v=1584583146 100w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_b40c66ee-22f7-4fd3-8de5-1a0d68170c3a_200x.png?v=1584583146 200w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_b40c66ee-22f7-4fd3-8de5-1a0d68170c3a_400x.png?v=1584583146 400w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_b40c66ee-22f7-4fd3-8de5-1a0d68170c3a_800x.png?v=1584583146 800w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_b40c66ee-22f7-4fd3-8de5-1a0d68170c3a_1600x.png?v=1584583146 1600w,"
                      alt="HIGH-QUALITY AFFORDABLE "
                    />
                    <div className="detail">
                      <p>
                        Gobi’s launch of international online stores - USA/CANADA, EUROPE
                        <br />
                        INTERNATIONAL, CHINA TAOBAO.
                      </p>
                    </div>
                  </div>
                  <div className="twitter">
                    <a href="#">
                      <svg width={32} height={26} viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M31.4226 3.24509C30.2906 3.74702 29.0743 4.08625 27.7977 4.23886C29.1009 3.45778 30.1015 2.22091 30.5727 0.747201C29.3338 1.48236 27.9784 2.00032 26.565 2.27871C25.4137 1.05218 23.7736 0.285645 21.9582 0.285645C18.4727 0.285645 15.6467 3.11146 15.6467 6.59675C15.6467 7.09147 15.7026 7.5731 15.8102 8.03513C10.5649 7.77185 5.91452 5.2593 2.80163 1.44092C2.25848 2.37304 1.94725 3.4573 1.94725 4.61377C1.94725 6.80343 3.06155 8.7351 4.75492 9.86694C3.75268 9.83555 2.77249 9.56485 1.89618 9.07745C1.89582 9.10389 1.89582 9.13032 1.89582 9.15688C1.89582 12.2147 4.0713 14.7656 6.9584 15.3454C6.02903 15.5982 5.05417 15.6352 4.10831 15.4536C4.91138 17.9609 7.24224 19.7855 10.0039 19.8366C7.84391 21.5293 5.12251 22.5383 2.16571 22.5383C1.65621 22.5383 1.15392 22.5084 0.660156 22.4501C3.45317 24.2408 6.77058 25.2856 10.3347 25.2856C21.9436 25.2856 28.2915 15.6687 28.2915 7.32868C28.2915 7.05494 28.2855 6.78277 28.2733 6.51215C29.5089 5.61894 30.5753 4.51261 31.4226 3.24509"
                          fill="#55ACEE"
                        />
                      </svg>
                      click to tweet
                    </a>
                    <div className="det">
                      <p>
                        The rapid growth of digital online shopping presents an opportunity for brands to reach a wide
                        range of consumers worldwide. GOBI is the first Mongolian cashmere brand to go completely online
                        for its venture into the worldwide market.
                      </p>
                    </div>
                  </div>
                  <div className="text">
                    {/* <p>In Mongolia, where the world’s best cashmere producing goats are in abundance, locals benefit from easy access to affordable cashmere whereas overseas consumers are exposed to overpriced and lower-quality cashmere products. To provide everyone an equal opportunity and access to premium Mongolian cashmere, GOBI has launched four official online stores. As of 2020, there are online stores specially dedicated to China, the European Union, Germany, and the United States – the latter being the <a href="https://blog.gobicashmere.com/gobi-becomes-the-first-brand-to-establish-an-official-company-that-conducts-online-shopping-in-the-usa">most recent</a>. Each website is catered towards their respective markets to provide customers the best shopping experience and always 100% premium Mongolian cashmere.</p> */}
                    <p>
                      Maintaining the quality of cashmere while keeping it at affordable prices is meant to bridge
                      everyone together. GOBI manages these low prices due to the elimination of the middlemen who
                      skyrocket the cost of cashmere fibers. By purchasing directly from the local nomads without a
                      go-between, the herders are given a fair price while also allowing GOBI to keep their cashmere
                      products at an affordable rate. Gone are the days where cashmere is exclusive to a select group.
                      GOBI prides themselves in supplying families of various incomes all around the world for they
                      believe cashmere is a luxury that everyone should experience once in their lifetime, thus making
                      “affordable luxury” a key characteristic of the cashmere brand.
                    </p>
                  </div>
                </div>
              </section>
              <section id="local-shoppers">
                <div className="sec_tt">
                  <div className="top">
                    <span>2</span>
                    <h2>section</h2>
                    <ScrollToTop />
                  </div>
                  <div className="bottom">
                    <h1>LOCAL SHOPPERS</h1>
                  </div>
                </div>
                <div className="content">
                  <div className="img">
                    <img
                      className="lazyload"
                      srcSet="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_1_c48255d9-8b09-4d87-a4b4-51b3b66af8d6_100x.png?v=1584585610 100w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_1_c48255d9-8b09-4d87-a4b4-51b3b66af8d6_200x.png?v=1584585610 200w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_1_c48255d9-8b09-4d87-a4b4-51b3b66af8d6_400x.png?v=1584585610 400w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_1_c48255d9-8b09-4d87-a4b4-51b3b66af8d6_800x.png?v=1584585610 800w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_1_c48255d9-8b09-4d87-a4b4-51b3b66af8d6_1600x.png?v=1584585610 1600w,"
                      alt="LUXURY GOAT "
                    />
                    <div className="detail">
                      <p>Gobi`s branch store in Germany</p>
                    </div>
                  </div>
                </div>
              </section>
              <section id="local-herders">
                <div className="sec_tt">
                  <div className="top">
                    <span>3</span>
                    <h2>section</h2>
                    <ScrollToTop />
                  </div>
                  <div className="bottom">
                    <h1>LOCAL HERDERS</h1>
                  </div>
                </div>
                <div className="content">
                  <div className="img">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_22.png?v=1584661817"
                      alt="HERDERS NOMADS"
                    />
                    <div className="detail">
                      <p>A visit to a nomadic herder family, Dundgovi province, Mongolia.</p>
                    </div>
                  </div>
                  <div className="text">
                    <p>
                      Cashmere is for everyone. This not only includes customers, but also the nomadic herders who are
                      the heart and soul of GOBI’s cashmere. These nomads raise and nurture Mongolia’s most valuable
                      asset: goats. To them cashmere plays an{' '}
                      <a href="https://www.gobicashmere.com/us/blogs/culture/why-cashmere-is-so-important-to-mongolia">
                        important role
                      </a>{' '}
                      in their daily life. According to Wurzinger and Purevdorj, cashmere is a source of income and
                      employment for more than a third of the nation’s population making up 90% of total household
                      income. This shows that goats are also very much a valuable and loved animal to the nomads. In
                      this sense, cashmere is for herders for without this fine fiber, nomadic families would not be
                      able to follow their centuries-old traditions and thrive in their ancestral home among the
                      Mongolian steppes.
                    </p>
                  </div>
                </div>
              </section>
              <section id="organic-cashmere">
                <div className="sec_tt">
                  <div className="top">
                    <span>4</span>
                    <h2>section</h2>
                    <ScrollToTop />
                  </div>
                  <div className="bottom">
                    <h1>Organic Cashmere </h1>
                  </div>
                </div>
                <div className="content">
                  <div className="img">
                    <div className="video-wrapper">
                      <iframe
                        width="100%"
                        height={500}
                        src="https://www.youtube.com/embed/HIumHOmHNIc"
                        frameBorder={0}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="detail">
                      <p>Gobi Organic FW 19/20, Gobi Cashmere</p>
                    </div>
                  </div>
                  <div className="text">
                    <p>
                      Cashmere is organic in the truest sense of the word. As a natural fiber, cashmere is both
                      hypoallergenic and an anti-irritant. At GOBI, organic cashmere products can easily be identified
                      by its <a href="https://www.gobicashmere.com/us/pages/our-history">color</a>. Mongolia is the only
                      country where goats of 4 natural colors: brown, beige, warm grey, and white can be found. However,
                      it is not just the natural color that makes cashmere at GOBI organic. Ready to shed cashmere wool
                      is combed directly from a goat’s underbelly and undergoes washing, spinning, etc. without using
                      chemicals. This results in GOBI’s line of organic cashmere products specifically meant for
                      customers susceptible to various allergies and chemicals, even newborn infants and children.
                    </p>
                  </div>
                </div>
              </section>
              <section id="unisex-free-size">
                <div className="sec_tt">
                  <div className="top">
                    <span>5</span>
                    <h2>section</h2>
                    <ScrollToTop />
                  </div>
                  <div className="bottom">
                    <h1>UNISEX, FREE SIZE</h1>
                  </div>
                </div>
                <div className="content">
                  <div className="img">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_24.png?v=1584662002"
                      alt="UNISEX FREESIZE "
                    />
                    <div className="detail">
                      <p>Gobi’s YAMA SS 19/20 catalogue.</p>
                    </div>
                  </div>
                  <div className="text">
                    <p>
                      Do you constantly have trouble finding your size or not sure if it will fit? GOBI has a wide range
                      of cashmere products that are{' '}
                      <a href="https://www.gobicashmere.com/us/collections/accessories">free-sized</a> such as ponchos,
                      socks, scarves, hats, and gloves. Free-sized cashmere is possible thanks to its unique
                      characteristic that allows it to contour and adjust to the wearer’s body. In addition to
                      free-sized cashmere, GOBI supports breaking gender barriers by creating unisex cashmere garments.
                      To truly show that there is a cashmere for everyone, there is a range of items available for
                      anyone of any gender to wear with confidence and style.
                    </p>
                  </div>
                </div>
              </section>
              <section id="versatility">
                <div className="sec_tt">
                  <div className="top">
                    <span>6</span>
                    <h2>section</h2>
                    <ScrollToTop />
                  </div>
                  <div className="bottom">
                    <h1>VERSATILITY</h1>
                  </div>
                </div>
                <div className="content">
                  <div className="text" style={{ marginBottom: '60px' }}>
                    {/* <p>GOBI’s cashmere products use is always up to you. There is no right or wrong way to wear cashmere. For instance, a <a href="https://blog.gobicashmere.com/5-stylish-ways-to-wear-printed-shawl">cashmere scarf</a> can be used as shawl, wrap, or a blanket depending on your needs and your environment. GOBI also suggests <a href="https://blog.gobicashmere.com/various-uses-for-magical-blankets">cashmere blankets</a> to be used as a child’s comfort blanket, as a home decoration, a picnic blanket for outdoor activities, as a shawl, or as a security blanket to reduce stress. Furthermore, it’s not just the uses but also the occasions where cashmere shows versatility. Cashmere can be worn at various events ranging from casual to formal for it perfectly pairs with many accessories. You know it’s versatile when you can easily style up or down with almost anything.</p> */}
                  </div>
                  <div className="img">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_25.png?v=1584662048"
                      alt="COZY WARM COMFY"
                    />
                    <div className="detail">
                      <p>A child relaxing at home in a Gobi cashmere blanket.</p>
                    </div>
                  </div>
                </div>
              </section>
              <section id="cashmere-gifts">
                <div className="sec_tt">
                  <div className="top">
                    <span>7</span>
                    <h2>section</h2>
                    <ScrollToTop />
                  </div>
                  <div className="bottom">
                    <h1>CASHMERE GIFTS</h1>
                  </div>
                </div>
                <div className="content">
                  <div className="img med">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_26.png?v=1584662106"
                      alt="GIFTS "
                    />
                    <div className="detail">
                      <p>Gobi’s cashmere holiday gifts – basic turtlenecks.</p>
                    </div>
                  </div>
                  <div className="text">
                    {/* <p>There is no better gift than cashmere. A part of why cashmere is considered luxurious is due to its lifespan. It is long-lasting and enduring making it <a href="https://blog.gobicashmere.com/cozy-holiday-gift-ideas-for-her">the perfect gift</a> to give to your loved ones, whether it’s a special holiday, birthday, or anniversary. With a wide range of styles and designs, there is a cashmere item everyone will love and cherish. Giving cashmere as a present will suit all friends and family such as grandparents, husbands, wives, fathers, mothers, daughters and sons. Cashmere will always remain the top warm, cozy gift due to its soft and warm natural fibers.</p> */}
                  </div>
                </div>
              </section>
              <section id="younger-generations">
                <div className="sec_tt">
                  <div className="top">
                    <span>8</span>
                    <h2>section</h2>
                    <ScrollToTop />
                  </div>
                  <div className="bottom">
                    <h1>YOUNGER GENERATIONS</h1>
                  </div>
                </div>
                <div className="content">
                  <div className="img">
                    <img
                      className="lazyload"
                      srcSet="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_726_100x.png?v=1584587044 100w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_726_200x.png?v=1584587044 200w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_726_400x.png?v=1584587044 400w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_726_800x.png?v=1584587044 800w,
                      https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_726_1600x.png?v=1584587044 1600w,"
                      alt="STYLISH FASHIONABLE TRENDY"
                    />
                    <div className="detail">
                      <p>Gobi’s sub-brands.</p>
                    </div>
                  </div>
                  <div className="text">
                    <p>
                      Cashmere has long been seen as clothing for the middle-aged and the elderly due to its sky-high
                      prices. Understandably, the high price tags of cashmere brands deter the younger generations and
                      fuels the stereotype. However, GOBI is destroying that notion by producing cashmere that is both
                      affordable and luxurious compared to other well-known cashmere brands. GOBI even went a step
                      further by <a href="https://www.gobicashmere.com/us/pages/our-history">creating sub-brands</a>{' '}
                      that cater towards specific age-groups such as “KID GOYO” and “GOYO”. As a children’s collection,
                      KID GOYO is designed to allow comfort and movement for toddlers and young children whereas GOYO is
                      geared towards stylish young adolescents that want trendy high-quality cashmere. All of GOBI’s
                      other sub-brands such as GOBI ORGANIC, YAMA and HERDERS are equally affordable and of high-quality
                      cashmere.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </StickyContainer>
        </div>
      </>
    );
  }
}
