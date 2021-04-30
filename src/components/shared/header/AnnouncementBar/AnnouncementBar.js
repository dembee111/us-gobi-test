import React, { Component } from 'react';
import { Link } from 'gatsby';
import Swiper from 'react-id-swiper';
import './AnnouncementBar.scss';
export default class AnnouncementBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPos: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { scrollPos } = this.state;
    this.props.setShowAnnouncementBar(document.body.getBoundingClientRect().top > scrollPos);
    this.setState({
      scrollPos: document.body.getBoundingClientRect().top,
    });
  }
  render() {
    const params = {
      slidesPerView: 1,
      spaceBetween: 1,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
    };
    return (
      <>
        <div className={this.props.showAnnouncementBar ? 'active' : 'hidden'}>
          <div className="announcement-section">
            <div className="announcement-bar">
              <Swiper
                swiperOptions={{
                  slidesPerView: 1,
                }}
                {...params}
              >
                <div>
                  <span>
                    <Link to="/pages/gift-policy">Returning an Order?</Link>
                  </span>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </>
    );
  }
}
