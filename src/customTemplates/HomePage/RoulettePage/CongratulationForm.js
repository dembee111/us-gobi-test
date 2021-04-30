import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';
import './RouletteMain.scss';
import { getPrizeNameById } from './rouletteHelper';
import axios from 'axios';

export default (function CongratulationForm(props) {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitForm = async () => {
    if (emailRef && emailRef.current && emailRef.current.value) {
      if (loading == false) {
        setLoading(true);
        const resultAdd = await rouletteAdd(emailRef.current.value, props.country, getPrizeNameById(props.data.id));

        if (resultAdd == true) {
          const result = await hubspotSubmit(emailRef.current.value);

          console.log(result, ' --resss');
          if (result == true) {
            props.onFinish(emailRef.current.value, 3);
          } else {
            console.log('try again');
          }
        } else {
          console.log('errr add data');
        }
      }
    }
  };

  const rouletteAdd = (email, country, type) => {
    return new Promise((resolve, reject) => {
      axios
        .post('https://europe-west1-gobicashmere-sizechart.cloudfunctions.net/updateRoulette', {
          email: email,
          country: country,
          type: type,
          date: new Date().toString(),
        })
        .then((res) => {
          if (res.status == 200) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const hubspotSubmit = (val) => {
    return new Promise((resolve, reject) => {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function (result) {
        if (result.target && result.target.status == 200 && result.target.readyState == 4) {
          let parsedResult = JSON.parse(xmlHttp.responseText);

          if (parsedResult.error) {
            reject(parsedResult.message);
          } else {
            resolve(true);
          }
        }
      };

      // /:portalId/:formGuid

      xmlHttp.open(
        'POST',
        `https://api.hsforms.com/submissions/v3/integration/submit/${props.hubSpotForm.portalID}/${props.hubSpotForm.formID}`,
        true,
      ); // true for asynchronous
      xmlHttp.setRequestHeader('Content-Type', 'application/json');
      const reqBody = JSON.stringify({
        fields: [
          {
            name: 'email',
            value: val,
          },
        ],
      });
      xmlHttp.send(reqBody);
    });
  };

  return (
    <section className="grand-prize">
      <div className="circle-bg"></div>
      <div className="description-box">
        <div className="top-title">
          <p>You won {props.data.text}</p>
        </div>
        <div className="center-form">
          <form>
            <div className="s-form-input">
              <input ref={emailRef} type="email" name="email" placeholder="Email Address"></input>
            </div>
            <div className="s-form-checkout">
              <input type="checkbox" name="checkbox"></input>
              <p>
                {`By signing up, you agree to Gobi’s`} <Link to="/pages/privacy-policy">Privacy Policy</Link> and{' '}
                <Link to="/pages/terms-of-service">General Terms & Conditions.</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="grand-btn" onClick={() => submitForm()}>
          <span>Get Your Prize</span>
        </div>
      </div>
    </section>
  );
});
