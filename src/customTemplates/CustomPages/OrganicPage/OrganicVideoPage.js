import React, { Component, useState } from 'react';
import './OrganicPage.scss';
import './OrganicPageMobile.scss';
import LazyLoad from 'react-lazyload';
class OrganicVideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = { videoState: true };
  }

  componentDidMount = () => {
    this.playVideo();
  };

  // componentWillMount = () => {
  //     this.pauseVideo();
  // }

  playVideo = () => {
    if (this.video) {
      this.video.play();
      this.setState({
        videoState: true,
      });
    }
    // clickBtnLeave("close");
  };

  pauseVideo = () => {
    if (this.video) {
      this.video.pause();
    }
  };
  render() {
    return (
      <section className="video-banner">
        <div className="desk-video-section">
          <video ref={(e) => (this.video = e)} autoPlay muted loop>
            <source
              src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/0-02-06-c12d7a70e88e27e83ba27f0bd24658b3a7528041d7b4341849983936871d309b_1c6d9d44e1b058_1.webm?v=1597309011"
              type="video/webm"
            ></source>
            <source
              src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/0-02-08-6d4552a601637c9352e8cd8b9ac4736e428a41ad55526d8dcf79b5784c79565d_1c6d9dfd9913cd.mp4?v=1597369373"
              type="video/mp4"
            ></source>
          </video>
        </div>

        <div className="mobile-video-section">
          <video
            loop
            ref={(e) => (this.video = e)}
            poster="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Screen_Shot_2020-08-14_at_10.00.07.png?v=1597370425"
          >
            <source
              src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/organic_web_6.webm?v=1597308972"
              type="video/webm"
            ></source>
            <source
              src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/0-02-08-6d4552a601637c9352e8cd8b9ac4736e428a41ad55526d8dcf79b5784c79565d_1c6d9dfd9913cd.mp4?v=1597369373"
              type="video/mp4"
            ></source>
          </video>

          <div className="video-play-btn">
            <a
              className="p-btn-1"
              style={{ display: this.state.videoState ? 'block' : 'none' }}
              onClick={this.playVideo}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                <polygon className="play-btn__svg" points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69" />
                <path
                  className="play-btn__svg"
                  d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default OrganicVideoPage;
