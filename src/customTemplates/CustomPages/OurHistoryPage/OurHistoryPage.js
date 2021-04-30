import React, { useEffect } from 'react';
import './OurHistoryPage.scss';
import 'react-photoswipe/lib/photoswipe.css';
import { PhotoSwipeGallery } from 'react-photoswipe';
import LazyHero from 'react-lazy-hero';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MetaTags from 'react-meta-tags';

export default (function OurHistoryPage(props) {
  const items1 = [
    {
      src: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa4_1500x.jpg?v=1578899052',
      srcSet:
        '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa4_180x.jpg?v=1578899052 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa4_360x.jpg?v=1578899052 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa4_540x.jpg?v=1578899052 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa4_720x.jpg?v=1578899052 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa4_900x.jpg?v=1578899052 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa4_1080x.jpg?v=1578899052 1080w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa4_1500x.jpg?v=1578899052 1500w',
      thumbnail: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa4_1500x.jpg?v=1578899052',
      w: 1200,
      h: 800,
    },
    {
      src: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa3_1500x.jpg?v=1578899068',
      srcSet:
        '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa3_180x.jpg?v=1578899068 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa3_360x.jpg?v=1578899068 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa3_540x.jpg?v=1578899068 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa3_720x.jpg?v=1578899068 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa3_900x.jpg?v=1578899068 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa3_1080x.jpg?v=1578899068 1080w',
      thumbnail: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa3_1500x.jpg?v=1578899068',
      w: 1200,
      h: 800,
    },
  ];

  const items2 = [
    {
      src: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa2_1500x.jpg?v=1578899095',
      srcSet:
        '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa2_180x.jpg?v=1578899095 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa2_360x.jpg?v=1578899095 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa2_540x.jpg?v=1578899095 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa2_720x.jpg?v=1578899095 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa2_900x.jpg?v=1578899095 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa2_1080x.jpg?v=1578899095 1080w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa2_1500x.jpg?v=1578899095 1500w',
      thumbnail: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa2_1500x.jpg?v=1578899095',
      w: 1200,
      h: 801,
    },
    {
      src: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa1_1500x.jpg?v=1578899121',
      srcSet:
        '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa1_180x.jpg?v=1578899121 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa1_360x.jpg?v=1578899121 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa1_540x.jpg?v=1578899121 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa1_720x.jpg?v=1578899121 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa1_900x.jpg?v=1578899121 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa1_1080x.jpg?v=1578899121 1080w',
      thumbnail: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/aaa1_1500x.jpg?v=1578899121',
      w: 1200,
      h: 800,
    },
  ];

  const items3 = [
    {
      src: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/12_1500x.jpg?v=1578551333',
      srcSet:
        '//cdn.shopify.com/s/files/1/0281/2906/7148/files/12_180x.jpg?v=1578551333 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/12_360x.jpg?v=1578551333 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/12_540x.jpg?v=1578551333 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/12_720x.jpg?v=1578551333 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/12_900x.jpg?v=1578551333 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/12_1080x.jpg?v=1578551333 1080w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/12_1500x.jpg?v=1578551333 1500w',
      thumbnail: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/12_1500x.jpg?v=1578551333',
      w: 1024,
      h: 585,
    },
    {
      src: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/13_1500x.jpg?v=1578551350',
      srcSet:
        '//cdn.shopify.com/s/files/1/0281/2906/7148/files/13_180x.jpg?v=1578551350 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/13_360x.jpg?v=1578551350 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/13_540x.jpg?v=1578551350 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/13_720x.jpg?v=1578551350 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/13_900x.jpg?v=1578551350 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/13_1080x.jpg?v=1578551350 1080w',
      thumbnail: '//cdn.shopify.com/s/files/1/0281/2906/7148/files/13_1500x.jpg?v=1578551350',
      w: 1024,
      h: 683,
    },
  ];

  const options = {
    // http://photoswipe.com/documentation/options.html
    parallaxOffset: 0,
    opacity: 0,
    isFixed: true,
    minHeight: '75vh',
  };

  function getThumbnailContent(item) {
    return <LazyLoadImage src={item.thumbnail} width="50%" />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="ourHistoryPage">
      <MetaTags key={0}>
        <title>THIS IS HOW WE PRODUCE YOUR CASHMERE!</title>
        <meta property="og:title" content="Premium Cashmere Brand - Gobi Cashmere " />
        <meta property="og:type" content="website" />
      </MetaTags>
      <div>
        <header className="section-header">
          <h1>ABOUT GOBI CASHMERE</h1>
        </header>
      </div>
      <div>
        <div className="index-section">
          <div className="page-width">
            <div className="feature-row aos-init aos-animate" data-aos="">
              <div className="feature-row__item">
                <div className="h-image">
                  <div className="image-wrap">
                    <LazyLoadImage
                      className="feature-row__image lazyautosizes lazyloaded"
                      data-widths="[180, 360, 540, 720, 900, 1080]"
                      data-aspectratio="1.7699115044247788"
                      data-sizes="auto"
                      alt=""
                      sizes="500px"
                      srcSet="//cdn.shopify.com/s/files/1/0281/2906/7148/files/our1_180x.jpg?v=1578550734 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our1_360x.jpg?v=1578550734 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our1_540x.jpg?v=1578550734 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our1_720x.jpg?v=1578550734 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our1_900x.jpg?v=1578550734 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our1_1080x.jpg?v=1578550734 1080w"
                    />
                  </div>
                </div>
              </div>

              <div className="feature-row__item feature-row__text feature-row__text--left">
                <div className="rte featured-row__subtext">
                  <p>
                    “Gobi” is the first Mongolian cashmere brand established in 1981. With almost 40 years of experience
                    in the cashmere industry, today Gobi has become the expert in all stages of the cashmere production
                    stages and gained thousands of loyal customers around the world. We combine innovation and
                    creativity with the unexplored opportunities for cashmere to be at the cutting edge of fashion
                    design and style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="index-section ">
        <div className="page-width text-center">
          <div className="grid">
            <div className="grid__item">
              <h2 className="h2">OUR BRANDS</h2>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="index-section">
          <div className="page-width">
            <div className="feature-row aos-init aos-animate" data-aos="">
              <div className="feature-row__item">
                <div>
                  <div className="image-wrap image-wrap-width">
                    <LazyLoadImage
                      className="feature-row__image lazyautosizes lazyloaded"
                      data-widths="[180, 360, 540, 720, 900, 1080]"
                      data-aspectratio="2.7829457364341086"
                      data-sizes="auto"
                      alt=""
                      sizes="200px"
                      srcSet="//cdn.shopify.com/s/files/1/0281/2906/7148/files/our2_180x.jpg?v=1578551064 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our2_360x.jpg?v=1578551064 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our2_540x.jpg?v=1578551064 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our2_720x.jpg?v=1578551064 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our2_900x.jpg?v=1578551064 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our2_1080x.jpg?v=1578551064 1080w"
                    />
                  </div>
                </div>
              </div>

              <div className="feature-row__item feature-row__text feature-row__text--left">
                <div className="rte featured-row__subtext">
                  <p>
                    Complete wardrobe solutions for all occasions. Gobi represents enduring style and confidence, we
                    design for those who want to look effortlessly polished and feel their best
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="index-section">
          <div className="page-width">
            <div className="feature-row aos-init aos-animate" data-aos="">
              <div className="feature-row__item">
                <div>
                  <div className="image-wrap image-wrap-width">
                    <LazyLoadImage
                      className="feature-row__image lazyautosizes lazyloaded"
                      data-widths="[180, 360, 540, 720, 900, 1080]"
                      data-aspectratio="1.1181640625"
                      data-sizes="auto"
                      alt=""
                      sizes="200px"
                      srcSet="//cdn.shopify.com/s/files/1/0281/2906/7148/files/our3_180x.jpg?v=1578551103 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our3_360x.jpg?v=1578551103 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our3_540x.jpg?v=1578551103 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our3_720x.jpg?v=1578551103 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our3_900x.jpg?v=1578551103 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our3_1080x.jpg?v=1578551103 1080w"
                    />
                  </div>
                </div>
              </div>

              <div className="feature-row__item feature-row__text feature-row__text--left">
                <div className="rte featured-row__subtext">
                  <p>
                    Finest natural fiber meets Italian design to celebrate the beauty and elegance, at the same time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="index-section">
          <div className="page-width">
            <div className="feature-row aos-init aos-animate" data-aos="">
              <div className="feature-row__item">
                <div>
                  <div className="image-wrap image-wrap-width">
                    <LazyLoadImage
                      className="feature-row__image lazyautosizes lazyloaded"
                      data-widths="[180, 360, 540, 720, 900, 1080]"
                      data-aspectratio="7.659574468085107"
                      data-sizes="auto"
                      alt=""
                      sizes="200px"
                      srcSet="//cdn.shopify.com/s/files/1/0281/2906/7148/files/our4_180x.jpg?v=1578551122 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our4_360x.jpg?v=1578551122 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our4_540x.jpg?v=1578551122 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our4_720x.jpg?v=1578551122 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our4_900x.jpg?v=1578551122 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our4_1080x.jpg?v=1578551122 1080w"
                    />
                  </div>
                </div>
              </div>

              <div className="feature-row__item feature-row__text feature-row__text--left">
                <div className="rte featured-row__subtext">
                  <p>
                    Undyed, unbleached products from the Organic Cashmere collection portray the exclusive
                    representation of organic materials, made without compromise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="index-section">
          <div className="page-width">
            <div className="feature-row aos-init aos-animate" data-aos="">
              <div className="feature-row__item">
                <div>
                  <div className="image-wrap image-wrap-width">
                    <LazyLoadImage
                      className="feature-row__image lazyautosizes lazyloaded"
                      data-widths="[180, 360, 540, 720, 900, 1080]"
                      data-aspectratio="1.0"
                      data-sizes="auto"
                      alt=""
                      sizes="200px"
                      srcSet="//cdn.shopify.com/s/files/1/0281/2906/7148/files/5_180x.jpg?v=1578551187 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/5_360x.jpg?v=1578551187 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/5_540x.jpg?v=1578551187 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/5_720x.jpg?v=1578551187 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/5_900x.jpg?v=1578551187 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/5_1080x.jpg?v=1578551187 1080w"
                    />
                  </div>
                </div>
              </div>

              <div className="feature-row__item feature-row__text feature-row__text--left">
                <div className="rte featured-row__subtext">
                  <p>
                    Combination of playful colors, creative design solutions, harmonization of traditional heritage
                    gives Goyo its own special feature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="index-section">
          <div className="page-width">
            <div className="feature-row aos-init aos-animate" data-aos="">
              <div className="feature-row__item">
                <div>
                  <div className="image-wrap image-wrap-width">
                    <LazyLoadImage
                      className="feature-row__image lazyautosizes lazyloaded"
                      data-widths="[180, 360, 540, 720, 900, 1080]"
                      data-aspectratio="0.8533333333333334"
                      data-sizes="auto"
                      alt=""
                      sizes="200px"
                      srcSet="//cdn.shopify.com/s/files/1/0281/2906/7148/files/our6_180x.jpg?v=1578551205 180w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our6_360x.jpg?v=1578551205 360w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our6_540x.jpg?v=1578551205 540w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our6_720x.jpg?v=1578551205 720w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our6_900x.jpg?v=1578551205 900w, //cdn.shopify.com/s/files/1/0281/2906/7148/files/our6_1080x.jpg?v=1578551205 1080w"
                    />
                  </div>
                </div>
              </div>

              <div className="feature-row__item feature-row__text feature-row__text--left">
                <div className="rte featured-row__subtext">
                  <p>
                    Light and warm collection for kids that is manufactured with yarns standardized by OEKO Tex 100
                    yarns that certifies the harmlessness to skin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="index-section">
        <div className="page-width text-center">
          <div className="grid__item">
            <h2>THE WORLD CASHMERE</h2>

            <div className="rte">
              <p>
                Gobi Cashmere is building the world’s cashmere in terms of suggested product quality, volume, service
                and price policy. We believe everyone deserves to wear luxurious cashmere products and feel the real
                cashmere. Our products are made of the finest cashmere fibers sourced locally from Mongolia. Mongolia
                provides 40% of the global cashmere needs. Therefore, Gobi Cashmere is able to provide the highest
                quality cashmere products at the most affordable price for customers around the world and our products
                are suitable for every age, gender, ethnicity and location.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <LazyHero
          imageSrc="https://cdn.shopify.com/s/files/1/0098/6044/8292/files/246A9947_1592876328-edit.jpg?v=1592882342"
          {...options}
        />
      </div>

      <div className="index-section">
        <div className="page-width text-center">
          <div className="grid__item">
            <h2>THE BIGGEST CASHMERE FACTORY AND STORE</h2>

            <div className="rte">
              <p>
                Gobi Corporation is appropriately considered to be one of the largest vertically integrated cashmere
                factories in the world. Annually, our production lines deliver over 1.1 million meters of woven
                material, 162,000 tailored sewn pure cashmere products, and 1.5 million knitted products. Gobi Cashmere
                supply domestically and globally, providing the most exquisite and luxurious experience in cashmere.
                Only in 2018, Gobi sold 48000 pieces of coat throughout the world and is the only company that produces
                solely cashmere garments at this volume.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PhotoSwipeGallery items={items1} options={options} thumbnailContent={getThumbnailContent} />
      <PhotoSwipeGallery items={items2} options={options} thumbnailContent={getThumbnailContent} />

      <div className="index-section">
        <div className="page-width text-center">
          <div className="grid__item">
            <h2>THE BIGGEST CASHMERE STORE</h2>

            <div className="rte">
              <p>
                In 2018, Gobi has opened the world’s largest cashmere store “Galleria Ulaanbaatar” with 2500m2 in the
                heart of Ulaanbaatar city, Mongolia.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PhotoSwipeGallery items={items3} options={options} thumbnailContent={getThumbnailContent} />
    </div>
  );
});
