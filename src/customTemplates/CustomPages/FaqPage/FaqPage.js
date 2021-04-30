import React, { useState, useEffect } from 'react';
import FAQ from './FAQ';
import FAQ2 from './FAQ2';
import './FaqPage.scss';
import './Accordion.css';
import MetaTags from 'react-meta-tags';

export default (function FaqPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [faqs, setfaqs] = useState([
    {
      question: 'WHAT IS CASHMERE?',
      answer:
        'Cashmere is the soft down found in the underbelly of goats that live in the vast grasslands of Mongolia and the Gobi Desert. Under a goat’s coarse protective outer coat lies cashmere, a much finer fiber, which insulates them from the bitter cold.',
      open: false,
    },
    {
      question: 'DO YOU HARM GOATS IN ANY WAY TO SOURCE CASHMERE?',
      answer:
        'Our cashmere originates from Mongolian goats herded by the country’s nomadic people. They still form the majority of the population and their way of life has changed little over the centuries. Each spring, as the weather warms and the undercoat of goats naturally begins to shed, nomadic herders with generations of expertise carefully hand comb the extra fine down without causing any stress or harm to the goats. It is the most sustainable and humane way of harvesting raw cashmere.',
      open: false,
    },
    {
      question: 'HOW TO TELL IF CASHMERE IS HIGH QUALITY',
      answer:
        'The easiest way to check cashmere quality is to simply touch the cashmere because cashmere is the only fiber that has a very narrow diameter which makes it extremely soft to the touch. Even with a slight touch, you should feel the smooth and pleasant sensation if it is a high-quality cashmere. According to the Wool Products Labeling enacted by the US Congress in 1939, cashmere has to be 19 microns in diameter or less. Some parts of Mongolia even produce cashmere with a diameter between 13-14 microns. Hence, Mongolian cashmere is renowned for standing out as top quality above the others.',
      open: false,
    },

    {
      question: 'CAN I WASH 100% CASHMERE PRODUCTS?',
      answer:
        'Depending on the product type, different care instructions are recommended. Carefully go over the label attached to the product. We recommend dry cleaning for the cashmere products for the long durability and freshness. Please refer to our Cashmere care page for more information.',
      open: false,
    },
    {
      question: 'WHAT IS PILLING?',
      answer:
        'Pills are the little balls of fiber that start to gather on your sweater typically in areas where there is friction. It is a natural occurrence that should cause no worries. Gobi cashmere sweater pills only once or twice depending on the garment type. Pilling can be quickly removed with a cashmere comb or easily picked off by hand.',
      open: false,
    },

    {
      question: 'WHY DOES LIGHT COLORED CASHMERE FEEL SOFTER THAN THE DARKER ONES?',
      answer:
        'White, beige, warm grey, and brown are the naturally occurring shades in Mongolian goats. Each color has its own characteristics. Gobi does not change the organic quality of Mongolian cashmere at any stage of production. Undyed, unbleached products from the “Gobi Mongolian Organic Cashmere” are made without compromise which explains the softer feel.',
      open: false,
    },

    {
      question: 'IS CASHMERE HARMFUL TO MY SKIN?',
      answer:
        'We proudly recommend our products to people of all ages including your little ones under the age of 1 as our yarn has been certified harmless to any skin by OEKO TEX 100 standards.',
      open: false,
    },

    {
      question: 'WHY IS MONGOLIAN CASHMERE SO SOFT?',
      answer:
        'Mongolian cashmere is distinguished by an incredibly soft finish, which is the result of delicate fibers that are almost silky to the touch. It doesn’t have the itchy quality of wool but still provides insulating warmth without having to be wrapped in layers and layers of it; hence why Cashmere is such a wanted fabric.',
      open: false,
    },

    {
      question: 'DOES CASHMERE MAKE YOU HOT IN THE SUMMER?',
      answer:
        'Despite being warmer than wool, cashmere is highly breathable and lightweight. Cashmere is hygroscopic, which means that unlike synthetic fibers, it is a naturally breathable material. It has a high moisture content and as the humidity changes in the air so does its insulation making it comfortable in all climates, even during the summer.',
      open: false,
    },

    {
      question: 'WHAT IF I WEAR MY CASHMERE IN THE RAIN?',
      answer:
        'We do not recommend wearing your cashmere products in the rain. However, the fibers in cashmere have water repellent exteriors and the interior attracts water. This means that it attracts moisture, such as water, away from the body. So, you should still feel pretty cozy if you wear cashmere in a mild, rainy day.',
      open: false,
    },
  ]);
  const [faqs2, setfaqs2] = useState([
    {
      question: 'HOW DO I RETURN MY ORDER?',
      answer: 'Please click on the following link: ',
      answerLink: 'https://us.gobicashmere.com/a/returns',
      answer3:
        ' and enter your email address and order number to initiate. If the link does not work properly, please contact our customer service to acquire a return label.',
      open: false,
    },
    {
      question: 'HOW CAN I TRACK THE WHEREABOUTS OF MY ORDER?',
      answer: 'You can track your order using the link: ',
      answerLink: 'https://tools.usps.com/go/TrackConfirmAction_input',
      answer3: ' and enter your USPS tracking code to verify your purchase whereabouts.',
      open: false,
    },
    {
      question: 'WHAT ARE YOUR PRODUCTS MADE OUT OF?',
      answer:
        'The advertised products on our sales platform are mainly 100% cashmere products. On our product details, you can see the materials used.',
      open: false,
    },
    {
      question: 'DO YOU DELIVER TO COUNTRIES OUTSIDE OF USA?',
      answer:
        'We deliver to CANADA as well, but please keep in mind that delivery can take up to 4 weeks without any complications during the shipping process.',
      open: false,
    },
    {
      question: 'CAN I RETURN MY ORDER?',
      answer:
        'If the products returned undamaged and pass our inspection, we will fully refund the customer. Please click on the following link: ',
      answerLink: 'https://www.gobicashmere.com/us/pages/return-policy',
      answer3: ' to see more information on our refund policy.',
      open: false,
    },
    {
      question: 'CAN I EXCHANGE THE PRODUCT I ORDERED?',
      answer:
        'You can exchange the product within 14 working days after purchase. For more information please click on the following link: ',
      answerLink: 'https://www.gobicashmere.com/us/pages/return-policy',
      open: false,
    },
    {
      question: 'WHAT IF THE PRODUCT I WANT IS NOT AVAILABLE?',
      answer: 'Please make sure to visit our website from time to time for re-availability.',
      open: false,
    },
    {
      question: 'WHERE IS THE LOCATION OF YOUR WAREHOUSE?',
      answer: 'Gobi Mongolian Cashmere USA Corp, 15605 Broadway Center St, Gardena, CA 90248, USA',
      open: false,
    },
    {
      question: 'HOW LONG DOES IT TAKE TO RECEIVE MY ORDER?',
      answer: '1-3 business days within USA and 5-10 business days to CANADA.',
      open: false,
    },
    {
      question: 'I HAVE MADE AN ORDER AND HAVEN’T RECEIVED A CONFIRMATION E-MAIL.',
      answer:
        'After you made an order, confirmation e-mail should be sent shortly. If you haven’t received an e-mail from us please check your spam folder and contact our customer service ',
      answerLink: 'https://www.gobicashmere.com/us/contact-us',
      answer3: ' for more assistance or directly email us: gobiusoffice@gobi.mn',
      open: false,
    },
    {
      question: 'I HAVE PLACED THE WRONG INFORMATION. HOW DO I CHANGE MY PERSONAL INFO?',
      answer: 'Please contact our customer service: ',
      answerLink: 'https://www.gobicashmere.com/us/contact-us',
      answer3:
        ' and notify the issue within 12 hours or directly email us: gobiusoffice@gobi.mn. We will contact you shortly.',
      open: false,
    },
    {
      question: 'THE SIZING CHARTS ARE CONFUSING AND I DON’T KNOW WHAT SIZE IS SUITABLE FOR ME.',
      answer:
        'If you are unsure what size is suitable for you, please send us an e-mail which includes the link of the product(s) and the height and weight of person whom you are trying to shop for. Our professional personnel will suggest you the right size.',
      open: false,
    },
    {
      question: 'WHAT IS CASHMERE/WHY IS CASHMERE GOOD/BETTER THAN OTHER FABRICS?',
      answer:
        'Mongolian Cashmere is organic, soft, light weight and most importantly provide warmth by trapping the heat inside. It is an exquisite material and looks luxurious to wear.',
      open: false,
    },
    {
      question: 'HOW DO I CANCEL MY ORDER?',
      answer:
        'We recommend contacting with our customer service within 24 hours to notify the decision before we dispatch your order.',
      open: false,
    },
    {
      question: 'I HAVE RECEIVED THE WRONG ORDER. WHAT DO I DO?',
      answer: 'Please contact our customer service: ',
      answerLink: 'https://www.gobicashmere.com/us/contact-us',
      answer3: ' We will immediately arrange to send you the correct product or arrange a refund.',
      open: false,
    },
    {
      question: 'WHAT HAPPENS IF MY PACKAGE GETS LOST DURING SHIPMENT?',
      answer:
        'In that case, we, as the sender of parcel, will contact USPS and submit a formal investigation request to USPS. Our logistic partner (USPS) will conduct an official investigation regarding the lost shipment. The investigation take can take up to 10 business days to complete.',
      open: false,
    },
    {
      question: 'I HAVE RECEIVED A DEFECTED PRODUCT. WHAT IS THE PROCESS OF EXCHANGING THE PRODUCT?',
      answer:
        'We recommend that you review every item in your order upon delivery and report back to us immediately if there is any defected product(s).',
      open: false,
    },
  ]);
  const toggleFAQ = (index) => {
    setfaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        }
        return faq;
      }),
    );
  };

  const toggleFAQ2 = (index) => {
    setfaqs2(
      faqs2.map((faq2, i) => {
        if (i === index) {
          faq2.open = !faq2.open;
        }
        return faq2;
      }),
    );
  };

  return (
    <div>
      <MetaTags key={0}>
        <title>THIS IS HOW WE PRODUCE YOUR CASHMERE!</title>
        <meta property="og:title" content="Premium Cashmere Brand - Gobi Cashmere " />
        <meta property="og:type" content="website" />
      </MetaTags>
      <div className="faq-page">
        <div className="page-width page-content">
          <div className="faq_grid">
            <div className="faq-col-12">
              <div className="center">
                <h2>FAQ</h2>
                <div className="text">
                  <p>
                    Do you have any questions about your order or about our products? Below you’ll find our most
                    frequently asked questions. Hopefully you will find the answers you seek. If not, please feel free
                    to contact us.
                  </p>
                </div>
              </div>
            </div>

            <div className="faq-col-6">
              <div className="big_tt">
                <h2>PRODUCT RELATED</h2>
              </div>

              <div className="faqs">
                {faqs.map((faq, i) => (
                  <FAQ key={i} faq={faq} index={i} toggleFAQ={toggleFAQ} />
                ))}
              </div>
            </div>
            <div className="faq-col-6">
              <div className="big_tt_2">
                <h2>PURCHASE RELATED</h2>
              </div>
              <div className="faqs">
                {faqs2.map((faq2, i) => (
                  <FAQ2 key={i} faq2={faq2} index={i} toggleFAQ2={toggleFAQ2} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
