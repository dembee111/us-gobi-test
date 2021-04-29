import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HubspotForm from 'react-hubspot-form';
import './ContactUsPage.scss';

const validators = {
  name: /^(?=.{3,}$).*/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  phone: /[0-9]{8}/,
  message: /^(?=.{5,}$).*/,
};

const validate = ([name, email, phone, message]) => {
  const errors = [];
  if (!validators.name.test(name)) {
    errors.push('Name is invalid.');
  }
  if (!validators.email.test(email)) {
    errors.push('Email is invalid.');
  }
  if (!validators.phone.test(phone)) {
    errors.push('Phone is invalid.');
  }
  if (!validators.message.test(message)) {
    errors.push('Message is invalid.');
  }
  return errors.length > 0 ? [errors[0]] : errors;
};

const ContactUsPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'phone') {
      setPhone(e.target.value);
    } else if (e.target.name === 'message') {
      setMessage(e.target.value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate([name, email, phone, message]);
    if (errs.length > 0) {
      return setErrors(errs);
    }
    axios
      .post('https://us-central1-gobicashmere-sizechart.cloudfunctions.net/submit', {
        email,
        message: `
name: ${name}<br>
email: ${email}<br>
phone: ${phone}<br>
message: ${message}`,
      })
      .then(() => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setErrors([]);
        setSent(true);
      })
      .catch((err) => {
        console.log(err);
        setErrors(['server error']);
      });
  };
  return (
    <div className="custom_contact index-section">
      <div className="section-header">
        <h2 className="header__title">{` CAN'T FIND WHAT YOU'RE LOOKING FOR? `}</h2>
      </div>
      <div className="center_text">
        <p>We are very Responsible to Help You !</p>
      </div>

      <div className="contact_grid">
        <div className="row">
          <div className="section-left l-width">
            <div className="section-fixed">
              <HubspotForm
                portalId="5629226"
                formId="e5b09ca8-22ac-4af7-8f9d-8502ef2974c9"
                onSubmit={() => console.log('Submit!')}
                onReady={() => console.log('Form ready!')}
                loading={<div>Loading...</div>}
              />
            </div>
          </div>

          <div className="section-right r-width">
            <div className="location">
              <p className="title">Office</p>
              <p className="address">
                Gobi Mongolian Cashmere USA Corp<br></br>
                15605 Broadway Center St<br></br> Gardena<br></br> CA 90248<br></br> USA
              </p>
              <p className="phone">Tel: +1 617 763 9938</p>
              <p className="email" style={{ marginBottom: '30px' }}>
                E-mail: gobiusoffice@gobi.mn
              </p>
              <hr></hr>
              <p className="title" style={{ marginTop: '30px' }}>
                CUSTOMER SERVICE
              </p>
              <p className="email">
                E-mail:{' '}
                <a href="mailto:support-2@gobicashmere.com">
                  <strong>
                    <u>support-2@gobicashmere.com</u>
                  </strong>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUsPage;
