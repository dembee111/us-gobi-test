import React from 'react';
import Collapsible from 'react-collapsible';
import './SubSection.scss';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import { subscribeEvent } from '../../../components/shared/dataLayer/index';

class SubSection extends React.Component {
  state = {
    isShow: false,
    isListShow: false,
    isChangeSubtext: false,
    newsLetterInput: '',
    newsLetterPopUp: {
      text: 'THANK YOU FOR SUBSCRIBING',
      state: false,
    },
  };

  subscribeToNewsletter = (email) => {
    subscribeEvent(email);
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          let parser = JSON.parse(xmlHttp.responseText);
          if (!parser.error) {
            this.setState({
              isChangeSubtext: true,
              newsLetterPopUp: {
                state: true,
                text: 'THANK YOU FOR SUBSCRIBING',
              },
            });
            // alert('' + parser.message);
          } else {
            if (parser.message.email) {
              // setNewsLetterPopUp;
              this.setState({
                isChangeSubtext: true,
                newsLetterPopUp: {
                  state: true,
                  text: "THANK YOU! YOU'RE ALREADY SUBSCRIBED TO THIS LIST!",
                },
              });
              // alert('' + parser.message.email);
            } else {
              alert('Something went wrong');
            }
          }
        } else {
          alert('Something went wrong');
        }
      }
    };
    xmlHttp.open(
      'get',
      'https://europe-west1-gobicashmere-sizechart.cloudfunctions.net/subscribeToStore?subscribingEmail=' +
        email +
        '&region=us',
      true,
    ); // true for asynchronous
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.send();
    // }
  };

  handleToggle = () => {
    const { isShow } = this.state;
    this.setState({ isShow: !isShow });
  };

  render() {
    return [
      <div key={1} className="home_subs">
        <h1 className="tt">Subscribe</h1>
        <p className="text">Sign up for emails and receive early access to new arrivals, sales, events + more.</p>
        <div className="group">
          <label htmlFor="home_sub">Subscribe</label>
          <input
            id="home_sub"
            type="text"
            placeholder="Enter your email address"
            onChange={(event) => this.setState({ newsLetterInput: event.target.value })}
          />
          <button
            onClick={() => {
              this.subscribeToNewsletter(this.state.newsLetterInput);
            }}
          >
            <span>{this.state.isChangeSubtext == true ? 'SUBSCRIBED' : 'Submit'}</span>
          </button>
        </div>
        <div className="detail">
          <p>
            {`By signing up, you will receive Gobi Cashmere offers, promotions and other commercial messages. You are also agreeing to Gobi Cashmere's`}{' '}
            <Link to="/pages/privacy-policy">Privacy Policy</Link>. You may unsubscribe at any time.
          </p>
        </div>
      </div>,
    ];
  }
}

const mapStateToProps = (state) => ({
  customerAccessTokenObject: state.customerAccessTokenObject,
});

export default connect(mapStateToProps)(SubSection);
