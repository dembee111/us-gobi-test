import React, { Component } from 'react';

import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';

class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.setSideDrawerOpen = this.setSideDrawerOpen.bind(this);
  }
  state = {
    sideDrawerOpen: false,
    subMenuOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  setSideDrawerOpen(state) {
    this.setState({ sideDrawerOpen: state });
  }

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer
          setSideDrawerOpen={this.setSideDrawerOpen}
          show={this.state.sideDrawerOpen}
          updateCheckoutCurrencyMutation={this.props.updateCheckoutCurrencyMutation}
        />
        {backdrop}
      </div>
    );
  }
}

export default MobileMenu;
