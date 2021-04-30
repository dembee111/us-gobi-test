import React, { Component } from 'react';

export default class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: false,
    };
  }

  componentDidMount() {
    const scrollComponent = this;
    document.addEventListener('scroll', (e) => {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true,
      });
    } else {
      this.setState({
        is_visible: false,
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  render() {
    const { is_visible } = this.state;
    return (
      <div className="backtop">
        {is_visible && (
          <div style={{ cursor: 'pointer' }} onClick={() => this.scrollToTop()}>
            back to top
          </div>
        )}
      </div>
    );
  }
}
