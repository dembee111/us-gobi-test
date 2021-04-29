import React, { Component } from 'react';
import './GobiCashmerePillarPage.scss';
import ScrollToTop from './ScrollToTop';
import MongolianCashmereSide from './MongolianCashmereSide';
import Header from './Header';
import SocialWidget from './SocialWidget';
import { StickyContainer } from 'react-sticky';

export default class MongolianCashmerePillarPage extends Component {
  render() {
    return (
      <div>
        <Header activeLink="mongolian-cashmere" />
        <div className="pilla_slider">
          <div
            className="sl_back"
            style={{
              backgroundImage:
                'url(https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_3_b1ea4079-6e85-4aa4-b47b-485508932598.png?v=1584588670)',
            }}
          >
            <div className="top_center">
              <h1>Mongolian Cashmere</h1>
              <p>
                Mongolian cashmere is the world’s most luxurious and exclusive natural fiber. Discover its origin and
                the unique properties that make it so special.
              </p>
            </div>
          </div>
        </div>
        <StickyContainer className="pillar-container">
          <div className="sidebar-bg">
            <MongolianCashmereSide />
          </div>

          <div className="pilla_main">
            <SocialWidget />
            <section id="mongolia-the-land-of-soft-gold">
              <div className="sec_tt">
                <div className="top">
                  <span>1</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>MONGOLIA – THE LAND OF SOFT GOLD</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    According to the famous Lonely Planet guidebooks, Mongolia is described as a destination for
                    adventure where travelers can witness the historic traditions still practiced today by the hardened
                    nomads of the vast steppes and desert lands.
                  </p>
                  <p>
                    Mongolia is the ideal country for lovers of the great outdoors. The nature is incredibly diverse
                    which makes driving though Mongolia an adventure in itself. From the beautiful desert steppes and
                    sand dunes in the Southern Gobi, to the mountainous regions in the west and the pristine lakes in
                    the north: Mongolia’s nature will never bore you.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_1267a6bc-cf09-483f-a0bd-fc28fea3db8f.png?v=1584606444"
                    alt="MONGOLIA MONGOLIANCASHMERE MONGOLIANNOMADS GOBICASHMERE Mongolian  Nature"
                  />
                  <div className="detail">
                    <p>Mongolia’s snow-capped mountains.</p>
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
                    <p>Mongolia is the ideal country for lovers of the great outdoors.</p>
                  </div>
                </div>
              </div>
            </section>
            <section id="mongolian-nomads">
              <div className="sec_tt">
                <div className="top">
                  <span>2</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>MONGOLIAN NOMADS</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    Traditional Mongolian nomads have learned to live in harmony with nature by relying on whatever the
                    land has to offer. They are famous for their resilience and survival skills in the harsh
                    environments.
                  </p>
                  <p>
                    The nomadic lifestyle is not simply about animal husbandry. Herders are forced to learn to survive
                    in nature by preventing possible dangers to their herds or family. Mongolians have had a long
                    tradition of predicting the weather by using clues given by nature.{' '}
                  </p>
                  <p>
                    Even though Mongolia is the least densely populated nation with just over three million people,
                    traditional herders are one of the last remaining nomadic cultures and there are{' '}
                    <a href="https://www.1212.mn/tables.aspx?tbl_id=DT_NSO_1001_044V1&13999001_select_all=0&13999001SingleSelect=_T1&SOUM_select_all=0&SOUMSingleSelect=_0&YearY_select_all=0&YearYSingleSelect=_2019&viewtype=table">
                      233,300 herder
                    </a>{' '}
                    families tending to
                    <a href="https://www.1212.mn/Stat.aspx?LIST_ID=976_L10_1&type=description">70.1 million animals.</a>
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_1_bedc5fdc-a3e7-407f-a0dc-bfdf7b54adb0.png?v=1584606544"
                    alt="MONGOLIANNOMAD MONGOLIANHERDER "
                  />
                  <div className="detail">
                    <p>A Mongolian nomad watching over his herd of goats</p>
                  </div>
                </div>
                <div className="text">
                  <p>
                    Mongolian herders are tending to herds of sheep, goats, camels, yaks and horses just as their
                    ancestors did for over 2,000 years. These herders understand the land and its environment from
                    traditional ecological knowledge passed down through generations and from daily experience. A
                    herder’s knowledge is considered as “king knowledge” and the herders themselves as “the masters of a
                    thousand skills”. This is because a herder becomes a meteorologist when they analyze and predict
                    weather patterns, a botanist when they choose pastureland, a zoo technician when they feed cattle, a
                    bio-psychologist when tending their livestock, an economist when selling wool, cashmere fiber, meat,
                    and skins of animals, and a food technologist when preparing dairy products.
                  </p>
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
                      Traditional Mongolian nomads have learned to live in harmony with nature by relying on whatever
                      the land has to offer.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section id="mongolian-goats">
              <div className="sec_tt">
                <div className="top">
                  <span>3</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>MONGOLIAN GOATS</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    The superiority of Mongolian goats is in their biological features, especially for grazing on desert
                    and high mountain pastures with the unique natural and climatic conditions of Central Asia. To
                    survive the freezing winter, they grow an undercoat of fur consisting of long, fine fibers.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_2_3a8df07f-b13e-4b09-becf-5853b2dd02ca.png?v=1584606651"
                    alt="MONGOLIANGOAT CASHMEREGOAT"
                  />
                  <div className="detail">
                    <p>Mongolian cashmere goats roaming freely.</p>
                  </div>
                </div>
                <div className="text">
                  <p>
                    There are about 29.2 million goats in Mongolia. 54% of them live in the deserts such as the Gobi,
                    while 24% live in the Eastern plains and 22% in the Northern mountainous regions.
                  </p>
                  <p>
                    Mongolian goats enjoy the truly unique luxury of roaming freely in the beautiful steppes without
                    being bound by any fences or walls. Unlike farmed and milled animals, they enjoy a 100% organic
                    life, foraging for fresh grass and what Mother Nature offers. This generous environment, the unique
                    weather and freedom are the basis of the world’s finest quality fleeces.
                  </p>
                </div>
              </div>
            </section>
            <section id="traditional-hand-combing">
              <div className="sec_tt">
                <div className="top">
                  <span>4</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>Traditional Hand-Combing</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    After surviving the unique Mongolian winter, the start of Spring means the goats begin to naturally
                    shed their excessive winter insulation. Mongolian herders{' '}
                    <a href="https://www.gobicashmere.com/us/pages/our-production">hand-comb</a> the undercoat from the
                    goats, a symbiotic relationship with a positive result for both parties. The undercoat of goats are
                    removed easily by hand-combing without damaging their skin or topcoat. It’s a totally painless
                    process and the only cruelty-free method of harvesting cashmere.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img">
                  <iframe
                    width="100%"
                    height="500px"
                    src="https://www.youtube.com/embed/xMAmda0ndSw"
                    frameBorder={0}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="detail">
                    <p>Mongolian traditional hand-combing.</p>
                  </div>
                </div>
                <div className="text">
                  <p>
                    While this wise tradition is naturally labor and time-intensive for herders (compared to faster
                    electrical shearing), it has many proven benefits. For example, combing by hand gives herders the
                    opportunity to check on the wellbeing of their vital livestock. Moreover, combing the undercoat hair
                    prevents entangling, the build-up of crust, and the breeding of various parasites. It helps the
                    goats avert heat exhaustion in the upcoming warmer seasons and cultivate the growth of a fresh new
                    coat for the next winter.
                  </p>
                  <p>
                    On the other hand, although using shearing machines is much more efficient for humans, it is
                    considered to be stressful for cashmere goats. Shearing tends to remove both the undercoat and the
                    much coarser overcoat layer. This results in the goats being left highly vulnerable to Mongolia’s
                    dangerous weather conditions and opens up the possibility for a myriad of health problems.
                  </p>
                  <p>
                    The end product quality weakens too as cashmere loses part of its uniquely luxurious softness. This
                    is due to the soft fine fibers mixing with the coarse guard hairs that have been removed by shears.
                    It also has the potential to create blunt edges on the naturally combed strands. Hence herders much
                    prefer the traditional method of hand combing in order to preserve the quality of the cashmere
                    fiber.
                  </p>
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
                      The undercoat of goats are removed easily by hand-combing without damaging their skin or topcoat.
                      It’s a totally painless process and the only cruelty-free method of harvesting cashmere.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section id="mongolian-noble-fibre">
              <div className="sec_tt">
                <div className="top">
                  <span>5</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>Mongolian noble fibre</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <p>
                    On the freezing plains of Mongolia, animals have had to evolve over time to protect themselves; it
                    truly is natural selection at its finest. The goats manage to survive by developing a thick layer of
                    undercoat. One that is stronger and warmer than fibers found on other goats around the world. This
                    cashmere is the life source of not only the goats growing them, but the people who herd them as
                    well. It is the basis of Mongolia’s profound connection with cashmere.
                  </p>
                </div>
              </div>
              <div className="content">
                <div className="img med">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_4_70af0526-1231-4eef-a2dc-4d8d4409f76d.png?v=1584606940"
                    alt="Certificate of Mongolian Noble Fibre"
                  />
                  <div className="detail">
                    <p>Certificate of Mongolian Noble Fibre</p>
                  </div>
                </div>
                <div className="text">
                  <p>
                    The ultra-soft wool of the Mongolian cashmere goat favored by top fashion houses is the country’s
                    greatest source of income after mining. Mongolia is also the world’s largest exporter of animal
                    hair, such as cashmere from goats, camel hair, yak down and sheep wool.
                  </p>
                  <p>
                    The Mongolian Noble Fibre certification mark certifies that the product is made with 100 percent
                    high-quality wool and{' '}
                    <a href="https://www.gobicashmere.com/us/pages/our-history">cashmere sourced</a> from Mongolia, that
                    meets Mongolian and international standards for textiles and woven products, and fully complies with
                    quality standards in an{' '}
                    <a href="https://www.gobicashmere.com/us/blogs/culture/sustainable-cashmere-is-true-luxury">
                      environmentally-friendly
                    </a>{' '}
                    manufacturing process.
                  </p>
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
                      The Mongolian Noble Fibre certification mark certifies that the product is made with 100 percent
                      high-quality wool and cashmere sourced from Mongolia.
                    </p>
                  </div>
                </div>
                <div className="text">
                  <p>
                    The Mongolian Noble Fibre certification mark certifies that the product is made with 100 percent
                    high quality wool and cashmere sourced from Mongolia, meets Mongolian and international standards
                    for textiles and woven products, fully
                    {/* complies with quality standards in <a href="https://blog.gobicashmere.com/sustainable-cashmere-is-true-luxury">environmentally-friendly</a> manufacturing. */}
                  </p>
                </div>
              </div>
            </section>
            <section id="cashmere-quality">
              <div className="sec_tt">
                <div className="top">
                  <span>6</span>
                  <h2>section</h2>
                  <ScrollToTop />
                </div>
                <div className="bottom">
                  <h1>Cashmere quality</h1>
                </div>
              </div>
              <div className="content">
                <div className="text">
                  <h2 className="med_tt">HOW TO TELL IF CASHMERE IS HIGH-QUALITY</h2>
                  <p>
                    The Cashmere Goat Association defines “the quality of cashmere fleece by three factors: length,
                    diameter and degree of crimping”. Industry standards dictate that the hair must be at least 3cm long
                    with an average diameter of less than 19 microns (human hair can be up to 181 microns).
                  </p>
                  <p>
                    Mongolian goats produce a fiber length about a third longer than others. Cashmere fineness range
                    from 14 to 19 microns and has an impact on the warmth and softness of cashmere.
                  </p>
                  <h2 className="med_tt">The warmth</h2>
                  <p>
                    Cashmere fiber is up to three times more insulating than sheep wool. As a result, the cashmere
                    garments made of Mongolian cashmere provide superior warmth. Cashmere is also hygroscopic, meaning
                    it is a naturally breathable material (unlike synthetic fabrics). It also has a high moisture
                    content, where fluctuations of humidity in the air also fluctuate the insulation of the garment,
                    making it comfortable in all climates, even during the summer.
                  </p>
                  <h2 className="med_tt">The softness</h2>
                  <p>
                    Cashmere fiber has a very narrow diameter making it extremely soft to the touch. To protect the term
                    cashmere, the US Government enacted the “Wool Products Labeling Act”, which states that authentic
                    cashmere has to be 19 microns in diameter or less. The colder the weather gets, the finer the
                    cashmere becomes. Therefore, some parts of Mongolia even produce cashmere with a diameter between
                    13-14 microns.
                  </p>
                  <p>
                    Hence, Mongolian cashmere is distinguished by an incredibly soft finish, which is the result of
                    delicate fibers that are almost silky to the touch. It doesn’t have the itchy quality of wool yet
                    still provides insulating warmth without having to be wrapped in layers of it; hence the strong
                    demand for true authentic cashmere.
                  </p>
                  <h2 className="med_tt">The color</h2>
                  <p>
                    Every year Mongolia harvests 9,500 tons of raw cashmere from goats. White, beige, warm gray and
                    brown are the <a href="https://www.gobicashmere.com/us/pages/our-history">four natural colors</a> of
                    cashmere and this makes Mongolia the country that provides the widest color range. Most of Mongolian
                    cashmere goats (51%) produce beige colored cashmere while another 30% produce brown. 2% of Mongolian
                    goats have warm gray cashmere (which is only found in Mongolia) and 18% have white cashmere.
                  </p>
                </div>
              </div>
              <div className="content" style={{ marginTop: '60px' }}>
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
                      White, beige, warm gray and brown are the four natural colors of cashmere and this makes Mongolia
                      the country that provides the widest color range.
                    </p>
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="grid">
                  <div className="col_3">
                    <div className="img">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_4_eb6a512e-dc19-47ca-8a7c-cbe1e4c1f90d.png?v=1584599348"
                        alt="ORGANICCASHMERE GOBIORGANIC CASHMERECOLOR "
                      />
                      <div className="det">
                        <p>Beige</p>
                      </div>
                    </div>
                  </div>
                  <div className="col_3">
                    <div className="img">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_5_3f329717-ac24-4e1d-afec-fc0a5770a0c1.png?v=1584608161"
                        alt="ORGANICCASHMERE GOBIORGANIC CASHMERECOLOR"
                      />
                      <div className="det">
                        <p>Brown</p>
                      </div>
                    </div>
                  </div>
                  <div className="col_3">
                    <div className="img">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_6_362c8deb-a04f-497e-9cb8-22a4a0bcf5a0.png?v=1584608227"
                        alt="ORGANICCASHMERE GOBIORGANIC CASHMERECOLOR"
                      />
                      <div className="det">
                        <p>White</p>
                      </div>
                    </div>
                  </div>
                  <div className="col_3">
                    <div className="img">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Mask_Group_7_44a0576e-c87a-44cf-b280-09f3d15c0bfb.png?v=1584608249"
                        alt="ORGANICCASHMERE GOBIORGANIC CASHMERECOLOR"
                      />
                      <div className="det">
                        <p>Warm gray</p>
                      </div>
                    </div>
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
