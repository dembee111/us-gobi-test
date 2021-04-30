import React from 'react';
import { Link } from 'gatsby';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
// import logo from '/icons/logo.svg';
import './Toolbar.scss';
import { connect } from 'react-redux';

const toolbar = (props) => (
  <div className="toolbar-h">
    <DrawerToggleButton click={props.drawerClickHandler} />
  </div>
);
const mapStateToProps = (state) => ({
  totalQuantity: state.totalQuantity,
});
export default connect(mapStateToProps)(toolbar);
