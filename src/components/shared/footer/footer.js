import React, { useState, useEffect } from 'react';
import './footer.scss';
import { approvedCountryList } from '../data/approvedCountryList';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import PaymentLogos from './payment-logos';
import Collapsible from 'react-collapsible';
import { footerData } from '../data/footerData';
import LocationPopUp from '../header/LocationPopUp/LocationPopUp';

function Footer(props) {
  const [shippingCountryText, setShippingCountryText] = useState('International');
  const [langState, setLangState] = useState(false);
  const [dateState, setDateState] = useState();
  const getYear = () => setDateState(new Date().getFullYear());
  useEffect(() => {
    if (props.currency && props.currency.chosenShippingCountry) {
      for (let singleCountry of approvedCountryList) {
        if (singleCountry.countryCode === props.currency.chosenShippingCountry) {
          setShippingCountryText(singleCountry.countryName);
          break;
        }
      }
    }
  }, [props.currency.chosenShippingCountry]);

  useEffect(() => {
    getYear();
  }, []);

  function socialLinks() {
    return (
      <div className="social">
        <a href="https://www.facebook.com/GobiCashmereUSOfficial/" title="Facebook">
          <div className="soc_icon">
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 1H6.09091C5.24704 1 4.43773 1.31607 3.84102 1.87868C3.24432 2.44129 2.90909 3.20435 2.90909 4V5.8H1V8.2H2.90909V13H5.45455V8.2H7.36364L8 5.8H5.45455V4C5.45455 3.84087 5.52159 3.68826 5.64093 3.57574C5.76027 3.46321 5.92213 3.4 6.09091 3.4H8V1Z"
                stroke="#4F5255"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>
        <a href="https://www.youtube.com/channel/UCzUZQnPw4XdIw3_IHq6xywA" title="Youtube">
          <div className="soc_icon">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.7488 2.25226C12.684 2.00668 12.552 1.78167 12.3663 1.59995C12.1805 1.41824 11.9474 1.28625 11.6907 1.21734C10.7525 1 7 1 7 1C7 1 3.24747 1 2.30933 1.23803C2.05257 1.30695 1.81953 1.43893 1.63374 1.62065C1.44795 1.80237 1.316 2.02738 1.25121 2.27296C1.07952 3.17623 0.995532 4.09253 1.00031 5.01035C0.994192 5.93508 1.07818 6.85837 1.25121 7.76844C1.32264 8.00639 1.45755 8.22284 1.6429 8.39689C1.82826 8.57093 2.0578 8.69667 2.30933 8.76197C3.24747 9 7 9 7 9C7 9 10.7525 9 11.6907 8.76197C11.9474 8.69305 12.1805 8.56107 12.3663 8.37935C12.552 8.19763 12.684 7.97262 12.7488 7.72704C12.9192 6.83058 13.0031 5.92126 12.9997 5.01035C13.0058 4.08562 12.9218 3.16233 12.7488 2.25226V2.25226Z"
                stroke="#4F5255"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.77277 6.70209L8.90897 5.00998L5.77277 3.31787V6.70209Z"
                stroke="#4F5255"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>
        <a href="https://www.pinterest.de/gobicashmereinternational/" title="Pinterest">
          <div className="soc_icon">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.2424 4.59261C11.2146 3.3029 10.7251 2.23587 9.77409 1.39152C8.82304 0.547173 7.62843 0.125 6.19025 0.125C5.88406 0.125 5.56859 0.148196 5.24384 0.194589C4.09331 0.352324 3.11442 0.811611 2.30719 1.57245C1.49996 2.33329 1.01283 3.24723 0.845821 4.31426C0.771593 4.85241 0.778552 5.37665 0.866698 5.88697C0.954844 6.39729 1.15897 6.86121 1.47908 7.27875C1.79919 7.69628 2.21904 7.97 2.73864 8.0999L2.97524 8.15557L3.11442 7.96072C3.15154 7.89577 3.19793 7.8169 3.2536 7.72412C3.30927 7.63133 3.36958 7.48519 3.43453 7.2857C3.49948 7.08622 3.52268 6.91224 3.50412 6.76379C3.49484 6.68956 3.47164 6.61533 3.43453 6.5411C3.39742 6.46687 3.36494 6.41352 3.33711 6.38105C3.30927 6.34857 3.27216 6.30914 3.22576 6.26275L3.18401 6.22099C3.05411 6.01687 2.96597 5.76171 2.91957 5.45551C2.87318 5.14932 2.87318 4.85241 2.91957 4.56478C3.04947 3.86889 3.38118 3.28898 3.91469 2.82505C4.44821 2.36113 5.08611 2.10133 5.82839 2.04566C5.92118 2.03638 6.02324 2.03174 6.13458 2.03174C6.9047 2.03174 7.52868 2.24282 8.00653 2.665C8.48437 3.08717 8.74185 3.65084 8.77896 4.35601C8.78824 4.50447 8.79056 4.65292 8.78592 4.80138C8.78128 4.94984 8.772 5.09597 8.75809 5.23979C8.74417 5.38361 8.72329 5.52278 8.69546 5.65732C8.66762 5.79186 8.63515 5.92408 8.59803 6.05398C8.56092 6.18388 8.51916 6.30914 8.47277 6.42976C8.42638 6.55038 8.37535 6.66636 8.31968 6.77771C8.264 6.88905 8.20601 6.99343 8.1457 7.09086C8.08539 7.18828 8.01812 7.27875 7.9439 7.36225C7.86967 7.44576 7.7908 7.52463 7.70729 7.59886L7.66554 7.64061C7.46141 7.8169 7.26656 7.91896 7.08099 7.9468C7.05316 7.95608 7.02764 7.96072 7.00444 7.96072C6.98125 7.96072 6.95805 7.96304 6.93485 7.96768C6.91166 7.97232 6.88614 7.97464 6.85831 7.97464C6.59851 7.97464 6.38974 7.90041 6.23201 7.75195C6.07427 7.60349 5.99076 7.43184 5.98149 7.23699C5.97221 6.95864 6.08355 6.51327 6.31551 5.90088C6.4083 5.64109 6.47789 5.43696 6.52428 5.2885C6.57067 5.14004 6.61243 4.94984 6.64954 4.71787C6.68665 4.48591 6.69129 4.2725 6.66346 4.07765C6.61707 3.7529 6.46397 3.47919 6.20417 3.2565C5.94437 3.03382 5.64746 2.92248 5.31343 2.92248C5.22993 2.92248 5.1441 2.93176 5.05595 2.95031C4.96781 2.96887 4.88198 2.99207 4.79847 3.0199C4.56651 3.11269 4.3647 3.24723 4.19305 3.42352C4.0214 3.59981 3.89382 3.80162 3.81031 4.02894C3.7268 4.25627 3.67113 4.50215 3.6433 4.76658C3.61546 5.03102 3.6201 5.29778 3.65722 5.56686C3.69433 5.83593 3.75928 6.10037 3.85206 6.36017C3.82423 6.51791 3.7848 6.69188 3.73376 6.88209C3.68273 7.0723 3.64098 7.23235 3.6085 7.36225C3.57603 7.49215 3.52732 7.66844 3.46237 7.89113C3.35102 8.31794 3.2652 8.64501 3.20489 8.87233C3.14458 9.09966 3.07267 9.41745 2.98916 9.8257C2.90565 10.234 2.8523 10.5889 2.82911 10.8904C2.80591 11.192 2.79895 11.5376 2.80823 11.9273C2.81751 12.317 2.85462 12.6974 2.91957 13.0685L3.00308 13.5L3.39278 13.333C3.5134 13.2866 3.62706 13.21 3.73376 13.1033C3.84047 12.9966 3.91933 12.9062 3.97037 12.8319C4.0214 12.7577 4.08867 12.651 4.17217 12.5118C4.21857 12.4376 4.25104 12.3819 4.2696 12.3448C4.5294 11.9366 4.74744 11.4866 4.92373 10.9948C5.10003 10.503 5.25776 9.9556 5.39694 9.3525C5.97221 9.78859 6.68665 9.96024 7.54028 9.86746C8.1341 9.80251 8.67458 9.6007 9.1617 9.26203C9.64882 8.92337 10.0408 8.50583 10.3378 8.00943C10.6347 7.51303 10.862 6.97023 11.0197 6.38105C11.1775 5.79186 11.2517 5.19572 11.2424 4.59261ZM4.56187 6.40193L4.57579 6.3045L4.53404 6.20708C4.40414 5.86377 4.33223 5.52046 4.31831 5.17716C4.30439 4.83385 4.35774 4.52302 4.47836 4.24467C4.59899 3.96631 4.7892 3.7761 5.04899 3.67404C5.09539 3.65548 5.13946 3.64388 5.18121 3.63924C5.22297 3.6346 5.26704 3.63228 5.31343 3.63228C5.42477 3.63228 5.52684 3.65548 5.61962 3.70187C5.71241 3.74827 5.79128 3.81322 5.85623 3.89672C5.92118 3.98023 5.95829 4.07301 5.96757 4.17508C5.98613 4.32353 5.97917 4.48823 5.94669 4.66916C5.91422 4.85009 5.87942 5.00087 5.84231 5.12149C5.80519 5.24211 5.74024 5.42304 5.64746 5.66428C5.39694 6.36945 5.27632 6.90297 5.2856 7.26483C5.29488 7.62669 5.44333 7.95144 5.73097 8.23907C6.0186 8.52671 6.39438 8.67053 6.85831 8.67053C6.96037 8.67053 7.06707 8.66125 7.17842 8.64269C7.28976 8.62413 7.39646 8.59862 7.49853 8.56614C7.60059 8.53367 7.69105 8.48959 7.76992 8.43392C7.84879 8.37825 7.91142 8.33418 7.95781 8.3017C8.00421 8.26923 8.05988 8.22052 8.12483 8.15557L8.16658 8.11381C8.61195 7.73339 8.95062 7.2022 9.18258 6.52023C9.41454 5.83825 9.51197 5.10293 9.47485 4.31426C9.42846 3.35857 9.06196 2.60469 8.37535 2.05261C7.68874 1.50054 6.82583 1.26162 5.78664 1.33585C5.58251 1.35441 5.38534 1.38456 5.19513 1.42631C5.00492 1.46807 4.82167 1.52142 4.64538 1.58637C4.46909 1.65132 4.29975 1.73019 4.13738 1.82297C3.975 1.91576 3.81959 2.01782 3.67113 2.12916C3.52268 2.2405 3.3835 2.35881 3.2536 2.48407C3.1237 2.60933 3.0054 2.7485 2.8987 2.9016C2.79199 3.0547 2.69689 3.21243 2.61338 3.3748C2.52987 3.53718 2.45565 3.70651 2.3907 3.8828C2.32575 4.0591 2.27471 4.24467 2.2376 4.43952C2.17265 4.81066 2.17265 5.1934 2.2376 5.58773C2.30255 5.98207 2.42317 6.31378 2.59946 6.58286C2.6273 6.63853 2.66905 6.6942 2.72472 6.74987C2.78039 6.80554 2.80823 6.83802 2.80823 6.84729C2.81751 6.88441 2.81751 6.92848 2.80823 6.97951C2.79895 7.03055 2.78039 7.08622 2.75256 7.14653C2.72472 7.20684 2.69689 7.26947 2.66905 7.33442C2.19585 7.13029 1.86646 6.74755 1.68089 6.1862C1.49532 5.62485 1.44893 5.03334 1.54171 4.41168C1.68089 3.49311 2.10074 2.70907 2.80127 2.05957C3.5018 1.41008 4.34847 1.01574 5.34127 0.876561C5.6289 0.839447 5.9119 0.82089 6.19025 0.82089C7.43358 0.82089 8.46349 1.17811 9.28 1.89256C10.0965 2.60701 10.5187 3.51166 10.5465 4.60653C10.5558 5.3117 10.4491 5.99135 10.2264 6.64549C10.0037 7.29962 9.65114 7.86561 9.16866 8.34346C8.68618 8.8213 8.11555 9.09734 7.45677 9.17157C7.39182 9.18084 7.32455 9.1878 7.25496 9.19244C7.18538 9.19708 7.12275 9.1994 7.06707 9.1994C6.71449 9.1994 6.4199 9.14141 6.18329 9.02543C5.94669 8.90945 5.69849 8.72156 5.43869 8.46176L4.99332 8.01639L4.85415 8.62877C4.75208 9.11126 4.65698 9.51255 4.56883 9.83266C4.48068 10.1528 4.35774 10.5146 4.20001 10.9182C4.04227 11.3219 3.87062 11.6721 3.68505 11.969C3.66649 11.9969 3.65258 12.0201 3.6433 12.0386C3.63402 12.0572 3.62242 12.0781 3.6085 12.1013C3.59459 12.1245 3.57835 12.15 3.55979 12.1778C3.54123 12.2056 3.52732 12.2288 3.51804 12.2474C3.48092 11.7835 3.49484 11.2848 3.55979 10.7512C3.62474 10.2177 3.69665 9.78395 3.77552 9.44992C3.85438 9.11589 3.97732 8.65661 4.14434 8.07206C4.21857 7.80298 4.2696 7.61045 4.29743 7.49447C4.32527 7.37849 4.36702 7.21148 4.42269 6.99343C4.47836 6.77539 4.52476 6.57822 4.56187 6.40193Z"
                fill="#4F5255"
              />
            </svg>
          </div>
        </a>
        <a href="https://www.instagram.com/gobicashmere.usa/" title="Instagram">
          <div className="soc_icon">
            <svg width="16" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 1H4C2.34315 1 1 2.34315 1 4V10C1 11.6569 2.34315 13 4 13H10C11.6569 13 13 11.6569 13 10V4C13 2.34315 11.6569 1 10 1Z"
                stroke="#4F5255"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.40002 6.62169C9.47407 7.12104 9.38877 7.63102 9.15627 8.0791C8.92377 8.52718 8.55591 8.89054 8.105 9.1175C7.65408 9.34445 7.14309 9.42345 6.64469 9.34325C6.14629 9.26305 5.68588 9.02774 5.32892 8.67079C4.97197 8.31384 4.73666 7.85342 4.65646 7.35502C4.57626 6.85662 4.65526 6.34563 4.88222 5.89472C5.10917 5.4438 5.47253 5.07594 5.92061 4.84344C6.36869 4.61094 6.87867 4.52565 7.37802 4.59969C7.88737 4.67522 8.35893 4.91257 8.72304 5.27668C9.08714 5.64078 9.32449 6.11234 9.40002 6.62169Z"
                stroke="#4F5255"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M10.3 3.7002H10.306" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>
      </div>
    );
  }

  function paymentLists() {
    return (
      <div className="payment_logos">
        <div className="logos_lists">
          <PaymentLogos name="visa" />
        </div>
        <div className="logos_lists">
          <PaymentLogos name="mastercard" />
        </div>
        <div className="logos_lists">
          <PaymentLogos name="american-express" />
        </div>
        <div className="logos_lists">
          <PaymentLogos name="Discover" />
        </div>
        <div className="logos_lists">
          <PaymentLogos name="JSB" />
        </div>
        <div className="logos_lists">
          <PaymentLogos name="diners-club" />
        </div>
        <div className="logos_lists">
          <PaymentLogos name="Shop-Pay" />
        </div>
        <div className="logos_lists">
          <PaymentLogos name="apple-pay" />
        </div>
        <div className="logos_lists">
          <PaymentLogos name="google-pay" />
        </div>
        <div className="logos_lists">
          <PaymentLogos name="amazon" />
        </div>
        <div className="logos_lists">
          <PaymentLogos name="PayPal" />
        </div>
        <div className="logos_lists">
          <PaymentLogos name="Afterpay" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="new_footer desktop">
        <div className="top">
          <div className="left">{socialLinks()}</div>
          <div className="right">{paymentLists()}</div>
        </div>
        <div className="bottom">
          <div className="footer_nav">
            {footerData.map((item, index) => {
              return (
                <div className="tc_col-3" key={index}>
                  <h2 className="tt">{item.label}</h2>
                  {item.child.map((item, index) => {
                    if (item.child) {
                      return (
                        <ul key={index}>
                          {item.child.map((item, index) => {
                            if (item.link_style != 'a_tag') {
                              return (
                                <li key={index}>
                                  <Link to={item.link} title={item.label}>
                                    {item.label}
                                  </Link>
                                </li>
                              );
                            } else {
                              return (
                                <li key={index}>
                                  <a href={item.link} title={item.label}>
                                    {item.label}
                                  </a>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
          <div className="copy_right">
            <div
              className="footer_location"
              onClick={() => {
                setLangState(true);
              }}
            >
              <div>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 7.36364C15 10.0228 13.2461 12.559 11.3902 14.4824C10.4731 15.4328 9.55415 16.2099 8.86391 16.7496C8.5192 17.0191 8.23255 17.2285 8.03305 17.37C8.02175 17.378 8.01073 17.3858 8 17.3934C7.98927 17.3858 7.97825 17.378 7.96695 17.37C7.76745 17.2285 7.4808 17.0191 7.13609 16.7496C6.44585 16.2099 5.52695 15.4328 4.60981 14.4824C2.75394 12.559 1 10.0228 1 7.36364C1 5.54628 1.73523 3.80146 3.04699 2.51354C4.35907 1.22532 6.14055 0.5 8 0.5C9.85945 0.5 11.6409 1.22532 12.953 2.51354C14.2648 3.80146 15 5.54628 15 7.36364Z"
                    stroke="#4F5255"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10C9.38071 10 10.5 8.88071 10.5 7.5C10.5 6.11929 9.38071 5 8 5C6.61929 5 5.5 6.11929 5.5 7.5C5.5 8.88071 6.61929 10 8 10Z"
                    fill="#0083C3"
                  />
                </svg>
              </div>
              <span>{shippingCountryText}</span>
            </div>
            <div className="copy_text">
              <p>© {dateState} Gobi Cashmere. All rights reserved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="new_footer mobile">
        <div className="bottom">
          <div className="footer_nav">
            {footerData.map((item, index) => {
              return (
                <Collapsible key={index} trigger={item.label}>
                  {item.child.map((item, index) => {
                    if (item.child) {
                      return (
                        <ul key={index}>
                          {item.child.map((item, index) => {
                            if (item.link_style != 'a_tag') {
                              return (
                                <li key={index}>
                                  <Link to={item.link} title={item.label}>
                                    {item.label}
                                  </Link>
                                </li>
                              );
                            } else {
                              return (
                                <li key={index}>
                                  <a href={item.link} title={item.label}>
                                    {item.label}
                                  </a>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      );
                    }
                  })}
                </Collapsible>
              );
            })}
          </div>
          <div className="mobile_soc_pay">
            <div className="left">{socialLinks()}</div>
            <div className="right">{paymentLists()}</div>
          </div>
          <div className="copy_right">
            <div className="copy_text">
              <p>© {dateState} Gobi Cashmere. All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
      <div key="1">
        {langState && (
          <LocationPopUp
            langState={langState}
            setLangState={setLangState}
            updateCheckoutCurrencyMutation={props.updateCheckoutCurrencyMutation}
          />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

export default connect(mapStateToProps)(Footer);
